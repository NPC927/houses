$(function () {
    map();

    function map() {
        var myChart = echarts.init(document.querySelector('.map'), 'roma');
        var option = {
            title: {
                text: '北京市二手房均价可视化',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c}元/平方米'
            },
            visualMap: {
                show: false,
                min: 0,
                max: 125000,
            },
            series: [
                {
                    name: '北京市平均房价',
                    type: 'map',
                    map: '北京',
                    roam: true,
                    label: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    data: []
                }
            ]
        };
        echarts.registerMap('北京', BeiJIngMap);

        var areaLinks = {
            '怀柔区': './html/HuaiRou.html',
            '门头沟区': './html/MenTouGou.html',
            '海淀区': './html/HaiDian.html',
            '朝阳区': './html/ChaoYang.html',
            '房山区': './html/FangShan.html',
            '石景山区': './html/ShiJingShan.html',
            '西城区': './html/XiCheng.html',
            '大兴区': './html/DaXing.html',
            '通州区': './html/TongZhou.html',
            '丰台区': './html/FengTai.html',
            '密云区': './html/MiYun.html',
            '昌平区': './html/ChangPing.html',
            '延庆区': './html/YanQing.html',
            '东城区': './html/DongCheng.html',
            '顺义区': './html/ShunYi.html',
            '平谷区': './html/PingGu.html'
        };

        myChart.on('click', function (args) {
            var areaName = args.data.name;
            if (areaLinks.hasOwnProperty(areaName)) {
                location.href = areaLinks[areaName];
            }
        });

        $.getJSON("./json/beijing/areaByRegin.json", function (jsonData) {
            var in_the_area = jsonData.data.in_the_area;
            var avg_price_per_square = jsonData.data.avg_price_per_square;
            var data = in_the_area.map(function (item, index) {
                return {
                    name: item,
                    value: avg_price_per_square[index],
                };
            });
            option.series[0].data = data;
            myChart.setOption(option);
        });

        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
});



$(function () {
    var myChart = echarts.init(document.getElementById('echart1'), 'roma');
    var option = {
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c}套 ({d}%)",
        },
        legend: {
            textStyle: {
                color: "#fff"
            }
        },
        series: [
            {
                name: " ",
                type: "pie",
                radius: ["50%", "75%"],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: "center",
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: "20",
                            fontWeight: "bold",
                        },
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: []
            }
        ],
    };

    $.getJSON("./json/beijing/floorType.json", function (jsonData) {
        var community_name = jsonData.data.floor_type;
        var floor_type_count = jsonData.data.floor_type_count;
        var data = community_name.map(function (item, index) {
            return {
                name: item,
                value: floor_type_count[index],
            };
        });
        option.series[0].data = data;
        myChart.setOption(option);
    });

    window.addEventListener("resize", function () {
        myChart.resize();
    });
})



$(function () {
    var myChart = echarts.init(document.getElementById('echart2'), 'roma');
    var option = {
        tooltip: {formatter: "{b}<br/>{c}人关注"},
        xAxis: {
            name: "关注人数",
            nameLocation: "middle",
            nameGap: 30,
            splitLine:{show:false}
        },
        yAxis: {
            name: "小区名称",
            type: "category",
            data: [],
            inverse: true,
            nameLocation: "start",
            splitLine: {show:false}
        },
        grid: {
            left: 90
        },
        series: [
            {
                name: '',
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

    $.getJSON("./json/beijing/topTenHotCommunities.json", function (jsonData) {
        var community_name = jsonData.data.community_name;
        var total_attention_people = jsonData.data.total_attention_people;
        option.yAxis.data = community_name
        option.series[0].data = total_attention_people
        myChart.setOption(option);
    });

    window.addEventListener("resize", function () {
        myChart.resize();
    });
})



$(function () {
    var myChart = echarts.init(document.getElementById('echart3'), 'roma');
    var option = {
        tooltip: {
            trigger: 'axis',
            borderWidth: 1,
            padding: 5,
        },
        legend: {},
        xAxis: [
            {
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
                },
                axisLabel: {
                    rotate: 90
                },
                
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    show: true,
                    length: 4,
                },
                splitLine:{show:false}
            },
            {
                type: 'value',
                scale: true,
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                },
                axisTick: {
                    show: true,
                    length: 4,
                },
            }
        ],
        series: [
            {
                name: '有电梯',
                type: 'bar',
                barWidth: 10,
                data: [],
            },
            {
                name: '无电梯',
                type: 'bar',
                barWidth: 10,
                data: []
            },
            {
                name: '有电梯',
                type: 'line',
                yAxisIndex: 1,
                symbol: 'none',
                data: [],
            },
            {
                name: '无电梯',
                type: 'line',
                yAxisIndex: 1,
                symbol: 'none',
                data: [],
            }
        ]
    };

    $.getJSON("./json/beijing/elevatorStats.json", function (jsonData) {
        var have_elevator_avg_price_per_square = jsonData.data.have_elevator_avg_price_per_square;
        var not_elevator_count = jsonData.data.not_elevator_count;
        var not_elevator_avg_price_per_square = jsonData.data.not_elevator_avg_price_per_square
        var in_the_area = jsonData.data.in_the_area
        var have_elevator_count = jsonData.data.have_elevator_count

        option.xAxis[0].data = in_the_area
        option.series[0].data = have_elevator_count
        option.series[1].data = not_elevator_count
        option.series[2].data = have_elevator_avg_price_per_square
        option.series[3].data = not_elevator_avg_price_per_square

        myChart.setOption(option);
    });

    window.addEventListener("resize", function () {
        myChart.resize();
    });
})


$(function () {
    var myChart = echarts.init(document.getElementById('echart4'), 'roma');
    var option = {
        tooltip: {},
        xAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                rotate: 90
            }
        },
        yAxis: {
            type: 'value',
           splitLine: {show:false}
        },
        series: [
            {
                data: [],
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    rotate: 90,
                    offset: [5, -15]
                }
            }
        ]
    };

    $.getJSON("./json/beijing/houseCountByArea.json", function (jsonData) {
        var area = jsonData.data.area;
        var house_count = jsonData.data.house_count;
        option.xAxis.data = area
        option.series[0].data = house_count
        myChart.setOption(option);
    });

    window.addEventListener("resize", function () {
        myChart.resize();
    });
})



$(function () {
    var myChart = echarts.init(document.getElementById('echart5'), 'roma');
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '50',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: [],
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    color: "#fff",
                    fontSize: 14
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    color: '#fff',
                    fontSize: 16
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',
                    }
                }
            }
        ],
        dataZoom: {
            left: 'center',
            start: 90,
            end: 100,
            width: 340,
            textStyle: {
                show: false,
                color: '#fff'
            }
        },
        series: [
            {
                name: '房子数量',
                type: 'line',
                symbol: 'none',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    }
                },
                lineStyle: {
                    width: 3,
                    shadowBlur: 20
                },
                areaStyle: {
                    opacity: 0.5,
                },
                data: []
            }
        ]
    };

    $.getJSON("./json/beijing/builtYears.json", function (jsonData) {
        var built_years = jsonData.data.built_years;
        var built_years_count = jsonData.data.built_years_count;
        option.xAxis[0].data = built_years
        option.series[0].data = built_years_count
        myChart.setOption(option);
    });

    window.addEventListener("resize", function () {
        myChart.resize();
    });
})



$(function () {
    var myChart = echarts.init(document.getElementById('echart6'), 'roma');
    var option = {
        legend:{},
        tooltip: {
            formatter: "{b}: {c}套 ({d}%)",
        },
        series: [
            {
                name: '',
                type: 'pie',
                data: [],
                label: {
                    
                    
                },
                center :['50%','60%']
            }
        ]
    };

    $.getJSON("./json/beijing/renovation.json", function (jsonData) {
        var decoration = jsonData.data.decoration;
        var decoration_count = jsonData.data.decoration_count;
        var data = decoration.map(function (item, index) {
            return {
                name: item,
                value: decoration_count[index],
            };
        });
        option.series[0].data = data
        myChart.setOption(option);
    });

    window.addEventListener("resize", function () {
        myChart.resize();
    });
})