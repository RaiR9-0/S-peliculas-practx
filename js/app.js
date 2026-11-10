const PELICULAS_URL = 'data/peliculas.json';

const opciones = document.getElementById('opciones');
const resultsGrid = document.getElementById('resultsGrid');
const resultsCount = document.getElementById('resultsCount');

let peliculas = [];

async function cargarPeliculas() {
  try {
    const response = await fetch(PELICULAS_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    peliculas = await response.json();
  } catch (error) {
    console.error('Error cargando la base de datos:', error);
    resultsCount.textContent = 'Error';
    resultsGrid.innerHTML = `<p>No se pudo cargar la base de datos: ${error.message}</p>`;
  }
}

function mostrarPeliculas(edad) {
  const lista = peliculas.filter(p => p.edad === edad);
  resultsCount.textContent = `${lista.length} peliculas encontradas`;

  resultsGrid.innerHTML = lista.map(peli => `
    <article class="card-item">
      <h3>${peli.titulo}</h3>
      <p><strong>Genero:</strong> ${peli.genero}</p>
      <p><strong>Anio:</strong> ${peli.anio}</p>
    </article>
  `).join('');
}

opciones.addEventListener('click', (evento) => {
  const boton = evento.target.closest('.btn-category');
  if (!boton) return;

  opciones.querySelectorAll('.btn-category').forEach(b => b.classList.remove('active'));
  boton.classList.add('active');

  mostrarPeliculas(boton.dataset.edad);
});

cargarPeliculas();
