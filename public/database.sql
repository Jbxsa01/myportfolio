-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS portfolio;

-- Use the database
USE portfolio;

-- Create messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin user (optional)
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON portfolio.* TO 'admin'@'localhost';
FLUSH PRIVILEGES; 