const entradaTarea = document.querySelector('#inputTarea');
const botonAgregarTarea = document.querySelector('#agregarTarea');
const totalTareasElemento = document.querySelector('#tareasTotales');
const tareasCompletadasElemento = document.querySelector('#tareasCompletadas');
const listaTareasElemento = document.querySelector('#listadoTareas');

let tareas = [
  { id: 1, tarea: "Pasear al perro", estado: false },
  { id: 2, tarea: "Comprar pan", estado: false },
  { id: 3, tarea: "Terminar el trabajo", estado: false }
];


function actualizarConteoTareas() {
  const total = tareas.length;
  const completadas = tareas.filter(tarea => tarea.estado).length;
  totalTareasElemento.innerHTML = total;
  tareasCompletadasElemento.innerHTML = completadas;
}


function renderizarTareas() {
  listaTareasElemento.innerHTML = '';
  let contador = 1;

  for (let tarea of tareas) {
      const itemTarea = document.createElement('div');
      itemTarea.classList.add('task-item');

      itemTarea.innerHTML = `
          <div class="left-group">
              <input type="checkbox" class="checkbox" ${tarea.estado ? 'checked' : ''} data-id="${tarea.id}">
              <span class="${tarea.estado ? 'completed' : ''}">${contador}. ${tarea.tarea}</span>
          </div>
          <button class="btn btn-eliminar" data-id="${tarea.id}">Eliminar</button>
      `;
      
      listaTareasElemento.appendChild(itemTarea);
      contador++;
  }
  actualizarConteoTareas();
}


function agregarTarea() {
  const descripcionTarea = entradaTarea.value.trim();
  if (descripcionTarea !== '') {
      const nuevaTarea = {
          id: tareas.length ? tareas[tareas.length - 1].id + 1 : 1,
          tarea: descripcionTarea,
          estado: false
      };
      tareas.push(nuevaTarea);
      entradaTarea.value = '';
      renderizarTareas();
  }
}

function eliminarTarea(id) {
  const TareaAEliminar = tareas.findIndex(tarea => tarea.id === id);
  if (TareaAEliminar !== -1) {
      tareas.splice(TareaAEliminar, 1);
      renderizarTareas();
  }
}

function cambiarEstadoTarea(id) {
  const tarea = tareas.find(tarea => tarea.id === id);
  if (tarea) {
      tarea.estado = !tarea.estado;
      renderizarTareas();
  }
}

botonAgregarTarea.addEventListener('click', agregarTarea);

listaTareasElemento.addEventListener('click', (evento) => {
  const idTarea = parseInt(evento.target.getAttribute('data-id'), 10);
  if (evento.target.classList.contains('checkbox')) {
      cambiarEstadoTarea(idTarea);
  } else if (evento.target.classList.contains('btn-eliminar')) {
      eliminarTarea(idTarea);
  }
});

renderizarTareas();

