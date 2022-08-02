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
    
    //meto mis inputs en un array para luego recorrerlos y buscar cual tiene su atributo checked en true.
    var invocaciones = [sammy, amalthea, ashley];
    //Creo las propiedades vida y defensa de cada uno de mis personajes
    invocaciones[0].vida = 6;
    invocaciones[0].defensa = 4;
    invocaciones[1].vida = 8;
    invocaciones[1].defensa = 3;
    invocaciones[2].vida = 4;
    invocaciones[2].defensa = 5;
        //console.log (invocaciones[2].vida)

    //Mis Arrays de ataque por Elemento

    var ataquesAgua = [
        {nombreAtaque: "💧Gancho de Nautilus", daño:2, defensa:0},
        {nombreAtaque: "💧Oleada de Nami", daño:1, defensa:2},
        {nombreAtaque: "💧Azote de Nilah", daño:3, defensa:0},
        {nombreAtaque: "💧Tiburon de Fizz", daño:2, defensa:1},
        {nombreAtaque: "💧Tormenta de Anivia", daño:2, defensa:2}
    ];
    var ataquesFuego = [
        {nombreAtaque: "🔥Cohete de Corki", daño:2, defensa:0},
        {nombreAtaque: "🔥Forja de Ornn", daño:1, defensa:2},
        {nombreAtaque: "🔥Explosion de Brand", daño:3, defensa:0},
        {nombreAtaque: "🔥Rafaga de Annie", daño:2, defensa:1},
        {nombreAtaque: "🔥Levantamiento de Shyvana", daño:2, defensa:2}
    ];
    var ataquesTierra = [
        {nombreAtaque: "🪨Trampas de Taliyah", daño:2, defensa:0},
        {nombreAtaque: "🪨Invocacion de Galio", daño:1, defensa:2},
        {nombreAtaque: "🪨Embestida de Malphite", daño:3, defensa:0},
        {nombreAtaque: "🪨Estampida de Alistar", daño:2, defensa:1},
        {nombreAtaque: "🪨Tumba de Lissandra", daño:2, defensa:2}
    ];
    var ataquesNaturaleza = [
        {nombreAtaque: "🌿Golem de Ivern", daño:2, defensa:0},
        {nombreAtaque: "🌿Enrredadera de Maokai", daño:1, defensa:2},
        {nombreAtaque: "🌿Lanza de Nidalee", daño:3, defensa:0},
        {nombreAtaque: "🌿Palazo de Lilia", daño:2, defensa:1},
        {nombreAtaque: "🌿Surgimiento de Zyra", daño:2, defensa:2}
    ];
    var ataquesMetal = [
        {nombreAtaque: "⚒️Pinzas de Blitzcrank", daño:2, defensa:0},
        {nombreAtaque: "⚒️Montura de Rell", daño:1, defensa:2},
        {nombreAtaque: "⚒️Descarga de Urgot", daño:3, defensa:0},
        {nombreAtaque: "⚒️Maniobras de Camile", daño:2, defensa:1},
        {nombreAtaque: "⚒️Puñetazo de Vi", daño:2, defensa:2}
    ];
    var ataquesObj = [ataquesAgua, ataquesFuego, ataquesTierra, ataquesNaturaleza, ataquesMetal];
//Variables que necesito para la logica del juego
        //console.log(ataquesObj[0][1].nombreAtaque);
    //---------P1---------
    var indiceInvocacion_p1 = 0;
    var indiceElemento_p1 = 0;
    var indiceAtaque_p1 = 0;

    let atacante_p1 = " ";
    var vida_p1 = 0;
    var defensa_p1 = 0;

    var dañoAtaque_p1 = 0;
    var resistenciaAtaque_p1 = 0;

    //----------P2---------
    var indiceInvocacion_p2 = 0;
    var indiceElemento_p2 = 0;
    var indiceAtaque_p2 = 0;

    let atacante_p2 = " ";
    var vida_p2 = 0;
    var defensa_p2 = 0;

    var dañoAtaque_p2 = 0;
    var resistenciaAtaque_p2 = 0;



//Mi funcion que lee la seleccion
function leerSeleccion_p1(){
    //hago la funcion para buscar cual de las opciones esta checked
    const checked = (elemento) => elemento.checked;
    let invocada = invocaciones.findIndex(checked); 
    indiceInvocacion_p1 = invocada;
    const nombreInvocada = invocaciones[invocada].nextSibling.data;
    return atacante_p1 = nombreInvocada;
}
/* //Esta linea de codigo hace lo mismo en ultimas que la funcion leerSeleccion_p1(me lanza el nombre del input seleccionado)Pero me pierdo de poder usar el array de las opciones.Asi que dejo el otro.
    let seleccionada = document.querySelector('input[name="inv"]:checked').nextSibling.data ; */

//Hare una variable que me sirva para validad si el usuario ya escogio invocacion
let invocacionSelected = false;

//Esta funcion es la que llama el boton de seleccion en htlm. Imprime el nombre de la seleccion en el HTML y activa la funcion seleccionInvocacion_p2.
function seleccionInvocacion(){
    if(invocacionSelected){
        alert("Ya haz seleccionado tu invocacion");
    }else{
        leerSeleccion_p1();
        vida_p1 = invocaciones[indiceInvocacion_p1].vida;
        defensa_p1 = invocaciones[indiceInvocacion_p1].defensa;
        
        let invocacion_p1 = document.getElementById("invocacion_p1");
        invocacion_p1.innerHTML = `<b id="nombreSeleccion_p1">${atacante_p1}</b>`;
        let SpanVidas_p1 = document.getElementById("vidas_p1");
        SpanVidas_p1.innerHTML = `<b id="numeroVidas_p1">${vida_p1}</b>`;
        let spanDefensa_p1 = document.getElementById("defensa_p1");
        spanDefensa_p1.innerHTML = `<b id="numeroDefensa_p1">${defensa_p1}</b>`;
        
        invocacionSelected = true;
        
        seleccionInvocacion_p2();
        imprimirEstadisticasIniciales(atacante_p1,vida_p1,defensa_p1,atacante_p2,vida_p2,defensa_p2);
    }
}
        
//Mi funcion para selecciones aleatorias
function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}

//mi funcion para seleccion e impresion en HTML de invocacion aleatoria para el atacante_p2

function seleccionInvocacion_p2(){
    indiceInvocacion_p2 = aleatorio(0,2);
    while(indiceInvocacion_p2 == indiceInvocacion_p1){
        indiceInvocacion_p2 = aleatorio(0,2);
    }
    vida_p2 = invocaciones[indiceInvocacion_p2].vida;
    defensa_p2 = invocaciones[indiceInvocacion_p2].defensa;
    let nombreInvocada_p2 = invocaciones[indiceInvocacion_p2].nextSibling.data;

    let spanInvocacion_p2 = document.getElementById("invocacion_p2");
    spanInvocacion_p2.innerHTML = `<b id="nombreSeleccion_p2">${nombreInvocada_p2}</b>`;

    let spanVidas_p2 = document.getElementById("vidas_p2");
    spanVidas_p2.innerHTML = `<b id="numeroVidas_p2">${vida_p2}</b>`;

    let spanDefensa_p2 = document.getElementById("defensa_p2");
    spanDefensa_p2.innerHTML = `<b id="numeroDefensa_p2">${defensa_p2}</b>`;

    return atacante_p2 = nombreInvocada_p2;
}
//MI FUNCION para imprimir estadisticas Iniciales de personajes seleccionados en HTML
function imprimirEstadisticasIniciales(){
    let divEstadisticas = document.querySelector('div[class="estadisticas_invocaciones"]');
    console.log(divEstadisticas)

    divEstadisticas.innerHTML = `\n                <div class=\"estadistica_p1\">\n                    <p><span id=\"nombre_p1\"><b>${atacante_p1}</b></span> ---&gt; ❤️ = <span id=\"salud_p1\">${vida_p1}</span> 🛡 = <span id=\"escudo_p1\">${defensa_p1}</span></p>\n                </div>\n                <div class=\"estadistica_p2\">\n                    <p><span id=\"nombre_p2\"><b>${atacante_p2}</b></span> ---&gt; ❤️ = <span id=\"salud_p2\">${vida_p2}</span> 🛡 = <span id=\"escudo_p2\">${defensa_p2}</span></p>\n                </div>\n\n`

}



//Mi funcion para imprimir ataques en HTML que es activada al dar click a los botones de ataque.Tambien selecciona el ataque aleatorio del P2
function imprimirAtaques(){
    if(invocacionSelected){
        ataquesAleatorios();

        nuevaRonda(ataquesObj[indiceElemento_p1][indiceAtaque_p1].nombreAtaque, ataquesObj[indiceElemento_p2][indiceAtaque_p2].nombreAtaque  );
        dueloRonda(invocaciones[indiceInvocacion_p2].defensa, invocaciones[indiceInvocacion_p1].defensa);
        imprimirEstadisticasIniciales();
        if(finDelJuego){alert("fin del juego")};
        
        console.log(vida_p2)
    }else{
        alert("No has seleccionado una invocacion");
    }
    
}

//funcion de ataque aleatorio P2; selecciona el indice aleatorio del elemento y del ataque.

function ataquesAleatorios(){
    indiceElemento_p2 = aleatorio(0,4);
    indiceAtaque_p2 = aleatorio(0,4);
    indiceAtaque_p1 = aleatorio(0,4);

    dañoAtaque_p1 = ataquesObj[indiceElemento_p1][indiceAtaque_p1].daño
    dañoAtaque_p2 =ataquesObj[indiceElemento_p2][indiceAtaque_p2].daño
    resistenciaAtaque_p1 =ataquesObj[indiceElemento_p1][indiceAtaque_p1].defensa
    resistenciaAtaque_p2 =ataquesObj[indiceElemento_p2][indiceAtaque_p2].defensa
}

//Funciones de botones de ataque

function ataqueAgua (){
    if(finDelJuego){alert("el juego ya ha terminado, inicia un nuevo Duelo")}else{

        indiceElemento_p1 = 0;
        imprimirAtaques();
    }
 } 
function ataqueFuego() {
    if(finDelJuego){alert("el juego ya ha terminado, inicia un nuevo Duelo")}else{   
        indiceElemento_p1 = 1;
        imprimirAtaques();
    }
}
function ataqueTierra() {
    if(finDelJuego){alert("el juego ya ha terminado, inicia un nuevo Duelo")}else{
        indiceElemento_p1 = 2;
        imprimirAtaques();
    }
}
function ataqueNaturaleza() {
    if(finDelJuego){alert("el juego ya ha terminado, inicia un nuevo Duelo")}else{
        indiceElemento_p1 = 3;
        imprimirAtaques();
    }
}
function ataqueMetal() {
    if(finDelJuego){alert("el juego ya ha terminado, inicia un nuevo Duelo")}else{
        indiceElemento_p1 = 4;
        imprimirAtaques();
    }
}

 /* Probando diferencias entre innerHtml y create element */
 let divRondas = document.querySelector('div[class="estado-duelo_rondas"]');
 let rondas = 1;
 
//Funcion para poner nevas etiquetas en el section de estado-duelo_rondas

 function nuevaRonda(ataque_p1, ataque_p2 ){

     divRondas.innerHTML += `\n           <article>\n                <h3 class="ronda_duelo">Ronda ${rondas}</h3>\n                <p class="movimientos_duelo"><span class=\"atacante_p1\">${atacante_p1}</span> ataco con <span class=\"ataque_p1\">${ataque_p1}</span> y <span class=\"atacante_p2\">${atacante_p2}</span> respondio con <span class=\"ataque_p2\">${ataque_p2}.</span></p>                \n            </article>\n        `;

    rondas++;
    }

//Funcion que contiene la logica de los duelos 
var finDelJuego = false;
function dueloRonda(defensaMaxima_p2,defensaMaxima_p1){
    if(!finDelJuego){
        defensa_p2 -= dañoAtaque_p1;
        defensa_p1 -= dañoAtaque_p2;
        console.log(`p1 ataca con ${dañoAtaque_p1} a p2 bajando su defensa a ${defensa_p2} la vida de p1 es ${vida_p1}`)
        console.log(`p2 ataca con ${dañoAtaque_p2} a p1 bajando su defensa a ${defensa_p1} la vida de p2 es ${vida_p2}`)

        if(defensa_p2 < 0 ){
            vida_p2 += defensa_p2;
            defensa_p2 = 0;
        }
        if(defensa_p1 < 0){
            vida_p1 += defensa_p1;
            defensa_p1 = 0;
        }
    }
    if(vida_p1 <= 0 || vida_p2 <=0){
        finDelJuego = true
    }else{

        defensa_p2 += resistenciaAtaque_p2;
        defensa_p1 += resistenciaAtaque_p1;
        console.log(`p2 recupera  ${resistenciaAtaque_p2} de defensa y queda con  ${defensa_p2} su vida es ${vida_p2}`)
        console.log(`p1 recupera  ${resistenciaAtaque_p1} de defensa y queda con  ${defensa_p1} su vida es ${vida_p1}`)
        
        if(defensa_p2 >= defensaMaxima_p2){
            defensa_p2 = defensaMaxima_p2;
        }
        if(defensa_p1 >= defensaMaxima_p1){
            defensa_p1 = defensaMaxima_p1;
        }
    }
        
}


