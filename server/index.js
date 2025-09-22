import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  const send = () => {
    const payload = JSON.stringify({ time: new Date().toISOString() })
    res.write(`data: ${payload}\n\n`)
  }
  send() // Send initial data immediately
  const interval = setInterval(send, 5000)
  req.on('close', () => {
    clearInterval(interval)
    console.log('Cleanup: Client disconnected')
  })
})
app.listen(4000, () => console.log('SSE server running on port 4000'))
