<template>
  <div class="echart-map-lfy">
    <echart-template ref="echartTemplate" :options="options" height="142%"></echart-template>
  </div>
</template>

<script>
import EchartTemplate from "../echartTemplate";
export default {
  name: "flyLineMap",
  components: { EchartTemplate },
  data() {
    return {
      options: {},
      provinceCenter: [
        { value: [116.688529, 23.366257], itemStyle: { color: "#f55" }, name: "汕头" },
        { value: [116.470384, 40.215983], itemStyle: { color: "#f55" }, name: "北京" },
        { value: [85.503413, 41.207974], itemStyle: { color: "#4ab2e5" }, name: "新疆" },
        { value: [88.299802, 31.46797], itemStyle: { color: "#4ab2e5" }, name: "西藏" },
        { value: [96.321024, 35.775803], itemStyle: { color: "#4ab2e5" }, name: "青海" },
        { value: [103.091229, 30.707961], itemStyle: { color: "#4ab2e5" }, name: "四川" },
        { value: [101.214704, 24.382859], itemStyle: { color: "#4ab2e5" }, name: "云南" },
        { value: [108.941569, 34.475921], itemStyle: { color: "#4ab2e5" }, name: "陕西" },
        { value: [113.651277, 33.925599], itemStyle: { color: "#4ab2e5" }, name: "河南" },
        { value: [112.032315, 31.246936], itemStyle: { color: "#4ab2e5" }, name: "湖北" },
        { value: [122.997104, 41.346766], itemStyle: { color: "#4ab2e5" }, name: "辽宁" },
        { value: [126.529385, 43.633892], itemStyle: { color: "#4ab2e5" }, name: "吉林" },
        { value: [112.694618, 42.391856], itemStyle: { color: "#4ab2e5" }, name: "内蒙古" },
        { value: [118.208238, 36.138486], itemStyle: { color: "#4ab2e5" }, name: "山东" },
        { value: [119.385665, 33.591303], itemStyle: { color: "#4ab2e5" }, name: "江苏" },
        { value: [117.068296, 31.957724], itemStyle: { color: "#4ab2e5" }, name: "安徽" },
        { value: [111.999841, 27.724835], itemStyle: { color: "#4ab2e5" }, name: "湖南" },
        { value: [109.277041, 24.19972], itemStyle: { color: "#4ab2e5" }, name: "广西" },
        { value: [115.826479, 27.921121], itemStyle: { color: "#4ab2e5" }, name: "江西" },
        { value: [118.181333, 26.274581], itemStyle: { color: "#4ab2e5" }, name: "福建" },
        { value: [106.848598, 26.80413], itemStyle: { color: "#4ab2e5" }, name: "贵州" },
        { value: [107.878846, 30.168163], itemStyle: { color: "#4ab2e5" }, name: "重庆" },
        { value: [128.41023, 47.109405], itemStyle: { color: "#4ab2e5" }, name: "黑龙江" },
        { value: [113.582008, 23.658547], itemStyle: { color: "#4ab2e5" }, name: "广东" },
        { value: [119.984268, 29.349465], itemStyle: { color: "#4ab2e5" }, name: "浙江" },
        { value: [109.902549, 19.460303], itemStyle: { color: "#4ab2e5" }, name: "海南" },
        { value: [104.567333, 35.085236], itemStyle: { color: "#4ab2e5" }, name: "甘肃" },
        { value: [115.292033, 38.66412], itemStyle: { color: "#4ab2e5" }, name: "河北" },
        { value: [121.547114, 31.220848], itemStyle: { color: "#4ab2e5" }, name: "上海" },
        { value: [112.139222, 37.28887], itemStyle: { color: "#4ab2e5" }, name: "山西" },
      ],
      quantity: [
        {
          name: "青海",
          value: 1000,
          colors: ["rgba(234,78,70,0.6)", "rgba(234,78,70,1)"],
        },
        {
          name: "内蒙古",
          value: 900,
          colors: ["rgba(245,203,89,0.6)", "rgba(245,203,89,1)"],
        },
        {
          name: "西藏",
          value: 800,
          colors: ["rgba(95,182,91,0.6)", "rgba(95,182,91,1)"],
        },
        {
          name: "甘肃",
          value: 700,
        },
        {
          name: "吉林",
          value: 600,
        },
        {
          name: "山西",
          value: 500,
        },
        {
          name: "河北",
          value: 400,
        },
      ].reverse(),
    };
  },
  methods: {
    flyData(data, flydata) {
      const baseColors = ["rgba(75,255,192,0.6)", "rgba(75,255,192,1)"];
      return data.map((item) => {
        let provinceItem = flydata.filter((p) => p.name === item.name)[0];
        let colors = item.color || item.colors ? item.colors : baseColors;
        return {
          name: item.name,
          value: provinceItem.value,
          itemStyle: {
            color: colors[0],
          },
        };
      });
    },
    createdEchart(region, points, targetProvince) {
      const geoJson = require("./quanguo.json");
      this.$echarts.registerMap("quanguo", geoJson);
      let options = {
        backgroundColor: "transparent",
        geo: {
          map: region,
          zoom: 1.25,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: "#30aacd",
              },
            },
            emphasis: {
              textStyle: {
                color: "#fff",
              },
            },
          },
          itemStyle: {
            normal: {
              borderColor: "#4dcfff", // 边框
              borderWidth: 1,
              color: "transparent",
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(23, 118, 178, 0.15)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(124, 238, 255, 0.5)", // 100% 处的颜色
                  },
                ],
                globalCoord: true, // 缺省为 false
              },
            },
            emphasis: {
              areaColor: "#30aacd",
              borderWidth: 0.1,
            },
          },
        },
        series: [
          {
            type: "effectScatter", // 点
            coordinateSystem: "geo",
            showEffectOn: "render",
            zlevel: 1,
            rippleEffect: {
              period: 5,
              scale: 3,
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                offset: [15, 0],
                color: "#1DE9B6",
                show: false,
              },
            },
            itemStyle: {
              normal: {
                color: "#1DE9B6",
                shadowBlur: 5,
                shadowColor: "#333",
              },
            },
            symbolSize: 5,
            data: points,
          },
          {
            type: "lines", //地图线的动画效果
            zlevel: 7,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 4, //图标大小
            },
            lineStyle: {
              type: "solid",
              color: "#1DE9B6",
              width: 1, //线条宽度
              opacity: 0.2, //尾迹线条透明度
              curveness: 0.3, //尾迹线条曲直度
            },
            data: points.map((item) => {
              return {
                coords: [item.value, targetProvince.value],
                lineStyle: {
                  color: item.itemStyle.color,
                },
              };
            }),
          },
        ],
      };
      this.options = options;
    },
    resize() {
      this.$refs.echartTemplate.resize();
    },
  },
  created() {
    const target = this.provinceCenter.filter((item) => item.name === "汕头")[0];
    this.createdEchart(
      "quanguo",
      this.flyData([...this.quantity, target], this.provinceCenter),
      target
    );
  },
};
</script>

<style lang="less" scoped>
.echart-map-lfy {
  height: 100%;
  overflow: hidden;
}
</style>
