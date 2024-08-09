from flask import Flask, request, jsonify
from controller import get_schedule
 
app = Flask(__name__)
 
# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return 'Hello World'
 
@app.route('/generate', methods=["GET"])
def generate():
    # content = request.json['content']
    param = request.args.get('param', default="nlp")
    sched = get_schedule(param)

    response = {
        "message": "idk",
        "param": param,
        "val": sched.weeks[0].topic
    }
    return jsonify(response)

# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run()
