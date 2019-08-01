DROP TABLE IF EXISTS producto CASCADE;
CREATE TABLE producto(
    codigo_producto INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(30) NOT NULL,
    imagen_url VARCHAR(100) NOT NULL,
    empresa_fabricante VARCHAR(30) NOT NULL,
    descripcion TEXT NOT NULL,
    precio_unitario FLOAT NOT NULL,
    descuento FLOAT NOT NULL,
    iva FLOAT NOT NULL,
    unidades_disponibles INTEGER NOT NULL,
    detalles TEXT NOT NULL
);

INSERT INTO producto(nombre, imagen_url, empresa_fabricante, descripcion, precio_unitario, descuento, iva, unidades_disponibles, detalles)
    VALUES('Redmi Note 7','url_imagen','Xiaomi','Telefono Android 9',500000.45,0,19,10,'lorem ipsum');

DROP TABLE IF EXISTS categoria CASCADE;
CREATE TABLE categoria(
    id_categoria INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(30) NOT NULL
);

INSERT INTO categoria(nombre) VALUES('SmartPhones');

DROP TABLE IF EXISTS subcategoria CASCADE;
CREATE TABLE subcategoria(
    id_subcategoria INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR(30) NOT NULL,
    id_categoria INTEGER NOT NULL,
    FOREIGN KEY(id_categoria) REFERENCES categoria(id_categoria)
);

INSERT INTO subcategoria(nombre,id_categoria) VALUES('Xiaomi',1);