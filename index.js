const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let conexion = mysql.createConnection({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'bdHospedajeHuancayo',
  port: process.env.MYSQLPORT || 3306
});

conexion.connect(function (error) {
  if (error) {
    console.log('Error al conectar con MySQL: ' + error.message);
  } else {
    console.log('Conectado a la base de datos');
  }
});

app.get('/api/cuartos', function (req, res) {
  let camas = req.query.camas;
  let orden = req.query.orden === 'desc' ? 'DESC' : 'ASC';
  let valores = [];

  let consulta = 'SELECT * FROM cuartos';
  if (camas) {
    consulta += camas >= 4 ? ' WHERE camas >= ?' : ' WHERE camas = ?';
    valores.push(camas);
  }
  consulta += ' ORDER BY precio_dia ' + orden;

  conexion.query(consulta, valores, function (error, resultados) {
    if (error) {
      res.status(500).json({ ok: false, mensaje: error.message });
    } else {
      res.json(resultados);
    }
  });
});

app.get('/api/cuartos/:id', function (req, res) {
  let consulta = 'SELECT * FROM cuartos WHERE id = ?';

  conexion.query(consulta, [req.params.id], function (error, resultados) {
    if (error) {
      res.status(500).json({ ok: false, mensaje: error.message });
    } else if (resultados.length === 0) {
      res.status(404).json({ ok: false, mensaje: 'Cuarto no encontrado' });
    } else {
      res.json(resultados[0]);
    }
  });
});

app.post('/reservas', function (req, res) {
  const datos = req.body;
  console.log(datos);
  let cuarto_id = datos.cuarto_id;
  let nombres = datos.nombres;
  let apellidos = datos.apellidos;
  let telefono = datos.telefono;
  let correo = datos.correo;
  let fecha_ingreso = datos.fecha_ingreso;
  let cantidad = datos.cantidad;
  let unidad = datos.unidad;
  let comentario = datos.comentario || '';

  let registrar = 'INSERT INTO reservas (cuarto_id, nombres, apellidos, telefono, correo, fecha_ingreso, cantidad, unidad, comentario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  let valores = [cuarto_id, nombres, apellidos, telefono, correo, fecha_ingreso, cantidad, unidad, comentario];

  conexion.query(registrar, valores, function (error, resultado) {
    if (error) {
      res.status(500).json({ ok: false, mensaje: error.message });
    } else {
      res.json({ ok: true, id: resultado.insertId });
    }
  });
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, function () {
  console.log('Servidor del hospedaje en el puerto ' + PUERTO);
});
