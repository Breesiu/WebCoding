'use strict'
class TableTemplate{
    constructor(){
    }
    static fillIn(id, dictionary, columnName){
        var parent = document.getElementById(id);
        if (parent.style.visibility === 'hidden') {
            parent.style.visibility = 'visible';
        } 
        var colections = parent.querySelector('tr').querySelectorAll('td');
        console.log(colections);
        for(let i = 0; i < colections.length; i++){
            var dateTemplate = new Cs142TemplateProcessor(colections[i].innerHTML);
            var str = dateTemplate.fillIn(dictionary);
            colections[i].innerHTML = str;
            if(columnName === str){
                var colectionsBodyTr = parent.querySelectorAll('tr');
                for(let j = 1; j < colectionsBodyTr.length; j ++ ){
                    var element = colectionsBodyTr[j].querySelectorAll('td')[i];
                    var dateTemplate = new Cs142TemplateProcessor(element.innerHTML);
                    var str = dateTemplate.fillIn(dictionary);
                    element.innerHTML = str;
                }
            }
        }
        if(columnName === undefined){
            var colectionsBodyElements = parent.querySelectorAll('td');
            for(let i = 0; i < colectionsBodyElements.length; i++){
                var dateTemplate = new Cs142TemplateProcessor(colectionsBodyElements[i].innerHTML);
                var str = dateTemplate.fillIn(dictionary);
                colectionsBodyElements[i].innerHTML = str;
            }
        }
    }
}