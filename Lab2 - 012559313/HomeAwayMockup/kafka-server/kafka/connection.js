import kafka from 'kafka-node'

const KAFKA_ADDRESS = "localhost:2181"

class ConnectionProvider {
  getConsumer(topic_name) {
    if (!this.kafkaConsumerConnection) {
      this.client = new kafka.Client(KAFKA_ADDRESS)
      this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{
        topic: topic_name,
        partition: 0
      }])
      this.client.on('ready', () => console.log('consumer ready'))
    }
    return this.kafkaConsumerConnection
  }
  getProducer() {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.Client(KAFKA_ADDRESS)
      this.kafkaProducerConnection = new kafka.HighLevelProducer(this.client)
      this.client.on('ready', () => console.log('producer ready'))
    }
    return this.kafkaProducerConnection
  }
}

export default new ConnectionProvider()
