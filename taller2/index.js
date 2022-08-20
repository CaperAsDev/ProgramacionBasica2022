const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }
    asignarInvocacion(invocacion){
        this.invocacion = invocacion
    }

    actualizarPosicion(x,y){
        this.x = x
        this.y = y
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



app.listen(8080, () => {
    console.log("servidor funcionando")
})