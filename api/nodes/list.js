import { getNodes } from '../db.js'

export default async function handler(req, res) {
  const nodes = await getNodes()
  res.status(200).json(nodes)
}
