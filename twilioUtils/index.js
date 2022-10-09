const express= require ('express')
const client = require('twilio')('AC3b1d795d78f099f794b0d107a4c215ae','2426943a4ff0aab16bc89c4f0de486fd');
require("dotenv").config();
const app= express()
const PORT= 3001 


app.get("/",(req,res)=>{
    sendMessage();
    res.send(`
    <div style="text align-center; padding-top:40px;";>
    <h1> Thank you for using the Polished App</h1>
    <p> Please rate your experience </p>
    `)
}) 

app.listen(PORT, () => {
console.log(`Sample app listening at http://localhost:${PORT}`) 
})

function sendMessage(){ 
    client.messages
  .create({
     body: 'Thank you for using the Polished App please, rate your experience',
     from: '+16787838576',
     to: '+16784128322'
   })
  .then(message => console.log(message.sid));

} 
// console.log(process.env.twilio_api_key)