/* Cuando ponemos la etiqueta script dentro del head tenemos un problema con la sincronizacion de javascript con html, por ejemplo en este caso poniamos un event listener a nuestro boton, pero dado que el script esta arriba cuando va a buscar el boton este no existe aun.*/
//En resumen ponemos un event listener en window que reconozca cuando la pagina ya ha cargado por completo. cuando esto sucede hay si voy a traer mi boton de html.    
    
    //Empiezo iniciando el juego; oculto las secciones que aun no necesitamos, asi que esta seria como la pagina de inicio de la partida.
window.addEventListener('load', iniciarJuego)
function iniciarJuego(){
    seccionSeleccionAtaque.style.display = "none";
    estadoDuelo.style.display = "none";
    botonReiniciar.style.display = "none";   
}
    //Mi funcion para selecciones aleatorias
function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}
    /* En este caso traje cada input por aparte para meterlo en un array, esto es similar a traerlos con un selector de etiqueta o clase, solo que tendria que convertir el nodeList que me devuleve en un array normal.. el resto es lo mismo */
    //Traigo mis inputs y secciones
    let sammy = document.getElementById("sammy") ;
    let amalthea = document.getElementById("amalthea") ;
    let ashley = document.getElementById("ashley") ;
    let rondas = 1;
    let cora ="❤️";
    let escudo = "🛡"

    let seccionSeleccion = document.getElementById("seleccion_prokemon");
    let seccionSeleccionAtaque = document.getElementById("seleccion_ataque");
    let estadoDuelo = document.getElementById("estado-duelo");
    let botonReiniciar = document.getElementById("boton-reiniciar");
    let cardsSummonedSection = document.querySelector(".cards_summoned");
    let botonSeleccionInv = document.getElementById("boton-invocar");
    let divEstadisticas = document.querySelector('div[class="estadisticas_invocaciones"]');
    let divRondas = document.querySelector('div[class="estado-duelo_rondas"]');

    //meto mis inputs en un array para luego recorrerlos y buscar cual tiene su atributo checked en true.
    var invocaciones = [sammy, amalthea, ashley];
    //Creo las propiedades que necesito de cada personaje (tal vez metiendo todo en un objeto y luego metiendo el objeto al imput como propiedad ahorraria un poco de espacio, lo escribiria con una funcion creadora de objetos.)
    invocaciones[0].vida = 6;
    invocaciones[0].defensa = 4;
    invocaciones[0].nombre = "🧛‍♀️ Sammy";
    invocaciones[0].cardCode = `\n <div class=\"summon_card\" id=\"sammy_card\">\n <section class=\"card_info\">\n <p class=\"summon_name\">Sammy</p>\n <div class=\"card_icons\">\n<div class=\"heart_icon\">\n<p id=\"lifes_number\">6</p>\n </div> \n<div class=\"element_icon\" id=\"sammy_element-icon\"></div>\n<div class=\"shield_icon\">\n <p id=\"shield_number\">4</p>\n</div>\n</div>\n </section>\n</div>\n`;
//Hay que tranajar en las cards y hacerlas lo mas simplificada posible.
    invocaciones[1].vida = 7;
    invocaciones[1].defensa = 2;
    invocaciones[1].nombre = "♑️ Amalthea";
    invocaciones[1].cardCode = `\n <div class="summon_card" id="amalthea_card">\n <section class="card_info">\n<p class="summon_name">Amalthea</p>\n <div class="card_icons">\n<div class="heart_icon">\n <p id="lifes_number">7</p>\n </div>\n <div class="element_icon" id="amalthea_element-icon"></div>\n<div class="shield_icon">\n<p id="shield_number">2</p>\n</div> \n </div>\n </section>\n </div>\n`;

    invocaciones[2].vida = 4;
    invocaciones[2].defensa = 6;
    invocaciones[2].nombre = "🧚🏽‍♀️ Ashley";
    invocaciones[2].cardCode = `\n<div class="summon_card" id="ashley_card">\n<section class="card_info">\n<p class="summon_name">Ashley</p>\n<div class="card_icons">\n<div class="heart_icon">\n<p id="lifes_number">4</p>\n</div>\n<div class="element_icon" id="ashley_element-icon"></div>\n<div class="shield_icon">\n<p id="shield_number">6</p>\n</div>\n</div>\n</section>\n</div>\n`;

    //Mis Arrays de ataque por Elemento, los creo y pongo en un array

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
//Variables que necesito leer para mostrar informacion al jugador y procesar los duelos
    //---------P1---------
    var indiceInvocacion_p1 = 0;
    var indiceElemento_p1 = 0;
    var indiceAtaque_p1 = 0;

    let atacante_p1 = " ";
    var vida_p1 = 0;
    var barraVida_p1 =" ";
    var defensa_p1 = 0;
    var barraEscudo_p1 = " ";

    var dañoAtaque_p1 = 0;
    var resistenciaAtaque_p1 = 0;

    //----------P2---------
    var indiceInvocacion_p2 = 0;
    var indiceElemento_p2 = 0;
    var indiceAtaque_p2 = 0;

    let atacante_p2 = " ";
    var vida_p2 = 0;
    var barraVida_p2 = " ";
    var defensa_p2 = 0;
    var barraEscudo_p2 = " ";

    var dañoAtaque_p2 = 0;
    var resistenciaAtaque_p2 = 0;

//Mi funcion que lee la seleccion
function leerSeleccion_p1(){
    //hago la funcion para buscar cual de las opciones esta checked
    const checked = (elemento) => elemento.checked;
    indiceInvocacion_p1 = invocaciones.findIndex(checked); 
    atacante_p1 = invocaciones[indiceInvocacion_p1].nombre;
    vida_p1 = invocaciones[indiceInvocacion_p1].vida;
    defensa_p1 = invocaciones[indiceInvocacion_p1].defensa;
}

//Esta funcion es la que llama el boton de seleccion en htlm. Imprime la card de la seleccion en el HTML y activa la funcion seleccionInvocacion_p2.
function seleccionInvocacion(){
    
    leerSeleccion_p1();
    seccionSeleccion.style.display = "none";
    seccionSeleccionAtaque.style.display = "flex";
        
    seleccionInvocacion_p2();
    imprimirEstadisticasIniciales();
    
    cardsSummonedSection.innerHTML += invocaciones[indiceInvocacion_p1].cardCode;
    cardsSummonedSection.innerHTML +=`<p class="vs" >VS</p>`
    cardsSummonedSection.innerHTML += invocaciones[indiceInvocacion_p2].cardCode;
    /*Asi se deshabilita un input: ashley.disabled = true; */
}

//mi funcion para seleccion e impresion en HTML de invocacion aleatoria para el atacante_p2
function seleccionInvocacion_p2(){
    indiceInvocacion_p2 = aleatorio(0,2);
    while(indiceInvocacion_p2 == indiceInvocacion_p1){
        indiceInvocacion_p2 = aleatorio(0,2);
    }
    vida_p2 = invocaciones[indiceInvocacion_p2].vida;
    defensa_p2 = invocaciones[indiceInvocacion_p2].defensa;
    atacante_p2 = invocaciones[indiceInvocacion_p2].nombre;
}
//MI FUNCION para imprimir estadisticas Iniciales de personajes seleccionados en HTML
function imprimirEstadisticasIniciales(){
    estadoDuelo.style.display = "block";
    escalaVida();
    divEstadisticas.innerHTML = `
    \n <div class=\"estadistica_p1\">\n <p id=\"nombre_p1\"><b>${atacante_p1}</b></p>\n <p id=\"salud_p1\">${barraVida_p1}</p>  <p id=\"escudo_p1\">${barraEscudo_p1}</p>\n </div>
    \n <div class=\"estadistica_p2\">\n <p id=\"nombre_p2\"><b>${atacante_p2}</b></p>\n <p id=\"salud_p2\">${barraVida_p2}</p>  <p id=\"escudo_p2\">${barraEscudo_p2}</p>\n</div>\n`
    barraVida_p1 = " ";
    barraVida_p2 = " ";
    barraEscudo_p1 = " ";
    barraEscudo_p2 = " ";
}
function escalaVida(){
    for(let i = 0; i <= vida_p1 - 1; i++ ){
        barraVida_p1 = barraVida_p1 + cora;
    }
    for(let o = 0; o <= vida_p2 - 1; o++ ){
        barraVida_p2 = barraVida_p2 + cora;
    }
    for(let a = 0; a <= defensa_p1 - 1; a++ ){
        barraEscudo_p1 = barraEscudo_p1 + escudo;
    }
    for(let s = 0; s <= defensa_p2 - 1; s++ ){
        barraEscudo_p2 = barraEscudo_p2 + escudo;
    }
    console.log(barraVida_p1)
    console.log(barraVida_p2)
}

//Mi funcion para imprimir ataques en HTML que es activada al dar click a los botones de ataque.Tambien selecciona el ataque aleatorio del P2
function imprimirAtaques(){
    ataquesAleatorios();

    nuevaRonda(ataquesObj[indiceElemento_p1][indiceAtaque_p1].nombreAtaque, ataquesObj[indiceElemento_p2][indiceAtaque_p2].nombreAtaque );
    dueloRonda(invocaciones[indiceInvocacion_p2].defensa, invocaciones[indiceInvocacion_p1].defensa);
    imprimirEstadisticasIniciales();
    interaccionesDuelo();
}

//funcion de ataque aleatorio P2; selecciona el indice aleatorio del elemento y del ataque.

function ataquesAleatorios(){
    indiceElemento_p2 = aleatorio(0,4);
    indiceAtaque_p2 = aleatorio(0,4);
    indiceAtaque_p1 = aleatorio(0,4);

    dañoAtaque_p1 = ataquesObj[indiceElemento_p1][indiceAtaque_p1].daño
    dañoAtaque_p2 = ataquesObj[indiceElemento_p2][indiceAtaque_p2].daño
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
 function interaccionesDuelo(){     
    let seccionRondas = document.querySelector(".ataques_estadisticas");

    let parrafoDaños_p1 = document.createElement('div');

    parrafoDaños_p1.innerHTML = `\n<h4>${atacante_p1}</h4>\n<h5>${ataquesObj[indiceElemento_p1][indiceAtaque_p1].nombreAtaque}</h5>\n <p> ⚔️${dañoAtaque_p1}</p>\n <p>+🛡${resistenciaAtaque_p1}</p>`;
     
    seccionRondas.appendChild(parrafoDaños_p1);

    let parrafoDaños_p2 = document.createElement('div');

    parrafoDaños_p2.innerHTML = `\n<h4>${atacante_p2}</h4>\n<h5>${ataquesObj[indiceElemento_p2][indiceAtaque_p2].nombreAtaque}</h5>\n <p> ⚔️${dañoAtaque_p2}</p>\n <p>+🛡${resistenciaAtaque_p2}</p>`;
     
    seccionRondas.appendChild(parrafoDaños_p2);
}
 
//Funcion para poner nevas etiquetas en el section de estado-duelo_rondas

 function nuevaRonda(ataque_p1, ataque_p2 ){
    divRondas.innerHTML = `\n <article class=\"bloque_duelo\">\n <h3 class="titulo_ronda_duelo" >Ronda ${rondas}</h3>\n <div class=\"ataques_estadisticas\"></div>\n  </article>\n `;

    rondas++;
}

//Funcion que contiene la logica de los duelos 
var finDelJuego = false;
var ganador ;
function dueloRonda(defensaMaxima_p2,defensaMaxima_p1){
    if(!finDelJuego){
        defensa_p2 -= dañoAtaque_p1;
        defensa_p1 -= dañoAtaque_p2;

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
        if(vida_p1 <= 0 && vida_p2 <= 0){
            ganador = "Empate";
        }else if(vida_p1 > 0){
            ganador = atacante_p1;
            vida_p2 = 0;
        }else{
            ganador = atacante_p2;
            vida_p1 = 0;
        }
        mensajeFinDelJuego();
    }else{

        defensa_p2 += resistenciaAtaque_p2;
        defensa_p1 += resistenciaAtaque_p1;
        
        if(defensa_p2 >= defensaMaxima_p2){
            defensa_p2 = defensaMaxima_p2;
        }
        if(defensa_p1 >= defensaMaxima_p1){
            defensa_p1 = defensaMaxima_p1;
        }
    }
        
}
function mensajeFinDelJuego(){
    let seccionCabecera = document.getElementById("cabecera");

    let parrafoResultadoDuelo = document.createElement('h3');
    if(ganador != "Empate"){

        parrafoResultadoDuelo.innerHTML = `\n                <p class="titulo_ganador"><span class=\"ganador\">¡¡${ganador}</span> ha ganado el duelo!!</p>                \n` 
        seccionCabecera.appendChild(parrafoResultadoDuelo);

    }else{
        parrafoResultadoDuelo.innerHTML = `\n                <p class="titulo_ganador"><span class=\"ganador\">¡¡${ganador}</span> ambas invocaciones han muerto en su ultimo ataque!!</p>
        `
        seccionCabecera.appendChild(parrafoResultadoDuelo);

    }
    botonReiniciar.style.display = "block"
}


