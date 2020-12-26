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
              var colorResult = new window.$echarts.graphic.LinearGradient(
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
          color: new window.$echarts.graphic.LinearGradient(
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