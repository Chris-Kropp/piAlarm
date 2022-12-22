import time, os, datetime
# from gpiozero import Button, Buzzer
import apsw

lastmodified = 0
alarmset = set()
triggeredMinute = "null"
# alarmTime = None
day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

def triggerAlarm(alarmTime):
    datetime.date.weekday
    global triggeredMinute
    waitTime = 600 # 10 minutes
    if not (triggeredMinute == alarmTime):
        startTime = time.time()
        triggeredMinute = alarmTime
        alarmActive = True
        buzzer = Buzzer(17)
        button = Button(26)
        while(alarmActive and time.time()-startTime < waitTime):
            if(button.is_pressed):
                alarmActive = False
            for i in range(5):
                buzzer.on()
                time.sleep(.25)
                buzzer.off()
                time.sleep(.25)
            time.sleep(.75)


database = apsw.Connection("alarm.db")
while(True):
    try:
        currentTime = datetime.datetime.now()
        query = f"SELECT COUNT(*) FROM alarms WHERE hour={currentTime.hour} AND minute={currentTime.minute} AND {day[currentTime.weekday()]}=1;"
        result = database.execute(query).fetchone()[0] != 0
        if(database.execute(query).fetchone()[0] != 0):
            triggerAlarm(currentTime.minute)
        
        # time.sleep(0.5)
    except Exception as e:
        print(str(e))
