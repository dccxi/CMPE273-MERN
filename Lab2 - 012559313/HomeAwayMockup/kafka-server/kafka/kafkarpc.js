import crypto from 'crypto'
import ConnectionProvider from './connection'

const TIMEOUT = 8000

export default class KafkaRPC {
  constructor() {
    this.connection = ConnectionProvider
    this.requests = {}
    this.response_queue = false
    this.producer = this.connection.getProducer()
  }

  makeRequest(topic_name, content) {
    return new Promise((res, rej) => {
      let correlationId = crypto.randomBytes(16).toString('hex')
      let tId = setTimeout(cId => {
        console.log('timeout')
        rej(new Error('timeout ' + cId))
        delete this.requests[cId]
      }, TIMEOUT, correlationId)

      let entry = {
        resolve: res,
        reject: rej,
        timeout: tId
      }
      this.requests[correlationId] = entry
      this.setupResponseQueue(this.producer, topic_name, () => {
        console.log('in response')
        let payloads = [
          {
            topic: topic_name,
            messages: JSON.stringify({
              correlationId,
              replyTo: 'response_topic',
              data: content
            }),
            partition: 0
          }
        ]
        console.log(payloads);
        console.log('is producer ready?', this.producer.ready)
        this.producer.send(payloads, (err, data) => {
          console.log('in producer send')
          if (err)
            console.log(err)
          console.log(data)
        })
      })
    })
  }

  setupResponseQueue(producer, topic_name, next) {
    if (this.response_queue)
      return next()
    console.log('setting up response queue')
    let consumer = this.connection.getConsumer('response_topic')
    consumer.on('message', message => {
      console.log('msg received')
      let data = JSON.parse(message.value)
      let { correlationId } = data
      if (correlationId in this.requests) {
        let entry = this.requests[correlationId]
        clearTimeout(entry.timeout)
        delete this.requests[correlationId]
        entry.resolve(data.data)
      }
    })
    this.response_queue = true
    console.log('returning next')
    return next()
  }
}
