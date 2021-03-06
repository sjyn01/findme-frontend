/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler'
import React from 'react'
import {TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { connect } from 'react-redux'
import { requestSignup } from '../../Store/actions/AuthAction'
import { ScrollView } from 'react-native-gesture-handler'

const mapDispatchToProps = (dispatch) => ({
    requestSignup: (data) => dispatch(requestSignup(data))
  })

var radio_props = [
    {label: '내담자', value: '0' },
    {label: '상담사', value: '1' }
  ];
  
class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          email: '',
          name: '',
          password: '',
          passwordConfirmation: '',
          passwordFlag : false,
          authFlag: false,
          emailFlag: true,
          value: '0',
          introduce:'',
        }
      }
    
      onClickSignUp = async () => {
        try {
          const data = {
            email: this.state.email,
            username: this.state.name,
            password1: this.state.password,
            password2: this.state.passwordConfirmation,
            user_type: this.state.value,
            introduce: this.state.introduce
          }
          await this.props.requestSignup(data)
          alert('회원가입에 성공하였습니다!')
          this.props.navigation.navigate('Login')
        } catch (e) {
          alert('error' + e)
        }
      }

    render() {
        let reg = /^[a-zA-Z0-9_.+-]+@ajou.ac.kr/;

        return (
            <ScrollView>
            <View style={styles.container}>
                
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>회원가입</Text>
                </View>
                <View style={styles.radioContainer}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}
                        buttonSize={15}
                        labelStyle={{fontSize:15}}
                        selectedLabelStyle={{color:'red'}}
                        onPress={(value) => {
                            this.setState({value:value})
                        }}
                    />
                </View>
                <View style={styles.emailContainer}>
                    <TextInput style={styles.input}
                        placeholder="email"
                        value={this.state.email}
                        onChangeText={(text) => {
                            this.setState({email: text})             
                        }}
                    />
                        <TouchableOpacity
                            style={{width: '15%', height:40, backgroundColor:'#569CDA', alignItems:'center', justifyContent:'center', marginLeft: 40}}
                            onPress={()=>{
                                if(reg.test(this.state.email)){
                                    alert('아주대학교 메일입니다.')
                                    this.setState({
                                        emailFlag: true,
                                    })
                                } 
                                else {
                                    this.setState({
                                        emailFlag: false,
                                        email: ''
                                    })
                                }
                            }}
                        >
                        <Text>인증</Text>
                        </TouchableOpacity>
                        
                </View>
                <View>
                    {this.state.emailFlag ? <Text></Text>
                                          : <Text style={{marginLeft:20}}>ajou 메일이 아닙니다.</Text>}
                </View>
                <View style={{marginTop:10}}>
                    <TextInput style={styles.input}
                        placeholder="name"
                        value={this.state.name}
                        onChangeText={(text) => {
                            this.setState({name: text})             
                        }}
                    />
                </View>
                <View style={styles.passwordContainer}> 
                    <TextInput style={styles.password}
                        placeholder="비밀번호 입력"
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({password: text})
                            if(this.state.passwordConfirmation === text){
                                this.state.passwordFlag = true
                            } 
                            else {
                                this.state.passwordFlag = false
                            }
                        }}
                    />
                    <TextInput style={styles.passwordConfirmation}
                        placeholder="비밀번호 재입력"
                        value={this.state.passwordConfirmation}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({passwordConfirmation: text})
                            if(this.state.password === text){
                                this.state.passwordFlag = true
                            } 
                            else {
                                this.state.passwordFlag = false
                            }                
                        }}
                    />
                    <View>
                        {this.state.passwordFlag ? <Text style={{marginLeft:20}}>비밀번호가 일치합니다!</Text>
                                                 : <Text></Text>}
                    </View>
                </View>
                
                <View style={styles.passwordContainer}>
                    <TextInput 
                        style={styles.passwordConfirmation}
                        placeholder="자기소개"
                        value={this.state.introduce}
                        onChangeText={(text) => {
                        this.setState({introduce: text})                  
                        }}
                    />

                </View>

                <View style={styles.nextContainer}>
                    <TouchableOpacity
                        style={{width: '30%', height:40, backgroundColor:'#AAF0D1', alignItems:'center', justifyContent:'center', marginLeft: 200}}
                        onPress={()=>{
                            if(this.state.passwordFlag && this.state.emailFlag && this.state.name != ''){
                                this.onClickSignUp()                              
                            }
                            else {
                                alert("can't pass next page")
                            }
                        }}
                    >
                        <Text>가입 완료</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        )
    }
}

export default connect(() => ({}), mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2ACAB9',
        justifyContent:'center'
    },
    titleContainer: {
        width: '100%',
        padding: wp('10%'),
        alignItems: 'center',
    },
    radioContainer: {
        width: '100%',
        alignItems:'center'         
    },
    emailContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    authContainer: {
        // flex: 1,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordContainer: {
        // flex: 2,
        marginTop: 50,
    },
    nextContainer: {
        // flex: 1,
        marginTop: 50,
        justifyContent:'center',
        alignItems: 'center',
    },
    title: {
        fontSize: wp('10%'),
    },
    input: {
        backgroundColor: '#fff',
        width: '60%',
        marginLeft: 20,
        height: 40
    },
    password: {
        backgroundColor: '#fff',
        width: '60%',
        marginBottom: 20,
        marginLeft: 20,
        justifyContent: 'center',
        height: 40
    },
    passwordConfirmation: {
        backgroundColor: '#fff',
        width: '60%',
        marginBottom: 10,
        marginLeft: 20,
        justifyContent: 'center',
        height: 40
    }
});


