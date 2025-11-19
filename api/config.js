import mysql from 'mysql2/promise'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://web-ten-pi-26.vercel.app',
  // Add the deployed frontend origin used in the project so cross-origin requests
  // from the UI can send cookies and be accepted by the API.
  'https://web-api-orpin.vercel.app'
]
export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      // Permitir solicitudes desde los orígenes permitidos o solicitudes sin origen (como las de herramientas de prueba)
      callback(null, true)
    } else {
      // Bloquear solicitudes desde orígenes no permitidos
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,// Permite enviar cookies en solicitudes
  cookies: true
}

export const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})


export const session = (req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jsonwebtoken.verify(token, process.env.SECRET)
    req.session.user = data
  } catch { }
  next()
}
