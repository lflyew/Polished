const express= require ('express')
const app= express()
const PORT= 3001

app.get("/",(req,res)=>{
    res.send(`
    <div style="text align-center; padding-top:40px;";>
    <h1> Welcome to the Polished Application</h1>
    <p> Please rate your experience </p>
    `)
}) 

app.listen(PORT, () => {
console.log(`Sample app listening at http://localhost:${PORT}`)
})