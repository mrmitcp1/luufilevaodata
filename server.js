let http = require('http')
let url = require('url')
let fs=require('fs')
let qs=require('qs')
let server = http.createServer(function (req, res) {
if (req.method==='GET'){
    fs.readFile('./templates/creat.html','utf-8',function (err, data) {
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data);
        res.end()
    })
} else {
    let data='';
    req.on('data',chunk => {
        data +=chunk;
    })
    req.on('end',()=>{
        console.log(data)
        let name = qs.parse(data).name
        fs.writeFile('./data/data.txt',name,function (err) {
            if (err){
                console.log(err.message)
            }
            res.end('thanh cong')
        })
    })
}
})
server.listen(8000,()=>{
    console.log('server running')
})