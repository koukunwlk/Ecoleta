// Importando a depedencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//Iniciar o cursor do banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//Utilizando o cursor para operações

db.serialize(()=>{
    /*//Usando SQL

    //1 Criando tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    //2 Inserir dados na tabela
    const query = `
    INSERT INTO places(
        image,
        name,
        address,
        address2,
        state,
        city,
        items

    ) VALUES(?,?,?,?,?,?,?);
    `
    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "Papersider",
        "Guilherme Gemballa, Jardim America",
        "Número 260",
        "Santa Catarina",
        "Rio do sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
            console.log("Cadastrado com sucesso")
            console.log(this)
    }
    db.run(query, values, afterInsertData)
    
    //4 Deletando Dados
    db.run(`DELETE FROM places`, function(err){
        if(err){
            console.log(err)
        }
        console.log('Registro deletado com sucesso')
    })

    *///3 Consultar dados na tabela
    db.all(`SELECT name FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("Aqui estão seus registros")
        console.log(rows)
    })
})




