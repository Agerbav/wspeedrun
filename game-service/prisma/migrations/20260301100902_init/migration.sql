-- CreateTable
CREATE TABLE `Game` (
    `game_id` VARCHAR(36) NOT NULL,
    `game_name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`game_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RunCategory` (
    `id` VARCHAR(36) NOT NULL,
    `game_id` VARCHAR(36) NOT NULL,
    `run_category_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RunCategory` ADD CONSTRAINT `RunCategory_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `Game`(`game_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
