from flask import Flask, request, jsonify
from flask_cors import CORS

from controller import get_schedule, get_videos
 
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins
 
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return 'Hello World'
 
@app.route('/generate', methods=["GET"])
def generate():
    desc = request.args.get('desc', default="nlp")
    level = request.args.get('level', default="beginner")
    weeks = request.args.get('weeks', default=4)

    sched = get_schedule(desc, level, weeks)

    response = {
        "desc": desc,
        "schedule": sched
    }

    print(response)
    return jsonify(response)

@app.route('/search', methods=["GET"])
def search():
    queries = request.args.get('queries')
    videos = get_videos(queries)
    return jsonify(videos)

# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run()
