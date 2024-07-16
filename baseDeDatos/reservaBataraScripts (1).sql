 -- DROP DATABASE IF EXISTS `reservaBatara`;
-- -----------------------------------------------------
-- Schema reservaBatara
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reservaBatara` DEFAULT CHARACTER SET utf8 ;
USE `reservaBatara` ;

-- -----------------------------------------------------
-- Table `reservaBatara`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservaBatara`.`rol` (
  `idRol` INT NOT NULL AUTO_INCREMENT,
  `nombreRol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB;

INSERT INTO `reservaBatara`.`rol` (`nombreRol`) VALUES
('Administrador'),
('Residente'),
('Particular');

-- -----------------------------------------------------
-- Table `reservaBatara`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservaBatara`.`usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `telefono` INT(30) NOT NULL,
  `foto` VARCHAR(45) NOT NULL,
  `residente` INT NOT NULL,
  `apartamento` VARCHAR(45) NOT NULL,
  `rol_idRol` INT NOT NULL,
  PRIMARY KEY (`idUsuarios`, `rol_idRol`),
  INDEX `fk_usuarios_rol_idx` (`rol_idRol` ASC),
  CONSTRAINT `fk_usuarios_rol`
    FOREIGN KEY (`rol_idRol`)
    REFERENCES `reservaBatara`.`rol` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `reservaBatara`.`usuarios` (`nombre`, `correo`, `telefono`, `foto`,`residente`, `apartamento`, `rol_idRol`) VALUES
('Juan Pérez', 'juan.perez@example.com', 123456789, 'foto1.jpg', 1,'Apt 101', 1),
('María López', 'maria.lopez@example.com', 987654321, 'foto2.jpg', 1, 'Apt 102', 2),
('Carlos García', 'carlos.garcia@example.com', 456789123, 'foto3.jpg', 0,'no es residente', 3);

-- -----------------------------------------------------
-- Table `reservaBatara`.`salon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservaBatara`.`salon` (
  `idSalon` INT NOT NULL AUTO_INCREMENT,
  `capacidad` INT NOT NULL,
  `precio_hora` INT NOT NULL,
  `disponibilidad` INT NOT NULL,
  PRIMARY KEY (`idSalon`))
ENGINE = InnoDB;

INSERT INTO `reservaBatara`.`salon` (`capacidad`, `precio_hora`, `disponibilidad`) VALUES
(50, 100, 1),
(30, 80, 0),
(20, 60, 1);

-- -----------------------------------------------------
-- Table `reservaBatara`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservaBatara`.`reserva` (
  `idReserva` INT NOT NULL AUTO_INCREMENT,
  `fecha_reserva` DATE NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `total` INT NOT NULL,
  `salon_idSalon` INT NOT NULL,
  PRIMARY KEY (`idReserva`, `salon_idSalon`),
  INDEX `fk_reserva_salon1_idx` (`salon_idSalon` ASC),
  CONSTRAINT `fk_reserva_salon1`
    FOREIGN KEY (`salon_idSalon`)
    REFERENCES `reservaBatara`.`salon` (`idSalon`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `reservaBatara`.`reserva` (`idReserva`, `fecha_reserva`, `descripcion`, `total`, `salon_idSalon`) VALUES
(1, '2024-07-20', 'Fiesta de cumpleaños', 300, 1),
(2, '2024-07-21', 'Reunión de trabajo', 200, 2),
(3, '2024-07-22', 'Taller de cocina', 150, 3);

-- -----------------------------------------------------
-- Table `reservaBatara`.`detalle_reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservaBatara`.`detalle_reserva` (
  `idDetalle_reserva` INT NOT NULL AUTO_INCREMENT,
  `cantidad_horas` INT NOT NULL,
  `subtotal` INT NOT NULL,
  `foto_pago` VARCHAR(45) NOT NULL,
  `tarifa_aseo` INT NOT NULL,
  `deposito` INT NOT NULL,
  `usuarios_idUsuarios` INT NOT NULL,
  `reserva_idReserva` INT NOT NULL,
  PRIMARY KEY (`idDetalle_reserva`, `usuarios_idUsuarios`, `reserva_idReserva`),
  INDEX `fk_detalle_reserva_usuarios1_idx` (`usuarios_idUsuarios` ASC),
  INDEX `fk_detalle_reserva_reserva1_idx` (`reserva_idReserva` ASC),
  CONSTRAINT `fk_detalle_reserva_usuarios1`
    FOREIGN KEY (`usuarios_idUsuarios`)
    REFERENCES `reservaBatara`.`usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_reserva_reserva1`
    FOREIGN KEY (`reserva_idReserva`)
    REFERENCES `reservaBatara`.`reserva` (`idReserva`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `reservaBatara`.`detalle_reserva` (`cantidad_horas`, `subtotal`, `foto_pago`, `tarifa_aseo`, `deposito`, `usuarios_idUsuarios`, `reserva_idReserva`) VALUES
(3, 300, 'pago1.jpg', 50, 30, 1, 1),
(2, 160, 'pago2.jpg', 40, 20, 2, 2),
(1, 150, 'pago3.jpg', 30, 15, 3, 3);