$(document).ready(function () {
  $.getJSON('/api/cuartos', { orden: 'desc' })
    .done(function (lista) {
      const destacados = [lista[lista.length - 1], lista[Math.floor(lista.length / 2)], lista[0]].filter(Boolean);
      $('#destacados').hide().html(destacados.map(tarjetaCuarto).join('')).fadeIn(400);
    })
    .fail(function () {
      $('#destacados').html('<p class="cargando">No se pudo conectar con el servidor.</p>');
    });

  $('#buscador-rapido').on('submit', function (e) {
    e.preventDefault();
    const camas = $('#rapido-camas').val();
    window.location.href = 'catalogo.html' + (camas ? '?camas=' + camas : '');
  });
});
