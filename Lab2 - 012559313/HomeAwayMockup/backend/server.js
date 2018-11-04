import * as User from './services/User'
import * as Property from './services/Property'
import * as Trip from './services/Trip'
import * as Image from './services/Image'
import * as Message from './services/Message'
import kafka from 'kafka-node'

const topic_list = {
  'user_register': User.register,
  'user_login': User.login,
  'user_profile': User.profile,
  'user_update': User.update,
  'property_post': Property.post,
  'property_search': Property.search,
  'trip_post': Trip.post,
  'trip_get': Trip.get,
  'trip_booking': Trip.booking,
  'image_get': Image.get,
  'msg_post': Message.post,
  'msg_get': Message.get,
  'msg_reply': Message.reply
}

const KAFKA_ADDRESS = "localhost:2181"

let client = new kafka.Client(KAFKA_ADDRESS)
let producer = new kafka.Producer(client);

let consumer = new kafka.Consumer(client, [
  {
    topic: 'user_register',
    partition: 0
  },
  {
    topic: 'user_login',
    partition: 0
  }, {
    topic: 'user_profile',
    partition: 0
  }, {
    topic: 'user_update',
    partition: 0
  }, {
    topic: 'property_post',
    partition: 0
  }, {
    topic: 'property_search',
    partition: 0
  }, {
    topic: 'trip_post',
    partition: 0
  }, {
    topic: 'trip_get',
    partition: 0
  }, {
    topic: 'trip_booking',
    partition: 0
  }, {
    topic: 'image_get',
    partition: 0
  }, {
    topic: 'msg_post',
    partition: 0
  }, {
    topic: 'msg_get',
    partition: 0
  }, {
    topic: 'msg_reply',
    partition: 0
  }
], { groupId: 'group1' })

// consumer.on('ready', () => console.log('ready'))
console.log('kafka server ready')
consumer.on('message', message => {
  let handleRequest = topic_list[message.topic]
  console.log('message received for', message.topic);
  let data = JSON.parse(message.value)
  console.log('message value:', data);
  handleRequest(data.data)
    .then(result => {
      let payloads = [{
        topic: data.replyTo,
        messages: JSON.stringify({
          correlationId: data.correlationId,
          data: result
        }),
        partition: 0
      }]
      producer.send(payloads, (err, data) => {
        console.log(data)
      })
    }).catch(err => console.error(err))
})
