import { useRef, useState, useEffect } from "react";
import { Pressable, View, Text, Modal, Animated, Dimensions } from "react-native";

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'
import {Picker} from '@react-native-picker/picker';

import Input from "../Input/Input";
import Button from "../Button/Button";
import useReminderIntervals from "../../Hooks/Remiders/useReminderIntervals";
import { PagesCreateForm } from "./styles";
import { StandardTheme } from "../../Styles/Theme";

const ReminderCreateForm = ({showModal, setShowModal, createReminder}) => {
    const [reminder, setReminder] = useState({
        amount: '',
        interval_id: 1,
        date: new Date(),
        time: new Date(),
        title: '',
        description: ''
    })

    const {Intervals} = useReminderIntervals();
    const animatedValue = useRef(new Animated.Value(0)).current;
    const { width, height } = Dimensions.get('window');
    const [formTranslateValue, setFormTranslateValue] = useState(0);

    const interpolatedValue = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * -4], // Adjust the transform values
    });

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: formTranslateValue,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [formTranslateValue])


    const handleNextPageForm = () => {
        if(formTranslateValue == 1) {
            setFormTranslateValue(1)
        } else {
            setFormTranslateValue(formTranslateValue + 0.25)
        }
    };

    const handlePrevPageForm = () => {
        if(formTranslateValue == 1) {
            setFormTranslateValue(1)
        } else {
            setFormTranslateValue(formTranslateValue - 0.25)
        }
    };

    return (
        <Modal
            visible={showModal}
            animationType='slide'
            transparent={true}
            onRequestClose={() => {
                setShowModal(false)
            }}
        >   

            <Animated.View
                style={[{
                    flexDirection: 'row',
                    width: width * 4,
                    height: height,
                }, { transform: [{ translateX: interpolatedValue}] }]}
            >

                <View style={PagesCreateForm.Container}>

                    <Pressable
                        onPress={() => setShowModal(false)}
                        style={PagesCreateForm.Header}
                    >
                        <AntDesign name="down" size={30} color={StandardTheme.White}/>
                    </Pressable>

                    <View style={PagesCreateForm.LogoContainer}>
                        <Text style={PagesCreateForm.textLogo}>Create New <Text style={{color: StandardTheme.Purple}}>Reminder</Text></Text>
                        <Text style={PagesCreateForm.description}>Fill the form to create your new Reminder</Text>
                    </View>
                
                    <View style={PagesCreateForm.InputsContainer}>
                            <Input 
                                placeholder='Title' 
                                Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                                type='default'
                                onChange={(e) => setReminder({...reminder, title: e})}
                                value={reminder.title}
                            />

                            <Input 
                                placeholder='Description' 
                                Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                                type='default'
                                onChange={(e) => setReminder({...reminder, description: e})}
                                value={reminder.description}
                                multiline={true}
                            />

                            <Input 
                                placeholder='Amount' 
                                Icon={<MaterialIcons name="attach-money" size={15} color={StandardTheme.DarkBlue} />} 
                                type='number-pad'
                                onChange={(e) => setReminder({...reminder, amount: e})}
                                value={reminder.amount}
                            />
                            
                            {
                                reminder.title && reminder.description && reminder.amount
                                ?   
                                    <View style={PagesCreateForm.ButtonContainer}>
                                        <Button color={StandardTheme.Purple} text='Next' action={handleNextPageForm}/>
                                    </View>
                                :
                                    <View style={PagesCreateForm.ButtonContainer}>
                                        <Button color={StandardTheme.Grey} text='Next' action={() => {}}/>
                                    </View>
                            }   

                    </View>
                
                </View>

                <View style={PagesCreateForm.Container}>
                    <Pressable
                        onPress={handlePrevPageForm}
                    >
                        <Ionicons name="md-return-up-back-outline" size={35} color={StandardTheme.White} style={PagesCreateForm.backForm}/>
                    </Pressable>
                    <View style={PagesCreateForm.LogoContainer}>
                        <Text style={PagesCreateForm.textLogo}>Create New <Text style={{color: StandardTheme.Purple}}>Reminder</Text></Text>
                        <Text style={PagesCreateForm.description}>Select Interval</Text>
                    </View>

                    <Picker
                        placeholder='Interval'
                        style={{width: '90%'}}
                        onValueChange={(e) => {
                            setReminder({...reminder, interval_id: e})
                        }}
                        selectedValue={reminder.interval_id}
                    >
                        {
                            Intervals.length > 0 &&
                            Intervals.map(el => {
                                return <Picker.Item label={el.title} value={el.id} key={el.id} color="white"/>
                            })
                        }
                
                    </Picker>
                    
                    {
                        reminder.interval_id
                        ?
                            <View style={PagesCreateForm.ButtonContainer}>
                                <Button color={StandardTheme.Purple} text='Next' action={handleNextPageForm}/>
                            </View>  
                        :
                            <View style={PagesCreateForm.ButtonContainer}>
                                <Button color={StandardTheme.Grey} text='Next' action={() => {}}/>
                            </View> 
                    }
                    
                </View>

                <View style={PagesCreateForm.Container}>
                    <Pressable
                        onPress={handlePrevPageForm}
                    >
                        <Ionicons name="md-return-up-back-outline" size={35} color={StandardTheme.White} style={PagesCreateForm.backForm}/>
                    </Pressable>
                    <View style={PagesCreateForm.LogoContainer}>
                        <Text style={PagesCreateForm.textLogo}>Create New <Text style={{color: StandardTheme.Purple}}>Reminder</Text></Text>
                        <Text style={PagesCreateForm.description}>Select Date</Text>
                    </View>

                    <DateTimePicker
                        mode='date'
                        display="spinner"
                        value={reminder.date}
                        onChange={(e, date) => setReminder({...reminder, date})}
                    />
                    
                    {
                        reminder.date
                        ?
                            <View style={PagesCreateForm.ButtonContainer}>
                                <Button color={StandardTheme.Purple} text='Next' action={handleNextPageForm}/>
                            </View> 
                        :
                            <View style={PagesCreateForm.ButtonContainer}>
                                <Button color={StandardTheme.Grey} text='Next' action={() => {}}/>
                            </View> 
                    }
                    
                </View>

                <View style={PagesCreateForm.Container}>
                    <Pressable
                        onPress={handlePrevPageForm}
                    >
                        <Ionicons name="md-return-up-back-outline" size={35} color={StandardTheme.White} style={PagesCreateForm.backForm}/>
                    </Pressable>
                    <View style={PagesCreateForm.LogoContainer}>
                        <Text style={PagesCreateForm.textLogo}>Create New <Text style={{color: StandardTheme.Purple}}>Reminder</Text></Text>
                        <Text style={PagesCreateForm.description}>Select Time</Text>
                    </View>

                    <DateTimePicker
                        mode='time'
                        display="spinner"
                        value={reminder.time}
                        onChange={(e, time) => setReminder({...reminder, time})}
                    />
                    
                    {
                        reminder.time
                        ?
                            <View style={PagesCreateForm.ButtonContainer}>
                                <Button color={StandardTheme.Purple} text='Create' action={() => createReminder({reminder, setReminder})}/>
                            </View> 
                        :
                            <View style={PagesCreateForm.ButtonContainer}>
                                <Button color={StandardTheme.Grey} text='Create' action={() => {}}/>
                            </View> 
                    }
                </View>
            </Animated.View>
            
        </Modal>
    )
}

export default ReminderCreateForm;