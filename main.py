
from src.data.split_dataset import get_data_split
from src.data.dataset import AlzheimerDataset
from src.data.transforms import train_transform , val_transform , test_transform
from src.data.dataloader import create_dataloaders
from src.models.resnet18 import AlzheimerResNet18
import torch.nn as nn
import torch.optim as optim
import torch
from src.training.train import train_model


def main():
    (train_paths, train_labels , val_paths,val_labels , test_paths, test_labels) = get_data_split()

    train_dataset = AlzheimerDataset(
        train_paths,
        train_labels,
        transform=train_transform
    )

    val_dataset = AlzheimerDataset(
        val_paths,
        val_labels,
        transform=val_transform
    )

    test_dataset = AlzheimerDataset(
        test_paths,
        test_labels,
        transform=test_transform
    )

    train_loader, val_loader, test_loader = create_dataloaders(
        train_dataset,
        val_dataset,
        test_dataset,
        batch_size=32,
    )

    model = AlzheimerResNet18()

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    optimizer = optim.Adam(
        model.parameters(),
        lr=1e-3
    )
    criterion = nn.CrossEntropyLoss()

    train_model(
        model=model,
        train_loader=train_loader,
        val_loader=val_loader,
        criterion=criterion,
        optimizer=optimizer,
        device=device,
        epochs=10,
        save_path="checkpoints/best_model.pth",
    )


if __name__ == "__main__":
    main()