const REGEX = {
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{2,60}$/,
  telefono: /^9\d{8}$/,
  correo: /^[\w.+-]+@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i
};

const MENSAJES = {
  nombres: 'Ingresa tus nombres (solo letras, mínimo 2).',
  apellidos: 'Ingresa tus apellidos (solo letras, mínimo 2).',
  telefono: 'Ingresa un celular válido de 9 dígitos que empiece en 9.',
  correo: 'Ingresa un correo válido, por ejemplo: nombre@correo.com',
  cuarto_id: 'Selecciona el cuarto que deseas reservar.',
  fecha_ingreso: 'Elige una fecha de ingreso desde hoy en adelante.',
  cantidad: 'Indica un tiempo entre 1 y 365.'
};

function esValido(nombreCampo, valor) {
  valor = $.trim(valor);
  switch (nombreCampo) {
    case 'nombres':
    case 'apellidos': return REGEX.nombre.test(valor);
    case 'telefono': return REGEX.telefono.test(valor);
    case 'correo': return REGEX.correo.test(valor);
    case 'cuarto_id': return valor !== '';
    case 'fecha_ingreso': {
      if (!valor) return false;
      const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
      return new Date(valor + 'T00:00:00') >= hoy;
    }
    case 'cantidad': {
      const n = Number(valor);
      return Number.isInteger(n) && n >= 1 && n <= 365;
    }
    default: return true;
  }
}

function validarCampo($input) {
  const nombre = $input.attr('name');
  const ok = esValido(nombre, $input.val());
  const $campo = $input.closest('.campo');
  $campo.toggleClass('invalido', !ok).toggleClass('valido', ok);
  const $msg = $campo.find('.mensaje-error');
  if (ok) $msg.slideUp(150);
  else $msg.text(MENSAJES[nombre] || 'Campo inválido').slideDown(150);
  return ok;
}
