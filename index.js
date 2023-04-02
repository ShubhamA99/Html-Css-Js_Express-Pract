const express = require('express');
const chance = require("chance").Chance();
const shuffleArray = require("shuffle-array");

const app =express();

app.listen(8080, () => {
    console.log("App is Running");
})

app.use(express.static("view"))

const data ={
    headers :["Name","Age","Profession","country"],
    rows:new Array(10).fill(undefined).map(()=> {
        return [
            chance.name(),
            chance.age(),
            chance.profession(),
            chance.country({full:true})
        ];
    })
}

app.get("/data",(req,resp) =>{
    resp.json({
        headers:data.headers,
        rows:shuffleArray(data.rows),
        lastUpdated:new Date().toISOString()
    })
    resp.end();
})