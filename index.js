const express = require('express');
const app = express();
const port = process.env.PORT || 3434

app.get('/',(req,res)=>{
    res.json({msg:'app is running'})
})

app.listen(port,()=>console.log(`app runing on port http://localhost:${port}`))