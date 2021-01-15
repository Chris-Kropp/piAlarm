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
    document.body.appendChild(mainDiv);
    
//     createExisting();
    
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
            
            var cancel = document.createElement("input");
            cancel.setAttribute("type", "submit");
            cancel.setAttribute("value", "x");
            cancel.setAttribute("class", "cancelButton");
            cancel.addEventListener("click", function(){
                document.getElementById("alarmSpacer").remove();
                document.getElementById("alarm").remove();
                currentAlarm = null;
            });
            
            var invisibleiframe = document.createElement("iframe");
            invisibleiframe.setAttribute("name", "invisibleiframe");
            invisibleiframe.setAttribute("style", "display: none;");
            
            var form = document.createElement("form");
            form.setAttribute("method", "post"); 
            form.setAttribute("action", "/newAlarm/");
            form.setAttribute("class", "alarmForm");
            form.setAttribute("target", "invisibleiframe");
                            
            var timeInput = document.createElement("input");
            timeInput.setAttribute("type", "time");
            timeInput.setAttribute("name", "time");
            
            var br = document.createElement("br"); 
            
            var submit = document.createElement("input"); 
            submit.setAttribute("type", "submit"); 
            submit.setAttribute("value", "Create");
            submit.setAttribute("class", "submitButton");
            
            form.appendChild(timeInput);
            form.appendChild(br);
            form.appendChild(submit);
            
//             document.getElementById(formId).target = iframeId;
            
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
