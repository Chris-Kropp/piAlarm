#from bottledaemon import daemon_run
from bottle import route, run, static_file, request, response, post, get, put, delete
import apsw

try:
    alarmset = set(line.strip() for line in open("alarms.conf", "r") if line.strip())
except:
    file = open("alarms.conf", "w")
    file.close

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
    # try:
        time = request.query["time"].split(":")
        database.execute(f"DELETE FROM alarms WHERE hour={time[0]} AND minute={time[1]};")
        # if((request.query['time'] in alarmset)):
        #     alarmset.remove(request.query['time'])
        #     file = open("alarms.conf", "w")
        #     file.write(str(alarmset).replace("'", '').replace("{", "").replace("}", "").replace(", ", "Please \n").replace("set()", ""))
        #     file.close()
        return {"success":True}
    # else:
    # except Exception as e:
        # return {"success":False}

@get('/alarms')
def getAlarm():
    alarmdict = {}
    count = 0
    for alarm in database.execute("SELECT * FROM alarms;"):
        hour = str(alarm[0])
        if(len(hour) == 1):
            hour = "0" + hour
        min = str(alarm[1])
        if(len(min) == 1):
            min = "0" + min
        alarmdict[count] = hour + ":" + min
        count += 1
    return alarmdict

#@post wasn't working so this is a work around
@get('/checkAlarm')
def checkAlarm():
    time = request.query['time'].split(":")
    query = f"SELECT * FROM alarms WHERE hour={time[0]} AND minute={time[1]};"
    if(database.execute(query).fetchone() != None):
        return {"exists":True}
    else:
        query = f"INSERT INTO alarms VALUES({time[0]},{time[1]},1,1,1,1,1,1,1);" 
        database.execute(query)
        return {"exists":False}

#if __name__ == "__main__":
#    daemon_run()
database = apsw.Connection("alarm.db")
run(host='0.0.0.0', port=8080, debug=True)