import json
import os
from urllib.request import urlopen
from flask import Flask, jsonify, request

app = Flask(__name__, static_url_path='', static_folder='public')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))

URL = ("http://actuary-development.policygenius.com/policies"
       "?date_of_birth=1980-01-21"
       "&gender=male"
       "&health_profile%5Bcurrently_uses_tobacco%5D=false"
       "&health_profile%5Bheight_feet%5D=5"
       "&health_profile%5Bheight_inches%5D=8"
       "&health_profile%5Bhistory_of_tobacco_use%5D=false"
       "&health_profile%5Bweight%5D=180"
       "&policy_profile%5Bcoverage_amount%5D={coverage_amount}"
       "&policy_profile%5Bterm_in_years%5D=30"
       "&state_code=TX")


@app.route('/api/policies', methods=['GET'])
def comments_handler():
    coverage_amount = request.args.get('coverage_amount', 700000)
    response = urlopen(URL.format(coverage_amount=coverage_amount))
    json_data = str(response.read().decode('utf-8'))
    data = json.loads(json_data)

    return jsonify(**data)

if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 3000)))
