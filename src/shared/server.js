import app from "./app/app.js"

const port = 3000

// Setando nosso arquivo APP para ser ouvido pelo servidor
app.listen(port,()=>{
    console.log(`Servidor escutando em http://localhost:${port}`)
})