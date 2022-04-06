const server = require('./src/server')
const PORT = process.env.PORT || 8080


server.on('MongoDbConnected', () => {

    server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}/`))

})