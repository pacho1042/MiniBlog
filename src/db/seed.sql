-- =====================================================
-- INSERTs de ejemplo: 5 registros para authors y 5 para posts
-- =====================================================

-- -----------------------------------------------------
-- Authors
-- -----------------------------------------------------
INSERT INTO authors (name, email, bio)
VALUES
('Gabriela Redondo', 'gabriela.redondo@example.com', 'Escritora especializada en literatura contemporánea.'),
('Ricardo Jorge', 'ricardo.jorge@example.com', 'Autor de libros de desarrollo personal y hábitos.'),
('Luis Jaramillo', 'luis.jaramillo@example.com', 'Novelista, ganador de varios premios literarios.'),
('Horacio Delgado', 'horacio.delgado@example.com', 'Escritor de ficción histórica.'),
('Francisco Ortega', 'francisco.ortega@example.com', 'Poeta y ensayista.');

-- -----------------------------------------------------
-- Posts
-- Nota: author_id debe coincidir con los id generados arriba (1 al 5, en orden)
-- -----------------------------------------------------
INSERT INTO posts (title, author_id, published)
VALUES
('Cómo escribir tu primera novela', 1, TRUE),
('Los hábitos que cambiaron mi vida', 2, TRUE),
('Reflexiones sobre la soledad', 3, FALSE),
('La historia detrás de mi última obra', 4, TRUE),
('Poesía en tiempos modernos', 5, FALSE);