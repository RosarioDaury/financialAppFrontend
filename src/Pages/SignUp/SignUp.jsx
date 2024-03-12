import React, {useState} from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Alert} from 'react-native';
import { StandardTheme } from '../../Styles/Theme';
import { Styles } from './Styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import { useIsFocused } from '@react-navigation/native'

import useAccountTypes from '../../Hooks/AccountTypes/useAccountTypes';
import useSubmitUser from '../../Hooks/User/useSubmitUser';

const defaultBody = {
        username: "",
        password: "",
        passwordConfirm: "",
        firstName: "",
        lastName: "",
        email: "",
        userType: 1,
        balance: 0,
    }

const SignUp = ({navigation}) => {
    const [Body, setBody] = useState(defaultBody);
    const {accountTypes} = useAccountTypes();
    const {createUser, Error, Success} = useSubmitUser();

    const isFocused = useIsFocused()

    const create = async () => {
        const {
            passwordConfirm,
            password
        } = Body;
        if(password == passwordConfirm) {
            createUser(Body)
            console.log(Error, Success)
        } else {
            Alert.alert("Passwords do not match")
        }
    }
    
    return(
        <View>
            <View style={Styles.Frame}/>
            <ScrollView style={Styles.Container}>

            <Pressable
                onPress={() => navigation.goBack()}
                style={Styles.Header}
            >
                <Ionicons name="md-return-up-back-outline" size={30} color="black" />
            </Pressable>


            <View style={Styles.LogoContainer}>
                <View style={Styles.IconContainer}>
                    <FontAwesome name="address-book" size={70} color={StandardTheme.DarkBlue} />
                </View>
                <Text style={Styles.textLogo}>Create your account</Text>
            </View>

            <View style={Styles.InputsContainer}>

                <View style={Styles.Titles}>
                    <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.DarkBlue}} />
                    <Text style={Styles.Titles.Text}>Personal Information</Text>
                    <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.DarkBlue}} />
                </View>

                <Input 
                    placeholder='First Name' 
                    Icon={<FontAwesome5 name="user-edit" size={15} color={StandardTheme.DarkBlue} />} 
                    type='default'
                    onChange={(e) => setBody({...Body, firstName: e})}
                    value={Body.firstName}
                />

                <Input 
                    placeholder='Last Name' 
                    Icon={<FontAwesome5 name="user-edit" size={15} color={StandardTheme.DarkBlue} />} 
                    type='default'
                    onChange={(e) => setBody({...Body, lastName: e})}
                    value={Body.lastName}
                />

                <Input 
                    placeholder='Email' 
                    Icon={<Entypo name="email" size={15} color={StandardTheme.DarkBlue} />} 
                    type='email-address'
                    onChange={(e) => setBody({...Body, email: e})}
                    value={Body.email}
                />
                
                
                <View style={Styles.Titles}>
                    <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.DarkBlue}} />
                    <Text style={Styles.Titles.Text}>Account Information</Text>
                    <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.DarkBlue}} />
                </View>

                <Input 
                    placeholder='Username' 
                    Icon={<FontAwesome5 name="user-alt" size={15} color={StandardTheme.DarkBlue} />} 
                    type='default'
                    onChange={(e) => setBody({...Body, username: e})}
                    value={Body.username}
                />
                <Input 
                    placeholder='Password' 
                    Icon={<Entypo name="lock" size={15} color={StandardTheme.DarkBlue} />}
                    type='visible-password'
                    onChange={(e) => setBody({...Body, password: e})}
                    value={Body.password}
                />

                <Input 
                    placeholder='Confirm Password' 
                    Icon={<Entypo name="lock" size={15} color={StandardTheme.DarkBlue} />} 
                    type='visible-password'
                    onChange={(e) => setBody({...Body, passwordConfirm: e})}
                    value={Body.passwordConfirm}
                />

                <View style={Styles.Titles}>
                    <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.DarkBlue}} />
                    <Text style={Styles.Titles.Text}>Financial Information</Text>
                    <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.DarkBlue}} />
                </View>

                <Input 
                    placeholder='Budget' 
                    Icon={<MaterialIcons name="attach-money" size={15} color={StandardTheme.DarkBlue} />} 
                    type='number-pad'
                    onChange={(e) => setBody({...Body, Budget: e})}
                    value={Body.Budget}
                />
                
                <Picker
                    placeholder='Account Type'
                    style={{width: '80%'}}
                    onValueChange={(e) => {
                        setBody({...Body, userType: e})
                    }}
                    selectedValue={Body.userType}
                    
                >
                    {
                        accountTypes.length > 0 &&
                        accountTypes.map(el => {
                            return <Picker.Item label={el.type} value={el.id} key={el.id}/>
                        })
                    }
    
                </Picker>

            </View>

            <View style={Styles.ButtonContainer}>
                <Button color={StandardTheme.Blue} text='Sign Up' action={create}/>
                <Button color={StandardTheme.Red} text='Cancel' action={() => navigation.goBack()}/>
            </View>
            </ScrollView>
            <View style={Styles.FrameBottom}/>
        </View>
        
    )
}

export default SignUp