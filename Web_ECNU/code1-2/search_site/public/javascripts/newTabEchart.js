

// newTabEchart();
function newTabEchart(){
    var dom = document.querySelector(".newTabEcharts");  //TODO byID
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    $.get(`/process_get?title=&source_name=`, function (data) {
        var option = {
            title: {
                text: '爬取网站来源',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['中国新闻网', '东方财富网', '网易新闻', '腾讯体育', '澎湃新闻']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        {value: itemNum('中国新闻网'), name: '中国新闻网'},
                        {value: itemNum('东方财富网'), name: '东方财富网'},
                        {value: itemNum('网易新闻'), name: '网易新闻'},
                        {value: itemNum('腾讯体育'), name: '腾讯体育'},
                        {value: itemNum('澎湃新闻'), name: '澎湃新闻'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        function itemNum(fullString) {
            console.log(data);
            return data.filter((datalet) => datalet.source_name.indexOf(fullString) > -1).length;
        }

        app.currentIndex = -1;

        setInterval(function () {
            var dataLen = option.series[0].data.length;
            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
            app.currentIndex = (app.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
            // 显示 tooltip
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: app.currentIndex
            });
        }, 1000);
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    })
}