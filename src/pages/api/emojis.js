export default function handler(req, res) {
  let body = JSON.parse(req.body);
  let emojis = Object.values(body);
  res.status(200).json(emojis);
}
