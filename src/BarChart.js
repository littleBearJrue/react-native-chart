/**
 * Copyright (c) 2016, Meizu Technology Co., Ltd. All rights reserved.
 *
 * Created by wangying on 2016/11/14.
 */
import React, {
  PropTypes,
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  ScrollView,
} from 'react-native';


const reactFlattenStyle = require('react-native/Libraries/StyleSheet/flattenStyle');

const INTERVAL = 15;
const MAX_VALUE = 100;
const DEFAULT_COLOR = 'orangered';
const DEFAULT_SECOND_COLOR = 'magenta';
const DEFAULT_TAG_COLOR = 'darkgrey';

class BarChart extends React.Component {

  static propTypes = {
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
    tagSelectedColor: PropTypes.string,
    tagMarginTop: PropTypes.number,
    onColumnPress: PropTypes.func,
    barMarginLeft: PropTypes.number,
    barMarginRight: PropTypes.number,
    selectedColor: PropTypes.string,
    selectedSecondColor: PropTypes.string,
    defaultSelectedIndex: PropTypes.number,
  };

  static TYPE_VERTICAL = 'vertical';
  static TYPE_HORIZONTAL = 'horizontal';

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.defaultSelectedIndex,
    };
  }

  setSelectedIndex = (index: number) => {
    this.setState({ selectedIndex: index });
  };

  _onColumnPress = (index: number) => {
    if (this.props.selectedColor || this.props.selectedSecondColor || this.props.tagSelectedColor) {
      this.setState({ selectedIndex: index });
    }
    if (this.props.onColumnPress) {
      this.props.onColumnPress(index);
    }
  };

  render() {
    const source = this.props.source || [];
    const window = Dimensions.get('window');
    const style = reactFlattenStyle(this.props.style);
    const width = style['width'] || window['width'];
    const height = style['height'] || window['height'] / 2;

    const type = this.props.type || BarChart.TYPE_VERTICAL;
    const color = this.props.color || DEFAULT_COLOR;
    const secondColor = this.props.secondColor || DEFAULT_SECOND_COLOR;
    const interval = this.props.interval === undefined ? INTERVAL : this.props.interval;
    const barWidth = this.props.barWidth === undefined ? interval : this.props.barWidth;
    const maxValue = this.props.maxValue === undefined ? MAX_VALUE : this.props.maxValue;
    const tagFontSize = this.props.tagFontSize === undefined ? INTERVAL : this.props.tagFontSize;
    const tagColor = this.props.tagColor || DEFAULT_TAG_COLOR;
    const tagMarginTop = this.props.tagMarginTop === undefined ? 0 : this.props.tagMarginTop;
    const barMarginLeft = this.props.barMarginLeft === undefined ? (type === BarChart.TYPE_HORIZONTAL ? 0 : interval) : this.props.barMarginLeft;
    const barMarginRight = this.props.barMarginRight === undefined ? barMarginLeft : this.props.barMarginRight;
    const selectedColor = this.props.selectedColor;
    const selectedSecondColor = this.props.selectedSecondColor;
    const tagSelectedColor = this.props.tagSelectedColor;

    const tagHeight = tagFontSize * 1.15;
    const rectHeight = height - tagHeight - tagMarginTop;

    let reactWidth = width;
    let reacts;
    if (type === BarChart.TYPE_HORIZONTAL) {

      const barsWidth = width - barMarginLeft - barMarginRight;
      let startX = barMarginLeft;
      reacts = source.map((data, index) => {
        let rect;
        let barWidth;
        const selected = this.state.selectedIndex === index;
        if (data['value'] && data['value'] > 0) {
          const barColor = selected ? (selectedColor || data['color'] || color) : (data['color'] || color);
          barWidth = data['value'] / maxValue * barsWidth;
          rect = <TouchableHighlight
            style={{ position: 'absolute', left: startX, top: 0, right: (width - startX - barWidth), bottom: (height - rectHeight), backgroundColor: 'transparent' }}
            activeOpacity={1}
            onPress={() => this._onColumnPress(index)}
          >
            <View
              style={{ flex: 1, backgroundColor: barColor }}
            />
          </TouchableHighlight>;

        } else {
          barWidth = 0;
          rect = undefined;
        }

        let tag;
        if (data['tag']) {
          const textColor = selected ? (tagSelectedColor || tagColor) : tagColor;
          const textWidth = data['tag'].length * tagFontSize * 1.15;
          tag = <Text
            style={{ position: 'absolute', left: (startX + barWidth / 2 - textWidth / 2), top: (height - tagHeight), right: (width - (startX + barWidth / 2 + textWidth / 2)), bottom: 0, fontSize: tagFontSize, color: textColor, textAlign: 'center', backgroundColor: 'transparent' }}
            numberOfLines={1}
          >
            {data['tag']}
          </Text>;
        } else {
          tag = undefined;
        }
        startX += barWidth;
        return [rect, tag];
      });

    } else {

      reactWidth = (source.length < 1 ? 0 : source.length - 1)  * (interval + barWidth) + barWidth + barMarginLeft + barMarginRight;
      if (reactWidth < width) {
        reactWidth = width;
      }
      reacts = source.map((data, index) => {
        let barHeight = 0;
        let secondBarHeight = 0;
        const selected = this.state.selectedIndex === index;
        if (data['value'] && data['value'] > 0) {
          barHeight = data['value'] / maxValue * rectHeight;
          if (barHeight > rectHeight) {
            barHeight = rectHeight;
          }
        }
        if (data['secondValue'] && data['secondValue'] > 0) {
          secondBarHeight = data['secondValue'] / maxValue * rectHeight;
          if (secondBarHeight + barHeight > rectHeight) {
            secondBarHeight = rectHeight - barHeight;
          }
        }

        let bar;
        if (barHeight > 0) {
          const barColor = selected ? (selectedColor || data['color'] || color) : (data['color'] || color);
          bar = <View
            style={{ position: 'absolute', left: 0, top: secondBarHeight, right: 0, bottom: 0, backgroundColor: barColor }}
          />;
        } else {
          bar = undefined;
        }

        let secondBar;
        if (secondBarHeight > 0) {
          const secondBarColor = selected ? (selectedSecondColor || data['secondColor'] || secondColor) : (data['secondColor'] || secondColor);
          secondBar = <View
            style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: barHeight, backgroundColor: secondBarColor }}
          />;
        } else {
          secondBar = undefined;
        }

        let tag;
        if (data['tag']) {
          const textColor = selected ? (tagSelectedColor || tagColor) : tagColor;
          const textWidth = data['tag'].length * tagFontSize * 1.15;
          const left = index * (interval + barWidth) + barMarginLeft + barWidth / 2 - textWidth / 2;
          tag = (
            <Text
              style={{ position: 'absolute', left: left, top: (height - tagHeight), right: (reactWidth - left - textWidth), bottom: 0, fontSize: tagFontSize, color: textColor, textAlign: 'center', backgroundColor: 'transparent' }}
              numberOfLines={1}
            >
              {data['tag']}
            </Text>
          );
        } else {
          tag = undefined;
        }

        let result;
        if (bar || secondBar) {
          result = [
            (<TouchableHighlight
              style={{ position: 'absolute', left: (index * (interval + barWidth) + barMarginLeft), top: (rectHeight - barHeight - secondBarHeight), right: (reactWidth - (index * (interval + barWidth) + barMarginLeft + barWidth)), bottom: (height - rectHeight), backgroundColor: 'transparent' }}
              activeOpacity={1}
              onPress={() => this._onColumnPress(index)}
            >
              <View
                style={{ flex: 1, backgroundColor: 'transparent' }}
              >
                {bar}
                {secondBar}
              </View>
            </TouchableHighlight>),
            tag
          ];
        } else {
          result = tag;
        }
        return result;
      });

    }
    const scrollEnabled = reactWidth > width;

    return (
      <ScrollView
        contentContainerStyle={[this.props.style, { width: reactWidth, height: height }]}
        horizontal={true}
        scrollEnabled={scrollEnabled}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {reacts}
      </ScrollView>
    );
  }

}

module.exports = BarChart;
