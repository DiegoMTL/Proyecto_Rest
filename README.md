# Proyecto Rest

Aplicacion REST conectada a la pagina de Servicio Sismologico. 

#### Desarrolladores
- Diego Tapia
- Jennifer Portiño 

## Entorno de desarrollo recomendado 

El desarrollo de este proyecto se realizo en Ubuntu 20.04 LTS. 

## Requerimientos
- Node.js 
`sudo apt install nodejs`
- PostgrestSQL 
`sudo apt install postgresql postgresql-contrib`
- CORS
`npm install cors`

## Estructura del proyecto 
- /database guarda el script de la base de datos
- /nodes_modules almacena los modulos que ne cesita el proyecto
- src/controllers respuestas del servidor
- src/routes es donde se contruyen las rutas

## Compilacion con Nodemon 

Compilacion continua: 
- npm run dev
Detener: 
- killall -9 node
- ps ax

## Ejecución 

    `node src/index.js`