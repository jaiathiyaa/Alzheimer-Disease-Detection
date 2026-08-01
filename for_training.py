import torch
import torch.nn as nn
import torch.optim as optim

from src.data.split_dataset import get_data_split
from src.data.dataset import AlzheimerDataset
from src.data.transforms import (
    train_transform,
    val_transform,
    test_transform,
)
from src.data.dataloader import create_dataloaders
from src.models.resnet18 import AlzheimerResNet18
from src.training.train import train_model
from src.evaluation.test import evaluate_model


def main():

    (
        train_paths,
        train_labels,
        val_paths,
        val_labels,
        test_paths,
        test_labels,
    ) = get_data_split()

    train_dataset = AlzheimerDataset(
        train_paths,
        train_labels,
        transform=train_transform,
    )

    val_dataset = AlzheimerDataset(
        val_paths,
        val_labels,
        transform=val_transform,
    )

    test_dataset = AlzheimerDataset(
        test_paths,
        test_labels,
        transform=test_transform,
    )

    train_loader, val_loader, test_loader = create_dataloaders(
        train_dataset,
        val_dataset,
        test_dataset,
        batch_size=32,
    )

    device = torch.device(
        "cuda" if torch.cuda.is_available() else "cpu"
    )

    model = AlzheimerResNet18().to(device)

    optimizer = optim.Adam(
        filter(lambda p: p.requires_grad, model.parameters()),
        lr=1e-4,
        weight_decay=1e-4,
    )

    criterion = nn.CrossEntropyLoss()

    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
        optimizer,
        mode="max",
        factor=0.5,
        patience=2,
    )

    # ==========================================================
    # Train the model
    # ==========================================================

    # Uncomment only when you want to train

    # train_model(
    #     model=model,
    #     optimizer=optimizer,
    #     criterion=criterion,
    #     train_loader=train_loader,
    #     val_loader=val_loader,
    #     epochs=15,
    #     device=device,
    #     scheduler=scheduler,
    #     save_path="checkpoints/best_fine_tune_model.pth",
    # )

    # ==========================================================
    # Evaluate the trained model
    # ==========================================================

    evaluate_model(
        model=model,
        test_loader=test_loader,
        criterion=criterion,
        device=device,
        checkpoint_path="checkpoints/best_fine_tune_model.pth",
    )


if __name__ == "__main__":
    main()