from bottle import route, run, static_file, request

@route('')
def time():
    return static_file("main.html", root='.')

@route('/')
def time():
    return static_file("main.html", root='.')

@route('/main.js')
def time():
    return static_file("main.js", root='.')

@route('/main.js/')
def time():
    return static_file("main.js", root='.')

@route('/newAlarm', method='POST')
def index():
    for l in request.body:
        print(l)
    #print(request.body.readlines())
    
@route('/newAlarm/', method='POST')
def index():
    for l in request.body:
        print(l)
    #print(request.body.readlines())

run(host='0.0.0.0', port=8080, debug=True)
