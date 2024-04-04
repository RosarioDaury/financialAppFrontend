import { useState, useEffect } from "react";
import { Pressable, View, Text, Modal, ScrollView, Alert } from "react-native";

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'
import {Picker} from '@react-native-picker/picker';

import Input from "../Input/Input";
import Button from "../Button/Button";
import { StandardTheme } from "../../Styles/Theme";
import useReminderById from "../../Hooks/Remiders/useReminderById";
import { SimpleCreateForm } from "./styles";
import { formatDate, formatTimeHour } from "../../Utils/formatDate";
import { createScheduledNotification, removeScheduledNotification, scheduleNextNotification } from "../../Utils/PushNotifications";
import ReminderServices from "../../Services/ReminderServices";

const reminderServices = new ReminderServices();

const ReminderUpdateForm = ({showModal, setShowModal, id, updateReminder}) => {
    const {Reminder, setReminder, fetchReminderById, error} = useReminderById({id});
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    
    useEffect(() => {
        if(id) {
            fetchReminderById({id})
        }
    }, [id]);

    const handleDateChange = (date) => {
        setDate(date)
    }

    const handleTimeChange = (time) => {
        setTime(time)
    }
    
    const handleUpdateReminder = async () => {
        try {
            const {title, description, amount, externalId, interval_id} = Reminder;

            const reminder = {
                title,
                description,
                amount,
                date: `${formatDate(date)}${formatTimeHour(time)}`
            }

            // UPDATING CURRENT REMINDER
            // REMOVING NOTIFICATION SCHEDULED WITH EXPO TO STOP IT FROM TRIGGERING
            await removeScheduledNotification({notificationId: externalId});
            // DELETE FROM DATABASE CURRENT REMINDER NOTIFICATION
            // SCHEDULING NEW NOTIFICATION FROM THE UPDATED REMINDER INFORMATION THE REMINDER NOTIFICATION
            await reminderServices.DeleteReminderNotification({id: externalId})
            await createScheduledNotification({interval: interval_id, title, description, reminderId: id, date: reminder.date})
            await updateReminder({reminder})
        } catch(error) {
            console.log(error)
            Alert.alert('ERROR WHILE UPDATING REMINDER')
        }
    }

    return(
        <Modal
            visible={showModal}
            animationType='slide'
            transparent={true}
            onRequestClose={() => {
                setShowModal(false)
            }}
        >   

            <ScrollView style={SimpleCreateForm.Container}>

                    <Pressable
                        onPress={() => setShowModal(false)}
                        style={SimpleCreateForm.Header}
                    >
                        <AntDesign name="down" size={30} color={StandardTheme.White}/>
                    </Pressable>


                    <View style={SimpleCreateForm.LogoContainer}>
                        <Text style={SimpleCreateForm.textLogo}>Update <Text style={{color: StandardTheme.Purple}}>Reminder</Text></Text>
                        <Text style={SimpleCreateForm.description}>Change the value and save to update your form</Text>
                    </View>

                    <View style={SimpleCreateForm.InputsContainer}>
                        <Input 
                            placeholder='Title' 
                            Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => {setReminder({...Reminder, title: e})}}
                            value={Reminder.title}
                        />

                        <Input 
                            placeholder='Description' 
                            Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => {setReminder({...Reminder, description: e})}}
                            value={Reminder.description}
                            multiline={true}
                        />

                        <Input 
                            placeholder='Amount' 
                            Icon={<MaterialIcons name="attach-money" size={20} color={StandardTheme.DarkBlue} />} 
                            type='numeric'
                            onChange={(e) => setReminder({...Reminder, amount: e})}
                            value={String(Reminder.amount)}
                        />

                        <DateTimePicker
                            mode='date'
                            display="spinner"
                            value={date}
                            onChange={(e, date) => handleDateChange(date)}
                        />

                        <DateTimePicker
                            mode='time'
                            display="spinner"
                            value={time}
                            onChange={(e, time) => handleTimeChange(time)}
                        />
                    </View>

                    <View style={SimpleCreateForm.ButtonContainer}>
                        <Button color={StandardTheme.Green} text='Update' action={handleUpdateReminder}/>
                    </View>
    
            </ScrollView>
            
        </Modal>
    )
}

export default ReminderUpdateForm;