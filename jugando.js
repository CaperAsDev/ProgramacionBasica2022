/* primero vamos a generar las variables de los jugarores */

let jugador = document.getElementById("piedra").value;
console.log(jugador);

//El numero que eligira el computador es aleatoria asi que hacemos la funcion para generar ese numero

function aleatorio (min, max){
    return Math.floor(Math.random()* (max - min + 1) + min)
}

let computador = aleatorio ( 1, 3);
console.log( jugador, computador);

//Ahora vamos a escribir las condiciones de juego donde 1 = piedra, 2 = papel y 3 = tijera
function evaluar(){
    console.log("si funciona el boton")
    if(jugador == computador){
        alert(`Empate `)
    }else{
        alert("no es empate")
    }
}