const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

// dbUser5
// YNxxOM8L6Mky8r6i

app.get('/',(req,res)=>{
    res.send('api is running')
})
app.listen(port,()=>{
    console.log(port)
})