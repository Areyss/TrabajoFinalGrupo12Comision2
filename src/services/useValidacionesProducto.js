export function validarProducto(form) {
  const errores = {
    title: !form.title ? "El nombre es obligatorio." : "",
    description: !form.description ? "La descripción es obligatoria." : "",
    price: !esPrecioValido(form.price) ? "El precio es obligatorio y debe ser mayor a 0." : "",
    category: !form.category[0] ? "La categoría es obligatoria." : "",
    image: !esUrlImagenValida(form.image) ? "La imagen debe ser una URL válida que termine en .jpg, .jpeg, .png, .webp o .gif" : "",
  };

  const hayErrores = Object.values(errores).some(msg => msg !== "");
  return { errores, hayErrores };
}

function esPrecioValido(numero) {
  return !isNaN(numero) && parseFloat(numero) >= 0;
}

function esUrlImagenValida(url) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url.trim());
}
