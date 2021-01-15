from bottle import route, run, static_file, request, response, post, get, put, delete

alarmset = set(line.strip() for line in open("alarms.conf", "r") if line.strip())

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
    
@post('/newAlarm/')
def makeAlarm():
    alarmset.add(request.forms.get('time'))
    print(alarmset)
    file = open("alarms.conf", "w")
    file.write(str(alarmset).replace("'", '').replace("{", "").replace("}", "").replace(", ", "\n"))
    file.close()
    
@get('/alarms')
def getAlarm():
    if((request.query['time'] in alarmset) or (request.query['time'] == '')):
        print("true")

run(host='0.0.0.0', port=8080, debug=True)
