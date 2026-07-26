import torch
from sklearn.metrics import (accuracy_score , classification_report , confusion_matrix)

def evaluate_model(
        model,
        test_loader,
        criterion,
        device,
        checkpoint_path = "checkpoints/best_model.pth",
):
    model.load_state_dict(
        torch.load(
            checkpoint_path,
            map_location=device,
        )
    )

    model.to(device)
    model.eval()

    test_loss = 0

    all_predictions = []
    all_labels = []

    with torch.no_grad():
        for images , labels in test_loader:
            images, labels = images.to(device), labels.to(device)

            outputs = model(images)

            loss = criterion(outputs , labels)
            test_loss += loss.item()

            predictions = outputs.argmax(dim=1)


            all_predictions.extend(
                predictions.cpu().numpy()
            )
            all_labels.extend(
                labels.cpu().numpy()
            )

    test_loss /= len(test_loader)

    accuracy = accuracy_score(
        all_labels,
        all_predictions,
    )

    print("\n========== TEST RESULTS ==========")
    print(f"Test Loss : {test_loss:.4f}")
    print(f"Test Accuracy : {accuracy * 100:.2f}%")

    print("\nClassification Report\n")

    class_names = [
        "MildDemented",
        "ModerateDemented",
        "NonDemented",
        "VeryMildDemented",
    ]

    print(
        classification_report(
            all_labels,
            all_predictions,
            target_names=class_names,
        )
    )

    print("\nConfusion Matrix\n")

    print(
        confusion_matrix(
            all_labels,
            all_predictions,
        )
    )