import React from "react";
import {
    View,
    Text,
    Switch} from 'react-native';
import  {useState, useEffect} from 'react';    

const Toggle =()=>{

    const [toggle, setToggle] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
        <View>
            <Switch
                  trackColor={{false: 'gray', true: 'teal'}}
                  thumbColor="white"
                  ios_backgroundColor="gray"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  
            />
        </View>
    )
}

export default Toggle