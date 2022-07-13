'use strict'
class DatePicker{
    constructor(id, callback){
        this.id = id;
        this.callback = callback;
    }
    // var months = ["January", "February", "March", "April", "May", "June",
	// 	"July", "August", "September", "October", "November", "December"];
    render(date){
        parent = document.getElementById(this.id);
        parent.appendChild(this.createDateMonthHeader(date));
        parent.appendChild(this.createDateMonth(date));

        // var myCollection = document.getElementById(this.id).querySelectorAll("tbody tb");
        // var self = this;
        // for (let i = 0; i < myCollection.length; i++) {
        //     myCollection[i].addEventListener("click", function(){self.callback(self.id, new fixedDate(date.getFullYear(), date.getMonth() + 1, myCollection[i].innerHTML))});
        //     // myCollection[i].addEventListener("click", this.callback(this.id, new fixedDate(date.getFullYear(), date.getMonth() + 1, myCollection[i].innerHTML)));
        // }

    }
    createDateMonth(date){
        // var header = this.createDateMonth(date);
        var table = document.createElement('table');
        // parent = document.getElementById(this.id);
        // table.appendChild(this.createDateMonthHeader(date));
        table.appendChild(this.addWeekHeader());
        table.appendChild(this.createDateMonthBody(date));
        return table;
    }
    createDateMonthHeader(date){
        var header = document.createElement('tr');
        header.setAttribute('class', 'yearAndMonthNavi');
        var self = this;
        var months = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
        var headerElements = ['<', date.getFullYear() + months[date.getMonth()], '>'];
        for(let i = 0; i < 3; i++){
            var headerElement = document.createElement('td');
            var headerElementText = document.createTextNode(headerElements[i]);
            headerElement.appendChild(headerElementText);
            header.appendChild(headerElement);
            if(i == 0)
                headerElement.addEventListener("click", function(){ self.tureToPreMonth(date); });
            if(i == 2)
                headerElement.addEventListener("click", function(){ self.tureToNextMonth(date); });
        }
        return header;
    }
    addWeekHeader(){
        var weekHeaders = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        var weekHeader = document.createElement('tr');
        for(let i = 0; i < weekHeaders.length; i++){
            var weekHeaderElement = document.createElement('td');
            var weekHeaderElementText = document.createTextNode(weekHeaders[i]);
            weekHeaderElement.appendChild(weekHeaderElementText);
            weekHeader.appendChild(weekHeaderElement);
        }
        return weekHeader;
    }
    createCellVisible(date, i){
        var self = this;
        var day = document.createElement('td');
        day.setAttribute("class", "light");
        var dayText = document.createTextNode(i + 1);
        day.appendChild(dayText);
        day.addEventListener("click", function(){self.callback(self.id, new fixedDate(date.getFullYear(), date.getMonth() + 1, day.innerHTML))});
        return day;
    }
    createDateMonthBody(date){
        // var 
        // if(date.)
        var self = this;
        var tbody = document.createElement('tbody');
        var rowNum = 0;
    
        var shift;
        var row = document.createElement('tr');
        var monthNum = this.getNumDays(date.getMonth() + 1, date);
        if((shift = new Date(date.getFullYear(), date.getMonth(), 1).getDay()) != 0){
            var preMonthNum = this.getNumDays(date.getMonth(), date);
            for(let i = 0; i < shift; i++){
                var day = document.createElement('td');
                day.setAttribute("class", "dim");
                var dayText = document.createTextNode(preMonthNum - shift + i + 1);
                day.appendChild(dayText);
                row.appendChild(day);
            }

            rowNum += shift;

        }
        for(let i = 0; i < monthNum; i++){
            var day = this.createCellVisible(date, i);
            // TODO: BUG!!!
            // document.createElement('td');
            // var dayText = document.createTextNode(i + 1);
            // day.appendChild(dayText);
            // day.addEventListener("click", function(){self.callback(self.id, new fixedDate(date.getFullYear(), date.getMonth() + 1, day.innerHTML))});

            row.appendChild(day);
            rowNum ++;
            if(rowNum == 7){
                tbody.appendChild(row);
                if(i != monthNum - 1){
                    row = document.createElement('tr');
                }
                rowNum = 0;
            }
        }
        if(new Date(date.getFullYear(), date.getMonth(), monthNum).getDay() != 6){
            for(let i = rowNum; i < 7; i++){
                var day = document.createElement('td');
                day.setAttribute("class", "dim");
                var dayText = document.createTextNode(i + 1);
                day.appendChild(dayText);
                row.appendChild(day);
            }
            tbody.appendChild(row);
        }

        // var myCollection = document.getElementById(this.id).getElementsByTagName("tb");
        // console.log(myCollection);
        // console.log("sd a" + myCollection.length);
        // for (let i = 0; i < myCollection.length; i++) {
        //     console.log(this.id);
        //     myCollection[i].addEventListener("click", this.callback(this.id, new Date(date.getFullYear(), date.getMonth, myCollection[i].textContent)));
        //     console.log(this.id);
        // }
        return tbody;
    }
    getNumDays(month, date) {
        if (month < 1) {
            month = 12;
        }
        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8
            || month === 10 || month === 12) {
            return 31;
        } else if (month === 4 || month === 6 || month === 9 || month === 11) {
            return 30;
        } else {
            var year = date.getFullYear();
            if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
                return 29;
            } 
            return 28;
        }
    }
    tureToPreMonth(date){
        if(date.getMonth() == 0){
            var parent = document.getElementById(this.id);
            parent.removeChild(parent.childNodes[0]);
            parent.removeChild(parent.childNodes[0]);

            this.render(new Date(date.getFullYear() - 1, 11, 1));
        }
        else{
            var parent = document.getElementById(this.id);
            parent.removeChild(parent.childNodes[0]);
            parent.removeChild(parent.childNodes[0]);

            this.render(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        }
    }
    tureToNextMonth(date){
        if(date.getMonth() == 11){
            var parent = document.getElementById(this.id);
            parent.removeChild(parent.childNodes[0]);
            parent.removeChild(parent.childNodes[0]);

            this.render(new Date(date.getFullYear() + 1, 0, 1));
        }
        else{
            var parent = document.getElementById(this.id);
            parent.removeChild(parent.childNodes[0]);
            parent.removeChild(parent.childNodes[0]);

            this.render(new Date(date.getFullYear(), date.getMonth() + 1, 1));
        }
    }

}

class fixedDate{
    constructor(year, month, day){
        this.year = year;
        this.month = month;
        this.day = day;
    }

}