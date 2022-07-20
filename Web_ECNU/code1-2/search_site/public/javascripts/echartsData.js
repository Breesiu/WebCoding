// 'use strict';
// import * as echarts from 'echarts';


function echartsData(Data) {
    var dom = document.querySelector(".echarts");  //TODO byID
    var myChart = echarts.init(dom);
    var app = {};
    option = null;

    function fetchData(cb) {
        // 通过 setTimeout 模拟异步加载
        // setTimeout(function ()  {
        cb({
            categories: ["7-16", "7-17", "7-18", "7-19", "7-20", "7-21"],
            data: [itemNum('7-16'), itemNum('7-17'), itemNum('7-18'),
                itemNum('7-19'), itemNum('7-20'), itemNum('7-21')]
        });
        // }, 3000);
    }

    function itemNum(subTimeString) {
        console.log(Data.filter((data) => data.publish_date.indexOf(subTimeString) > -1).length);
        return Data.filter((data) => data.publish_date.indexOf(subTimeString) > -1).length;
    }

    // 初始 option
    option = {
        title: {
            text: '关键词热度图'
        },
        tooltip: {},
        legend: {
            data: ['URL']
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [{
            name: 'URL',
            type: 'bar',
            data: []
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    myChart.showLoading();
    console.log(option);
    fetchData(function (data) {
        myChart.hideLoading();
        console.log(myChart);

        myChart.setOption({
            xAxis: {
                data: data.categories
            },
            series: [{
                // 根据名字对应到相应的系列
                name: 'URL',
                data: data.data
            }]
        });
        console.log(myChart);
    });
    console.log(JSON.stringify(option));
    // if (option && typeof option === "object") {
    //     myChart.setOption(option, true);
    // }
}

// module.exports = echartsData;

