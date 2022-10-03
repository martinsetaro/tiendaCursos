// variables 
const carrito= document.querySelector('#carrito');
const listaCursos =document.querySelector('#lista-cursos');
const contenedorCarrito=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito=[];


cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
listaCursos.addEventListener('click',agregarCurso);

// Elimina cursos del carrito

carrito.addEventListener('click', eliminarCurso)

//vaciar el carrito

vaciarCarritoBtn.addEventListener('click',()=>{
 articulosCarrito =[];//reseteamos el arreglo
 limpiarHtml();//limpiamos todo el html
})

}

//funciones

function agregarCurso(e){
    e.preventDefault();
if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement
 Swal.fire('Curso Agregado a carrito!!')
 leerDatosCurso(cursoSeleccionado)
}
}


//eliminar curso del carrito
function eliminarCurso(e){
if(e.target.classList.contains('borrar-curso')){
   const cursoId = e.target.getAttribute('data-id')

   articulosCarrito = articulosCarrito.filter( curso => curso.id != cursoId);// el filtro mapea el nuevo array y la forma de borrarlo es trayendo
                                                                           // todos menos el que queremos seleccionar por eso esta usando el !=
   carritoHtml();
}}

// lee el contenido del html al que le dimos click y extrae la informacion

function leerDatosCurso(curso){


const infoCurso = {
    imagen:curso.querySelector('img').src,
    titulo:curso.querySelector('h4').textContent,
    precio:curso.querySelector('.precio span').textContent,
    id:curso.querySelector('a').getAttribute('data-id'),
    cantidad:1
}
//revisa si un elemento existe en el carrito



if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
    const cursos = articulosCarrito.map( curso => {
         if( curso.id === infoCurso.id ) {
              curso.cantidad++;
               return curso;
          } else {
               return curso;
       }
    })
    articulosCarrito = [...cursos];
}  else {
    articulosCarrito = [...articulosCarrito, infoCurso];
}

carritoHtml();

}


function carritoHtml(){
    //limpiar el html los repetidos
 limpiarHtml();

    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const {imagen,precio,cantidad,titulo,id} = curso

    const row = document.createElement('tr')
    row.innerHTML = `
    <td>
      <img src="${imagen}" width="100"/>
    </td>
    <td>
    ${titulo}
    </td>
    <td>
    ${precio}
    </td>
    <td>
    ${cantidad}
    </td>
    <td>
    <a href="#" class="borrar-curso" data-id="${id}">x</a>
    </td>

    `

// agrega el html del carrito en tbody
contenedorCarrito.appendChild(row);
    } )



}
//elimina los cursos del tbody
function limpiarHtml(){
    while(contenedorCarrito.firstChild){
     contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}

