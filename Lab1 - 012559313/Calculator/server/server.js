const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('port', process.env.PORT || 3001)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/api/calculate', (req, res) => {
  let results = eval(req.body.inputs.toString())
  res.json({ results })
})
app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))
