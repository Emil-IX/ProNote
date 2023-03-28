
const contenedor = document.querySelector('#contenedor')

let DB;

let datos = [];


eventlistener();
function eventlistener() {


    document.addEventListener('DOMContentLoaded', ()=> {
      /*   datos = JSON.parse(localStorage.getItem('datos')) || []; */
      
        //imprimirHTML();

        crearDB();

        agregarDatos();

        //console.log(datos);

      
    })

}


//agregarDatos();
function agregarDatos() {
    let mensaje = confirm("¿Desea introducir un dato?")

  while(mensaje) { 
   
    let  dato = {
        apellido: prompt('inserte apellido'),
        nombre: prompt('inserte nombre'),
        nota1: Number(prompt('inserte nota1')),
        nota2: Number(prompt('inserte nota2')),
        nota3: Number(prompt('inserte nota3')),
        nota4: Number(prompt('inserte nota4')),
    } 


    const {apellido, nombre, nota1, nota2, nota3, nota4 } = dato; 

    if(apellido === "" ||  apellido === null || nombre === "" ||  nombre === null  ){  

        alert('nombre y apellido no puede estar vacios')


    }else if( isNaN(nota1) || nota1  === 0 || nota1  < 0 || nota1  > 100 || 
        isNaN(nota2) || nota2  === 0 || nota2  < 0 || nota2  > 100 ||
        isNaN(nota3) || nota3  === 0 || nota3  < 0 || nota3  > 100 ||
        isNaN(nota4) || nota4  === 0 || nota4  < 0 || nota4  > 100 ){

       alert('Las notas solo pueden ser numeros, deben ser mayor que 0 y menor que 100')
       
    }else {
        dato.promedio = (nota1 + nota2 + nota3 + nota4) / 4;
        dato.id = Date.now();
        datos = [...datos,dato];
        
        setTimeout(() => {
            crearNuevaNota(dato);
        }, 1000);
        
    }
    
    mensaje = confirm("¿Desea seguir introduciendo  dato?")
   
    };


    //imprimirHTML();
 
}


function crearNuevaNota(datos) {

    const transaction = DB.transaction(['notas'], 'readwrite');
    const objectStore = transaction.objectStore('notas');

    objectStore.add(datos);

    transaction.onerror = function() {
        console.log('Hubo un error');   
    }

    transaction.oncomplete = function() {
        console.log('Nota Agregada');
        
        // Mostrar mensaje de que todo esta bien...

    }
}




function imprimirHTML () {
    
    limpiarHTML();

    datos.forEach( dato => {
        const {apellido, nombre, nota1, nota2, nota3, nota4 , promedio, id } = dato; 

        const element = document.createElement('tr');
        element.innerHTML = `
         <td>${apellido}</td>  
         <td> ${nombre} </td>
         <td> ${nota1} </td>
         <td> ${nota2} </td>
         <td> ${nota3} </td>
         <td> ${nota4} </td>
         <td>${promedio}</td>
         `
        contenedor.appendChild(element);

        
        //boton para eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn','boton');
        btnEliminar.innerHTML = '<td> Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> </td>';

        btnEliminar.onclick = () => eliminarDato(id);
    
        element.appendChild(btnEliminar);
    } );

   /*  sincronizarStorage(); */
}



/* function sincronizarStorage() {
    localStorage.setItem('datos',JSON.stringify(datos));
} */


function eliminarDato(id) {
    datos = datos.filter( dato => dato.id !== id );

    imprimirHTML();
    console.log(datos);
}

function limpiarHTML() {
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
     }
}


function crearDB() {

    const crearDB = window.indexedDB.open('notas', 1);

    crearDB.onerror = function() {
        console.log('Hubo un error al crear la base de datos')
    }

    crearDB.onsuccess = function() {
        DB = crearDB.result;

        
        console.log('Base de datos creada')
    }

    crearDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('notas', {
            keyPath: 'id',
            autoIncrement: true
    });

        objectStore.createIndex('apellido','apellido', {unique: false});
        objectStore.createIndex('nombre','nombre', {unique: false});
        objectStore.createIndex('nota1','nota1', {unique: false});
        objectStore.createIndex('nota2','nota2', {unique: false});
        objectStore.createIndex('nota3','nota3', {unique: false});
        objectStore.createIndex('nota4','nota4', {unique: false});
        objectStore.createIndex('promedio','promedio', {unique: false});
        objectStore.createIndex('id','id', {unique: true});

        console.log('DB creada y lista')
    }

}


