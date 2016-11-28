# react-native-meizu-chart

## Start
- npm i -S react-native-svg
- react-native link react-native-svg

## 配置
width 和 height 需要精确值才能正常显示。

    propTypes = {
        ...View.propTypes,
        style: View.propTypes.style,
    
        source: PropTypes.arrayOf(PropTypes.shape(
          {
            tag: PropTypes.string,
            value: PropTypes.number,
            secondValue: PropTypes.number,
            color: PropTypes.string,
            secondColor: PropTypes.string,
          }
        )),
        type: PropTypes.oneOf(['vertical', 'horizontal']),  //BarChart.TYPE_VERTICAL or BarChart.TYPE_HORIZONTAL
        barWidth: PropTypes.number,
        interval: PropTypes.number,
        maxValue: PropTypes.number,
        color: PropTypes.string,
        secondColor: PropTypes.string,
        tagFontSize: PropTypes.number,
        tagColor: PropTypes.string,
        tagMarginTop: PropTypes.number,
        onColumnPress: PropTypes.func,
      };
