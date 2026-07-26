from pathlib import Path
from uuid import uuid4

import torch
from PIL import Image, UnidentifiedImageError

from src.config.constants import CLASS_NAMES
from src.config.paths import BEST_MODEL, OUTPUT_DIR
from src.data.transforms import test_transform
from src.inference.gradcam import GradCAM, save_gradcam
from src.models.resnet18 import AlzheimerResNet18


class Predictor:

    def __init__(
        self,
        checkpoint_path=BEST_MODEL,
        device=None,
    ):

        self.device = device or torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        self.model = AlzheimerResNet18()

        self.model.load_state_dict(
            torch.load(
                checkpoint_path,
                map_location=self.device,
            )
        )

        self.model.to(self.device)
        self.model.eval()

        self.gradcam = GradCAM(
            self.model,
            self.model.model.layer4[-1],
        )

    def predict(
        self,
        image_path,
        save_heatmap=True,
    ):

        image_path = Path(image_path)

        if not image_path.exists():
            raise FileNotFoundError(
                f"Image not found: {image_path}"
            )

        try:
            image = Image.open(image_path).convert("RGB")
        except UnidentifiedImageError:
            raise ValueError("Uploaded file is not a valid image.")

        image_tensor = (
            test_transform(image)
            .unsqueeze(0)
            .to(self.device)
        )

        heatmap, pred, confidence, probs = self.gradcam.generate(
            image_tensor
        )

        heatmap_path = None

        if save_heatmap:
            heatmap_path = OUTPUT_DIR / f"{uuid4().hex}.jpg"

            save_gradcam(
                image_tensor.cpu(),
                heatmap,
                str(heatmap_path),
            )

        return {
            "prediction": CLASS_NAMES[pred],
            "confidence": round(confidence * 100, 2),
            "probabilities": {
                CLASS_NAMES[i]: round(float(probs[i]) * 100, 2)
                for i in range(len(CLASS_NAMES))
            },
            "heatmap": (
                f"/outputs/{heatmap_path.name}"
                if heatmap_path
                else None
            ),
        }