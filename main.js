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
    
    plus.addEventListener("click", function(){
        var alarmSpacer = document.createElement("div");
        alarmSpacer.setAttribute("class", "alarmSpacer");
        
        var div = document.createElement("div");
        div.setAttribute("class", "alarm");
        
        var alarmlabel = document.createElement("h3");
        
        document.body.appendChild(alarmSpacer);
        document.body.appendChild(div);

    });
}

makePage();
