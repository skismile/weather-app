const http= require("http")
const fs = require("fs")
const requests = require("requests")


const homeFile = fs.readFileSync("home.html","utf-8")

const server =http.createServer((req,res)=>{

if(req.url=="/")
{
    requests('https://api.openweathermap.org/data/2.5/weather?q=midnapore&appid=181fb1b93f2c2ee2563652270cf35d2b')
    .on('data', (chunk)=> {
        let data=JSON.parse(chunk)
        let dataArr=[data]
      console.log(dataArr)
    })
    .on('end', (err) =>{
      if (err) return console.log('connection closed due to errors', err);
     
      console.log('end');
    });
}


})

server.listen(8080,()=>{
    console.log("port 8080")
})