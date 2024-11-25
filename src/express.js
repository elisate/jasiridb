import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

// Parse body params and attach them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// Secure apps by setting various HTTP headers
app.use(helmet())
// Enable CORS - Cross-Origin Resource Sharing
app.use(cors())

// Serve static files (if needed)
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// Serve static files from the 'public' folder
app.use(express.static(path.join(process.cwd(), 'public')));

// Mount API routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', postRoutes)

// Catch unauthorized errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  } else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
})

export default app
