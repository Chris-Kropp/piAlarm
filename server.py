from bottle import route, run, static_file, request, response, post, get, put, delete

alarmset = set(line.strip() for line in open("alarms.conf", "r") if line.strip())

@route('/')
def time():
    print("hi")
    return static_file("main.html", root='.')

@route('/main.js')
def time():
    return static_file("main.js", root='.')

@post('/newAlarm/')
def makeAlarm():
    alarmset.add(request.forms.get('time'))
    file = open("alarms.conf", "w")
    file.write(str(alarmset).replace("'", '').replace("{", "").replace("}", "").replace(", ", "\n"))
    file.close()

@get('/alarms')
def getAlarm():
    alarmdict = {}
    for count, alarm in enumerate(alarmset):
        alarmdict[count] = alarm
    return alarmdict

@get('/checkAlarm')
def checkAlarm():
    if((request.query['time'] in alarmset) or (request.query['time'] == '')):
        return {"exists":True}
    else:
        return {"exists":False}

run(host='0.0.0.0', port=8080, debug=True)
