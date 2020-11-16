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
                    'xMax': 0.8,
                    'xMin': 0.4,
                    'yMax': 0.6,
                    'yMin': 0.4
                },
                'class': 1,
                'label': 'dog',
                'score': 0.99
            }
        ]
    }

    return jsonify(d)
