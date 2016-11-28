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
  Dimensions,
  ScrollView,
} from 'react-native';

import Svg, {
  G,
  Rect,
  Text,
} from 'react-native-svg';

const reactFlattenStyle = require('react-native/Libraries/StyleSheet/flattenStyle');

const INTERVAL = 15;
const MAX_VALUE = 100;

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
    tagMarginTop: PropTypes.number,
    onColumnPress: PropTypes.func,
  };

  static TYPE_VERTICAL = 'vertical';
  static TYPE_HORIZONTAL = 'horizontal';

  _onColumnPress = (index: number) => {
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
    const color = this.props.color || 'orangered';
    const secondColor = this.props.secondColor || 'magenta';
    const interval = this.props.interval || INTERVAL;
    const barWidth = this.props.barWidth || INTERVAL;
    const maxValue = this.props.maxValue || MAX_VALUE;
    const tagFontSize = this.props.tagFontSize || INTERVAL;
    const tagColor = this.props.tagColor || 'darkgrey';
    const tagMarginTop = this.props.tagMarginTop || 0;

    const tagHeight = tagFontSize * 1.15;
    const rectHeight = height - tagHeight - tagMarginTop;

    let reactWidth = width;
    let reacts;
    if (type == BarChart.TYPE_HORIZONTAL) {

      let startX = 0;
      reacts = source.map((data, index) => {
        let rect;
        let barWidth;
        if (data['value'] && data['value'] > 0) {
          const barColor = data['color'] || 'magenta';
          barWidth = data['value'] / maxValue * width;
          rect = <Rect key={index}
                       x={startX}
                       y={0}
                       width={barWidth}
                       height={rectHeight}
                       fill={barColor}
                       onPress={() => { this._onColumnPress(index); }}/>;
        } else {
          barWidth = 0;
          rect = undefined;
        }

        let tag;
        if (data['tag']) {
          tag = (
            <Text
              x={startX + barWidth / 2}
              y={height - tagHeight}
              textAnchor={'middle'}
              fontSize={tagFontSize}
              fill={tagColor}
            >
              {data['tag']}
            </Text>
          );
        } else {
          tag = undefined;
        }
        startX += barWidth;
        return (
          <G
            key={index}
          >
            {rect}
            {tag}
          </G>
        );
      });

    } else {

      reacts = source.map((data, index) => {
        let bar;
        let barHeight;
        if (data['value'] && data['value'] > 0) {
          barHeight = data['value'] / maxValue * rectHeight;
          if (barHeight > rectHeight) {
            barHeight = rectHeight;
          }
          const barColor = data['color'] || color;
          bar = <Rect x={index * (interval + barWidth) + interval}
                      y={`${rectHeight - barHeight}`}
                      width={`${barWidth}`}
                      height={`${barHeight}`}
                      fill={barColor}
                      onPress={() => { this._onColumnPress(index); }}/>;
        } else {
          barHeight = 0;
          bar = undefined;
        }

        let secondBar;
        if (data['secondValue'] && data['secondValue'] > 0) {
          const secondBarColor = data['secondColor'] || secondColor;
          let secondBarHeight = data['secondValue'] / maxValue * rectHeight;
          if (secondBarHeight + barHeight > rectHeight) {
            secondBarHeight = rectHeight - barHeight;
          }
          secondBar = <Rect x={index * (interval + barWidth) + interval}
                            y={`${rectHeight - barHeight - secondBarHeight}`}
                            width={`${barWidth}`}
                            height={`${secondBarHeight}`}
                            fill={secondBarColor}
                            onPress={() => { this._onColumnPress(index); }}/>;
        } else {
          secondBar = undefined;
        }
        let tag;
        if (data['tag']) {
          tag = (
            <Text
              x={index * (interval + barWidth) + interval + barWidth / 2}
              y={height - tagHeight}
              textAnchor={'middle'}
              fontSize={tagFontSize}
              fill={tagColor}
            >
              {data['tag']}
            </Text>
          );
        } else {
          tag = undefined;
        }
        if (index == source.length - 1) {
          reactWidth = (index + 1) * (interval + barWidth) + interval;
          if (reactWidth < width) {
            reactWidth = width;
          }
        }
        return (
          <G
            key={index}
          >
            {bar}
            {secondBar}
            {tag}
          </G>
        );
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
        <Svg
          height={height}
          width={reactWidth}
        >
          {reacts}
        </Svg>
      </ScrollView>
    );
  }

}

module.exports = BarChart;
