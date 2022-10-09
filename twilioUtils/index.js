const express= require ('express')
const client = require('twilio')('AC3b1d795d78f099f794b0d107a4c215ae','2426943a4ff0aab16bc89c4f0de486fd');
const app= express()
const PORT= 3001 


app.get("/",(req,res)=>{
    sendMessage();
    res.send(`
    <div style="text align-center; padding-top:40px;";>
    <h1> Welcome to the Polished Application</h1>
    <p> Please rate your experience </p>
    `)
}) 

app.listen(PORT, () => {
console.log(`Sample app listening at http://localhost:${PORT}`) 
})

function sendMessage(){

}