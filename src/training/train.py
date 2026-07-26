import torch
from torch.ao.pruning import scheduler
from tqdm import tqdm

def train_model(
        model,
        train_loader,
        val_loader,
        criterion,
        optimizer,
        device,
        epochs,
        scheduler=None,
        save_path="best_mode.pth"
):
    model.to(device)

    best_val_acc = 0.0

    for epoch in range(epochs):
        # ===============
        # Training
        # ===============
        model.train()

        train_loss = 0.0
        train_correct = 0
        train_total = 0

        progress_bar = tqdm(
            train_loader,
            desc=f"Epoch [{epoch + 1}/{epochs}]"
        )

        for images , labels in progress_bar:
            images = images.to(device)
            labels = labels.to(device)

            # Clear Previous gradients
            optimizer.zero_grad()

            # Forward Pass
            outputs = model(images)

            # Compute Loss
            loss = criterion(outputs , labels)

            # BackPropagation
            loss.backward()

            # Update Weights
            optimizer.step()

            # Statistics
            train_loss += loss.item()



            train_total += labels.size(0)
            predicted = outputs.argmax(dim=1)
            train_correct += (predicted == labels).sum().item()

            progress_bar.set_postfix(
                loss=loss.item(),
                acc= 100 * train_correct / train_total
            )

        train_loss = train_loss / len(train_loader)
        train_acc = 100 * train_correct / train_total

        # ================
        # Validation
        # ================

        model.eval()

        val_loss = 0.0
        val_total = 0
        val_correct = 0

        with torch.no_grad():
            for images , labels in val_loader:
                images = images.to(device)
                labels = labels.to(device)

                outputs = model(images)

                loss = criterion(outputs , labels)

                val_loss += loss.item()

                predicted = outputs.argmax(dim=1)

                val_total += labels.size(0)
                val_correct += (predicted == labels).sum().item()

        val_loss = val_loss / len(val_loader)
        val_acc = 100 * val_correct / val_total

        if scheduler is not None:
            scheduler.step(val_acc)

        print("\n----------------------------------------")
        print(f"Epoch {epoch + 1}/{epochs}")
        print(f"Train Loss : {train_loss:.4f}")
        print(f"Train Acc  : {train_acc:.2f}%")
        print(f"Val Loss   : {val_loss:.4f}")
        print(f"Val Acc    : {val_acc:.2f}%")
        print("----------------------------------------")

        if val_acc > best_val_acc:
            best_val_acc = val_acc

            torch.save(model.state_dict(), save_path)

            print("Best Model Saved in " + save_path)

    print("Training Completed")