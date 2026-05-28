INSERT INTO users (name, email, password_hash)
VALUES
  ('Admin', 'admin@example.com', '$2y$10$abcdefghijklmnopqrstuv1234567890abcdefghijklmnopqrstuv'),
  ('Maria Silva', 'maria@example.com', '$2y$10$1234567890abcdefghijklmnopqrstuv1234567890abcdefghijkl');

INSERT INTO products (name, description, price, stock, active)
VALUES
  ('Notebook Pro 14', 'Notebook com 16GB RAM e SSD 512GB', 4999.90, 10, 1),
  ('Mouse Sem Fio', 'Mouse ergonômico Bluetooth', 129.90, 50, 1),
  ('Teclado Mecânico', 'Switch blue ABNT2', 299.00, 20, 1);
