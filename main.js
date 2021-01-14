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
        var alarmSpacer = document.createElement("div");
        alarmSpacer.setAttribute("class", "alarmSpacer");
        
        var div = document.createElement("div");
        div.setAttribute("class", "alarm");
        
        var form = document.createElement("form");
        form.setAttribute("method", "post"); 
        form.setAttribute("action", "/newAlarm/");
        form.setAttribute("class", "alarmForm");
        
        var timeInput = document.createElement("input");
        timeInput.setAttribute("type", "time");
        timeInput.setAttribute("name", "time");
        
        var submit = document.createElement("input"); 
        submit.setAttribute("type", "submit"); 
        submit.setAttribute("value", "Create"); 
        
        form.appendChild(timeInput);
        form.appendChild(submit);
        
        document.body.appendChild(alarmSpacer);
        div.appendChild(form);
        document.body.appendChild(div);
    });
}

makePage();
