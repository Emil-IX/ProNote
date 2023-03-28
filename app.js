
const contenedor = document.querySelector('#contenedor')

let datos = [];


eventlistener();
function eventlistener() {

//Cargar las funciones desde que se inicie la pagìna
    document.addEventListener('DOMContentLoaded', ()=> {
        datos = JSON.parse(localStorage.getItem('datos')) || [];
        console.log(datos);

        imprimirHTML();

        agregarDatos();

        botonResetear();
    })

}


//Agrega los datos que se introducen por medio del promp
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

    //Validaciones
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
        //datos.push(dato);
       
    }
    
    mensaje = confirm("¿Desea seguir introduciendo  dato?")
   
    };

    imprimirHTML();
 
}

//imprime en el flujo del html
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
         <td></td>
         `
      

       const btnEliminar = document.createElement('p');
       btnEliminar.classList.add('btnEliminar');
       btnEliminar.innerHTML =  `
       <p>x</p>
       ` 
       btnEliminar.onclick = () => eliminarDato(id);

        //Introduce los datos en el flujo html
       element.lastElementChild.appendChild(btnEliminar);
       contenedor.appendChild(element);
    

    } );

    sincronizarStorage();
}


//Introduce los datos en local storage para tenerlos disponibles
function sincronizarStorage() {
    localStorage.setItem('datos',JSON.stringify(datos));
}


//Elimina los datos tanto del flujo html como en memoria
function eliminarDato(id) {
    const confirmacion = confirm('¿Desea eliminar esta nota?')

    if(confirmacion){
        datos = datos.filter( dato => dato.id !== id );

        imprimirHTML();
        console.log(datos);
        return;
    }
  
}


//limpia el html para agregar los nuevos datos
function limpiarHTML() {
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
     }
}


function botonResetear() {
    //boton para recetear la pagina
    const btnReset = document.createElement("div");
    btnReset.classList.add('btResect');
    btnReset.textContent = 'Resetear Pagina';

    btnReset.onclick = () => {
        location.reload()
    };

    const extra = document.querySelector('#extra')

    extra.appendChild(btnReset);


   }






