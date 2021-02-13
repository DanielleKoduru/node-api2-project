// require your server and launch it here
const server = require("./api/server")

server.listen(3001, () => {
	console.log("running at http://localhost:3001")
})