import hashlib
from collections import Counter, defaultdict

from src.data.split_dataset import get_data_split
from src.data.dataset import AlzheimerDataset
from src.data.transforms import (
    train_transform,
    val_transform,
    test_transform,
)
from src.data.dataloader import create_dataloaders


def file_hash(path):
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()


def print_header(title):
    print("\n" + "=" * 80)
    print(title)
    print("=" * 80)


def main():

    (
        train_paths,
        train_labels,
        val_paths,
        val_labels,
        test_paths,
        test_labels,
    ) = get_data_split()

    # ==========================================================
    # 1. Split Overlap
    # ==========================================================

    print_header("1. Checking Split Overlap")

    train_set = set(train_paths)
    val_set = set(val_paths)
    test_set = set(test_paths)

    print("Train ∩ Val :", len(train_set & val_set))
    print("Train ∩ Test:", len(train_set & test_set))
    print("Val ∩ Test  :", len(val_set & test_set))

    # ==========================================================
    # 2. Dataset Sizes
    # ==========================================================

    print_header("2. Dataset Sizes")

    print("Train :", len(train_paths))
    print("Validation :", len(val_paths))
    print("Test :", len(test_paths))

    # ==========================================================
    # 3. Duplicate File Paths
    # ==========================================================

    print_header("3. Duplicate File Path Check")

    all_paths = train_paths + val_paths + test_paths

    print("Total paths :", len(all_paths))
    print("Unique paths:", len(set(all_paths)))

    if len(all_paths) == len(set(all_paths)):
        print("✅ No duplicate file paths.")
    else:
        print("❌ Duplicate file paths found.")

    # ==========================================================
    # 4. Duplicate Image Contents
    # ==========================================================

    print_header("4. Duplicate Image Content Check")

    train_hashes = defaultdict(list)
    val_hashes = defaultdict(list)
    test_hashes = defaultdict(list)

    for p in train_paths:
        train_hashes[file_hash(p)].append(p)

    for p in val_paths:
        val_hashes[file_hash(p)].append(p)

    for p in test_paths:
        test_hashes[file_hash(p)].append(p)

    train_val_duplicates = train_hashes.keys() & val_hashes.keys()
    train_test_duplicates = train_hashes.keys() & test_hashes.keys()
    val_test_duplicates = val_hashes.keys() & test_hashes.keys()

    print("Train ∩ Val Hashes :", len(train_val_duplicates))
    print("Train ∩ Test Hashes:", len(train_test_duplicates))
    print("Val ∩ Test Hashes  :", len(val_test_duplicates))

    if (
        len(train_val_duplicates) == 0
        and len(train_test_duplicates) == 0
        and len(val_test_duplicates) == 0
    ):
        print("\n✅ No duplicate image contents.")
    else:
        print("\n❌ Duplicate image contents detected.")

    # ==========================================================
    # 5. Show Duplicate Images
    # ==========================================================

    print_header("5. Duplicate Images (Train ↔ Test)")

    duplicates = list(train_test_duplicates)

    print("Total duplicate hashes:", len(duplicates))

    if len(duplicates) == 0:
        print("No duplicate images.")
    else:
        for idx, h in enumerate(duplicates[:20]):

            print("\n" + "-" * 70)
            print(f"Duplicate #{idx + 1}")

            print("\nTRAIN")
            for p in train_hashes[h]:
                print(p)

            print("\nTEST")
            for p in test_hashes[h]:
                print(p)

    # ==========================================================
    # 6. Class Distribution
    # ==========================================================

    print_header("6. Class Distribution")

    print("Train")
    print(Counter(train_labels))

    print()

    print("Validation")
    print(Counter(val_labels))

    print()

    print("Test")
    print(Counter(test_labels))

    # ==========================================================
    # 7. Dataset Creation
    # ==========================================================

    print_header("7. Dataset Objects")

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

    print("Train Dataset :", len(train_dataset))
    print("Validation Dataset :", len(val_dataset))
    print("Test Dataset :", len(test_dataset))

    # ==========================================================
    # 8. DataLoader
    # ==========================================================

    print_header("8. DataLoaders")

    train_loader, val_loader, test_loader = create_dataloaders(
        train_dataset,
        val_dataset,
        test_dataset,
        batch_size=32,
    )

    print("Train batches :", len(train_loader))
    print("Validation batches :", len(val_loader))
    print("Test batches :", len(test_loader))

    # ==========================================================
    # 9. Sample Paths
    # ==========================================================

    print_header("9. Sample Image Paths")

    print("\nTrain")
    for p in train_paths[:5]:
        print(p)

    print("\nValidation")
    for p in val_paths[:5]:
        print(p)

    print("\nTest")
    for p in test_paths[:5]:
        print(p)

    # ==========================================================
    # 10. Reproducibility
    # ==========================================================

    print_header("10. Split Reproducibility")

    print("Run this script twice.")
    print("If these paths remain identical, random_state is fixed.\n")

    print("Train First Five")
    for p in train_paths[:5]:
        print(p)

    print("\nValidation First Five")
    for p in val_paths[:5]:
        print(p)

    print("\nTest First Five")
    for p in test_paths[:5]:
        print(p)

    # ==========================================================
    # 11. Summary
    # ==========================================================

    print_header("11. Summary")

    print("Split Overlap")
    print(f"Train ∩ Val : {len(train_set & val_set)}")
    print(f"Train ∩ Test: {len(train_set & test_set)}")
    print(f"Val ∩ Test  : {len(val_set & test_set)}")

    print()

    print("Duplicate Hashes")
    print(f"Train ∩ Val : {len(train_val_duplicates)}")
    print(f"Train ∩ Test: {len(train_test_duplicates)}")
    print(f"Val ∩ Test  : {len(val_test_duplicates)}")

    if (
        len(train_val_duplicates) == 0
        and len(train_test_duplicates) == 0
        and len(val_test_duplicates) == 0
    ):
        print("\n✅ Dataset integrity looks good.")
    else:
        print("\n⚠ Duplicate image contents exist across dataset splits.")


if __name__ == "__main__":
    main()