const request = require('request');
const cheerio = require('cheerio');
const express = require('express')
var app = express();
app.use(express.urlencoded());
app.use(express.json());
app.get('/', function (req, res) { 
  res.send(`
  <h1>http://truyendoc.info/</h1>
  <form method="POST" action="/">
  <input type="text" name="name" placeholder="khai báo link truyện tại đây" style="width:100%"> <br>
  <input type="submit" value="bấm vào đây để Đọc" style="width:30%">
</form>
  `)
})
app.post('/', function (req, res) {
  var options = {
    url: req.body.name ,
    method: 'GET', 
    headers: {
      'User-Agent': 'Super Agent/0.0.1' , 
      'Content-Type' : 'application/x-www-form-urlencoded'
    } , 
    qs:{'key1' :  'xxx' , 'key2': 'yyy'}
  };
  var ds ;
  var html = '';
  var input = '';
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
       ds = $(body).find(".main_img");
       dsn = $(body).find(".next_page");
       var index = 0;
       var str = '';
      ds.each(function(i , e){
        html += ` <img src="${e["attribs"]["src"]}" alt="" style="width:60%">`
      })
      dsn.each(function(i , e){
        index++;
        if(index == 1 || index == 3) {
          str = "tập trước"
        }else {
          str = "tập sau"
        }
        input += `<form method="POST" action="/"><button type="submit">${str}</button> <input type="text" id="lname" name="name" value='${e["attribs"]["href"]}' style="width:90%"><br></form>`
     })
    }
  })
  setTimeout(() => {
    console.log(input)
    res.send(input + html + input);
  }, 1000);
})
app.listen(3000 , function(){
  console.log("port 3000")
})