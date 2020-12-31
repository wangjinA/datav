index.js?7640:107 
    <template>
      <div>
        
      <!-- 图片 -->
      <div :style="BaseImageStyle">
        <BaseImage v-bind="BaseImageAttr"/>
      </div>
    
      <!-- 普通文字 -->
      <div :style="BaseTextStyle">
        <BaseText v-bind="BaseTextAttr"/>
      </div>
    
      <!-- 普通文字 -->
      <div :style="BaseTextStyle">
        <BaseText v-bind="BaseTextAttr"/>
      </div>
    
      <!-- 普通文字 -->
      <div :style="BaseTextStyle">
        <BaseText v-bind="BaseTextAttr"/>
      </div>
    
      <!-- 图表自定义 -->
      <div :style="EchartTemplateStyle">
        <EchartTemplate v-bind="EchartTemplateAttr"/>
      </div>
    
      <!-- 数字累加器 -->
      <div :style="BaseNumberStyle">
        <BaseNumber v-bind="BaseNumberAttr"/>
      </div>
    
      <!-- 头部 -->
      <div :style="HyHeaderStyle">
        <HyHeader v-bind="HyHeaderAttr"/>
      </div>
    
      <!-- 3d云标签 -->
      <div :style="ThreedTagsStyle">
        <ThreedTags v-bind="ThreedTagsAttr"/>
      </div>
    
      <!-- 普通文字 -->
      <div :style="BaseTextStyle">
        <BaseText v-bind="BaseTextAttr"/>
      </div>
    
      </div>
    </template>
  
    <script>
      
      import BaseImage from "@/components/BaseImage";
    
      import BaseText from "@/components/BaseText";
    
      import BaseText from "@/components/BaseText";
    
      import BaseText from "@/components/BaseText";
    
      import EchartTemplate from "@/components/EchartTemplate";
    
      import BaseNumber from "@/components/BaseNumber";
    
      import HyHeader from "@/components/HyHeader";
    
      import ThreedTags from "@/components/ThreedTags";
    
      import BaseText from "@/components/BaseText";
    
      export default {
        data() {
          return {
            
            BaseImageStyle: {
              position: 'absolute',
              width: '450px',
              width: '64px',
              left: '36px',
              top: '103px',
            },
    
            BaseTextStyle: {
              position: 'absolute',
              width: '80px',
              width: '25px',
              left: '70px',
              top: '123px',
            },
    
            BaseTextStyle: {
              position: 'absolute',
              width: '106px',
              width: '25px',
              left: '363px',
              top: '123px',
            },
    
            BaseTextStyle: {
              position: 'absolute',
              width: '114px',
              width: '25px',
              left: '204px',
              top: '123px',
            },
    
            EchartTemplateStyle: {
              position: 'absolute',
              width: '414px',
              width: '359px',
              left: '609px',
              top: '606px',
            },
    
            BaseNumberStyle: {
              position: 'absolute',
              width: '122px',
              width: '44px',
              left: '851px',
              top: '337px',
            },
    
            HyHeaderStyle: {
              position: 'absolute',
              width: '1920px',
              width: '77px',
              left: '0px',
              top: '0px',
            },
    
            ThreedTagsStyle: {
              position: 'absolute',
              width: '415px',
              width: '415px',
              left: '102px',
              top: '516px',
            },
    
            BaseTextStyle: {
              position: 'absolute',
              width: '80px',
              width: '25px',
              left: '1083px',
              top: '550px',
            },
    
            
          BaseImageAttr: {"src":"datav_17/bg2.png","fit":"fill"},
    
          BaseTextAttr: {"text":"选择日期","fontSize":18,"color":"#21DFFF"},
    
          BaseTextAttr: {"text":"2020-12-30","fontSize":18,"color":"#21DFFF"},
    
          BaseTextAttr: {"text":"2020-12-28","fontSize":18,"color":"#21DFFF"},
    
          EchartTemplateAttr: {"options":"option = {\n        tooltip: {\n          trigger: \"item\",\n          formatter: \"{a} <br/>{b}: {c} ({d}%)\",\n        },\n        // grid: {\n        //   bottom: \"25%\", //距上边距\n        // },\n        legend: {\n          // orient: \"\",\n          // bottom: 10,\n          // orient: \"vertical\",//vertical垂直对齐，默认水平\n          // X: \"160px\",\n          // y: \"30px\",\n          // top: \"bottom\",\n          bottom: \"10px\",\n          data: [\n            \"直接访问111\",\n            \"邮件营销\",\n            \"联盟广告\",\n            \"视频广告\",\n            \"搜索引擎\",\n            \"搜索引擎222\",\n          ],\n          itemGap: 10, //行间距\n          itemWidth: 16, //图例宽度\n          itemHeight: 16, //图例高度\n          // icon: \"pin\",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none\n          formatter: \"{a|{name}}\",\n          textStyle: {\n            //图例中的文本\n            rich: {\n              a: {\n                //富文本编辑，指定大小宽高\n                color: \"{a}\", //设置颜色为当前图标颜色\n                fontSize: 15,\n                width: 95,\n                height: 21,\n                padding: [0, 0, 0, 1],\n              },\n            },\n          },\n        },\n        pie: 50,\n        series: [\n          {\n            name: \"访问来源\",\n            type: \"pie\",\n            radius: [\"25%\", \"40%\"], //内圆外圆大小\n            avoidLabelOverlap: false, //显示超出显示点\n            data: [\n              {\n                value: 335,\n                name: \"直接访问111\",\n                itemStyle: { color: \"#BA55D3\" },\n              },\n              { value: 310, name: \"邮件营销\", itemStyle: { color: \"#6495ED\" } },\n              { value: 234, name: \"联盟广告\", itemStyle: { color: \"#F08080\" } },\n              { value: 135, name: \"视频广告\", itemStyle: { color: \"#F4A460\" } },\n              {\n                value: 1548,\n                name: \"搜索引擎\",\n                itemStyle: { color: \"#00BFFF\" },\n              },\n              {\n                value: 1548,\n                name: \"搜索引擎222\",\n                itemStyle: { color: \"#7FFFAA\" }, //设置字体颜色不能存在空格\n              },\n            ],\n            label: {\n              color: \"#a1aeb9\",\n              // formatter: \"{a|{a}}{abg|}\\n{hr|}\\n  {b|{b}：}{c}  {per|{d}%}  \",\n              formatter: \"{d}%  \",\n              // position: \"inner\",//将标注显示在内\n            },\n            labelLine: {\n              lineStyle: {\n                color: \"rgba(255, 255, 255, 0.3)\",\n              },\n              smooth: 0.2, //动画时间\n              length: 10, //第一段长度\n              length2: 20, //拐角长度\n            },\n            animationType: \"scale\",\n            animationEasing: \"elasticOut\",\n            animationDelay: function (idx) {\n              return Math.random() * 200;\n            },\n          },\n        ],\n}"},
    
          BaseNumberAttr: {"value":1001,"color":"#21DFFF","fontSize":30,"company":"单位","companyColor":"#21DFFF","companyFontSize":18},
    
          HyHeaderAttr: {"color":"#fff","title":"海云数据大屏可视化","type":0},
    
          ThreedTagsAttr: {"speed":1,"list":["新冠病毒","社会环境","地摊","谨防诈骗","大前端","JavaScript","CSS","HTML","Vue","less","webpack"],"colorRange":["#04FBFF","#00A8FF"]},
    
          BaseTextAttr: {"text":"普通文字","fontSize":18,"color":"#21DFFF"},
    
          }
        },
        components: {
          
          BaseImage,
    
          BaseText,
    
          BaseText,
    
          BaseText,
    
          EchartTemplate,
    
          BaseNumber,
    
          HyHeader,
    
          ThreedTags,
    
          BaseText,
    
        },
      }
    </script>
  