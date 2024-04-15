import { Pressable, View, Text, Alert } from "react-native";
import { useState, useEffect, useContext } from "react";
import { reminderStyles } from "./styles";
import { StandardTheme } from "../../Styles/Theme";
import Input from "../../Components/Input/Input";

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import useReminders from "../../Hooks/Remiders/useRemiders";
import Pages from "../../Components/Pagination/Index";
import { SwipeListView } from "react-native-swipe-list-view";
import ReminderCard from "../../Components/Cards/RemiderCard/Index";
import UpdateDeleteHide from "../../Components/UpdateHide/UpdateDeleteHide";
import ReminderCreateForm from "../../Components/Forms/ReminderCreateForm";
import ReminderServices from "../../Services/ReminderServices";
import ReminderUpdateForm from "../../Components/Forms/ReminderUpdateForm";
import { removeScheduledNotification } from "../../Utils/PushNotifications";
import { AuthContext } from "../../Context/UserContext";
import { ActivityIndicator } from "react-native-paper";

const reminderServices = new ReminderServices();

export default function Reminders({navigation}) {
    const { User } = useContext(AuthContext);

    const [filters, setFilters] = useState({page: 1, pageSize: 5, title: ""})
    const {Reminders, Pagination, fetchReminders, error} = useReminders({filters})
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState(null);
    

    const handleNext = () => {
        setFilters({...filters, page: filters.page + 1})  
    }

    const handlePrev = () => {
        setFilters({...filters, page: filters.page - 1})
    }

    const afterCreateReminder = () => {
        setFilters({page: 1, pageSize: 5});
        fetchReminders({filters});
    }

    const updateReminder = async ({reminder}) => {
        try{    
            await reminderServices.UpdateReminder({token: User.token, id: idToUpdate, body: reminder});
            setShowModalUpdate(false);
            fetchReminders({filters});
        } catch(error) {
            console.log(error);
            Alert.alert('Error while updating REMINDER, try later');
        }
    }
    
    const handleDelete = async ({id, notificationId}) => {
        try{
            await reminderServices.DeleteReminder({token: User.token, id});
            await removeScheduledNotification({notificationId})
            fetchReminders({filters})
        } catch(error) {
            console.log(error)
            Alert.alert('Error while deleting REMINDER')
        }
    }

    const handleOpenUpdate = ({id}) => {
        setIdToUpdate(id);
        setShowModalUpdate(true);
    }

    useEffect(() => {
        fetchReminders({filters})
    }, [filters])

    useEffect(() => {
        if(error) {
            Alert.alert(error)
        }
    }, [error])

    return(
        <View style={{height: '100%', width: '100%', alignSelf: 'center'}}>
            <View style={reminderStyles.header}>
                <Pressable
                    onPress={() => {
                    navigation.navigate('Home');
                    }}
                >
                        <Ionicons name="md-return-up-back-outline" size={35} color={StandardTheme.DarkBlue} />
                </Pressable>
                
                <View style={reminderStyles.titleContainer}>
                    <Text style={reminderStyles.title}>
                        Reminders
                    </Text>

                    <Pressable
                    onPress={() => {
                        setShowModal(true);
                    }}
                    >
                    <Ionicons name="add-circle" size={30} color={StandardTheme.Purple} />
                    </Pressable>
                </View>
            </View>

            <View style={reminderStyles.search}>
                <Input
                    placeholder='Search' 
                    Icon={<AntDesign name="search1" size={15} color={StandardTheme.DarkBlue} />}
                    type='default'    
                    onChange={(e) => setFilters({...filters, title: e})}
                    value={filters.title}
                />
            </View>

            {
                Pagination && 
                <Pages current={Pagination.currentPage} totalPages={Pagination.pages} handleNext={handleNext} handlePrev={handlePrev}/>
            }

            {
                Reminders.length > 0
                ?
                    <SwipeListView
                        data={Reminders}
                        renderItem={ (data, rowMap) => (
                            <ReminderCard data={data.item}/>
                        )}
                        renderHiddenItem={ (data, rowMap) => (
                            <UpdateDeleteHide data={data.item} handleDelete={handleDelete} handleUpdate={handleOpenUpdate} />
                        )}
                        rightOpenValue={-85}
                        leftOpenValue={85}
                        style={{
                            marginTop: 20
                        }}
                    />
                :
                error == null
                ?
                    null
                :
                    <ActivityIndicator size='large' style={{marginTop: 50}} color={StandardTheme.Purple}/>
            }

            
            

            <ReminderCreateForm 
                showModal={showModal}
                setShowModal={setShowModal}
                afterCreateReminder={afterCreateReminder}
            />

            <ReminderUpdateForm 
                showModal={showModalUpdate}
                setShowModal={setShowModalUpdate}
                id={idToUpdate}
                updateReminder={updateReminder}
            />
        </View>
    )
}