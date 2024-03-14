function createChart(elementId, jsonData, xAxisDataKey, seriesDataKey1, seriesDataKey2) {
    var myChart = echarts.getInstanceByDom(document.getElementById(elementId));
    if (!myChart) {
        myChart = echarts.init(document.getElementById(elementId), 'roma');
    }
    var option = {
        tooltip: {
            trigger: 'axis',
            borderWidth: 1,
            padding: 5,
        },
        xAxis: {
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            },
            axisTick: {
                show: true,
                length: 4,
            },
            axisLine: {
                show: true,
            }
        },
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: true,
                    length: 4,
                },

            },
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: true,
                    length: 4,
                },
            }
        ],
        series: [
            {
                name: "关注人数",
                data: [],
                type: 'bar',
            },
            {
                name: "每平方米价格",
                data: [],
                type: 'line',
                yAxisIndex: 1
            }
        ]
    };

    option.xAxis.data = jsonData[xAxisDataKey];
    option.series[0].data = jsonData[seriesDataKey1];
    option.series[1].data = jsonData[seriesDataKey2];
    myChart.setOption(option);
}

$(function () {
    var resizeTimer;
    var resizeHandler = function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            var echartIds = ['echart1', 'echart3'];
            echartIds.forEach(function (id) {
                var myChart = echarts.getInstanceByDom(document.getElementById(id));
                if (myChart) {
                    myChart.resize();
                }
            });
        }, 200);
    };

    $(window).on("resize", resizeHandler);

    $.getJSON("../json/ShunYi.json", function (jsonData) {
        createChart('echart1', jsonData.decorationStats, 'decoration_situation', 'total_attention_people', 'avg_price_per_square');
        createChart('echart3', jsonData.topTenElevatorType, 'ladder_proportion', 'total_attention_people', 'avg_price_per_square');
    });
});





$(function () {
    const myChart = echarts.init(document.getElementById('map'), 'roma');
    const option = {
        title: {
            text: '顺义区房屋户型关注人数',
            left: 'center'
        },
        tooltip: {},
        series: [
            {
                type: 'treemap',
                data: [],
                roam: false,
                nodeClick: false,
                breadcrumb: false,
                label: {
                    show: true,
                },
                itemStyle: {
                    borderWidth: 2,
                    boderColor: "#fff"
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br/>{c}人关注'
                },
            }
        ]
    };

    $.getJSON("../json/ShunYi.json", function (jsonData) {
        const house_type = jsonData.topTenHouseTypes.house_type;
        const total_attention_people = jsonData.topTenHouseTypes.total_attention_people;
        const data = house_type.map(function (item, index) {
            return {
                name: item,
                value: total_attention_people[index],
            };
        });
        option.series[0].data = data
        myChart.setOption(option);
    });

    window.addEventListener("resize", function () {
        myChart.resize();
    });
})

$(function () {
    const myChart = echarts.init(document.getElementById('echart2'), 'roma');
    const option = {
        tooltip: {
            formatter: "{b} <br/> 每平方米{c}元",
        },
        xAxis: {
            name: "每平方米价格",
            nameLocation: "middle",
            nameGap: 30,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            name: "小区名称",
            type: "category",
            data: [],
            inverse: true,
            nameLocation: "start",
        },
        grid: {
            left: 135
        },
        series: [
            {
                type: 'bar',
                data: [],
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}'
                },
            }
        ]
    };

    $.getJSON("../json/ShunYi.json", jsonData => {
        const { community_name, avg_price_per_square } = jsonData.topTenCommunities;
        option.yAxis.data = community_name;
        option.series[0].data = avg_price_per_square;
        myChart.setOption(option);
    });

    window.addEventListener("resize", () => {
        myChart.resize();
    });
})

$(function () {
    var myChart = echarts.init(document.getElementById('echart6'), 'roma');
    var option = {
        tooltip: {
            formatter: "{b}: {c}套",
        },
        series: [
            {
                type: 'pie',
                data: [],
                radius: ['45%', '75%'],
                label: {
                    formatter: "{b} {d}%",
                }
            }
        ]
    };

    $.getJSON("../json/ShunYi.json", function (jsonData) {
        try {
            var floor_type = jsonData.floorTypeStats.floor_type;
            var count = jsonData.floorTypeStats.count;
            var data = floor_type.map((item, index) => ({
                name: item,
                value: count[index],
            }));
            option.series[0].data = data;
            myChart.setOption(option);
        } catch (error) {
            console.error("Error:", error);
        }
    });

    window.addEventListener("resize", () => {
        myChart.resize();
    });
})

$(function () {
    var myChart = echarts.init(document.getElementById('echart4'), 'roma');
    var option = {
        tooltip: {},
        grid: [
            { x: '10%', y: '15%', width: '50%', height: '70%' },
        ],
        xAxis: [
            {
                name: '供暖情况',
                gridIndex: 0,
                data: [],
                nameLocation: "middle",
            }
        ],
        yAxis: [
            {
                name: '每平方米价格',
                gridIndex: 0,
                splitLine: { show: false },

            }
        ],
        series: [
            {
                type: 'bar',
                data: [],
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = ['#c16126', '#8dede3'];
                            return colorList[params.dataIndex];
                        }
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}'
                },
            },
            {
                type: 'pie',
                data: [],
                radius: '80%',
                center: ['80%', '50%'],
                label: {
                    position: 'inside',
                    formatter: "{b}{c}人关注"
                }
            }
        ]


    };

    $.getJSON("../json/ShunYi.json", function (jsonData) {

        var heating_method = jsonData.heatingStats.heating_method;
        var total_attention_people = jsonData.heatingStats.total_attention_people;
        var avg_price_per_square = jsonData.heatingStats.avg_price_per_square;
        var data = heating_method.map((item, index) => ({
            name: item,
            value: total_attention_people[index],
        }));
        option.xAxis[0].data = heating_method
        option.series[0].data = avg_price_per_square;
        option.series[1].data = data;
        myChart.setOption(option);

    });

    window.addEventListener("resize", () => {
        myChart.resize();
    });
})


$(function () {
    var myChart = echarts.init(document.getElementById('echart5'), 'roma');
    var option = {
        tooltip: {},
        grid: [
            { x: '10%', y: '15%', width: '50%', height: '70%' },
        ],
        xAxis: [
            {
                name: '电梯情况',
                gridIndex: 0,
                data: [],
                nameLocation: "middle",
            }
        ],
        yAxis: [
            {
                name: '每平方米价格',
                gridIndex: 0,
                splitLine: { show: false }
            }
        ],
        series: [
            {
                type: 'bar',
                data: [],
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = ['#c16126', '#8dede3'];
                            return colorList[params.dataIndex];
                        }
                    }
                }, label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}'
                },
            },
            {
                type: 'pie',
                data: [],
                radius: '80%',
                center: ['80%', '50%'],
                label: {
                    position: 'inside',
                    formatter: "{b}电梯{c}人关注"
                }
            }
        ]


    };

    $.getJSON("../json/ShunYi.json", function (jsonData) {

        var equipped_with_elevator = jsonData.elevatorStats.equipped_with_elevator;
        var total_attention_people = jsonData.elevatorStats.total_attention_people;
        var avg_price_per_square = jsonData.elevatorStats.avg_price_per_square;
        var data = equipped_with_elevator.map((item, index) => ({
            name: item,
            value: total_attention_people[index],
        }));
        option.xAxis[0].data = equipped_with_elevator
        option.series[0].data = avg_price_per_square;
        option.series[1].data = data;
        myChart.setOption(option);

    });

    window.addEventListener("resize", () => {
        myChart.resize();
    });
})