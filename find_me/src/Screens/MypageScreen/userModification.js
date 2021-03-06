/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'
import { requestLogout } from '../../Store/actions/AuthAction';

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class userModificationScreen extends React.Component {
    
    
    render() {
      return (
          <View style={styles.container}>
             <Text>회원정보 수정</Text>
          </View>
      )
  }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(userModificationScreen)
