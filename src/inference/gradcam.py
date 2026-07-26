import cv2
import numpy as np
import torch
import torch.nn.functional as F


class GradCAM:
    def __init__(self, model, target_layer):
        """
        Args:
            model: Alzheimer's ResNet18 model
            target_layer: model.model.layer4[-1]
        """

        self.model = model
        self.target_layer = target_layer

        self.activations = None
        self.gradients = None

        self._register_hooks()

    def _register_hooks(self):

        def forward_hook(module, input, output):
            self.activations = output.detach()

        def backward_hook(module, grad_input, grad_output):
            self.gradients = grad_output[0].detach()

        self.target_layer.register_forward_hook(forward_hook)

        # PyTorch >=1.9
        self.target_layer.register_full_backward_hook(backward_hook)

    def generate(self, image_tensor, class_idx=None):
        """
        Args:
            image_tensor : Tensor [1,3,224,224]
            class_idx    : Target class index

        Returns:
            heatmap (numpy array)
            predicted_class
            confidence
            probabilities
        """

        self.model.eval()

        output = self.model(image_tensor)

        probabilities = torch.softmax(output, dim=1)

        confidence, prediction = torch.max(probabilities, dim=1)

        if class_idx is None:
            class_idx = prediction.item()

        self.model.zero_grad()

        score = output[:, class_idx]

        score.backward()

        gradients = self.gradients
        activations = self.activations

        # Global Average Pooling over gradients
        weights = gradients.mean(dim=(2, 3), keepdim=True)

        # Weighted feature maps
        cam = (weights * activations).sum(dim=1)

        cam = F.relu(cam)

        cam = cam.squeeze().cpu().numpy()

        cam = cv2.resize(cam, (224, 224))

        cam -= cam.min()

        if cam.max() != 0:
            cam /= cam.max()

        return (
            cam,
            prediction.item(),
            confidence.item(),
            probabilities.squeeze().cpu().detach().numpy(),
        )


def overlay_heatmap(original_image, heatmap, alpha=0.4):
    """
    Overlay Grad-CAM heatmap on image.

    Args:
        original_image : RGB numpy image (224x224x3)
        heatmap        : GradCAM output
        alpha          : transparency

    Returns:
        overlay image
    """

    heatmap = np.uint8(255 * heatmap)

    heatmap = cv2.applyColorMap(
        heatmap,
        cv2.COLORMAP_JET,
    )

    heatmap = cv2.cvtColor(
        heatmap,
        cv2.COLOR_BGR2RGB,
    )

    overlay = cv2.addWeighted(
        original_image,
        1 - alpha,
        heatmap,
        alpha,
        0,
    )

    return overlay


def tensor_to_numpy(image_tensor):
    """
    Converts normalized tensor back to RGB image.

    Input:
        [1,3,224,224]

    Returns:
        uint8 RGB image
    """

    image = image_tensor.squeeze(0).cpu().numpy()

    mean = np.array([0.485, 0.456, 0.406]).reshape(3, 1, 1)
    std = np.array([0.229, 0.224, 0.225]).reshape(3, 1, 1)

    image = image * std + mean

    image = np.clip(image, 0, 1)

    image = image.transpose(1, 2, 0)

    image = (image * 255).astype(np.uint8)

    return image


def save_gradcam(
    image_tensor,
    heatmap,
    output_path,
):
    """
    Saves Grad-CAM visualization.
    """

    image = tensor_to_numpy(image_tensor)

    overlay = overlay_heatmap(
        image,
        heatmap,
    )

    overlay = cv2.cvtColor(
        overlay,
        cv2.COLOR_RGB2BGR,
    )

    cv2.imwrite(
        output_path,
        overlay,
    )

    print(f"Grad-CAM saved to {output_path}")