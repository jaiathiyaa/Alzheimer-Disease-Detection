import torch.nn as nn
from torchvision.models import resnet18 , ResNet18_Weights

class AlzheimerResNet18(nn.Module):
    def __init__(self,num_classes=4,freeze_backbone=True):
        super().__init__()

        self.model = resnet18(weights=ResNet18_Weights.DEFAULT)

        if freeze_backbone:
            for param in self.model.parameters():
                param.requires_grad = False

        in_features = self.model.fc.in_features

        self.model.fc = nn.Linear(in_features,num_classes)

    def forward(self,x):
        return self.model(x)
