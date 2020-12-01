import sys
import time
from flask import jsonify
from api.v1 import v1


@v1.route('/object-detection', methods=['POST'])
def object_detection():
    d = {
        'detections': [
            {
                'box': {
                    'xMax': 0.4,
                    'xMin': 0.2,
                    'yMax': 0.4,
                    'yMin': 0.2
                },
                'class': 1,
                'label': 'dog',
                'score': 0.99
            }, {
                'box': {
                    'xMax': 0.8,
                    'xMin': 0.6,
                    'yMax': 0.8,
                    'yMin': 0.6
                },
                'class': 2,
                'label': 'cat',
                'score': 0.98
            }
        ]
    }

    return jsonify(d)
