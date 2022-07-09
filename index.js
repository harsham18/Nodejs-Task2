const express=require('express');

const users=require('./data').User;

const router=require('./route').router;
const app=express();
const PORT=4900;

app.use(express.json());

app.use('/',router);

app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT} to visit click on link 'http://localhost:${PORT}'`);
})