// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Event Listeners
cargarEventListeners();

function cargarEventListeners() {
  // Se activa cuando se presiona "Agregar Carrito"
  cursos.addEventListener('click', comprarCurso);
  
  // Cuando se elimina un curso del carrito
  carrito.addEventListener('click', eliminarCurso);
  
  // Al vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  
  // Al cargar el documento mostrar LS
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

// Funciones
// Funcion que añade el curso al carrito
function comprarCurso(e) {
  e.preventDefault();
  // Delegation para agregar-carrito
  if(e.target.classList.contains('agregar-carrito') ) {
    const curso = e.target.parentElement.parentElement;
    // Enviamos el curso seleccionado para obtener sus datos
    leerDatosCurso(curso);
  }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  };
  
  insertarCarrito(infoCurso);
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
  const row = document.createElement('tr');
  row.innerHTML = `<td> 
                    <img src="${curso.imagen}" width=100> 
                   </td>
                   <td>${curso.titulo}</td>
                   <td>${curso.precio}</td>
                   <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                   </td>`;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();
  
  let curso, cursoID;
  if(e.target.classList.contains('borrar-curso')) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoID = curso.querySelector('a').getAttribute('data-id');
  }
  eliminarCursoLocalStorage(cursoID);
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito(e) {
  // Forma lenta con menos codigo
  // listaCursos.innerHTML = '';
  // Forma rapida con mas codigo (recomendada)
  while(listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }
  
  // Vaciar localStorage
  vaciarLocalStorage();
  
  return false;
}

// Almacena cursos en el carrito a Local Storage
function guardarCursoLocalStorage(curso) {
    let cursos;
    // Toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();
  
    //console.log(cursos);
  
    // el curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos) );
}


// Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
     let cursosLS;

     // comprobamos si hay algo en localStorage
     if(localStorage.getItem('cursos') === null) {
          cursosLS = [];
     } else {
          cursosLS = JSON.parse( localStorage.getItem('cursos') );
     }
     return cursosLS;

}

// Imprime los cursos de LS en el carrito
function leerLocalStorage() {
  let cursosLS;
  
  cursosLS = obtenerCursosLocalStorage();
  
  cursosLS.forEach(function(curso) {
    // Construir el template
    const row = document.createElement('tr');
    row.innerHTML = `<td> 
                      <img src="${curso.imagen}" width=100> 
                     </td>
                     <td>${curso.titulo}</td>
                     <td>${curso.precio}</td>
                     <td>
                      <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                     </td>`;
    listaCursos.appendChild(row);    
  });
}

// Eliminar el curso por el ID en localStorage
function eliminarCursoLocalStorage(curso) {
  let cursosLS;
  
  // Obtenemos el arreglo de cursos
  cursosLS = obtenerCursosLocalStorage();
  
  // Iteramos comparando el ID del curso borrado con los del LS
  cursosLS.forEach(function(cursoLS, index) {
    if(cursoLS.id === curso) {
      cursosLS.splice(index, 1);
    }
  });
  
  // Añadimos el arreglo actual a LS
  localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}

// Elimina todos los cursos de localStorage
function vaciarLocalStorage() {
  localStorage.clear();
}