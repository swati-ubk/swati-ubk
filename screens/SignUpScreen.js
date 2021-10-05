import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {globalcolor} from '../style/globalcolor';
import {globalstyle} from '../style/globals.js';
import WebService from '../service/WebService';
const SignInScreen = ({navigation}) => {
 // console.log(navigation);
    const [data, setData] = React.useState({
        username: '',
        lastname:'',
        password: '',
        confirm_password: '',
        mobile:'',
        Refercode:'',
        RefercodeSatus:'',
        check_textInputChange: false,
        check_textInputChangeLastName:false,
        secureTextEntry: true,
        check_textInputMobile:true,
        isValidPassword:true,
        isValidConfirmPassword:true,
        confirm_secureTextEntry: true,
        invalidRefererror:true,
        isValidrefercode:false

    });

    const textInputChange = (val) => {
        if( val.length >=3 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }
    const textInputChangeLastname = (val) => {
        if( val.length >=3 ) {
            setData({
                ...data,
                lastname: val,
                check_textInputChangeLastName: true
            });
        } else {
            setData({
                ...data,
                lastname: val,
                check_textInputChangeLastName: false
            });
        }
    }
     const handlemobilenumberChanger=(val)=>{
        if(val.length==10)
        {
            setData({
                ...data,
                mobile: val,
                check_textInputMobile: true
            }); 
        }else{
            setData({
                ...data,
                mobile: val,
                check_textInputMobile: false
            });
        }

     }

    const handlePasswordChange = (val) => {

       if(val.length>=6)
       {
        setData({
            ...data,
            password: val,
            isValidPassword:true
        });
       }else{
        setData({
            ...data,
            password: val,
            isValidPassword:false
        });
       }
        


    }

    const handleConfirmPasswordChange = (val) => {
       // console.log("password===="+data.password);
        //console.log("Confirm Password====="+val);
        if(data.password==val){
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword:true,
                
            });
        }else{
            setData({
                ...data,
                confirm_password: val,
                isValidConfirmPassword:false
            }); 
        }
        
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }
    const onChangeRefercode=(val)=>{
        setData({
            ...data,
            Refercode: val
        });
    }
    const checkPromcode=()=>{
     
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ referCode: data.Refercode})
          };



      WebService.PostData('verify/refer-code-user',requestOptions)
             .then(res => res.json())
             .then(resJson => {
                console.log(resJson.referrer);
                if (resJson.hasOwnProperty("referrer")) {
                   // console.log('vaild refer code');  isValidrefercode
                   setData({
                    ...data,
                    isValidrefercode:true,
                    invalidRefererror:true,
                    RefercodeSatus:data.Refercode
                     });

                  }else{
                    setData({
                        ...data,
                        isValidrefercode:false,
                        invalidRefererror:false,
                        RefercodeSatus:''
                         });
                  }
             }).catch(e => console.log(e));
    }
    const Signup=()=>{

       // console.log("username length======"+data.username.length);

        if(data.username.length==0)
        {
            setData({
                ...data,
                check_textInputChange: false
              })
              return false;
        }
       else if(data.lastname.length==0)
        {
            setData({
                ...data,
                check_textInputChangeLastName: false
              })
              return false;
        }
      else  if(data.mobile.length==0)
        {
            setData({
                ...data,
                check_textInputMobile: false
              })
              return false;
        }
        else if(data.password.length==0)
        {
            setData({
                ...data,
                isValidPassword:false
            });
              return false;
        }

       else  if(data.password!=data.confirm_password)
        {
            setData({
                ...data,
                isValidConfirmPassword:false
            });
              return false;
        }
        else{
            navigation.navigate('OTPScreen',{data:data})
         
        }
        
    }



    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#fd7729' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>First Name</Text>
            <View style={styles.action}>
                { <FontAwesome 
                    name="user-o"
                    color={globalcolor.PrimaryColor}
                    size={20}
                /> }
                <TextInput 
                    placeholder="Your First Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : 
                
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={globalstyle.errorMsg}>Enter first name</Text>
                </Animatable.View>
                }
            </View>
            
            <Text style={styles.text_footer}>Last Name</Text>
            <View style={styles.action}>
                { <FontAwesome 
                    name="user-o"
                    color={globalcolor.PrimaryColor}
                    size={20}
                /> }
                <TextInput 
                    placeholder="Your Last Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeLastname(val)}
                />
                {data.check_textInputChangeLastName ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={globalstyle.errorMsg}>Enter last name</Text>
                </Animatable.View>
                
                }
            </View>
            <Text style={styles.text_footer}>Mobile Number</Text>
            <View style={styles.action}>
                { <FontAwesome 
                    name="mobile"
                    color={globalcolor.PrimaryColor}
                    size={25}
                /> }
                <TextInput 
                keyboardType="number-pad"
                    placeholder="Mobile number"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlemobilenumberChanger(val)}
                />
            </View>
            { data.check_textInputMobile ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={globalstyle.errorMsg}>Please Enter Vaild Number.</Text>
            </Animatable.View>
            }
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={globalcolor.PrimaryColor}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={globalstyle.errorMsg}>Enter a strong password of minimum 6 letters.</Text>
            </Animatable.View>
            }
            <Text style={[styles.text_footer]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={globalcolor.PrimaryColor}
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.confirm_secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            { data.isValidConfirmPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={globalstyle.errorMsg}>The password and confirmation password do not match</Text>
            </Animatable.View>
            }
            <Text style={[styles.text_footer, {
                marginTop: 10
            }]}>Refer code</Text>
            <View style={styles.action}>
            <Image
                   source={require('../assets/img/marker.png')} //Change your icon image here
                   style={styles.IconsImg}
               />
                <TextInput 
                    placeholder="Refer code (Optional)"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => onChangeRefercode(val)}
                    //value={data.Refercode}
                />
                    <View style={styles.checkrefer}>
                       <Text style={{color:'#fff'}} 
                       
                       onPress={() => {checkPromcode()}}
                       //onPress={checkPromcode()}
                       
                       
                       >Check</Text>
                    </View>
                   
                    
               
            </View>
            { data.invalidRefererror ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={globalstyle.errorMsg}>Invaild Refer Code.</Text>
            </Animatable.View>
            }
            { data.isValidrefercode ?
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={{color:globalcolor.Successcolor,fontSize: 14}}>Validated the Refer Code.</Text>
            </Animatable.View>
            :null
            }

           
            {/* <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View> */}
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {Signup()}}
                >
                <LinearGradient
                   colors={['#fd8e4e', '#fd7729']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#fd7729',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#fd7729'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fd7729'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        //marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        //paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    IconsImg:{
        width:25,
        height:25
    },
    checkrefer:{
        backgroundColor:globalcolor.Successcolor,
        padding:5,
        borderRadius:5,
        
    }


  });
