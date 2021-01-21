from bottledaemon import daemon_run
from bottle import route, run, static_file, request, response, post, get, put, delete

alarmset = set(line.strip() for line in open("alarms.conf", "r") if line.strip())

@route('/')
def time():
    return static_file("main.html", root='.')

@route('/favicon.ico')
def time():
    return static_file("favicon.ico", root='.')

@route('/icon.png')
def time():
    return static_file("icon.png", root='.')

@route('/main.js')
def time():
    return static_file("main.js", root='.')

@get('/favicon.ico')
def get_favicon():
    return static_file('favicon.ico', root='.')

@get('/delete')
def makeAlarm():
    if((request.query['time'] in alarmset)):
        alarmset.remove(request.query['time'])
        file = open("alarms.conf", "w")
        file.write(str(alarmset).replace("'", '').replace("{", "").replace("}", "").replace(", ", "\n").replace("set()", ""))
        file.close()
        return {"success":True}
    else:
        return {"success":False}

@get('/alarms')
def getAlarm():
    alarmdict = {}
    for count, alarm in enumerate(alarmset):
        alarmdict[count] = alarm
    return alarmdict

#@post wasn't working so this is a work around
@get('/checkAlarm')
def checkAlarm():
    if((request.query['time'] in alarmset) or (request.query['time'] == '')):
        return {"exists":True}
    else:
        alarmset.add(request.query['time'])
        file = open("alarms.conf", "w")
        file.write(str(alarmset).replace("'", '').replace("{", "").replace("}", "").replace(", ", "\n"))
        file.close()
        return {"exists":False}

if __name__ == "__main__":
    daemon_run()
#run(host='0.0.0.0', port=8080, debug=True)
