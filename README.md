# Hospedaje Valle del Mantaro - Huancayo

Página web de un hospedaje en Huancayo hecha con HTML, CSS, JavaScript, jQuery, Node.js (Express) y MySQL.

## Ejecutar en mi PC (XAMPP)

1. Encender MySQL en XAMPP.
2. En phpMyAdmin, ejecutar el archivo `db/script.sql`.
3. En la carpeta del proyecto:

```
npm install
npm start
```

4. Abrir `http://localhost:3000`.

## Subir el proyecto a GitHub

Se hace una sola vez, desde la carpeta del proyecto (la que tiene `index.js`):

```
git init
git add .
git commit -m "Primera versión del hospedaje"
git branch -M main
git remote add origin https://github.com/USUARIO/hospedaje-huancayo.git
git push -u origin main
```

El archivo `.gitignore` evita que se suba la carpeta `node_modules`.

Para subir cambios después:

```
git add .
git commit -m "Describe el cambio"
git push
```

## Publicar en Railway

1. Entrar a https://railway.com con la cuenta de GitHub.
2. New Project -> Deploy from GitHub repo -> elegir `hospedaje-huancayo`.
3. En el mismo proyecto: + New -> Database -> MySQL.
4. En el servicio de la página -> Variables, agregar:

| Variable | Valor |
|---|---|
| MYSQLHOST | `${{MySQL.MYSQLHOST}}` |
| MYSQLPORT | `${{MySQL.MYSQLPORT}}` |
| MYSQLUSER | `${{MySQL.MYSQLUSER}}` |
| MYSQLPASSWORD | `${{MySQL.MYSQLPASSWORD}}` |
| MYSQLDATABASE | `bdHospedajeHuancayo` |

5. En el servicio MySQL -> Connect, copiar los datos de conexión pública (host, puerto, usuario y contraseña), conectarse con MySQL Workbench o HeidiSQL y ejecutar `db/script.sql`.
6. En el servicio de la página -> Settings -> Networking -> Generate Domain.
7. Abrir la dirección generada y probar el catálogo, un cuarto y una reserva.

Cada `git push` vuelve a publicar la página automáticamente.
