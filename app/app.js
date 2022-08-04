const express =  require("express")
const parser =  require("body-parser")
const request =  require("request")

const app = express()

app.use(express.static("public"))
app.use(parser.urlencoded({extended: true}))

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/" ,function(req,res){

    if(res.statusCode == 200){
        res.sendFile(__dirname + "/failure.html")
    }
    else
    {
        res.sendFile(__dirname + "/failure.html")
    }

})


app.listen(3000 , function(req,res){
    console.log("Server is running at port 3000")
})
