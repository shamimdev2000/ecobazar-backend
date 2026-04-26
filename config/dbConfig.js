const { default: mongoose } = require("mongoose")

const dbConfig = () =>{
    mongoose.connect("mongodb+srv://ecobazar:UwPjK1OSmX42Ltgs@cluster0.ximzfxf.mongodb.net/ecobazar?appName=Cluster0") .then(()=>{
        console.log("Database Connected");
        
    })
}
module.exports = dbConfig