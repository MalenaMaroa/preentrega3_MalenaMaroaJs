let productos = [];
let resultadosVisibles = false; 

class Producto {
  constructor(nombre, artista, precio, cantidad) {
    this.nombre = nombre;
    this.artista = artista;
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
    console.log(`Producto creado: ${JSON.stringify(this)}`);
  }

  total() {
    return this.precio * this.cantidad;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Documento cargado y listo.');
  cargarProductos();

  document.getElementById('agregar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const artista = document.getElementById('artista').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;

    console.log(`Datos capturados: Nombre: ${nombre}, Artista: ${artista}, Precio: ${precio}, Cantidad: ${cantidad}`);

    if (nombre && artista && precio && cantidad) {
      const producto = new Producto(nombre, artista, precio, cantidad);
      productos.push(producto);
      guardarProductos();
      mostrarProductos();
      limpiarFormulario();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  });

  document.getElementById('filtrar-nombre').addEventListener('click', () => {
    const filtroNombre = document.getElementById('filtro-nombre').value.toLowerCase();
    console.log(`Filtro por nombre aplicado: ${filtroNombre}`);
    mostrarProductos(filtrarPorNombre(filtroNombre));
  });

  document.getElementById('filtrar-artista').addEventListener('click', () => {
    const filtroArtista = document.getElementById('filtro-artista').value.toLowerCase();
    console.log(`Filtro por artista aplicado: ${filtroArtista}`);
    mostrarProductos(filtrarPorArtista(filtroArtista));
  });

  document.getElementById('mostrar-todos').addEventListener('click', () => {
    if (resultadosVisibles) {
      ocultarProductos();
    } else {
      mostrarProductos();
    }
  });
});

function cargarProductos() {
  const totalProductos = parseInt(localStorage.getItem('totalProductos')) || 0;
  productos = [];
  for (let i = 0; i < totalProductos; i++) {
    const nombre = localStorage.getItem(`producto_${i}_nombre`);
    const artista = localStorage.getItem(`producto_${i}_artista`);
    const precio = localStorage.getItem(`producto_${i}_precio`);
    const cantidad = localStorage.getItem(`producto_${i}_cantidad`);
    if (nombre && artista && precio && cantidad) {
      productos.push(new Producto(nombre, artista, precio, cantidad));
    }
  }
  console.log('Productos cargados desde localStorage:', productos);
}

function guardarProductos() {
  localStorage.setItem('totalProductos', productos.length);
  productos.forEach((producto, index) => {
    localStorage.setItem(`producto_${index}_nombre`, producto.nombre);
    localStorage.setItem(`producto_${index}_artista`, producto.artista);
    localStorage.setItem(`producto_${index}_precio`, producto.precio);
    localStorage.setItem(`producto_${index}_cantidad`, producto.cantidad);
  });
  console.log('Productos guardados en localStorage:', productos);
}

function mostrarProductos(filtrados = null) {
  const lista = document.getElementById('lista-albumes');
  lista.innerHTML = '';
  const productosAMostrar = filtrados || productos;
  let totalCompra = 0;

  productosAMostrar.forEach((producto, index) => {
    const item = document.createElement('li');
    item.classList.add('product-item');
    item.textContent = `${index + 1}. Álbum: ${producto.nombre}, Artista: ${producto.artista}, Precio: ${producto.precio}, Cantidad: ${producto.cantidad}, Total: ${producto.total()} ARS`;
    lista.appendChild(item);
    totalCompra += producto.total();
  });

  document.getElementById('total-compra').textContent = `Total de la compra: ${totalCompra} ARS`;

  resultadosVisibles = true; 
  console.log('Productos mostrados:', productosAMostrar);
  console.log('Total de la compra:', totalCompra);
}

function ocultarProductos() {
  document.getElementById('lista-albumes').innerHTML = '';
  document.getElementById('total-compra').textContent = '';
  resultadosVisibles = false;
  console.log('Productos ocultados.');
}

function filtrarPorNombre(nombre) {
  const resultados = productos.filter(producto => producto.nombre.toLowerCase().includes(nombre));
  console.log(`Resultados del filtro por nombre (${nombre}):`, resultados);
  return resultados;
}

function filtrarPorArtista(artista) {
  const resultados = productos.filter(producto => producto.artista.toLowerCase().includes(artista));
  console.log(`Resultados del filtro por artista (${artista}):`, resultados);
  return resultados;
}

function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('artista').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('cantidad').value = '';
  console.log('Formulario vacío.');
}
