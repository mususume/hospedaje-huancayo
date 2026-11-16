$(document).ready(function () {
  const $grilla = $('#grilla-cuartos');

  const camasUrl = leerParametro('camas');
  if (camasUrl) $(`input[name=camas][value="${camasUrl}"]`).prop('checked', true);

  function cargarCuartos() {
    const filtros = {
      camas: $('input[name=camas]:checked').val(),
      orden: $('#orden').val()
    };

    $('.sin-resultados').hide();
    $grilla.html('<p class="cargando">Cargando cuartos…</p>');

    $.getJSON('/api/cuartos', filtros)
      .done(function (cuartos) {
        $('#total-resultados').text(cuartos.length);
        if (cuartos.length === 0) {
          $grilla.empty();
          $('.sin-resultados').fadeIn(300);
          return;
        }
        $grilla.hide().html(cuartos.map(tarjetaCuarto).join('')).fadeIn(350);
      })
      .fail(function () {
        $('#total-resultados').text(0);
        $grilla.html('<p class="cargando">No se pudo conectar con el servidor. Revisa que MySQL esté encendido y que hayas ejecutado npm start.</p>');
      });
  }

  $('input[name=camas], #orden').on('change', cargarCuartos);

  cargarCuartos();
});
