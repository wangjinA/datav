export const getEchartOption = (data) => {
  const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
  return {
    backgroundColor: '#fff',
    title: {
      text: '组件下载统计',
      textStyle: {
        fontSize: 12,
        fontWeight: 400
      },
      left: 'center',
      top: '5%'
    },
    legend: {
      icon: 'circle',
      top: '5%',
      right: '5%',
      itemWidth: 6,
      itemGap: 20,
      textStyle: {
        color: '#556677'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          show: true,
          backgroundColor: '#fff',
          color: '#556677',
          borderColor: 'rgba(0,0,0,0)',
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetY: 0
        },
        lineStyle: {
          width: 0
        }
      },
      backgroundColor: '#fff',
      textStyle: {
        color: '#5c6c7c'
      },
      padding: [10, 10],
      extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
    },
    grid: {
      top: '15%'
    },
    xAxis: [{
      type: 'category',
      data: data.map(item => item.day),
      axisLine: {
        lineStyle: {
          color: '#DCE2E8'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: '#556677'
        },
        // 默认x轴字体大小
        fontSize: 12,
        // margin:文字到x轴的距离
        margin: 15
      },
      axisPointer: {
        label: {
          // padding: [11, 5, 7],
          padding: [0, 0, 10, 0],
          margin: 15,
          fontSize: 12,
          backgroundColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#fff' // 0% 处的颜色
            }, {
              offset: 0.86,
              color: '#fff' // 0% 处的颜色
            }, {
              offset: 0.86,
              color: '#33c0cd' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#33c0cd' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      },
      boundaryGap: false
    }],
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#DCE2E8'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#556677'
        }
      },
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '下载次数',
      type: 'line',
      data: data.map(item => item.count),
      symbolSize: 1,
      symbol: 'circle',
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 5,
        color: new window.echarts.graphic.LinearGradient(0, 1, 0, 0, [{
          offset: 0,
          color: '#9effff'
        },
        {
          offset: 1,
          color: '#9E87FF'
        }
        ]),
        shadowColor: 'rgba(158,135,255, 0.3)',
        shadowBlur: 10,
        shadowOffsetY: 20
      },
      itemStyle: {
        normal: {
          color: colorList[0],
          borderColor: colorList[0]
        }
      }
    }
    ]
  };
}