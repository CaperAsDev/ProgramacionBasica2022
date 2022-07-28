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

    //Mis Arrays de ataque por Elemento

    var ataquesAgua = [
        {nombreAtaque: "Gancho de Nautilus", daño:2, defensa:1},
        {nombreAtaque: "Oleada de Nami", daño:1, defensa:3},
        {nombreAtaque: "Tormenta de Anivia", daño:2, defensa:3},
        {nombreAtaque: "Tiburon de Fizz", daño:2, defensa:2},
        {nombreAtaque: "Azote de Nilah", daño:3, defensa:1}
    ];
    var ataquesFuego = [
        {nombreAtaque: "Cohete de Corki", daño:2, defensa:1},
        {nombreAtaque: "Forja de Ornn", daño:1, defensa:3},
        {nombreAtaque: "Explosion de Brand", daño:3, defensa:1},
        {nombreAtaque: "Rafaga de Annie", daño:2, defensa:2},
        {nombreAtaque: "Levantamiento de Shyvana", daño:2, defensa:3}
    ];
    var ataquesTierra = [
        {nombreAtaque: "Trampas de Taliyah", daño:2, defensa:1},
        {nombreAtaque: "Invocacion de Galio", daño:1, defensa:3},
        {nombreAtaque: "Embestida de Malphite", daño:3, defensa:1},
        {nombreAtaque: "Estampida de Alistar", daño:2, defensa:2},
        {nombreAtaque: "Tumba de Lissandra", daño:2, defensa:3}
    ];
    var ataquesMetal = [
        {nombreAtaque: "Pinzas de Blitzcrank", daño:2, defensa:1},
        {nombreAtaque: "Montura de Rell", daño:1, defensa:3},
        {nombreAtaque: "Descarga de Urgot", daño:3, defensa:1},
        {nombreAtaque: "Maniobras de Camile", daño:2, defensa:2},
        {nombreAtaque: "Puñetazo de Vi", daño:2, defensa:3}
    ];
    var ataquesMadera = [
        {nombreAtaque: "Golem de Ivern", daño:2, defensa:1},
        {nombreAtaque: "Enrredadera de Maokai", daño:1, defensa:3},
        {nombreAtaque: "Lanza de Nidalee", daño:3, defensa:1},
        {nombreAtaque: "Palazo de Lilia", daño:2, defensa:2},
        {nombreAtaque: "Surgimiento de Zyra", daño:2, defensa:3}
    ];
    var ataquesObj = [ataquesAgua, ataquesFuego, ataquesTierra, ataquesMadera, ataquesMetal];

    console.log(ataquesObj[0][0].daño);
    var indiceAtaque_p1 = 0;
    var indiceAtaque_p2 = 0;
    let atacante_p2 = " ";


//Mi funcion que lee la seleccion
function leerSeleccion_p1(){
    //hago la funcion para buscar cual de las opciones esta checked
    const checked = (elemento) => elemento.checked;
    let invocada = invocaciones.findIndex(checked); 

    const nombreInvocada = invocaciones[invocada].nextSibling.data;
    return nombreInvocada;
}
/* //Esta linea de codigo hace lo mismo en ultimas que la funcion leerSeleccion_p1(me lanza el nombre del input seleccionado)Pero me pierdo de poder usar el array de las opciones.Asi que dejo el otro.
    let seleccionada = document.querySelector('input[name="inv"]:checked').nextSibling.data ; */

//Hare una variable que me sirva para validad si el usuario ya escogio invocacion
let invocacionSelected = false;

//Esta funcion es la que llama el boton se seleccion en htlm
function seleccionInvocacion(){
    
    let invocacion_p1 = document.getElementById("invocacion_p1");
    invocacion_p1.innerHTML = `<b id="nombreSeleccion_p1">${leerSeleccion_p1()}</b>`;

    invocacionSelected = true;
    
    seleccionInvocacion_p2();
}
        
//Mi funcion para selecciones aleatorias
function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}

//mi funcion para seleccion de invocacion aleatoria para el atacante_p2

function seleccionInvocacion_p2(){
    
    let nombreInvocada_p2 = invocaciones[aleatorio(0,2)].nextSibling.data;

    let spanInvocacion_p2 = document.getElementById("invocacion_p2");
    spanInvocacion_p2.innerHTML = `<b id="nombreSeleccion_p2">${nombreInvocada_p2}</b>`;
    return atacante_p2 = nombreInvocada_p2;
}

//Mi funcion para imprimir ataques en HTML
function imprimirAtaques(ataque_p1){
    if(invocacionSelected){
        ataqueAleatorio_p2();

        nuevaRonda(rondas,leerSeleccion_p1(),ataques[indiceAtaque_p1], atacante_p2, ataques[indiceAtaque_p2]  );
    }else{
        alert("No has seleccionado una invocacion");
    }
    
}

//funcion de ataque aleatorio P2

function ataqueAleatorio_p2(){
    indiceAtaque_p2 = [aleatorio(0,2)];
}

//Funciones de botones de ataque

function ataqueAgua (){
    indiceAtaque_p1 = 0;
     imprimirAtaques(ataques[indiceAtaque_p1]);
 } 
function ataqueFuego() {
    indiceAtaque_p1 = 1;
    imprimirAtaques(ataques[indiceAtaque_p1]);
}
function ataqueTierra() {
    indiceAtaque_p1 = 2;
    imprimirAtaques(ataques[indiceAtaque_p1]);
}

 /* Probando diferencias entre innerHtml y create element */
 let divRondas = document.querySelector('div[class="estado-duelo_rondas"]');
 let rondas = 1;
 
 console.log(divRondas);
//Funcion para poner nevas etiquetas en el section de estado-duelo_rondas

 function nuevaRonda(ronda, atacante_p1, ataque_p1,atacante_p2, ataque_p2 ){

     divRondas.innerHTML += `\n           <article>\n                <h3 class="ronda_duelo">Ronda ${ronda}</h3>\n                <p class="movimientos_duelo"><span class=\"atacante_p1\">${atacante_p1}</span> ataco con <span class=\"ataque_p1\">${ataque_p1}</span> y <span class=\"atacante_p2\">${atacante_p2}</span> ataco con <span class=\"ataque_p2\">${ataque_p2}.</span></p>                \n            </article>\n        `;

    rondas++;
    }