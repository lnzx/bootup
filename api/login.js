export default function handler(req, res) {
  const body = req.body
  if (body && body.username == process.env.USERNAME && body.password == process.env.PASSWORD) {
    let token = 'TK'
    for (var i = 0; i < 4; i++) {
      token += '-' + (Math.floor(Math.random() * (1000 - 9999)) + 9999)
    }
    return res.json({ token: token })
  }
  return res.json({})
}
