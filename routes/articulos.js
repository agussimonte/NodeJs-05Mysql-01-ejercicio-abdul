var express = require('express')
var router = express.Router()

var bd = require('./bd')

//Listar todos los clientes que tengan peso mayor a 90 y altura mayor a 1.78
router.get('/listado1', function (req, res, next) {
  bd.query('select * from clientes where pesoCliente >= 90 AND alturaCliente >= 1.78', function (error, filas) {
    if (error) {
      console.log('error en el listado')
      return
    }
    res.render('listarClientes', { clientes: filas })
  })
})

//Listar todos los clientes que no pertenecen a Mar del Plata y tengan un email igual a gmail
router.get('/listado2', function (req, res, next) {
  bd.query('select * from clientes where codPostal != 7600 AND emailCliente LIKE "%gmail%"', function (error, filas) {
    if (error) {
      console.log('error en el listado')
      return
    }
    res.render('listarClientes', { clientes: filas })
  })
})

//Mostrar el promedio de alturas de los clientes
router.get('/promedioAltura', function (req, res, next) {
  bd.query('select avg(alturaCliente) AS promedioAltura FROM clientes', function (error, filas) {
    if (error) {
      console.log('error en el listado')
      return
    }
    res.render('promedioAlturaClientes', { clientes: filas })
  })
})

//Mostrar el más alto peso de los clientes
router.get('/masPesado', function (req, res, next) {
  bd.query('select max(pesoCliente) AS masPesado FROM clientes', function (error, filas) {
    if (error) {
      console.log('error en el listado')
      return
    }
    res.render('clienteMasPesado', { clientes: filas })
  })
})

//Mostrar el cliente con menor edad
router.get('/masChicoEdad', function (req, res, next) {
  bd.query('select * FROM clientes WHERE fNacimientoCliente = (SELECT MAX(fNacimientoCliente) FROM clientes)', function (error, filas) {
    if (error) {
      console.log('error en el listado')
      return
    }
    res.render('listarClientes', { clientes: filas })
  })
})

//Cambiar la fecha de nacimiento de Mercado: 04/04/1972
router.get('/modificarFecha', function (req, res, next) {
  bd.query('UPDATE clientes SET fNacimientoCliente = "1972/04/04" WHERE apellidoCliente = "Mercado"', function (error, filas) {
    if (error) {
      console.log('error en la consulta')
      console.log(error)
      return
    }
    res.render('mensajeClientes', { mensaje: 'El Cliente fue modificado "Cambiar la fecha de nacimiento de Mercado: 04/04/1972"' })
  })
})

//Cambiar el teléfono Movil 2 de Forchino a 223445545
router.get('/modificarMovil', function (req, res, next) {
  bd.query('UPDATE clientes SET tel02 = "223445545" WHERE apellidoCliente = "Forchino"', function (error, filas) {
    if (error) {
      console.log('error en la consulta')
      console.log(error)
      return
    }
    res.render('mensajeClientes', { mensaje: 'El Cliente fue modificado "Cambiar el teléfono Movil 2 de Forchino a 223445545"' })
  })
})

//Cambiar la altura del cliente Fernandez Javier a 1.80
router.get('/modificarAltura', function (req, res, next) {
  bd.query('UPDATE clientes SET alturaCliente = "1.80" WHERE apellidoCliente = "Fernandez"', function (error, filas) {
    if (error) {
      console.log('error en la consulta')
      console.log(error)
      return
    }
    res.render('mensajeClientes', { mensaje: 'El Cliente fue modificado "Cambiar la altura del cliente Fernandez Javier a 1.80"' })
  })
})
module.exports = router