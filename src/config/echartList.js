// 柱状图
export const zzt = `
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: '5%',
      right: '3%',
      left: '8%',
      bottom: '10%'
    },
    xAxis: [
      {
        type: 'category',
        data: ['全市', '濠江区', '潮阳区', '潮南区', '澄海区', '龙湖区', '金平区', '南澳县'],
        axisLine: {
          show: true,
          lineStyle: {
            color: '#027DB3',
            width: 2,
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 10,
          color: '#e2e9ff',
          textStyle: {
            fontSize: 12
          }
        }
      }
    ],
    yAxis: [
      {
        axisLabel: {
          formatter: '{value}',
          color: '#e2e9ff',
          textStyle: {
            fontSize: 14
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#027DB3',
            width: 2,
          }
        },
        splitLine: {
          lineStyle: {
            color: '#027DB3',
            type: 'dashed'
          }
        }
      }
    ],
    series: [
      {
        type: 'bar',
        data: [170, 220, 180, 210, 169, 230, 170, 210],
        barWidth: '15px',
        itemStyle: {
          normal: {
            color: (params) => { let colorList = ['#0ED6F4', '#FFB56C', '#02A1FD', '#5AE7AE', '#0ED6F4', '#FFB56C', '#02A1FD', '#5AE7AE']; return colorList[params.dataIndex] },
            barBorderRadius: [30, 30, 0, 0],
          }
        },
        label: {
          normal: {
            show: true,
            position: 'outside'
          }
        }
      }
    ]
  }
`
export const zzt1 = `
  let _data = [
    {
      name: "青云店",
      value: 850,
    },
    {
      name: "长子营",
      value: 750,
    },
    {
      name: "采育",
      value: 980,
    },
    {
      name: "礼贤",
      value: 150,
    },
    {
      name: "安定",
      value: 350,
    },
  ];
  option = {
    animationDuration: 1500,
    emphasis: {
      show: false,
    },
    label: {
      //柱顶提示数字
      show: false,
    },
    grid: {
      left: "8%",
      top: "15%",
      right: "5%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      show: false,
    },
    yAxis: [
      {
        // type: 'value', //---轴类型，默认'category'
        // nameGap: 15,
        data: _data.map((item) => item.name),
        axisLabel: {
          fontSize: 12,
          color: "rgba(255,255,255,0.7)",
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        data: _data.map((item) => item.value),
        legendHoverLink: false,
        type: "bar",
        barWidth: 5,
        itemStyle: {
          normal: {
            color: () => {
              var colorResult = new window.echarts.graphic.LinearGradient(
                0,
                0,
                1,
                1,
                [
                  // 柱体颜色渐变

                  {
                    offset: 0,
                    color: "rgba(0,136,251,0.2)",
                  },
                  {
                    offset: 1,
                    color: "rgba(70,238,255,1)",
                  },
                ],
                false
              );
              return colorResult;
            },
            barBorderRadius: [0, 10, 10, 0],
          },
          emphasis: {
            show: false,
          },
        },
      },
    ],
  };
`

// 折线图
export const zxt = `
  option = {

    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
            textStyle: {
                color: "#fff"
            }

        },
    },
    grid: {
        borderWidth: 0,
        left: "2%",
        right: "4%",
        bottom: "14%",
        top:"16%",
        textStyle: {
            color: "#fff"
        },
    containLabel: true
    },
    legend: {
        x: "20%",
        top: "2%",
        itemGap: 30,
        textStyle: {
            color: "#90979c",
      fontSize: 12
        },

    },
    calculable: true,
    xAxis: [{
        type: "category",
        axisLine: {
            lineStyle: {
                color: "rgba(204,187,225,0.5)",
            }
        },
        axisPointer: {
          type: "line"
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        data: ["05:00","07:00","09:00","11:00","13:00","15:00","17:00","19:00"],
    }],

    yAxis: [{
        type: "value",
        max:"100",
        "axisLine": {
            "show": false,
            lineStyle: {
                color: "rgba(204,187,225,0.5)",
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
              type:"dashed",
              color: "rgba(1, 149, 176, 1)"
            }
        },
        "axisLabel": {
            "interval": 0,
            color: "rgba(154, 209, 253, 1)",
            fontSize: 10
        },
        
    },{
        type: "value",
        max:"100",
        "splitLine": {
            "show": false
        },
        "axisLine": {
            "show": false
        },
        splitLine: {
            show: true,
            lineStyle: {
              type:"dashed",
              color: "rgba(1, 149, 176, 1)"
            }
        },
        "axisLabel": {
            "interval": 0,
            color: "rgba(154, 209, 253, 1)",
            fontSize: 10

        },
        }],
    series: [{
        name: "总班次  3489",
        type: "line",
        symbolSize: 1,
        symbol: "circle",
        itemStyle: {
            color: "#C000FF",
        },
        data: [
            40, 50, 45, 30, 55, 35, 50, 35
        ],
    }, {
        name: "总里程  23432",
        type: "line",
        yAxisIndex: 1,
        symbolSize: 1,
        symbol: "circle",
        itemStyle: {
            color: "#00A2FF",
        },
        data: [
            60,80,65,75,70,85,65,80
        ]
    }, ]
  }
`
export const zxt1 = `
  let _data = [
    {
      name: "青云店",
      value: 850,
    },
    {
      name: "长子营",
      value: 750,
    },
    {
      name: "采育",
      value: 680,
    },
    {
      name: "礼贤",
      value: 450,
    },
    {
      name: "安定",
      value: 350,
    },
    {
      name: "榆垡",
      value: 166,
    },
  ];
  option = {
    animationDuration: 1500,
    emphasis: {
      show: false,
    },
    label: {
      show: false,
    },
    grid: {
      left: "8%",
      top: "18%",
      right: "5%",
      bottom: "18%",
      containLabel: true,
    },
    xAxis: [
      {
        boundaryGap: false,
        offset: 3,
        data: _data.map((item) => item.name),
        axisLabel: {
          fontSize: 12,
          color: "rgba(255,255,255,0.7)",
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: true,
          inside: false,
          alignWithLabel: true,
          lineStyle: {
            width: 2,
            color: "rgba(255,255,255,0.7)",
          },
        },
      },
    ],
    yAxis: [
      {
        // type: "value", //---轴类型，默认"category"
        offset: 3,
        axisLabel: {
          fontSize: 14,
          color: "rgba(255,255,255,0.7)",
          formatter(value) {
            // 格式化Y轴数字格式，去掉千位符
            let res1 = 0;
            res1 = value;
            return res1;
          },
        },
        axisLine: {
          show: false,
        },

        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,0.15)",
            width: 1,
          },
        },
      },
    ],
    series: [
      {
        data: _data.map((item) => item.value),
        type: "line",
        hoverAnimation: true,
        showAllSymbol: true,
        symbol: "circle",
        symbolSize: 5,
        lineStyle: {
          normal: {
            color: "rgba(0,255,255,1)",
            width: 2,
            shadowBlur: 0,
          },
        },
        itemStyle: {
          color: "rgba(0,255,255,1)",
          borderColor: "rgba(255,255,255,1)",
          borderWidth: 1,
        },
        areaStyle: {
          color: new window.echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(0,255,255,0.8)",
              },
              {
                offset: 1,
                color: "rgba(0,255,255,0.1)",
              },
            ],
            false
          ),
        },
        origin: "start",
      },
    ],
  };
`

// 仪表盘

export const ybp = `
let angle = 0; //角度，用来做简单的动画效果的
let value = 55.33;
const line = [
  () => ({
    startAngle: ((0 + angle) * Math.PI) / 180,
    endAngle: ((90 + angle) * Math.PI) / 180,
  }),
  () => ({
    startAngle: ((180 + angle) * Math.PI) / 180,
    endAngle: ((270 + angle) * Math.PI) / 180,
  }),
];
const line2 = [
  () => ({
    startAngle: ((270 + -angle) * Math.PI) / 180,
    endAngle: ((40 + -angle) * Math.PI) / 180,
  }),
  () => ({
    startAngle: ((90 + -angle) * Math.PI) / 180,
    endAngle: ((220 + -angle) * Math.PI) / 180,
  }),
];

//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
function getCirlPoint(x0, y0, r, angle) {
  let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
  let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
  return {
    x: x1,
    y: y1,
  };
}
const point = [90, 270];
option = {
  backgroundColor: "#061740",
  title: {
    text: "{a|" + value + "}{c|%}",
    x: "center",
    y: "center",
    textStyle: {
      rich: {
        a: {
          fontSize: 26,
          color: "#29EEF3",
        },

        c: {
          fontSize: 20,
          color: "#ffffff",
          // padding: [5,0]
        },
      },
    },
  },
  legend: {
    type: "plain",
    orient: "vertical",
    right: 0,
    top: "10%",
    align: "auto",
    data: [
      {
        name: "涨价后没吃过",
        icon: "circle",
      },
      {
        name: "天天吃",
        icon: "circle",
      },
      {
        name: "三五天吃一次",
        icon: "circle",
      },
      {
        name: "半个月吃一次",
        icon: "circle",
      },
    ],
    textStyle: {
      color: "white",
      fontSize: 16,
      padding: [10, 1, 10, 0],
    },
    selectedMode: false,
  },
  series: [
    ...line.map((item) => ({
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: function(params, api) {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
            ...item(),
          },
          style: {
            stroke: "#0CD3DB",
            fill: "transparent",
            lineWidth: 1.5,
          },
          silent: true,
        };
      },
      data: [0],
    })),
    ...line2.map((item) => ({
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: function(params, api) {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
            ...item(),
          },
          style: {
            stroke: "#0CD3DB",
            fill: "transparent",
            lineWidth: 1.5,
          },
          silent: true,
        };
      },
      data: [0],
    })),
    ...point.map((item) => ({
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: function(params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
        let point = getCirlPoint(x0, y0, r, item + -angle);
        return {
          type: "circle",
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4,
          },
          style: {
            stroke: "#0CD3DB", //粉
            fill: "#0CD3DB",
          },
          silent: true,
        };
      },
      data: [0],
    })),
    {
      name: "吃猪肉频率",
      type: "pie",
      radius: ["58%", "45%"],
      silent: true,
      clockwise: true,
      startAngle: 90,
      z: 0,
      zlevel: 0,
      label: {
        normal: {
          position: "center",
        },
      },
      data: [
        {
          value: value,
          name: "",
          itemStyle: {
            normal: {
              color: {
                // 完成的圆环的颜色
                colorStops: [
                  {
                    offset: 0,
                    color: "#4FADFD", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#28E8FA", // 100% 处的颜色
                  },
                ],
              },
            },
          },
        },
        {
          value: 100 - value,
          name: "",
          label: {
            normal: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              color: "#173164",
            },
          },
        },
      ],
    },

    {
      name: "",
      type: "gauge",
      radius: "58%",
      center: ["50%", "50%"],
      startAngle: 0,
      endAngle: 359.9,
      splitNumber: 8,
      hoverAnimation: true,
      axisTick: {
        show: false,
      },
      splitLine: {
        length: 60,
        lineStyle: {
          width: 5,
          color: "#061740",
        },
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          opacity: 0,
        },
      },
      detail: {
        show: false,
      },
      data: [
        {
          value: 0,
          name: "",
        },
      ],
    },
  ],
};

//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
function getCirlPoint(x0, y0, r, angle) {
  let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
  let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
  return {
    x: x1,
    y: y1,
  };
}

function draw() {
  angle = angle + 3;
  myChart.setOption(option, true);
  //window.requestAnimationFrame(draw);
}

setInterval(function() {
  //用setInterval做动画感觉有问题
  draw();
}, 10011);
`