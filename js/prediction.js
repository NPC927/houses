$(function () {
    map();
    function map() {
        var myChart = echarts.init(document.querySelector('.map'), 'roma');
        var option = {
            title: {
                text: '房屋价格实际值与预测值对比',
                left: 'center',
            },
            legend: {
                x: "right",
                left: '10%',
                data: [
                    {
                        name: "实际值",
                    },
                    {
                        name: "预测值",
                    }
                ]
            },
            xAxis: {
                show: false,
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '实际值',
                    data: [],
                    type: 'line',
                    smooth: true,
                    symbol: 'none'
                },
                {
                    name: '预测值',
                    data: [],
                    type: 'line',
                    smooth: true,
                    symbol: 'none'
                }
            ]
        };

        $.getJSON("json/housePriceActualAndForecast.json", function (jsonData) {
            var num = jsonData.data.num;
            var true_value = jsonData.data.true_value;
            var prediction = jsonData.data.prediction;
            option.xAxis.data = num
            option.series[0].data = true_value
            option.series[1].data = prediction
            myChart.setOption(option);
        });

        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
});



// JavaScript Document
(function ($) {
    $.fn.myScroll = function (options) {
        //默认配置
        var defaults = {
            speed: 1,  //滚动速度,值越大速度越慢
            rowHeight: 24 //每行的高度
        };

        var opts = $.extend({}, defaults, options), intId = [];

        function marquee(obj, step) {

            obj.find("ul").animate({
                marginTop: '-=1'
            }, 0, function () {
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if (s >= step) {
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function (i) {
            var sh = opts["rowHeight"], speed = opts["speed"], _this = $(this);
            intId[i] = setInterval(function () {
                if (_this.find("ul").height() <= _this.height()) {

                    clearInterval(intId[i]);
                } else {
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function () {
                clearInterval(intId[i]);
            }, function () {
                intId[i] = setInterval(function () {
                    if (_this.find("ul").height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        marquee(_this, sh);
                    }
                }, speed);
            });

        });

    }

})(jQuery);



// 获取数据
$.getJSON("./json/showForecastData.json", function (jsonData) {
    // jsonData数据
    var data = jsonData.data;

    // 设置每页显示的数据量
    var pageSize = 20;

    // 初始化虚拟滚动
    var virtualScroll = new VirtualScroll(data, pageSize);

    // 监听滚动事件
    window.addEventListener('scroll', function () {
        // 当滚动到底部时加载下一页数据
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            virtualScroll.loadNextPage();
        }
    });
});

// 虚拟滚动类
class VirtualScroll {
    constructor(data, pageSize) {
        this.data = data;
        this.pageSize = pageSize;
        this.currentPage = 1;
        this.renderedItems = 0;
        this.ulList = document.getElementById('ul-list');
        this.renderNextPage();
    }

    renderNextPage() {
        for (let i = this.renderedItems; i < Math.min(this.renderedItems + this.pageSize, this.data.community_name.length); i++) {
            var li = ` 
                <li>
                    <div class="fontInner clearfix">
                        <span style="width: 130px;">${this.data.homeowner_code[i]}</span>
                        <span style="width: 100px;">${this.data.in_the_area[i]}</span>
                        <span style="width: 200px;">${this.data.community_name[i]}</span>
                        <span style="width: 130px;">${this.data.house_type[i]}</span>
                        <span style="width: 100px;">${this.data.decoration_situation[i]}</span>
                        <span style="width: 100px;">${this.data.area_of_structure[i]}</span>
                        <span style="width: 100px;">${this.data.prediction[i]}</span>
                    </div>
                </li>`;
            this.ulList.innerHTML += li;
        }
        this.renderedItems += this.pageSize;
        this.currentPage++;
    }

    loadNextPage() {
        // 模拟异步加载数据，实际中应该是从服务器获取数据
        setTimeout(() => {
            this.renderNextPage();
        }, 500);
    }
}