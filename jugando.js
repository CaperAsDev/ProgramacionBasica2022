/* primero vamos a generar las variables de los jugarores */

let jugador = 0;
let computador = 0;
let escogida = ["Piedra","Papel","Tijera"];

//El numero que eligira el computador es aleatoria asi que hacemos la funcion para generar ese numero

function aleatorio (min, max){
    return Math.floor(Math.random()* (max - min + 1) + min)
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

    const seleccionado = arrayOpciones.findIndex((fruit) => fruit.checked === true);

//Ahora pasamos el numero del index(seleccionado) a nuestra variable jugador

jugador = seleccionado;

//Evaluando jugada

    if(jugador == computador){
        alert(`🤬 Empate: Ambos escogieron ${escogida[jugador]} `)
    }else if(jugador == 0 && computador == 2){
       return alert(`🥳 Le ganaste con tu poderosa ${escogida[jugador]} a la debil ${escogida[computador]} del computador` );
    }
    else if(jugador == 1 && computador == 0){
       return alert(`🤩 Le ganaste con tu poderoso ${escogida[jugador]} a la debil ${escogida[computador]} del computador`);
    }
    else if(jugador == 2 && computador == 1){
       return alert(`😎 Le ganaste con tu poderosa ${escogida[jugador]} al debil ${escogida[computador]} del computador`);
    }else{
        return alert(`😈 Destrozaron tu triste ${escogida[jugador]} con la vieja confiable ${escogida[computador]} del computador`)
    }
}