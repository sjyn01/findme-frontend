/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View,  ActivityIndicator, Image } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class Diarytextanalysis extends React.Component {
    constructor(){
        super();
        this.state={
          graph:'',
          loading_graph: true,
       }
    }
    
    getGraph = async () => {
      await axios.post('/linegraph/', {},
      { headers: {
          'Authorization' : `Token ${this.props.token.auth.token}`
      }})
      .then(({data})=>{
          this.setState({
              graph: data.line_graph,
              loading_graph: false,
          })
          console.log(this.state.graph)
      })
      .catch(err=>console.log(err))
  }

  componentDidMount(){
    this.getGraph();
  }

  render() {
    return (
      <View style={styles.container}>
          {(this.state.loading_wordcloud == true || this.state.loading_graph == true) ?
              <ActivityIndicator
                  size = "large"
                  color = "green"
              /> :
              <View>
                  <Image
                      style={{width: 400, height: 400}}
                      source={{uri: this.state.graph ? this.state.graph : null}}
                  />
              </View>
              }
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diarytextanalysis)

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent:'center'
    },

});

