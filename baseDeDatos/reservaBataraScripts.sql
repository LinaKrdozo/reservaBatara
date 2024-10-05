-- DROP DATABASE IF EXISTS `reservaBatara`;

-- -----------------------------------------------------
-- Schema reservaBatara
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reservaBatara` DEFAULT CHARACTER SET utf8 ;
USE `reservaBatara` ;

-- -----------------------------------------------------
-- Table `reservaBatara`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservaBatara`.`reserva` (
  `idReserva` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha_reserva` DATE NOT NULL,
  `fecha_evento` DATE NOT NULL,
  `tipo_evento` VARCHAR(45) NOT NULL,
  `disponibilidad` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idReserva`))
  ENGINE = InnoDB;

INSERT INTO `reservaBatara`.`reserva` (`fecha_reserva`, `fecha_evento`,`tipo_evento`, `disponibilidad`) VALUES
('2024-10-01', '2024-10-08','otro', 'confirmada'),
('2024-10-05', '2024-10-12','otro', 'pendiente'),
('2024-10-10', '2024-10-18','educativo', 'cancelada');

-- -----------------------------------------------------
-- Table `reservaBatara`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservaBatara`.`rol` (
  `idRol` INT(11) NOT NULL AUTO_INCREMENT,
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
  `idUsuarios` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_completo` VARCHAR(45) NOT NULL,
  `password` VARCHAR(500) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `telefono` INT(50) NOT NULL,
  `foto` VARCHAR(45) NOT NULL,
  `tipo_residente` VARCHAR(45) NOT NULL,
  `apartamento` VARCHAR(45) NOT NULL,
  `rol_idRol` INT(11) NOT NULL,
  PRIMARY KEY (`idUsuarios`),
  INDEX `fk_usuarios_rol_idx` (`rol_idRol` ASC),
  CONSTRAINT `fk_usuarios_rol`
    FOREIGN KEY (`rol_idRol`)
    REFERENCES `reservaBatara`.`rol` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `reservaBatara`.`usuarios` (`nombre_completo`, `password`,`correo`, `telefono`, `foto`, `tipo_residente`, `apartamento`, `rol_idRol`) VALUES
('Juan Pérez', 'Hola1234#','juan.perez@example.com', 123456, 'prueba.jpg', 'arrendatario', '101', 2),
('María López', 'Hola1234#','maria.lopez@example.com', 987654, 'prueba.jpg', 'propietario', '202', 2),
('Carlos Gómez', 'Hola1234#' ,'carlos.gomez@example.com', 112233, 'prueba.jpg', 'propietario', '303', 2);

-- -----------------------------------------------------
-- Table `reservaBatara`.`detalle_reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reservaBatara`.`detalle_reserva` (
  `idDetalle_reserva` INT(11) NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  `foto_pago` VARCHAR(45),
  `asistentes` INT(11) NOT NULL,
  `hora_entrega` VARCHAR(45) NOT NULL,
  `usuarios_idUsuarios` INT(11) NOT NULL,
  `reserva_idReserva` INT(11) NOT NULL,
  PRIMARY KEY (`idDetalle_reserva`, `usuarios_idUsuarios`, `reserva_idReserva`),
  INDEX `fk_detalle_reserva_usuarios1_idx` (`usuarios_idUsuarios` ASC),
  INDEX `fk_detalle_reserva_reserva1_idx` (`reserva_idReserva` ASC),
  CONSTRAINT `fk_detalle_reserva_reserva1`
    FOREIGN KEY (`reserva_idReserva`)
    REFERENCES `reservaBatara`.`reserva` (`idReserva`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_reserva_usuarios1`
    FOREIGN KEY (`usuarios_idUsuarios`)
    REFERENCES `reservaBatara`.`usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `reservaBatara`.`detalle_reserva` ( `descripcion`,`foto_pago`, `asistentes`,`hora_entrega`, `usuarios_idUsuarios`, `reserva_idReserva`) VALUES
('Reunión de planificación' ,'pago_juan.jpg',20, '7:00pm' ,1, 1),
('Fiesta de cumpleaños' ,'pago_maria.jpg', 10,'4:00pm',2, 2),
('Presentación de proyecto' ,'pago_carlos.jpg',8, '6:00pm' ,3, 3);