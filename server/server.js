// Server-side global variables
require(`dotenv`).config({path:`./config/.env`})


// Database
require(`./config/db`)


// Express
const express = require(`express`)
const app = express()

app.use(require(`body-parser`).json())
app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))

// let PORT
// if(process.env.NODE_ENV === "production") // gcloud production mode
// {
//     PORT = process.env.PORT    // Port is automatically set by gcloud and stored in the environment variable "process.env.PORT"
// }
// else // development mode
// {
//     console.log("Development mode. Running on local host server")
//     require(`dotenv`).config({path:`./config/.env`})     // Cannot have .env in gcloud
//     app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))  //  not needed in gcloud PORT = process.env.SERVER_PORT
// }

// Routers
app.use(require(`./routes/products`))
app.use(require(`./routes/users`))
app.use(require(`./routes/sales`))

// Port
app.listen(process.env.SERVER_PORT, () =>
{
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})
 // Port
// app.listen(PORT, () =>
// {
//     console.log(`Connected to port  ${PORT}`)
// })

// Error 404
app.use((req, res, next) => {next(createError(404))})

// Other errors
app.use(function (err, req, res, next)
{
    console.error(err.message)
    if (!err.statusCode) 
    {
        err.statusCode = 500
    }
    res.status(err.statusCode).send(err.message)
})

