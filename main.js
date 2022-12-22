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
    
    plus.addEventListener("click", function() {
        if(pendingAlarm === false) {
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

            var sundayInput = document.createElement("input");
            sundayInput.setAttribute("id", "sundayInput");
            sundayInput.setAttribute("type", "checkbox");
            sundayInput.setAttribute("class", "css-checkbox");

            var sundayLabel = document.createElement("label");
            sundayLabel.setAttribute("for", "sundayInput");
            sundayLabel.setAttribute("class", "dayLabel")
            sundayLabel.innerText = "S";
            
            var timeInput = document.createElement("input");
            timeInput.setAttribute("type", "time");
            timeInput.setAttribute("name", "time");
            timeInput.setAttribute("class", "timeInput");
            timeInput.required = true;
            
            var br = document.createElement("br"); 
            var br1 = document.createElement("br");

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
                        document.getElementById("alarmSpacer").remove();
                        document.getElementById("alarm").remove();
                        renderAlarm(timeInput.value);
                        currentAlarm = null;
                        pendingAlarm = false;
                    }
                });
            });
            
            var cancel = document.createElement("input");
            cancel.setAttribute("type", "submit");
            cancel.setAttribute("value", "✕");
            cancel.setAttribute("class", "cancelButton");
            cancel.addEventListener("click", function(){
                document.getElementById("alarmSpacer").remove();
                document.getElementById("alarm").remove();
                currentAlarm = null;
                pendingAlarm = false;
            });
            
            form.appendChild(timeInput);
            form.appendChild(br);
            form.appendChild(sundayInput);
            form.appendChild(sundayLabel);
            form.appendChild(br1);
            form.appendChild(submit);
            document.body.appendChild(alarmSpacer);
            div.appendChild(cancel);
            div.appendChild(form);
            div.appendChild(invisibleiframe);
            document.body.appendChild(div);
        }
        else{
            highlightActive();
        }
    });
    document.body.appendChild(mainDiv);
    fetch('/alarms').then(response => response.json()).then(json => {
        for(i = 0; i < Object.keys(json).length; i++) {
            renderAlarm(json[i]);
        }
    });
}

function renderAlarm(alarmTime) {
    var alarmSpacer = document.createElement("div");
    alarmSpacer.setAttribute("class", "alarmSpacer");
    alarmSpacer.setAttribute("id", "alarmSpacer" + alarmTime);

    var div = document.createElement("div");
    div.setAttribute("class", "alarm");
    div.setAttribute("id", "alarm" + alarmTime);
    
    var timeH = document.createElement("h3");
    timeH.textContent = alarmTime;
    timeH.setAttribute("class", "alarmTime");
    
    var cancel = document.createElement("input");
    cancel.setAttribute("type", "submit");
    cancel.setAttribute("value", "✕");
    cancel.setAttribute("class", "cancelButton existingCancel");
    cancel.addEventListener("click", function(){
        fetch(`/delete?time=${timeH.textContent}`).then(response => response.json()).then(json => {
            var success = json['success'];
            if(success){
                document.getElementById("alarmSpacer" + alarmTime).remove();
                document.getElementById("alarm" + alarmTime).remove();
            }
            else{
                window.alert("Deletion Failed");
            }
        });
    });
            
    document.body.appendChild(alarmSpacer);
    div.appendChild(cancel);
    div.appendChild(timeH);
    document.body.appendChild(div);
}

async function highlightActive() {
    currentAlarm.setAttribute("class", "alarm highlighted");
    await sleep(150);
    currentAlarm.setAttribute("class", "alarm");
    await sleep(200);
    currentAlarm.setAttribute("class", "alarm highlighted");
    await sleep(150);
    currentAlarm.setAttribute("class", "alarm");
    await sleep(200);
    currentAlarm.setAttribute("class", "alarm highlighted");
    await sleep(150);
    currentAlarm.setAttribute("class", "alarm");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

makePage();
