const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
	res.sendFile(__dirname + "/index.html")

});

app.post("/",function(req,res){
	const query=req.body.cityName;
	const unit ="metric";
	const appid ="28b887be77473d0a503fca3b042a6186"
const url="https://api.openweathermap.org/data/2.5/weather?appid="+ appid +"&q=" + query + "&units="+ unit;
https.get(url,function(response){	
	console.log(response.statusCode);

	response.on("data", function(data){
		const weatherData=JSON.parse(data)
		const temp=weatherData.main.temp
		const icon=weatherData.weather[0].icon
		const imgUrl="http://openweathermap.org/img/wn/" + icon +"@2x.png"
		const description=weatherData.weather[0].description
	res.write("<p>The weather is " + description + "</p>");		
	res.write("<h1><em>The temperature in " + query + " is:" + temp +" degrees celsius</em></h1>");
	res.write("<img src=" + imgUrl + ">"); 
	res.send();
   })
  })
})



app.listen(3000,function(){
console.log("Server is running on 3000");
})