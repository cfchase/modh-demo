import json


def inference(d):
    print(f'Executing Inference:')
    for key, value in d.items():
        if (isinstance(value, str) and len(value) > 40):
            print(f'{key}: {value[:20]}..{value[-20:]}')
        else:
            print(f'{key}: {value}')

    return {
        'sample': 'inference'
    }
