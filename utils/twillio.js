const express= require ('express')
require("dotenv").config();
const client = require('twilio')(process.env.twilio_api_key,process.env.twilio_api_token);
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