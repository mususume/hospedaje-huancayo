DROP DATABASE IF EXISTS bdHospedajeHuancayo;
CREATE DATABASE bdHospedajeHuancayo CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE bdHospedajeHuancayo;

CREATE TABLE cuartos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  tipo VARCHAR(30) NOT NULL,
  camas INT NOT NULL,
  capacidad INT NOT NULL,
  precio_dia DECIMAL(8,2) NOT NULL,
  descripcion TEXT NOT NULL,
  servicios VARCHAR(255) NOT NULL,
  imagen VARCHAR(150) NOT NULL
);

CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cuarto_id INT NOT NULL,
  nombres VARCHAR(60) NOT NULL,
  apellidos VARCHAR(60) NOT NULL,
  telefono VARCHAR(9) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  fecha_ingreso DATE NOT NULL,
  cantidad INT NOT NULL,
  unidad VARCHAR(10) NOT NULL,
  comentario VARCHAR(255),
  fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cuarto_id) REFERENCES cuartos(id)
);

INSERT INTO cuartos (id, nombre, tipo, camas, capacidad, precio_dia, descripcion, servicios, imagen) VALUES
(1, 'Simple Giráldez', 'Simple', 1, 1, 80.00, 'Habitación acogedora ideal para viajeros que llegan solos a Huancayo. Cuenta con una cama de plaza y media, escritorio de trabajo y ventana con vista al jardín interior.', 'Wifi, Agua caliente 24h, TV cable, Escritorio', 'img/cuartos/cuarto-1/individual1.jpg'),
(2, 'Simple Ejecutiva Arequipa', 'Simple', 1, 1, 110.00, 'Pensada para viajes de trabajo: cama queen, escritorio amplio, buena iluminación y silencio. Incluye desayuno andino servido en el comedor del hospedaje.', 'Wifi, Agua caliente 24h, TV cable, Escritorio, Desayuno incluido', 'img/cuartos/cuarto-2/ejecutivo.jpg'),
(3, 'Doble Ferrocarril', 'Doble', 2, 2, 140.00, 'Dos camas de plaza y media para amigos o compañeros de viaje. Ambiente cálido con frazadas de lana de alpaca, perfectas para las noches frías del valle.', 'Wifi, Agua caliente 24h, TV cable, Frazadas de alpaca', 'img/cuartos/cuarto-3/doble-simple.jpg'),
(4, 'Matrimonial Huancavelica', 'Matrimonial', 1, 2, 150.00, 'Cama de dos plazas, decoración con textiles del valle y baño privado con ducha amplia. Una opción tranquila para parejas que visitan la ciudad.', 'Wifi, Agua caliente 24h, TV cable, Baño privado, Frigobar', 'img/cuartos/cuarto-4/matrimonial.jpg'),
(5, 'Doble Superior San Carlos', 'Doble', 2, 3, 180.00, 'Habitación más espaciosa, con una cama de dos plazas y una de plaza y media. Tiene balcón con vista a la calle y zona de estar con sillones.', 'Wifi, Agua caliente 24h, Smart TV, Balcón, Frigobar, Desayuno incluido', 'img/cuartos/cuarto-5/doble-superior.jpg'),
(6, 'Triple Mariscal Castilla', 'Triple', 3, 3, 220.00, 'Tres camas individuales, ideal para familias pequeñas o grupos que recorren el valle del Mantaro. Incluye mesa para compartir y closet grande.', 'Wifi, Agua caliente 24h, TV cable, Closet amplio, Desayuno incluido', 'img/cuartos/cuarto-6/triple.jpg'),
(7, 'Cuádruple Independencia', 'Familiar', 4, 5, 270.00, 'La habitación más grande del hospedaje: una cama de dos plazas y tres individuales. Pensada para familias y grupos, con dos ambientes separados.', 'Wifi, Agua caliente 24h, Smart TV, Dos ambientes, Frigobar, Desayuno incluido', 'img/cuartos/cuarto-7/cuadruple.jpg'),
(8, 'Suite Calle Real', 'Suite', 2, 3, 320.00, 'Nuestra mejor habitación: cama king, sofá cama, jacuzzi y una pequeña sala. Perfecta para una estadía especial en la Incontrastable Huancayo.', 'Wifi, Agua caliente 24h, Smart TV, Jacuzzi, Sala, Frigobar, Desayuno incluido', 'img/cuartos/cuarto-8/suite.jpg');
