import * as Notifications from 'expo-notifications'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReminderServices from '../Services/ReminderServices';
import { formatTimeHour } from './formatDate';

const reminderServices = new ReminderServices();

const intervals = {
    weekly: 7 * 24 * 60 * 60,
    byweekkly: 15 * 24 * 60 * 60 ,
    monthly: 30 * 24 * 60 * 60
}
const days = {
    weekly: 7,
    byweekkly: 14,
    monthly: 30
}

const askNotificationsPermissions = async () => {
    try{
        const {status} = await Notifications.getPermissionsAsync();
        let finalStatus = status;
        
        if (finalStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                    allowAnnouncements: true,
                },
            });
    
            finalStatus = status;
        } else {
            // Every time a push notificaion is received this will scheduled the next one depending on the interval selected
            Notifications.addNotificationReceivedListener(notification => {
                const {interval, title, description, reminderId} = notification.request.content.data;
                const { identifier } = notification.request;
                scheduleNextNotification({interval, title, description, identifier, reminderId});
            });
            return finalStatus
        }
    
        if(finalStatus !== 'granted') {
            Alert.alert('Allow notifications to recieve reminders')
            return
        }

        // Every time a push notificaion is received this will scheduled the next one depending on the interval selected
        Notifications.addNotificationReceivedListener(notification => {
            const {interval, title, description, reminderId} = notification.request.content.data;
            const { identifier } = notification;
            scheduleNextNotification({interval, title, description, identifier, reminderId});
        });
        return finalStatus
    } catch(error) {
        console.log(error)
    }
    
}

const createScheduledNotification = async ({title, description, interval, date, reminderId}) => {
    try {
        let now = new Date(); // TODAY DATE TIME
        let firstRunningDate = new Date(date);  // DATE TIME SELECTED BY USER

        if(now >= firstRunningDate){
            Alert.alert('Your Reminder must to be set in the future');
            return
        }
    
        const triggerSeconds = (firstRunningDate.getTime() - now.getTime()) / 1000 // SECONDS TO PASS BEFORE SENDING THE FIRST PUSH NOTIFICATION
        // This notification handler must to be set everytime a notification is scheduled
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });
        // Scheduled first notification (next ones are going to be scheduled as they sound adding a listener to the notifications )
        const externalId = await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: description,
                data: {interval, title, description, reminderId}
            },
            trigger: {
                seconds: triggerSeconds
            }
        })

        await reminderServices.CreateReminderNotification({ notification: {externalId, reminderId} })
    
        return externalId
    } catch(error) {
        console.log(error)
        console.log('ERROR WHILE CREATING NOTIFICATION REMINDER')
    }
    
}

const removeScheduledNotification = async ({notificationId}) => {
    try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
        console.log(error)
    }
}

const scheduleNextNotification = async ({interval, title, description, identifier, reminderId}) => {
    try {
        const token = await AsyncStorage.getItem('token')
        let seconds = 0;
        let days = 0
        // ID of each interval in DB
        switch (interval) {
            case 1:
                seconds = intervals.weekly
                days = 7
                break
            case 2:
                seconds = intervals.byweekkly
                days = 14
                break
            case 3:
                seconds = intervals.monthly
                days = 30
                break
            default: 
                seconds = 0
                break
        }
        
        // Schedule next notification from data of the previous one, the identifier is from the previous notification as that is going to be also changed in DB
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: description,
                data: {interval, title, description, reminderId}
            },
            trigger: {
                seconds: seconds
            }
        });
        
        // Update reminder notification in DB to identify the next alarm if needed to remove
        await reminderServices.UpdateReminderNotification({currentId: identifier, newId: notificationId})

        // Update Reminder Date
        let now = new Date(); // TODAY DATE TIME
        now.setDate(now.getDate() + days); // Properly format today's date and calculate next running
        now = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), 0o0));
        
        await reminderServices.UpdateReminder({
            token, 
            id: reminderId, 
            body: {
                date: `${now.toISOString().split('T')[0]}${formatTimeHour(now)}`
            }
        });

    } catch(error) {
        console.log(error.response)
        console.log(error)
    }
}

const removeAllNotifications = async () => {
    try{
        await Notifications.cancelAllScheduledNotificationsAsync();
    } catch(error) {
        console.log(error)
    }
}



export {
    askNotificationsPermissions,
    createScheduledNotification,
    removeAllNotifications,
    removeScheduledNotification,
    scheduleNextNotification
}