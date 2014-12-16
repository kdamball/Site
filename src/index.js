var server = require("./server/server"),
    request = require("./request/requestHandler");

server.app.listen(1337, function(){
    console.log('Server running on port 1337');
});