import React, { Component} from 'react';
import {View, Button, StyleSheet, LogBox} from 'react-native';
import {Card, Icon, Input, CheckBox} from 'react-native-elements';
//import {SecureStore} from 'expo';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../assets/shared/baseUrl';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { styles } from '@material-ui/pickers/views/Calendar/Calendar';

class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            remember: false
        };
    };
    componentDidMount(){
        SecureStore.getItemAsync('userinfo')
        .then((userdata) =>{
            let userinfo = JSON.parse(userdata);
            if(userinfo){
                this.setState({
                    username:userinfo.username,
                    password:userinfo.password,
                    remember:true,
                });
            }
        })
    }
    static  navigationOptions ={
        title : 'Login',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{color:tintColor}}
            />
        )
    };
    
    handleLogin() {
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            SecureStore.setItemAsync('userinfo', JSON.stringify({username:this.state.username, password:this.state.password}))
            .catch( (error) => console.log('Could not saver user info', error));
        }else{
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log('Could not delete user info', error));
        }
    }
    render() { 
        return ( 
            <View style={styles.container}>
                <Input
                    placeholder={'Username'}
                    leftIcon={{type:'font-awesome', name:'user-o'}}
                    onChangeText={(username)=> this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder={"Password"}
                    leftIcon={{type:'font-awesome', name:'key'}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                title={"Remember-me"}
                center
                checked={this.state.remember}
                onPress={()=> this.setState({remember:!this.state.remember})}
                containerStyle={styles.checked}
                />
                
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                color='white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor:'#512DA8'
                        }}
                    />
                </View>
                <View>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title='Register'
                        clear
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                size={24}
                                color='blue'
                            />
                        }
                        titleStyle={{color:'blue'}}
                    />                   
                </View>
            </View>
          );
    }
}
class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password:'',
            firstname:'',
            lastname:'',
            email:'',
            remember:false,
            imageURL:baseUrl+ 'images/logo.png'
        }
    }
    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.setState({imageUrl: capturedImage.uri });
            }
        }
    }
    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
              name='user-plus'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ) 
    };
    handleRegister(){
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username:this.state.username, password:this.state.password})
            ).catch((error) => console.log('Could not save user info', error));
        }
    }
    render() { 
        return ( 
            <ScrollView>
                <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('../assets/images/logo.png')}
                        style={styles.image} 
                        />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                        />
                </View>
                    <Input
                        placeholder='Username'
                        leftIcon={{type:'font-awesome', name:'user-o'}}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    />
                   <Input
                        placeholder='Password'
                        leftIcon={{type:'font-awesome', name:'key'}}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder='Firstname'
                        leftIcon={{type:'font-awesome', name:'user-o'}}
                        onChangeText={(firstname) => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder='Lastname'
                        leftIcon={{type:'font-awesome', name:'user-o'}}
                        onChangeText={(lastname) => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={{type:'font-awesome', name:'envelope-o'}}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                    />
                    <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title="Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>

                </View>

            </ScrollView> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});
const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: '#ffffff',
        inactiveTintColor: 'gray'
    }
});
function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  
  const Tab = createBottomTabNavigator();
  
  const Login = () =>  {
    return (
      <NavigationContainer>
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
          <Tab.Screen name="Login" component={LoginTab} />
          <Tab.Screen name="Register" component={RegisterTab} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } 
export default Login;