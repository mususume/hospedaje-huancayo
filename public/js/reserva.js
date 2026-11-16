$(document).ready(function () {
  const DIAS_POR_UNIDAD = { dias: 1, semanas: 7, meses: 30 };
  let cuartos = [];
  const $form = $('#form-reserva');

  const hoy = new Date();
  const hoyISO = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $('#fecha_ingreso').attr('min', hoyISO).val(hoyISO);

  $.getJSON('/api/cuartos')
    .done(function (lista) {
      cuartos = lista.sort((a, b) => a.id - b.id);
      const opciones = cuartos
        .map(c => `<option value="${c.id}">${c.nombre} — ${c.camas} cama(s) — ${formatoSoles(c.precio_dia)}/día</option>`)
        .join('');
      $('#cuarto_id').append(opciones);

      const elegido = leerParametro('cuarto');
      if (elegido) $('#cuarto_id').val(elegido);
      actualizarResumen();
    })
    .fail(function () {
      mostrarAlerta('error', 'No se pudo cargar la lista de cuartos. Revisa que MySQL esté encendido y que hayas ejecutado npm start.');
    });

  function actualizarResumen() {
    const cuarto = cuartos.find(c => c.id === Number($('#cuarto_id').val()));
    const cantidad = parseInt($('#cantidad').val()) || 0;
    const unidad = $('#unidad').val();
    const totalDias = cantidad * DIAS_POR_UNIDAD[unidad];
    const fecha = $('#fecha_ingreso').val();

    if (cuarto) {
      $('#res-img').attr('src', cuarto.imagen).show();
      $('#res-cuarto').text(cuarto.nombre);
      $('#res-precio').text(formatoSoles(cuarto.precio_dia));
    } else {
      $('#res-img').hide();
      $('#res-cuarto, #res-precio').text('—');
    }

    const equivalencia = unidad === 'dias' ? '' : ` (${totalDias} días)`;
    $('#res-tiempo').text(cantidad ? `${cantidad} ${textoUnidad(unidad, cantidad)}${equivalencia}` : '—');
    $('#res-ingreso').text(fecha ? formatoFecha(fecha) : '—');

    if (fecha && totalDias) {
      const salida = new Date(fecha + 'T00:00:00');
      salida.setDate(salida.getDate() + totalDias);
      $('#res-salida').text(salida.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }));
    } else {
      $('#res-salida').text('—');
    }

    $('#res-total').text(cuarto && totalDias ? formatoSoles(cuarto.precio_dia * totalDias) : 'S/ 0.00');
  }

  function textoUnidad(unidad, n) {
    const textos = { dias: ['día', 'días'], semanas: ['semana', 'semanas'], meses: ['mes', 'meses'] };
    return textos[unidad][n === 1 ? 0 : 1];
  }

  function formatoFecha(iso) {
    return new Date(iso + 'T00:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  $('#cuarto_id, #cantidad, #unidad, #fecha_ingreso').on('input change', actualizarResumen);
  actualizarResumen();

  $form.find('input[name], select[name]').not('[name=unidad]').on('blur', function () {
    validarCampo($(this));
  }).on('input change', function () {
    if ($(this).closest('.campo').hasClass('invalido')) validarCampo($(this));
  });

  $('#telefono').on('input', function () {
    $(this).val($(this).val().replace(/\D/g, '').slice(0, 9));
  });

  $form.on('submit', function (e) {
    e.preventDefault();
    $('.alerta').hide();

    let todoOk = true;
    $form.find('input[name], select[name]').not('[name=unidad]').each(function () {
      if (!validarCampo($(this))) todoOk = false;
    });
    if (!todoOk) {
      mostrarAlerta('error', 'Revisa los campos marcados en rojo.');
      $('html, body').animate({ scrollTop: $('.campo.invalido').first().offset().top - 120 }, 400);
      return;
    }

    const datos = {
      cuarto_id: $('#cuarto_id').val(),
      nombres: $.trim($('#nombres').val()),
      apellidos: $.trim($('#apellidos').val()),
      telefono: $('#telefono').val(),
      correo: $.trim($('#correo').val()),
      fecha_ingreso: $('#fecha_ingreso').val(),
      cantidad: $('#cantidad').val(),
      unidad: $('#unidad').val(),
      comentario: $.trim($('#comentario').val())
    };

    const cuarto = cuartos.find(c => c.id === Number(datos.cuarto_id));
    const totalDias = Number(datos.cantidad) * DIAS_POR_UNIDAD[datos.unidad];
    const $boton = $('#btn-enviar').prop('disabled', true).text('Enviando…');

    $.ajax({
      url: '/reservas',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(datos),
      dataType: 'json'
    })
      .done(function (respuesta) {
        mostrarAlerta('exito',
          `<strong>¡Solicitud enviada, ${datos.nombres}!</strong> Tu código de reserva es <strong>N° ${String(respuesta.id).padStart(5, '0')}</strong>.<br>
           ${cuarto.nombre} · ${totalDias} días · Monto estimado: <strong>${formatoSoles(cuarto.precio_dia * totalDias)}</strong>.<br>
           Te contactaremos al ${datos.telefono} o a ${datos.correo} para confirmar la disponibilidad.`);
        $form[0].reset();
        $('.campo').removeClass('valido invalido');
        $('#fecha_ingreso').val(hoyISO);
        actualizarResumen();
      })
      .fail(function () {
        mostrarAlerta('error', 'No se pudo enviar la solicitud. Revisa que el servidor y MySQL estén encendidos e intenta nuevamente.');
      })
      .always(function () {
        $boton.prop('disabled', false).text('Enviar solicitud de reserva');
      });
  });

  function mostrarAlerta(tipo, html) {
    const $alerta = $('#alerta-' + tipo).html(html).stop(true, true).fadeIn(300);
    $('html, body').animate({ scrollTop: $alerta.offset().top - 110 }, 400);
  }
});
