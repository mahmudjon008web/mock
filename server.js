const express = require("express")
require("dotenv").config()
const app = express()
const db = require("./models/index")
require("colors")
const cors = require("cors")
const { registerAdmin } = require("./controllers/admin/admin.controller")
const path = require("path")
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`)
    }
  }
  next()
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/audios", express.static(path.join(__dirname, "public/audios")));
app.use(cors({
    origin: "*"
}))

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IELTS MOCK API',
      version: '1.0.0',
      description: 'O‘quv markazlar uchun IELTS MOCK API hujjati',
    },
    servers: [
      {
        url: 'https://mock-o6f6.onrender.com',
        description: "Production"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ['./routes/*.js', './controllers/*.js'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use("/api", require("./routes"))
app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Bu IELTS MOCK uchun API"
    })
})

app.use((req, res)=>{
  res.status(404).json({
    message: `Searching page...           [██████████] 100%           Result: 4̷0̷4̷ P̷A̷G̷E̷ ̷N̷O̷T̷ ̷F̷O̷U̷N̷D̷`
  })
})

const PORT = process.env.PORT
const start = async ()=>{
    await db.sequelize.sync({force: false})
    await registerAdmin()
    app.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`.bgGreen);
    })
}
start()