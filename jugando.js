/* primero vamos a generar las variables del programa */

let jugador = 0;
let computador = 0;
let escogida = ["🪨","🧻","✂️"];
let ganadas = 0;
let perdidas = 0;
let rondas = 3;

// le preguntaremos al jugador cuantas rondas quiere jugar. Asi que el primero en llegar a ese numero sera el ganador

//rondas = prompt("¿Cuantas rondas quieres jugar?");

//El numero que eligira el computador es aleatoria asi que hacemos la funcion para generar ese numero

function aleatorio (min, max){
    return Math.floor(Math.random()* (max - min + 1) + min)
}

//vamos a hacer el contador en HTML
function contador (id, contando){
     document.getElementById(id).textContent= `${contando}`;   
}

//Ahora haremos la funcion que activara el boton jugar de nuestra pagina

function evaluar(){
    //Con cada click queremos un nuevo numero aleatorio para la seleccion del computador
        computador = aleatorio(0,2);
        console.log(escogida[computador]);

    //Esto me trae un nodeList con los imputs que en su atributo name son iguales a "seleccion" de nuestro html, este nodelist parece un array pero no lo es asi que debo convertirlo a array.

        let nodeList = document.querySelectorAll('input.seleccion');
        let arrayOpciones = Array.apply(null, nodeList);
        // console.log(arrayOpciones);

    //Traer el index de la opcion del array que tenga su propiedad checked en true

        const seleccionado = arrayOpciones.findIndex((opcion) => opcion.checked === true);

    //Ahora pasamos el numero del index(seleccionado) a nuestra variable jugador

        jugador = seleccionado;

    //Evaluando jugada

        if(jugador == computador){
            alert(`🤬 Empate: Ambos escogieron ${escogida[jugador]} `)
        }else if(jugador == 0 && computador == 2 || jugador == 1 && computador == 0 || jugador == 2 && computador == 1){
            ganadas ++
            contador("contador_ganadas-numero", ganadas);
        alert(`🥳 Le ganaste con tu poderosa ${escogida[jugador]} a la debil ${escogida[computador]} del computador` );
        }
        else{
            perdidas ++
            contador("contador_perdidas-numero", perdidas);
            alert(`😈 Destrozaron tu triste ${escogida[jugador]} con la vieja confiable ${escogida[computador]} del computador`)
        }
   
        console.log(`ganadas: ${ganadas} perdidas: ${perdidas} vs ${rondas}`);
    //Ahora pondremos una condicional que nos diga cuando tenemos un ganador, esto dependera de la cantidad de rondas que haya escogido el jugador

        if(ganadas == rondas || perdidas == rondas){
            if(ganadas > perdidas){
                alert("¡Ganaste!")
                ganadas = 0;
                perdidas = 0;
            }else{
                alert("¡Perdiste!")
                ganadas = 0;
                perdidas = 0;
            }
        }
        
}

//Haciendo la funcion reinciar
function reiniciar(){
    ganadas = 0;
    perdidas = 0;
    contador("contador_ganadas-numero", ganadas);
    contador("contador_perdidas-numero", perdidas);
    rondas = prompt("¿Cuantas rondas quieres jugar?");

}

