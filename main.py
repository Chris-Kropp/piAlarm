from bottle import route, run, static_file, request, response, post, get, put, delete

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
    
@post('/newAlarm/', method='POST')
def makeAlarm():
    for l in request.body:
        print('hi')
        print(l)
    #request.forms.get('hour'), request.forms.get('min'))

#@post('/newAlarm', method='POST')
#def makeAlarm():
    #for l in request.body:
        #print('hi')
        #print(l)
    #request.forms.get('hour'), request.forms.get('min'))

run(host='0.0.0.0', port=8080, debug=True)
