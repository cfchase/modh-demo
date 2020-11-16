#! /usr/bin/env python3

import argparse
import json
from kafka import KafkaProducer

KAFKA_BOOTSTRAP_SERVER = 'localhost:9092'
DATA_HUB_KAFKA_CA = 'data-hub-kafka-ca.crt'
TOPIC = 'images'

PAYLOAD = {'Hello': 'World'}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-b', '--bootstrap', default=KAFKA_BOOTSTRAP_SERVER)
    parser.add_argument('-c', '--cacert', default=DATA_HUB_KAFKA_CA)
    parser.add_argument('-t', '--topic', default=TOPIC)
    parser.add_argument('-p', '--payload', default=PAYLOAD)
    args = parser.parse_args()

    producer = KafkaProducer(bootstrap_servers=args.bootstrap,
                             api_version_auto_timeout_ms=30000,
                             max_block_ms=900000,
                             request_timeout_ms=450000,
                             acks='all')

    jsonpayload = args.payload
    if isinstance(jsonpayload, dict):
        jsonpayload = json.dumps(jsonpayload)
    producer.send(args.topic, jsonpayload.encode('utf-8'))
    producer.flush()


if __name__ == '__main__':
    main()
