export default async function handler(req, res) {
  try {
    const response = await fetch('http://82.29.53.76:8080/')
    const text = await response.text()

    if (response.ok) {
      res.status(200).setHeader('Content-Type', 'text/plain').send(text)
    } else {
      res.status(response.status).send(`Error fetching from external server: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error fetching from external server:', error)
    res.status(500).send('Internal Server Error')
  }
}
