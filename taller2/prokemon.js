/* Cuando ponemos la etiqueta script dentro del head tenemos un problema con la sincronizacion de javascript con html, por ejemplo en este caso poniamos un event listener a nuestro boton, pero dado que el script esta arriba cuando va a buscar el boton este no existe aun.*/

//En resumen ponemos un event listener en window que reconozca cuando la pagina ya ha cargado por completo. cuando esto sucede hay si voy a traer mi boton de html.

   /*  function iniciarJuego(){
        let botonInvocacion = document.getElementById("boton-invocar");
        botonInvocacion.addEventListener('click',seleccionInvocacion)
    }

    window.addEventListener('load', iniciarJuego) */


    //Ahora haremos la seccion que nos dira que invocacion escogio el jugador
    
    /* En este caso traje cada input por aparte para meterlo en un array, esto es similar a traerlos con un selector de etiqueta o clase, solo que tendria que convertir el nodeList que me devuleve en un array normal.. el resto es lo mismo */
    
    
    //Traigo mis inputs
    let sammy = document.getElementById("sammy") ;
    let amalthea = document.getElementById("amalthea") ;
    let ashley = document.getElementById("ashley") ;
    
    //meto mis inputs en un array
    var invocaciones = [sammy, amalthea, ashley];
    var ataques = ["Agua 💧", "Fuego 🔥", "Tierra 🪨"];

//Mi funcion que lee la seleccion
function leerSeleccion_p1(){
    //hago la funcion para buscar cual de las opciones esta checked
    const checked = (elemento) => elemento.checked;
    let invocada = invocaciones.findIndex(checked); 

    const nombreInvocada = invocaciones[invocada].nextSibling.data;
    return nombreInvocada;
}
//Hare una variable que me sirva para validad si el usuario ya escogio invocacion
let invocacionSelected = false;
function seleccionInvocacion(){
    //hago la funcion para buscar cual de las opciones esta checked
    
    
    /* //Esta linea de codigo hace lo mismo en ultimas que el bloque de arriba(me lanza el nombre del input seleccionado)Pero me pierdo de poder usar el array de las opciones.Asi que dejo el otro.

    let seleccionada = document.querySelector('input[name="inv"]:checked').nextSibling.data ; */
    let invocacion_p1 = document.getElementById("invocacion_p1");
    
    invocacion_p1.innerHTML = `<b id="nombreSeleccion_p1">${leerSeleccion_p1()}</b>`;
    invocacionSelected = true;
    
    seleccionInvocacion_p2();
}
        
//Mi funcion para selecciones aleatorias
function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}
//mi funcion para seleccion de invocacion aleatoria para la maquina


function seleccionInvocacion_p2(){
    
    let nombreInvocada_p2 = invocaciones[aleatorio(0,2)].nextSibling.data;

    let invocacion_p2 = document.getElementById("invocacion_p2");
    invocacion_p2.innerHTML = `<b id="nombreSeleccion_p2">${nombreInvocada_p2}</b>`;
    return atacante_p2 = nombreInvocada_p2;
}
let atacante_p2 = " ";

//Mi funcion para imprimir ataques en HTML
function imprimirAtaques(ataque_p1, ataque_p2){
    if(invocacionSelected){

        let spanAtaque_p1 =document.getElementById("ataque_p1")
        spanAtaque_p1.innerHTML = ataque_p1;
        
        let spanAtaque_p2 =document.getElementById("ataque_p2")
        spanAtaque_p2.innerHTML = ataque_p2;
        
        let spanAtacante_p1 = document.getElementById("atacante_p1");
        spanAtacante_p1.innerHTML = `<b>${leerSeleccion_p1()}</b>`;
        
        let spanAtacante_p2 = document.getElementById("atacante_p2");
        spanAtacante_p2.innerHTML = `<b>${atacante_p2}</b>`;
    }else{
        alert("No has seleccionado una invocacion");
    }
    
}
 ataqueAgua= ()=> imprimirAtaques("Agua 💧", ataques[aleatorio(0,2)]);
 ataqueFuego= ()=> imprimirAtaques("Fuego 🔥", ataques[aleatorio(0,2)]);
 ataqueTierra= ()=> imprimirAtaques("Tierra 🪨", ataques[aleatorio(0,2)]);
