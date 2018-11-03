import KafkaRPC from './kafkarpc'

let rpc = new KafkaRPC()

export default function make_request(queue_name, msg_payload) {
  return new Promise((res, rej) => {
    console.log('in make request')
    console.log(queue_name);
    console.log('msg_payload')
    rpc.makeRequest(queue_name, msg_payload)
      .then(data => {
        console.log('response', data)
        res(data)
      }).catch(err => console.error(err))
  })
}
