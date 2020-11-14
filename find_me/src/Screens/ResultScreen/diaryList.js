/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet,  View, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from '../../axiosConfig';
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })

class DiaryResultList extends React.Component {
    constructor(){
        super();
        this.state = {
            diaryList: [],
            refreshing : false,
            isloading: true,
            pageNum: 1,

        }       

    }

    getDiaryList = async () => {
        axios.get('/diaries/', 
        { headers: {
            'Authorization' : `Token ${this.props.token.auth.token}`
        }})
        .then(({data})=>{
            this.setState({diaryList: data})
            return data;
        })
        .catch(err=>{
            console.log(err)   
        })
    }

    componentDidMount(){
        this.getDiaryList()
    }
    
    handleRefresh = async() => {
        this.setState({
            diaryList: this.getDiaryList(),
            pageNum: 1,
            isLoading: false
        }) 
    }

    render() {
      return (
        <View style={styles.container}>
            <Text>리스트</Text>
            <FlatList
                data={this.state.diaryList}
                renderItem={({item, index})=>{
                    return(
                        <TouchableOpacity
                            onPress = {()=> {
                                this.props.navigation.navigate('DiaryDetail', {
                                    diary: this.state.diaryList[index]
                                })
                            }}>
                            <View style={styles.list}>
                                <Text>{item.create_date}</Text>
                                <Text>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(key, index) => index.toString()}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
            />
        </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaryResultList);

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent:'center'
    },
    list: {
        borderWidth: 2,
        borderRadius: 8,
        padding:20,
        marginTop : '10%',
        marginHorizontal : '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
