-- CreateTable
CREATE TABLE `Product` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `SKU` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `description` TEXT NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `stock` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Product_SKU_key`(`SKU`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provider` (
    `ID_Provider` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `direction` TEXT NOT NULL,

    UNIQUE INDEX `Provider_name_key`(`name`),
    PRIMARY KEY (`ID_Provider`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SKU_PartNumber_Relation` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `SKU_Relation` VARCHAR(191) NOT NULL,
    `sku_provider` VARCHAR(191) NOT NULL,
    `ID_Provider` INTEGER NOT NULL,
    `PartNumber` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SKU_PartNumber_Relation` ADD CONSTRAINT `SKU_PartNumber_Relation_SKU_Relation_fkey` FOREIGN KEY (`SKU_Relation`) REFERENCES `Product`(`SKU`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SKU_PartNumber_Relation` ADD CONSTRAINT `SKU_PartNumber_Relation_ID_Provider_fkey` FOREIGN KEY (`ID_Provider`) REFERENCES `Provider`(`ID_Provider`) ON DELETE RESTRICT ON UPDATE CASCADE;
