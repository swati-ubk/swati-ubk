import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import { Dimensions } from 'react-native';
//let { StyleSheet } = React;

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default class SplashScreen extends Component {
    constructor(props) {

        super();
    }


    render() {
        return (
            console.log('Animation Finished!' + height),
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // height: height, width: width,
                    backgroundColor: '#ffffff',


                }

                }

            >

                <LottieView
                    //style={{flex: 1}}
                    // style={styles.fullScreen}
                    //style={{ height: 1200, width: width }}
                    source={require('../assets/splash.json')}
                    //logoImage={require("../assets/logo.png")}
                    autoPlay
                    loop={false}
                    speed={0.5}
                    onAnimationFinish={() => {
                        console.log('Animation Finished!')
                        this.props.navigation.replace('SignInScreen');
                    }}
                />
                <Image

                    style={{
                        width: "70%", resizeMode: "contain",
                    }}
                    source={require('../assets/logo.png')}
                />
            </View>
        )

        const styles = StyleSheet.create({
            container: {
                justifyContent: 'center',
                alignItems: 'center',
            },
            logo: {
                width: 300,
                height: 400,
            },
        });
    }


}


// import React from 'react';
// import { 
//     View, 
//     Text, 
//     TouchableOpacity, 
//     Dimensions,
//     StyleSheet,
//     StatusBar,
//     Image
// } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useTheme } from '@react-navigation/native';

// const SplashScreen = ({navigation}) => {
//     const { colors } = useTheme();

//     return (
//       <View style={styles.container}>
//           <StatusBar backgroundColor='#009387' barStyle="light-content"/>
//         <View style={styles.header}>
//             <Animatable.Image 
//                 animation="bounceIn"
//                 duraton="1500"
//             source={require('../assets/logo.png')}
//             style={styles.logo}
//             resizeMode="stretch"
//             />
//         </View>
//         <Animatable.View 
//             style={[styles.footer, {
//                 backgroundColor: colors.background
//             }]}
//             animation="fadeInUpBig"
//         >
//             <Text style={[styles.title, {
//                 color: colors.text
//             }]}>Stay connected with everyone!</Text>
//             <Text style={styles.text}>Sign in with account</Text>
//             <View style={styles.button}>
//             <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
//                 <LinearGradient
//                     colors={['#08d4c4', '#01ab9d']}
//                     style={styles.signIn}
//                 >
//                     <Text style={styles.textSign}>Get Started</Text>
//                     <MaterialIcons 
//                         name="navigate-next"
//                         color="#fff"
//                         size={20}
//                     />
//                 </LinearGradient>
//             </TouchableOpacity>
//             </View>
//         </Animatable.View>
//       </View>
//     );
// };

// export default SplashScreen;

// const {height} = Dimensions.get("screen");
// const height_logo = height * 0.28;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     backgroundColor: '#009387'
//   },
//   header: {
//       flex: 2,
//       justifyContent: 'center',
//       alignItems: 'center'
//   },
//   footer: {
//       flex: 1,
//       backgroundColor: '#fff',
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       paddingVertical: 50,
//       paddingHorizontal: 30
//   },
//   logo: {
//       width: height_logo,
//       height: height_logo
//   },
//   title: {
//       color: '#05375a',
//       fontSize: 30,
//       fontWeight: 'bold'
//   },
//   text: {
//       color: 'grey',
//       marginTop:5
//   },
//   button: {
//       alignItems: 'flex-end',
//       marginTop: 30
//   },
//   signIn: {
//       width: 150,
//       height: 40,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 50,
//       flexDirection: 'row'
//   },
//   textSign: {
//       color: 'white',
//       fontWeight: 'bold'
//   }
// });

