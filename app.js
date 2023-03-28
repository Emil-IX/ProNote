
const contenedor = document.querySelector('#contenedor')

let datos = [];


eventlistener();
function eventlistener() {


    document.addEventListener('DOMContentLoaded', ()=> {
        datos = JSON.parse(localStorage.getItem('datos')) || [];
        console.log(datos);

        imprimirHTML();

        agregarDatos();
    })

}



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
        //datos.push(dato);
       
    }
    
    mensaje = confirm("¿Desea seguir introduciendo  dato?")
   
    };

    imprimirHTML();
 
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

    sincronizarStorage();
}



function sincronizarStorage() {
    localStorage.setItem('datos',JSON.stringify(datos));
}


function eliminarDato(id) {
    const confirmacion = confirm('¿Desea eliminar esta nota?')

    if(confirmacion){
        datos = datos.filter( dato => dato.id !== id );

        imprimirHTML();
        console.log(datos);
        return;
    }
  
}

function limpiarHTML() {
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
     }
}






