const { connect } = require('mongoose')

const URI ="mongodb+srv://<brillian>:<VeT9Xvz2uKjSEgLK>@cluster0.cmlec.mongodb.net/brillio-db?retryWrites=true&w=majority"


connect(URI)
    .then(conn => console.log("MongoDB Connected...."))
    .catch(console.log)