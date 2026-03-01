-- CreateTable
CREATE TABLE `runs` (
    `run_id` VARCHAR(36) NOT NULL,
    `run_category_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `vod_url` VARCHAR(255) NOT NULL,
    `run_duration` BIGINT NOT NULL,
    `submitted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `verified_at` DATETIME(3) NULL,
    `status` VARCHAR(25) NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`run_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `comment_id` VARCHAR(36) NOT NULL,
    `run_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `comment` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_run_id_fkey` FOREIGN KEY (`run_id`) REFERENCES `runs`(`run_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
