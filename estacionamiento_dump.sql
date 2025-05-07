
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS estacionamiento;
USE estacionamiento;

-- Tabla de vehículos
CREATE TABLE IF NOT EXISTS vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20) NOT NULL UNIQUE,
    tipo ENUM('oficial', 'residente', 'no_residente') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de estancias
CREATE TABLE IF NOT EXISTS estancias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehiculoId INT NOT NULL,
    horaEntrada DATETIME NOT NULL,
    horaSalida DATETIME,
    tiempoTotalMin INT,
    totalPagar DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehiculoId) REFERENCES vehiculos(id)
);

-- Datos de ejemplo
INSERT INTO vehiculos (placa, tipo) VALUES
('S1234A', 'residente'),
('4567ABC', 'no_residente'),
('4FRU573', 'oficial');

INSERT INTO estancias (vehiculoId, horaEntrada, horaSalida, tiempoTotalMin, totalPagar) VALUES
(1, '2025-04-13 13:00:00', '2025-04-13 13:30:00', 30, 30.00),
(2, '2025-04-13 14:00:00', '2025-04-13 15:00:00', 60, 180.00),
(3, '2025-04-13 10:00:00', '2025-04-13 15:00:00', 300, 0.00);
