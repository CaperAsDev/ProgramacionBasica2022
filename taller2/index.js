const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
        this.duelo = []
    }
    asignarInvocacion(invocacion){
        this.invocacion = invocacion
    }

    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }

    ataquesRonda(obj){
        this.duelo.push(obj)
    }
}

class Invocaciones {
    constructor(nombre){
        this.nombre = nombre
    }
}

app.get("/unirse",(req, res) =>{
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send(id)
})

app.get("/selecciones",(req, res) =>{
    const nombres = jugadores.map(function(x){
        return x.invocacion
    })
    console.log(nombres)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send({
        nombres
    })
})

app.post("/prokemon/:jugadorId", (req,res)=>{
    const jugadorId = req.params.jugadorId ||""
    const name = req.body.prokemon || ""
    const invocation = new Invocaciones(name)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    console.log(jugadorIndex)
    if(jugadorIndex >= 0 ){
        jugadores[jugadorIndex].asignarInvocacion(invocation)
    }

    console.log(jugadores);
    res.end()
})

app.post("/prokemon/:jugadorId/posicion",(req,res)=>{
    const jugadorId = req.params.jugadorId ||""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >= 0 ){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemies = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemies
    })
})
app.post("/prokemon/:jugadorId/ataques",(req,res)=>{
    const jugadorId = req.params.jugadorId ||""
    let ronda = { }
    ronda.indexEl = req.body.indxEl || 0
    ronda.indexAtk = req.body.indxAtk || 0


    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >= 0 ){
        jugadores[jugadorIndex].ataquesRonda(ronda)
    }
    console.log(jugadores[jugadorIndex]);
    res.end()
})
app.get("/prokemon/:oponenteId/ataquesEnemigo",(req, res) => {
    const enemigoId = req.params.oponenteId ||""
    const enemigoIndex = jugadores.findIndex((jugador) => enemigoId === jugador.id)

    const ataquesEnemigos = jugadores[enemigoIndex].duelo

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send({ataquesEnemigos})
})



app.listen(8080, () => {
    console.log("servidor funcionando")
})