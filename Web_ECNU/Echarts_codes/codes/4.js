import * as echarts from 'echarts';

function echartsData() {
    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;

    function fetchData(cb) {
        // 通过 setTimeout 模拟异步加载
        setTimeout(function () {
            cb({
                categories: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                data: [5, 20, 36, 10, 10, 20]
            });
        }, 3000);
    }

// 初始 option
    option = {
        title: {
            text: '异步数据加载示例'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: []
        }]
    };

    myChart.showLoading();

    fetchData(function (data) {
        myChart.hideLoading();
        myChart.setOption({
            xAxis: {
                data: data.categories
            },
            series: [{
                // 根据名字对应到相应的系列
                name: '销量',
                data: data.data
            }]
        });
    });
    ;
    console.log(JSON.stringify(option));
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}