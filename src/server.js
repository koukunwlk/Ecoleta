const express = require("express")
const server = express()

// Iniciando banco de dados
const db = require("./database/db")
//Configurar pasta publica
server.use(express.static("public"))

//Recebendo o body da requisição

server.use(express.urlencoded({extended: true}))


//Utilizando template engine

const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})


//Caminhos
//Page Home
server.get("/", (req, res) => {
    return res.render("index.html")
})
server.get("/create-point", (req, res) => {
    req.query
    return res.render("create-point.html",)
})
server.post("/savepoint", (req, res) => {
    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES(?,?,?,?,?,?,?)
             `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.stateName,
        req.body.city,
        req.body.items
    ]        
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no Cadastro!!")
        }
        console.log("Cadastrado com sucesso")
        return res.send("create-point.html", {saved: true})
    }
    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {

    const search = req.query.search
    if(search == ""){
        //pesquisa vazía
        return res.render("search-results.html", {total: 0})
    }
    //pegar dados no banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length
        return res.render("search-results.html", {places: rows, total})
    })
})
//Ligar o server
server.listen(3000);