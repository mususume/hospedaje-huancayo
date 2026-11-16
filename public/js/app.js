function formatoSoles(monto) {
  return 'S/ ' + Number(monto).toFixed(2);
}

function tarjetaCuarto(c) {
  return `
    <article class="tarjeta">
      <a href="cuarto.html?id=${c.id}" class="tarjeta-img">
        <img src="${c.imagen}" alt="${c.nombre}" loading="lazy">
        <span class="tarjeta-tipo">${c.tipo}</span>
      </a>
      <div class="tarjeta-cuerpo">
        <h3><a href="cuarto.html?id=${c.id}">${c.nombre}</a></h3>
        <div class="tarjeta-datos">
          <span><strong>Camas:</strong> ${c.camas}</span>
          <span><strong>Personas:</strong> ${c.capacidad}</span>
        </div>
        <div class="tarjeta-pie">
          <div class="precio">${formatoSoles(c.precio_dia)} <small>/ día</small></div>
          <a href="cuarto.html?id=${c.id}" class="btn btn-borde">Ver más</a>
        </div>
      </div>
    </article>`;
}

function leerParametro(nombre) {
  return new URLSearchParams(window.location.search).get(nombre);
}

$(document).ready(function () {
  $('.btn-menu').click(function () {
    $('.menu').stop(true, true).slideToggle(200);
  });
  $(window).resize(function () {
    if ($(window).width() > 760) $('.menu').removeAttr('style');
  });

  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  $('.menu a').each(function () {
    const enlace = $(this).attr('href');
    if (enlace === pagina || (pagina === 'cuarto.html' && enlace === 'catalogo.html')) {
      $(this).addClass('activo');
    }
  });

  $('.anio').text(new Date().getFullYear());
});
