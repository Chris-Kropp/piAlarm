import time, os, datetime
from gpiozero import Button, Buzzer

lastmodified = 0
alarmset = set()
triggeredMinute = None
alarmTime = None

def triggerAlarm():
    if not (triggeredMinute == time):
        triggerAlarm = time
        alarmActive = True
        buzzer = Buzzer(17)
        button = Button(2)
        while(alarmActive):
            if(button.is_pressed):
                alarmActive = False
            buzzer.on()
            time.sleep(.25)
            buzzer.off()
            time.sleep(.25)
            buzzer.on()
            time.sleep(.25)
            buzzer.off()
            time.sleep(.25)
            buzzer.on()
            time.sleep(.25)
            buzzer.off()
            time.sleep(.25)
            buzzer.on()
            time.sleep(.25)
            buzzer.off()
            time.sleep(.25)
            buzzer.on()
            time.sleep(.25)
            buzzer.off()
            time.sleep(1)

while(True):
    try:
        if(os.path.getmtime('alarms.conf') != lastmodified):
            alarmset = set(line.strip() for line in open("alarms.conf", "r") if line.strip())
            lastmodified = os.path.getmtime('alarms.conf')
            print("alarms modified")
        hour = str(datetime.datetime.now().hour)
        minute = str(datetime.datetime.now().minute)
        if(len(str(hour)) == 1):
            hour = "0" + hour
        if(len(str(minute)) == 1):
            minute = "0" + minute
        alarmTime = hour + ":" + minute
        if(alarmTime in alarmset):
            triggerAlarm()
        time.sleep(45)
    except Exception as e:
        print(str(e))
