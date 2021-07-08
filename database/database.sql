/*select * from users;*/
/*muestra datos de la tabla users*/
/*{} < \ */
CREATE DATABE firstapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

CREATE TABLE terremoto(
    id SERIAL PRIMARY KEY,
    fecha text,
    latitud FLOAT,
    longitud FLOAT,
    profundidad INT,
    magnitud FLOAT,
    referencia TEXT
);
/*referencia geografica*/

INSERT INTO terremoto (fecha,latitud,longitud,profundidad,magnitud,referencia) VALUES
    ('21/05/2021','5','4','3','2','1'), /*('fecha','latitud','longitud','profundidad','magnitud','referencia')*/
    ('22/05/2021','5','4','3','2','1');


INSERT INTO users (name, email) VALUES
    ('joe','joe@ibm.com'),
    ('ryan','ryan@ibm.com');
/**
CREATE TABLE objeto(
    id SERIAL PRIMARY KEY,
    fecha text,
    latitud FLOAT,
    longitud FLOAT,
    profundidad INT,
    magnitud FLOAT,
    referencia TEXT,/*referencia geografica
    name VARCHAR(40),
    email TEXT
);
**/