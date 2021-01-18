var pendingAlarm = false;
var currentAlarm = null;

function makePage(){
    var mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "mainDiv");    
    var title = document.createElement("h2");
    title.textContent = "Alarms";
    title.setAttribute("class", "title");
    var plus = document.createElement("h2");
    plus.textContent = "+";
    plus.setAttribute("class", "plusButton");
    mainDiv.appendChild(title);
    mainDiv.appendChild(plus);    
    
    plus.addEventListener("click", function(){
        if(pendingAlarm === false){
            pendingAlarm = true;
            var alarmSpacer = document.createElement("div");
            alarmSpacer.setAttribute("class", "alarmSpacer");
            alarmSpacer.setAttribute("id", "alarmSpacer");
            
            var div = document.createElement("div");
            div.setAttribute("class", "alarm");
            div.setAttribute("id", "alarm");
            currentAlarm = div;
            
            var invisibleiframe = document.createElement("iframe");
            invisibleiframe.setAttribute("name", "invisibleiframe");
            invisibleiframe.setAttribute("style", "display: none;");
            
            var form = document.createElement("form");
            form.setAttribute("method", "post"); 
            form.setAttribute("id", "newAlarmForm"); 
            form.setAttribute("action", "/newAlarm/");
            form.setAttribute("class", "alarmForm");
            form.setAttribute("target", "invisibleiframe");
                            
            var timeInput = document.createElement("input");
            timeInput.setAttribute("type", "time");
            timeInput.setAttribute("name", "time");
            timeInput.setAttribute("id", "time");
            
            var br = document.createElement("br"); 
            
            var submit = document.createElement("input"); 
            submit.setAttribute("type", "button"); 
            submit.setAttribute("value", "Create");
            submit.setAttribute("class", "submitButton");
            submit.addEventListener("click", function(){
                fetch(`/checkAlarm?time=${document.getElementById("time").value}`).then(response => response.json()).then(json => {
                    var exists = json['exists'];
                    if(exists){
                        window.alert("Could not create alarm:\nAlarm already exists or is blank");
                    }
                    else{
                        document.getElementById("newAlarmForm").submit();
                        renderAlarms();
                        document.getElementById("alarmSpacer").remove();
                        document.getElementById("alarm").remove();
                        currentAlarm = null;
                        pendingAlarm = false;
                    }
                });
            });
            
            var cancel = document.createElement("input");
            cancel.setAttribute("type", "submit");
            cancel.setAttribute("value", "x");
            cancel.setAttribute("class", "cancelButton");
            cancel.addEventListener("click", function(){
                document.getElementById("alarmSpacer").remove();
                document.getElementById("alarm").remove();
                currentAlarm = null;
                pendingAlarm = false;
            });
            
            form.appendChild(timeInput);
            form.appendChild(br);
            form.appendChild(submit);
            document.body.appendChild(alarmSpacer);
            div.appendChild(form);
            div.appendChild(cancel);
            div.appendChild(invisibleiframe);
            document.body.appendChild(div);
        }
        else{
            highlightActive();
        }
    });
    document.body.appendChild(mainDiv);
    fetch('/alarms').then(response => response.json()).then(json => {
        for(i = 0; i < Object.keys(json).length; i++){
            console.log(i)
        }
    });
}

function renderAlarms(){
    var alarmSpacer = document.createElement("div");
    alarmSpacer.setAttribute("class", "alarmSpacer");
    alarmSpacer.setAttribute("id", "alarmSpacer");

    var div = document.createElement("div");
    div.setAttribute("class", "alarm");
    div.setAttribute("id", "alarm");
    currentAlarm = div;
}

async function highlightActive() {
    currentAlarm.setAttribute("style", "border:2px solid #0F0; background:#8F8;");
    await sleep(150);
    currentAlarm.setAttribute("style", "border:2px solid #AAA; background:#DDD;");
    await sleep(200);
    currentAlarm.setAttribute("style", "border:2px solid #0F0; background:#8F8;");
    await sleep(150);
    currentAlarm.setAttribute("style", "border:2px solid #AAA; background:#DDD;");
    await sleep(200);
    currentAlarm.setAttribute("style", "border:2px solid #0F0; background:#8F8;");
    await sleep(150);
    currentAlarm.setAttribute("style", "border:2px solid #AAA; background:#DDD;");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

makePage();
