const http = require("http");
const fs = require("fs");
const requests = require("requests");
const { resolveAny } = require("dns");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, origVal) => {
  let temperature = tempVal.replace("{%temp%}", origVal.main.temp);
  temperature = temperature.replace("%temp_min%}", origVal.main.temp_min);
  temperature = temperature.replace("{%temp_max%}", origVal.main.temp_max);
  temperature = temperature.replace("{%city%}", origVal.name);
  temperature = temperature.replace("{%country%}", origVal.sys.country);
  temperature = temperature.replace("{%tempstatus%}", origVal.weather[0].main);
  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      "https://api.openweathermap.org/data/2.5/weather?q=midnapore&appid=181fb1b93f2c2ee2563652270cf35d2b"
    )
      .on("data", (chunk) => {
        let data = JSON.parse(chunk);
        let dataArr = [data];
        console.log(dataArr);
        const realTimeData = dataArr
          .map((val) => replaceVal(homeFile, val))
          .join("");
        res.write(realTimeData);
        console.log(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        console.log("end");
        res.end("");
      });
  }
});

server.listen(8080, () => {
  console.log("port 8080");
});
