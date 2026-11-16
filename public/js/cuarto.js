$(document).ready(function () {
  const id = leerParametro('id');

  if (!id) {
    mostrarError('No se indicó qué cuarto mostrar.');
    return;
  }

  $.getJSON('/api/cuartos/' + id)
    .done(function (cuarto) {
      pintarCuarto(cuarto);
    })
    .fail(function (xhr) {
      if (xhr.status === 404) mostrarError('El cuarto que buscas no existe.');
      else mostrarError('No se pudo conectar con el servidor.');
    });

  function pintarCuarto(c) {
    document.title = c.nombre + ' | Hospedaje Valle del Mantaro';
    $('#cab-nombre, #det-nombre').text(c.nombre);
    $('#cab-tipo, #det-tipo').text('Habitación ' + c.tipo);
    $('#migas-nombre').text(c.nombre);
    $('#det-descripcion').text(c.descripcion);
    $('#det-camas').text(c.camas);
    $('#det-capacidad').text(c.capacidad);
    $('#det-precio').html(`${formatoSoles(c.precio_dia)} <small>/ día</small>`);
    $('#btn-reservar').attr('href', 'reserva.html?cuarto=' + c.id);

    const servicios = c.servicios.split(',').map(s => `<li>${$.trim(s)}</li>`).join('');
    $('#det-servicios').html(servicios);

    $('#img-principal').attr({ src: c.imagen || 'img/sin-imagen.svg', alt: c.nombre });

    $('#contenido-cuarto').fadeIn(400);
    $('#cargando').hide();
  }

  function mostrarError(mensaje) {
    $('#cargando').html(`${mensaje} <br><br><a href="catalogo.html" class="btn">Volver al catálogo</a>`);
    $('#cab-nombre').text('Cuarto no disponible');
  }
});
