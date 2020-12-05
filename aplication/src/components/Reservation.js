import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

class Reservation extends Component{
    constructor(props){
        super(props);
        this.state = {
            guests:1,
            smoking:false,
            date: ''

        }
    }
    static navigationOptions = {
        title: 'Reserve Table',
    };

    handleReservation(){
        console.log(JSON.stringify(this.state));
        this.setState({
            guests: 1,
            smoking:false,
            date:''
        })
    }
    render(){
        return(
            <ScrollView>
                <View style={style.formRow}>
                    <Text style={style.formLabel}>Number of Guests</Text>
                    <Picker 
                    style={style.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIdex) => this.setState({guests:itemValue})}
                    >
                        <Picker.Item label='1' value='1'/>
                        <Picker.Item label='2' value='2'/>
                        <Picker.Item label='3' value='3'/>
                        <Picker.Item label='4' value='4'/>
                        <Picker.Item label='5' value='5'/>
                        <Picker.Item label='6' value='6'/>
                    </Picker>
                </View>
                <View style={style.formRow}>
                    <Text style={style.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                         style={style.formItem}
                        value={this.state.smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking:value})}>
                    </Switch>
                </View>
                <View style={style.formRow}>
                    <Text style={style.formLabel}>Date and Time</Text>
                    <DatePicker
                            style={style.formItem}
                            date={this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='Select date and time'
                            minDate='2020-12-05'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={
                                {
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys. 
                                    }

                            }
                            onDateChange={(date) => this.setState({date: date})}
                    ></DatePicker>
                </View>
                <View style={style.formRow}>
                    <Button
                    onPress={() => this.handleReservation()}
                    title='Reserve'
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    ></Button>
                </View>
            </ScrollView>

        );
    };
}
const style = StyleSheet.create({
    formRow:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row',
        margin:20,
    },
    formLabel:{
        fontSize:18,
        flex:2,
    },
    formItem:{
        flex:1,
    }

});
export default Reservation;