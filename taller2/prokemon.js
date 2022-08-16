/* Si Necesitara un contador lo haria de esta forma junto a un intervalo seteado por segundo
let contador = 0;
function contando(){
    contador++
    console.log(contador)
} 
intervalo = setInterval(contando,1000); */

//Ponemos un event listener en window que reconozca cuando la pagina ya ha cargado por completo.El evento ejecuta iniciarJuego 
window.addEventListener('load', iniciarJuego)
    
//Empiezo iniciando el juego; oculto las secciones que aun no necesitamos, asi que esta seria como la pagina de inicio de la partida.
function iniciarJuego(){
    seccionSeleccionAtaque.style.display = "none";
    estadoDuelo.style.display = "none";
    botonReiniciar.style.display = "none";  
    sectionVerMapa.style.display ='none'; 
}
//Funcion para selecciones aleatorias
function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}
/* En este caso traje cada input por aparte para meterlo en un array, esto es similar a traerlos con un selector de etiqueta o clase, solo que tendria que convertir el nodeList que me devuleve en un array normal.. el resto es lo mismo. 

Aunque viendo como luego tengo que adicionarle las mismas propiedades a cada invocacion, puede ser mejor hacer una plantilla de clase con todas las propiedades */
    /* class Personaje {
        constructor(nombre,vida,defensa,elemento,cardOverlay,cardBackgroundImg,miniatura){
            this.nombre = nombre
            this.vida = vida
            this.defensa = defensa
            this.elemento = elemento
            this.cardOverlay = cardOverlay
            this.cardBackgroundImg = cardBackgroundImg
            this.ataques = []
            this.miniatura = new Image()
            this.miniatura.src = miniatura
        }
    }
    let Tayri = new Personaje('Tairy',5,5,'Naturaleza',"link...","otroLink...","unLinkMas...") */
//Traigo mis inputs y secciones ademas de crear las variables globales que usare
let sammy = document.getElementById("sammy") ;
let amalthea = document.getElementById("amalthea") ;
let ashley = document.getElementById("ashley") ;
let rondas = 1;
let cora ="❤️";
let escudo = "🛡"
let choqueStatus = false;
let finDelJuego = false;
let ganador ;

const seccionSeleccion = document.getElementById("seleccion_prokemon");
const seccionSeleccionAtaque = document.getElementById("seleccion_ataque");
const estadoDuelo = document.getElementById("estado-duelo");
const botonReiniciar = document.getElementById("boton-reiniciar");
const cardsSummonedSection = document.querySelector(".cards_summoned");
const botonSeleccionInv = document.getElementById("boton-invocar");
const divEstadisticas = document.querySelector('div[class="estadisticas_invocaciones"]');
const divRondas = document.querySelector('div[class="estado-duelo_rondas"]');
const sectionVerMapa = document.getElementById("zona-mapa");
const mapa = document.getElementById("mapa");

let lienzo = mapa.getContext("2d");
let intervalo;
let interMovEnem 

    //meto mis inputs en un array para luego recorrerlos y buscar cual tiene su atributo checked en true.
    let invocaciones = [sammy, amalthea, ashley];
    let enemigos
    //Creo las propiedades que necesito de cada personaje (tal vez metiendo todo en un objeto y luego metiendo el objeto al imput como propiedad ahorraria un poco de espacio, lo escribiria con una funcion creadora de objetos.)
    invocaciones[0].vida = 6;
    invocaciones[0].defensa = 4;
    invocaciones[0].nombre = "🧛‍♀️ Sammy";
    invocaciones[0].imgMin = new Image();
    invocaciones[0].imgMin.src = "https://i.postimg.cc/cCSjQ7d3/sammy.png";
    invocaciones[0].x = aleatorio(10,500);
    invocaciones[0].y = aleatorio(10,180);
    invocaciones[0].velX = 0;
    invocaciones[0].velY = 0;
    invocaciones[0].cardCode = `\n <div class=\"summon_card\" id=\"sammy_card\">\n <section class=\"card_info\">\n <p class=\"summon_name\">Sammy</p>\n <div class=\"card_icons\">\n<div class=\"heart_icon\">\n<p id=\"lifes_number\">6</p>\n </div> \n<div class=\"element_icon\" id=\"sammy_element-icon\"></div>\n<div class=\"shield_icon\">\n <p id=\"shield_number\">4</p>\n</div>\n</div>\n </section>\n</div>\n`;
//Hay que tranajar en las cards y hacerlas lo mas simplificada posible.
    invocaciones[1].vida = 7;
    invocaciones[1].defensa = 2;
    invocaciones[1].nombre = "♑️ Amalthea";
    invocaciones[1].imgMin = new Image();
    invocaciones[1].imgMin.src = "https://i.postimg.cc/65xbShJ4/amalthea.png";
    invocaciones[1].x = aleatorio(200,500);
    invocaciones[1].y = aleatorio(150,350);
    invocaciones[1].velX = 0;
    invocaciones[1].velY = 0;
    invocaciones[1].ancho = 70;
    invocaciones[1].alto = 80;
    invocaciones[1].cardCode = `\n <div class="summon_card" id="amalthea_card">\n <section class="card_info">\n<p class="summon_name">Amalthea</p>\n <div class="card_icons">\n<div class="heart_icon">\n <p id="lifes_number">7</p>\n </div>\n <div class="element_icon" id="amalthea_element-icon"></div>\n<div class="shield_icon">\n<p id="shield_number">2</p>\n</div> \n </div>\n </section>\n </div>\n`;

    invocaciones[2].vida = 4;
    invocaciones[2].defensa = 6;
    invocaciones[2].nombre = "🧚🏽‍♀️ Ashley";
    invocaciones[2].imgMin = new Image;
    invocaciones[2].imgMin.src = "https://i.postimg.cc/nzYTfyts/ashley.png";
    invocaciones[2].x = aleatorio(10,500);
    invocaciones[2].y = aleatorio(10,350);
    invocaciones[2].velX = 0;
    invocaciones[2].velY = 0;
    invocaciones[2].cardCode = `\n<div class="summon_card" id="ashley_card">\n<section class="card_info">\n<p class="summon_name">Ashley</p>\n<div class="card_icons">\n<div class="heart_icon">\n<p id="lifes_number">4</p>\n</div>\n<div class="element_icon" id="ashley_element-icon"></div>\n<div class="shield_icon">\n<p id="shield_number">6</p>\n</div>\n</div>\n</section>\n</div>\n`;

    //Mis Arrays de ataque por Elemento, los creo y pongo en un array

    const ataquesAgua = [
        {nombreAtaque: "💧Gancho de Nautilus", daño:2, defensa:0},
        {nombreAtaque: "💧Oleada de Nami", daño:1, defensa:2},
        {nombreAtaque: "💧Azote de Nilah", daño:3, defensa:0},
        {nombreAtaque: "💧Tiburon de Fizz", daño:2, defensa:1},
        {nombreAtaque: "💧Tormenta de Anivia", daño:2, defensa:2}
    ];
    const ataquesFuego = [
        {nombreAtaque: "🔥Cohete de Corki", daño:2, defensa:0},
        {nombreAtaque: "🔥Forja de Ornn", daño:1, defensa:2},
        {nombreAtaque: "🔥Explosion de Brand", daño:3, defensa:0},
        {nombreAtaque: "🔥Rafaga de Annie", daño:2, defensa:1},
        {nombreAtaque: "🔥Levantamiento de Shyvana", daño:2, defensa:2}
    ];
    const ataquesTierra = [
        {nombreAtaque: "🪨Trampas de Taliyah", daño:2, defensa:0},
        {nombreAtaque: "🪨Invocacion de Galio", daño:1, defensa:2},
        {nombreAtaque: "🪨Embestida de Malphite", daño:3, defensa:0},
        {nombreAtaque: "🪨Estampida de Alistar", daño:2, defensa:1},
        {nombreAtaque: "🪨Tumba de Lissandra", daño:2, defensa:2}
    ];
    const ataquesNaturaleza = [
        {nombreAtaque: "🌿Golem de Ivern", daño:2, defensa:0},
        {nombreAtaque: "🌿Enrredadera de Maokai", daño:1, defensa:2},
        {nombreAtaque: "🌿Lanza de Nidalee", daño:3, defensa:0},
        {nombreAtaque: "🌿Palazo de Lilia", daño:2, defensa:1},
        {nombreAtaque: "🌿Surgimiento de Zyra", daño:2, defensa:2}
    ];
    const ataquesMetal = [
        {nombreAtaque: "⚒️Pinzas de Blitzcrank", daño:2, defensa:0},
        {nombreAtaque: "⚒️Montura de Rell", daño:1, defensa:2},
        {nombreAtaque: "⚒️Descarga de Urgot", daño:3, defensa:0},
        {nombreAtaque: "⚒️Maniobras de Camile", daño:2, defensa:1},
        {nombreAtaque: "⚒️Puñetazo de Vi", daño:2, defensa:2}
    ];
    const ataquesObj = [ataquesAgua, ataquesFuego, ataquesTierra, ataquesNaturaleza, ataquesMetal];
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
    seccionSeleccion.style.display = "none";
    /*     seccionSeleccionAtaque.style.display = "flex"; */  

    leerSeleccion_p1();
    moviendoEnCanva();
    seleccionInvocacion_p2();
    imprimirEstadisticasIniciales();
    IndiceEnemigos();

    cardsSummonedSection.innerHTML += invocaciones[indiceInvocacion_p1].cardCode;
    cardsSummonedSection.innerHTML +=`<p class="vs" >VS</p>`
    cardsSummonedSection.innerHTML += invocaciones[indiceInvocacion_p2].cardCode;
    /*Asi se deshabilita un input: ashley.disabled = true; */
}

//mi funcion para seleccion e impresion en HTML de invocacion aleatoria para el atacante_p2
function seleccionInvocacion_p2(){
    indiceInvocacion_p2 = aleatorio(0,invocaciones.length -1);
    while(indiceInvocacion_p2 == indiceInvocacion_p1){
        indiceInvocacion_p2 = aleatorio(0,invocaciones.length -1);
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
    indiceElemento_p2 = aleatorio(0,ataquesObj.length -1);
    indiceAtaque_p2 = aleatorio(0,ataquesObj[indiceElemento_p2].length -1);
    indiceAtaque_p1 = aleatorio(0,ataquesObj[indiceElemento_p1].length -1);

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
//Funcion que se llama en dueloRonda cuando algun jugador llega a 0 en vida. Imprime el mesaje final sobre el resultado del duelo
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

/* Funciones para la seccion del canva(mapa de juego)*/

//Esta funcion es llamada en seleccionInvocacion junto con otras que dan inicio a la siguiente seccion del juego, desde esta funcion se llaman las otras funciones de canva.
function moviendoEnCanva(){
    mapa.width = 550
    mapa.height = 400
    sectionVerMapa.style.display = 'flex';
    intervalo = setInterval(pintarPersonaje,50);
    interMovEnem = setInterval(movEnemigos,50)

    window.addEventListener('keydown', keyPressed)
    window.addEventListener('keyup', detenerMov)
}
///Esta funcion se llama en la funcion moviendoEnMapa por el intervalo seteado cada 50 miliSegundo y lo que hace es mover nuestro personaje segun la tecla oprimida 5 px por cada 50ms
function pintarPersonaje(){
    invocaciones[indiceInvocacion_p1].x += invocaciones[indiceInvocacion_p1].velX
    invocaciones[indiceInvocacion_p1].y += invocaciones[indiceInvocacion_p1].velY
    lienzo.clearRect(0,0,mapa.width,mapa.height);
    lienzo.drawImage(invocaciones[indiceInvocacion_p1].imgMin,invocaciones[indiceInvocacion_p1].x,invocaciones[indiceInvocacion_p1].y,invocaciones[1].ancho,invocaciones[1].alto);
    lienzo.drawImage(enemigos[0].imgMin,enemigos[0].x,enemigos[0].y,invocaciones[1].ancho,invocaciones[1].alto);
    lienzo.drawImage(enemigos[1].imgMin,enemigos[1].x,enemigos[1].y,invocaciones[1].ancho,invocaciones[1].alto);
    if(!choqueStatus){
        controlChoques(0);
        controlChoques(1);
    }

    // lienzo.fillRect(5,15,20,40);
}
//Esta funcion se activa con el eventListener de KeyUp haciendo que se seteen los valores de movimiento en 0, si esto no estuvera el perosnaje se seguiria moviendo infinitamente.
function detenerMov(){
    invocaciones[indiceInvocacion_p1].velX = 0
    invocaciones[indiceInvocacion_p1].velY = 0
}
//Esta funcion la activa el eventListener de KeyDown asi que cuando alguna de nuestras teclas programadas es oprimida cambia la direccion de movimiento
function keyPressed(event){
    console.log(event)
    if (choqueStatus) {
        return
    } else {
        switch (event.key) {
            case 'ArrowUp':
            invocaciones[indiceInvocacion_p1].velY = -10
            break;
            case 'ArrowDown':
            invocaciones[indiceInvocacion_p1].velY = 10
            break;
            case 'ArrowLeft':
            invocaciones[indiceInvocacion_p1].velX = -10
            break;
            case 'ArrowRight':
            invocaciones[indiceInvocacion_p1].velX = 10
            break;
            
            default:
                break;
        }
    }
}
//Esta funcion filtra el array de invocaciones y me crea un array enemigos, ellos son los que se pintaran en el mapa. esta funcion se invoca en seleccionInvocacion.
function IndiceEnemigos (){
    enemigos = invocaciones.filter(function(pj){
        return pj.nombre != invocaciones[indiceInvocacion_p1].nombre
    })
    enemigos[0].velY = -2
    enemigos[0].velX = -3
    enemigos[1].velX = 2
    enemigos[1].velY = 3
}
//Esto hace que mis enemigos se muevan de manera contante en diferentes direcciones, ya que esta funcion es invocada con un intervalo y el movimiento esta dirigido por la funcion que sigue.
function movEnemigos (){
    enemigos[0].x += enemigos[0].velX
    enemigos[0].y += enemigos[0].velY

    enemigos[1].x += enemigos[1].velX
    enemigos[1].y += enemigos[1].velY

    controlMovEnem(0)
    controlMovEnem(1)  
}
//Esta funcion controla que los personajes no se salgan del mapa y que cuando toquen el borde se vayan en la direccion contraria, el movimiento que siguen es siempre en diagonal porque el choque contra el borde solo setea un eje el otro sigue con la direccion inicial, asi que al los dos ejes tener un valor diferente de 0 sus movimientos son en diagonal.
function controlMovEnem (index){
    if(enemigos[index].x < 0 ){
        enemigos[index].velX = aleatorio(7,25)
        enemigos[index].velY += aleatorio(-5,5)
    }
    if (enemigos[index].x > 480) {
        enemigos[index].velX = aleatorio(-7,-25)
        enemigos[index].velY += aleatorio(-5,5)
    }
    if (enemigos[index].y < 0) {
        enemigos[index].velY = aleatorio(7,25)
        enemigos[index].velX += aleatorio(-5,5)
    }
    if (enemigos[index].y > 315) {
        enemigos[index].velY = aleatorio(-7,-25)
        enemigos[index].velX += aleatorio(-5,5)
    }
}
//controlChoques lee con condicionales si se cumple ciertos casos evaluando sus coordenadas
function controlChoques(index){
    if (
        invocaciones[indiceInvocacion_p1].y > enemigos[index].y + invocaciones[1].alto ||
        invocaciones[indiceInvocacion_p1].y + invocaciones[1].alto < enemigos[index].y ||
        invocaciones[indiceInvocacion_p1].x > enemigos[index].x + invocaciones[1].ancho ||
        invocaciones[indiceInvocacion_p1].x + invocaciones[1].ancho < enemigos[index].x
        ) {
        return
    }else{
        detenerMovEnem(0)
        detenerMovEnem(1)
        console.log(`Te estrellaste contra ${enemigos[index].nombre}`);
        return
    }
}
//Detiene el movimiento de los enemigos cuando ocurre el choque
function detenerMovEnem(index){
    enemigos[index].velX = 0
    enemigos[index].velY = 0
    choqueStatus = true;
}