import { Pressable, View, Text } from "react-native";
import { useState, useContext, useEffect } from "react";
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
import { formatTimeHour, formatTimeOnly } from "../../Utils/formatDate";
import { AuthContext } from "../../Context/UserContext";
import ReminderServices from "../../Services/ReminderServices";

const reminderServices = new ReminderServices();

export default function Reminders({navigation}) {
    const { User } = useContext(AuthContext);
    const [filters, setFilters] = useState({page: 1, pageSize: 5, name: ""})
    const {Reminders, Pagination, fetchReminders, error} = useReminders({filters})
    const [showModal, setShowModal] = useState(false);
    

    const handleNext = () => {
        setFilters({...filters, page: filters.page + 1})  
    }

    const handlePrev = () => {
        setFilters({...filters, page: filters.page - 1})
    }

    const createReminder = async ({reminder, setReminder}) => {
        try {
            const {
                amount,
                interval_id,
                date,
                time,
                title,
                description
            } = reminder;

            const body = {
                amount,
                interval_id,
                date: `${date.toISOString().split('T')[0]}${formatTimeHour(time)}`,
                title,
                description
            }
            console.log(body)

            await reminderServices.CreateReminder({body, token: User.token})
            setShowModal(false);
            setFilters({page: 1, pageSize: 5});
            fetchReminders({filters});
            setReminder({
                amount: '',
                interval_id: 1,
                date: new Date(),
                time: new Date(),
                title: '',
                description: ''
            })

        } catch(error) {
            console.log(error);
            Alert.alert('Error while creating REMINDER, try later');
        }
    }

    useEffect(() => {
        if(error) {
            Alert.alert(error)
        }
    }, [error])


    return(
        <View style={{height: '100%', width: '98%', alignSelf: 'center'}}>
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
                    onChange={(e) => setFilters({...filters, name: e})}
                    value={filters.name}
                />
            </View>

            {
                Pagination && 
                <Pages current={Pagination.currentPage} totalPages={Pagination.pages} handleNext={handleNext} handlePrev={handlePrev}/>
            }
            
            <SwipeListView
                data={Reminders}
                renderItem={ (data, rowMap) => (
                    <ReminderCard data={data.item}/>
                )}
                renderHiddenItem={ (data, rowMap) => (
                    <UpdateDeleteHide data={data.item} handleDelete={() => {}}/>
                )}
                rightOpenValue={-85}
                leftOpenValue={85}
                style={{
                    marginTop: 20
                }}
            />

            <ReminderCreateForm 
                showModal={showModal}
                setShowModal={setShowModal}
                createReminder={createReminder}
            />
        </View>
    )
}