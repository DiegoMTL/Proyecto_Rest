/*select * from terremoto;*/
/*muestra datos de la tabla users*/


CREATE DATABASE terremotos;
//DOUBLE PRECISION
CREATE TABLE terremoto(
    id SERIAL PRIMARY KEY,
    fecha text,
    latitud DOUBLE PRECISION,
    longitud DOUBLE PRECISION,
    profundidad INT,
    magnitud DOUBLE PRECISION,
    referencia TEXT
);
/*referencia geografica*/

INSERT INTO terremoto (fecha,latitud,longitud,profundidad,magnitud,referencia) VALUES
    ('21/05/2021','5','4','3','2,233233233','1'), 
    ('22/05/2021','5','4','3','2,233423423311','1');


/*('fecha','latitud','longitud','profundidad','magnitud','referenciaGeografica')*/

