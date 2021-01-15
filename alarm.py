import time, os, datetime
from gpiozero import Button, Buzzer

lastmodified = 0
alarmset = set()

while(True):
    if(os.path.getmtime('alarms.conf') != lastmodified):
        alarmset = set(line.strip() for line in open("alarms.conf", "r") if line.strip())
        lastmodified = os.path.getmtime('alarms.conf')
    time.sleep(30)
    hour = str(datetime.datetime.now().hour)
    minute = str(datetime.datetime.now().minute)
    if(len(str(hour)) == 1):
        hour = "0" + hour
    if(hour + ":" + minute in alarmset):
        print("triggerAlarm")
        
        
def triggerAlarm():
    alarmActive = True
    buzzer = Buzzer(17)
    button = Button(2)
    while(alarmActive):
        if(button.is_pressed):
            break
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
    
