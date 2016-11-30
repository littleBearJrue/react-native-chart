/**
 * Copyright (c) 2016, Meizu Technology Co., Ltd. All rights reserved.
 *
 * Created by wangying on 2016/11/14.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

import { BarChart } from 'react-native-meizu-chart';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 20,
  },
});

const source = [{  tag: '3/2222', value: 26, secondValue: 30 }, { value: 40, secondValue: 25 },
  { value: 30, tag: '测试测试' }, { value: 40, tag: '3/3', secondValue: 25 },
   { value: 40, secondValue: 25 },
  { value: 30, tag: '333/2' }, { value: 40, tag: '3/3', secondValue: 25 },
  { value: 30, tag: '3/2', secondValue: 22 }, { value: 40, secondValue: 25 },
  { value: 30, tag: '3/2' }, { value: 40, tag: '3/3', secondValue: 25 },
  { value: 30, tag: '3/2', secondValue: 22 }, { value: 40, secondValue: 25 },
  { value: 30, tag: '3/2' }, { value: 40, tag: '3/3', secondValue: 25 },
  { value: 30, tag: '3/2', secondValue: 22 }, { value: 40, secondValue: 25 },
  { value: 30, tag: '3/2' }, { value: 40, tag: '3/3', secondValue: 25 },
  { value: 30, tag: '3/2', secondValue: 22 }, { value: 40, secondValue: 25 },
  { value: 30, tag: '3/2' }, { value: 40, tag: '3/3', secondValue: 25 }];

const source1 = [{ value: 2, color: 'slateblue', tag: '3/433' }, { value: 2 },
  { value: 7, tag: '3/2', color: 'slateblue' }, { value: 8, tag: '3/3', color: 'deepskyblue' },
  {value: 5, color: 'yellow'}];

class MainScreen extends React.Component {

  _onColumnPress = (index) => {
    console.warn('_onColumnPress, ', index);
  };

  render() {
    const { width, height} = Dimensions.get('window');
    return (
      <View
        style={styles.main}
      >
        <BarChart
          style={{ flex: 0, width, height: height / 3 }}
          source={source}
          type={BarChart.TYPE_VERTICAL}
          maxValue={100}
          //barWidth={40}
          tagColor={'green'}
          onColumnPress={this._onColumnPress}
          //barMarginLeft={5}
          //barMarginRight={0}
          tagSelectedColor={'red'}
        />
      </View>
    );
  }

}

module.exports = MainScreen;