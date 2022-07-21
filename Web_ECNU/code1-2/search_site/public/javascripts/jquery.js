'use strict';
// var echartsData = require('/echartsData.js');
// var headLineSelector =  $(".headLine");
// var dataTableSelector =  $(".dataTable");
// var selectBoxSelector =  $(".selectBox");
// var headLineSelector =  $(".headLine");
var headline = '<div class="headLineElement">url</div>' +
    '<div class="headLineElement dropdown">source_name' +
    '<div class="dropdown-content">' +
    '<div class="source_name">中国新闻网</div>' +
    '<div class="source_name">东方财富网</div>' +
    '<div class="source_name">网易新闻</div>' +
    '<div class="source_name">腾讯体育</div>' +
    '<div class="source_name">澎湃新闻</div>' +
    '</div>' +
    '</div>' +
    '<div class="headLineElement">title</div>' +
    '<div class="headLineElement">keywords</div>'   +
    '<div class="headLineElement">author</div>' +
    '<div class="headLineElement dropdown">publish_date' +
    '<div class="dropdown-content">' +
    '<div class="publishDateAsc">按升序显示</div>' +
    '<div class="publishDateDes">按降序显示</div>' +
    '</div>' +
    '</div>';

$(document).ready(function () {
    var page = 1;
    var pageMax = 1;
    var dataGlobal;
    newTabEchart();
    // console.log(fetchAllText());
    $("input:button").click(function () {
        page = 1;
        $.get(`/process_get?title=${$("input:text").val()}&source_name=${$("input[name='source_text']").val()}`, function (data) {
            console.log(`/process_get?title=${$("input[name='title_text']").val()}` +
                `&source_name=${$("input[name='source_text']").val()}`);
            $(".headLine").empty();
            $(".dataTable").empty();
            $(".selectBox").empty();
            $(".newTabEcharts").remove();

            // $(".headLine").append("sda");
            $(".headLine").append(headline);

            echartsData(data, $("input:text").val());
            console.log(data);
            pageMax = parseInt(data.length / 10) + 1;
            dataGlobal = data;
            console.log(pageMax);
            for (let list of dataGlobal.slice(0, 10)) {
                let table = '';
                Object.values(list).forEach(element => {
                    table += `<div class="element">${element}</div>`;
                });
                $(".dataTable").append(table);
            }
            $(".selectBox").append(`${page}/${pageMax}`);

        });
        // $(".selectBox").append('<p>sdadsas</p>');
        // $(".selectBox").append(`${page}/${pageMax}`);
        console.log(`${page}/${pageMax}`);
    });
    $(".arrows.prev").click(function () {
        if (page === 1)
            page = 1;
        else
            page -= 1;

        $(".dataTable").empty();
        $(".selectBox").empty();
        // $(".headLine").append("sda");
        for (let list of dataGlobal.slice((page - 1) * 10, page * 10)) {
            console.log(list);
            let table = '';
            Object.values(list).forEach(element => {
                table += `<div class="element">${element}</div>`;
            });
            $(".dataTable").append(table);
        }
        $(".selectBox").append(`${page}/${pageMax}`);
    });
    $(".arrows.next").click(function () {
        if (page < pageMax)
            page += 1;
        $(".dataTable").empty();
        $(".selectBox").empty();
        // $(".headLine").append("sda");
        for (let list of dataGlobal.slice((page - 1) * 10, page * 10)) {
            console.log(list);
            let table = '';
            Object.values(list).forEach(element => {
                table += `<div class="element">${element}</div>`;
            });
            $(".dataTable").append(table);
        }
        $(".selectBox").append(`${page}/${pageMax}`);
    });
    $(document).on('click', '.publishDateAsc', function (e) {
        page = 1;
        $(".dataTable").empty();
        $(".selectBox").empty();
        console.log("welc");
        // $(".headLine").append("sda");
        dataGlobal = dataGlobal.sort((a, b) => {
            if (a.publish_date > b.publish_date)
                return 1;
            else if (a.publish_date < b.publish_date)
                return -1;
            else
                return 0;
        });
        for (let list of dataGlobal.slice(0, 10)) {
            console.log(list);
            let table = '';
            Object.values(list).forEach(element => {
                table += `<div class="element">${element}</div>`;
            });
            $(".dataTable").append(table);
        }
        $(".selectBox").append(`${page}/${pageMax}`);
    });
    $(document).on('click', '.publishDateDes', function (e) {
        page = 1;
        $(".dataTable").empty();
        $(".selectBox").empty();
        console.log("welc");
        // $(".headLine").append("sda");
        dataGlobal = dataGlobal.sort((a, b) => {
            if (a.publish_date > b.publish_date)
                return -1;
            else if (a.publish_date < b.publish_date)
                return 1;
            else
                return 0;
        });
        for (let list of dataGlobal.slice(0, 10)) {
            console.log(list);
            let table = '';
            Object.values(list).forEach(element => {
                table += `<div class="element">${element}</div>`;
            });
            $(".dataTable").append(table);
        }
        $(".selectBox").append(`${page}/${pageMax}`);
    });
    $(document).on('click', '.source_name', function (e) {
        var filterSourceName = $(this).text();
        //TODO can be optimized "read data"
        $.get(`/process_get?title=${$("input:text").val()}&source_name=${$("input[name='source_text']").val()}`, function (data) {
            page = 1;
            $(".dataTable").empty();
            $(".selectBox").empty();
            console.log(data);
            // $(".headLine").append("sda");
            dataGlobal = data.filter((datalet) => datalet.source_name === filterSourceName);
            console.log("click" + filterSourceName + "  ");
            pageMax = parseInt(dataGlobal.length/10 + 1);
            for (let list of dataGlobal.slice(0,10)) {
                console.log(list);
                let table = '';
                Object.values(list).forEach(element => {
                    table += `<div class="element">${element}</div>`;
                });
                $(".dataTable").append(table);
            }
            $(".selectBox").append(`${page}/${pageMax}`);
        });
    });
});