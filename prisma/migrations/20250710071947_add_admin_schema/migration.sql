-- CreateSchema
CREATE SCHEMA IF NOT EXISTS admin;

-- CreateTable
CREATE TABLE admin.admins (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON admin.admins("username");


-- Insert dummy admin users (passwords are SHA256 hashed)
INSERT INTO admin.admins (username, password, is_active) VALUES
  ('admin1', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', TRUE),
  ('admin2', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', TRUE),
  ('admin3', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', FALSE);