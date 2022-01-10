import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { globalcolor } from '../../style/globalcolor';

export default class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOption: this.props.options[0],
    };
  }
  updateActiveOption = (activeOption) => {
    this.setState({
      activeOption,
    });
  };
  render() {
    // console.log("ssssssssssssssssssssssssssss",this.props.options)
    // console.log("ssssssssssssssssssssssssssss",this.state.activeOption)
    return (
      <View
        style={{

          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 30,

        }}
      >
        {this.props.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              this.props.onChange(option.value);
              this.updateActiveOption(option);
            }}
          >
            <View style={{
              padding: 5
            }}>
              <Text
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 40,
                  padding: 5,
                  textAlignVertical: "center",
                  textAlign: 'center',
                  color: this.state.activeOption === option ? 'white' : 'black',
                  backgroundColor: this.state.activeOption === option ? globalcolor.PrimaryColor : 'white',
                }}
              >
                {option.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}