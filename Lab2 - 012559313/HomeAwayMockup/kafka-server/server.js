import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import { user, property, trip, image, message } from './routes/index'

const app = express()

app.set('port', process.env.PORT || 3001)

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', user)
app.use('/property', property)
app.use('/image', image)
app.use('/trip', trip)
app.use('/message', message)

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`))
