import { Pressable, ScrollView, View, Text, Modal, Alert, Animated, Dimensions } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { useContext, useEffect, useState, useRef } from "react";
import { reminderStyles, modalStyles } from "./styles";
import { StandardTheme } from "../../Styles/Theme";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'
import useReminders from "../../Hooks/Remiders/useRemiders";
import Pages from "../../Components/Pagination/Index";
import { SwipeListView } from "react-native-swipe-list-view";
import ReminderCard from "../../Components/Cards/RemiderCard/Index";
import UpdateDeleteHide from "../../Components/UpdateHide/UpdateDeleteHide";
import useReminderIntervals from "../../Hooks/Remiders/useReminderIntervals";

export default function Reminders({navigation}) {
    const [filters, setFilters] = useState({page: 1, pageSize: 5, name: ""})
    const {Reminders, Pagination, fetchReminders, error} = useReminders({filters})
    const {Intervals, setIntervals} = useReminderIntervals();
    const [showModal, setShowModal] = useState(false);
    const [formTranslateValue, setFormTranslateValue] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const { width, height } = Dimensions.get('window');

    const handleNext = () => {
        setFilters({...filters, page: filters.page + 1})  
    }

    const handlePrev = () => {
        setFilters({...filters, page: filters.page - 1})
    }


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

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: formTranslateValue,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [formTranslateValue])


    const interpolatedValue = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * -4], // Adjust the transform values
    });


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


            <Modal
                visible={showModal}
                animationType='slide'
                transparent={true}
            >   

                <Animated.View
                    style={[{
                        flexDirection: 'row',
                        width: width * 4,
                        height: height,
                    }, { transform: [{ translateX: interpolatedValue}] }]}
                >

                    <View style={modalStyles.Container}>

                        <Pressable
                            onPress={() => setShowModal(false)}
                            style={modalStyles.Header}
                        >
                            <AntDesign name="down" size={30} color={StandardTheme.White}/>
                        </Pressable>

                        <View style={modalStyles.LogoContainer}>
                            <Text style={modalStyles.textLogo}>Create New <Text style={{color: StandardTheme.Purple}}>Reminder</Text></Text>
                            <Text style={modalStyles.description}>Fill the form to create your new Reminder</Text>
                        </View>
                    
                        <View style={modalStyles.InputsContainer}>
                                <Input 
                                    placeholder='Name' 
                                    Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                                    type='default'
                                    onChange={(e) => {setNewCategory({...newCategory, name: e})}}
                                    value={""}
                                />

                                <Input 
                                    placeholder='Description' 
                                    Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                                    type='default'
                                    onChange={(e) => {setNewCategory({...newCategory, limit: e})}}
                                    value={""}
                                    multiline={true}
                                />

                                <Input 
                                    placeholder='Amount' 
                                    Icon={<MaterialIcons name="attach-money" size={15} color={StandardTheme.DarkBlue} />} 
                                    type='number-pad'
                                    onChange={(e) => setBody({...Body, Budget: e})}
                                    value={0}
                                />
                                
                                {       
        
                                <View style={modalStyles.ButtonContainer}>
                                    <Button color={StandardTheme.Purple} text='Next' action={handleNextPageForm}/>
                                </View>
                            }

                        </View>
                    
                    </View>

                    <View style={modalStyles.Container}>
                        <Pressable
                            onPress={handlePrevPageForm}
                        >
                            <Ionicons name="md-return-up-back-outline" size={35} color={StandardTheme.White} style={modalStyles.backForm}/>
                        </Pressable>
                        <View style={modalStyles.LogoContainer}>
                            <Text style={modalStyles.textLogo}>Create New <Text style={{color: StandardTheme.Purple}}>Reminder</Text></Text>
                            <Text style={modalStyles.description}>Select Interval</Text>
                        </View>

                        <Picker
                            placeholder='Interval'
                            style={{width: '90%'}}
                            onValueChange={(e) => {

                            }}
                            selectedValue={1}
                        >
                            {
                                Intervals.length > 0 &&
                                Intervals.map(el => {
                                    return <Picker.Item label={el.title} value={el.id} key={el.id} color="white"/>
                                })
                            }
                    
                        </Picker>
                        
                        <View style={modalStyles.ButtonContainer}>
                            <Button color={StandardTheme.Purple} text='Next' action={handleNextPageForm}/>
                        </View>  
                    </View>

                    <View style={modalStyles.Container}>
                        <Pressable
                            onPress={handlePrevPageForm}
                        >
                            <Ionicons name="md-return-up-back-outline" size={35} color={StandardTheme.White} style={modalStyles.backForm}/>
                        </Pressable>
                        <View style={modalStyles.LogoContainer}>
                            <Text style={modalStyles.textLogo}>Create New <Text style={{color: StandardTheme.Purple}}>Reminder</Text></Text>
                            <Text style={modalStyles.description}>Select Date</Text>
                        </View>

                        <DateTimePicker
                            mode='date'
                            display="spinner"
                            value={new Date()}
                            onChange={() => {}}
                        />
                        
                        <View style={modalStyles.ButtonContainer}>
                            <Button color={StandardTheme.Purple} text='Next' action={handleNextPageForm}/>
                        </View>  
                    </View>

                    <View style={modalStyles.Container}>
                        <Pressable
                            onPress={handlePrevPageForm}
                        >
                            <Ionicons name="md-return-up-back-outline" size={35} color={StandardTheme.White} style={modalStyles.backForm}/>
                        </Pressable>
                        <View style={modalStyles.LogoContainer}>
                            <Text style={modalStyles.textLogo}>Create New <Text style={{color: StandardTheme.Purple}}>Reminder</Text></Text>
                            <Text style={modalStyles.description}>Select Time</Text>
                        </View>

                        <DateTimePicker
                            mode='time'
                            display="spinner"
                            value={new Date()}
                            onChange={() => {}}
                        />
                        
                        <View style={modalStyles.ButtonContainer}>
                            <Button color={StandardTheme.Purple} text='Create' action={() => {}}/>
                        </View>  
                    </View>

                </Animated.View>
                
            </Modal>

        </View>
    )
}