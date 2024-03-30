import { useState, useEffect, useRef, useContext } from "react"
import { Modal, View, Animated, Dimensions, Pressable, Text, } from "react-native"
import { RadioButton } from "react-native-paper";

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Carousel from "../Carousel/Index"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { StandardTheme } from "../../Styles/Theme"
import useCategories from "../../Hooks/Categories/useCategories"
import StatCard from "../../Components/Cards/StatCard/Index";
import { PagesCreateForm } from "./styles";
import TransactionServices from "../../Services/TransactionServices"
import getCurrentDateTime from "../../Utils/generateDate";
import { AuthContext } from "../../Context/UserContext";

const service = new TransactionServices()

const defaultOutcomeValues = {title: '', description: '', amount: '', category: null};
const ExpenseCreateForm = ({showModal, setShowModal, afterCreateExpense}) => {
    const { User } = useContext(AuthContext);
    const [expense, setExpense] = useState(defaultOutcomeValues);
    const {Categories} = useCategories({filters: {page: 1, pageSize: 100, name: ''}});

    const { width, height } = Dimensions.get('window');
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Reset the animated value when the component mounts
        animatedValue.setValue(0);
    }, []);

    const handleNextPageForm = () => {
        // Trigger a smooth transition when changing the transform value
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    };

    const handlePrevPageForm = () => {
        // Trigger a smooth transition when changing the transform value
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    };

    const interpolatedValue = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * -1], // Adjust the transform values
    });

    const createExpense = async () => {
        try {
            const {title, description, amount, category} = expense;
            const body = {
                date: getCurrentDateTime(),
                title,
                description,
                amount,
                type_id: 2,
                category_id: category,
            }
            
            await service.CreateTransaction({body, token: User.token})
            setShowModal(false);
            setExpense(defaultOutcomeValues);
            afterCreateExpense();
        } catch(error) {
            console.log(error);
            Alert.alert('Error while creating transaction, try later');
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
            <Animated.View
                style={[{
                    flexDirection: 'row',
                    width: width * 2,
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
                        <Text style={PagesCreateForm.textLogo}>Create New <Text style={{color: StandardTheme.Red}}>Expense</Text></Text>
                        <Text style={PagesCreateForm.description}>Fill the form to create your new Transaction</Text>
                    </View>
                
                    <View style={PagesCreateForm.InputsContainer}>
                        <Input 
                            placeholder='Title' 
                            Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => {setExpense({...expense, title: e})}}
                            value={expense.title}
                        />

                        <Input 
                            placeholder='Description' 
                            Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => {setExpense({...expense, description: e})}}
                            value={expense.description}
                            multiline={true}
                        />
                        
                        <Input 
                            placeholder='Amount' 
                            Icon={<MaterialIcons name="attach-money" size={20} color={StandardTheme.DarkBlue} />} 
                            type='numeric'
                            onChange={(e) => {setExpense({...expense, amount: e})}}
                            value={expense.amount}
                        />

                        {       
                            expense.title && expense.description && expense.amount
                            ?
                                <View style={PagesCreateForm.ButtonContainer}>
                                    <Button color={StandardTheme.Red} text='Next' action={handleNextPageForm}/>
                                </View>
                            : 
                            <View style={PagesCreateForm.ButtonContainer}>
                                <Button color={StandardTheme.Grey} text='Next' action={() => {}}/>
                            </View>
                        }

                    </View>
                
                </View>

                <View style={PagesCreateForm.ContainerCategory}>
                    <Pressable
                        onPress={handlePrevPageForm}
                    >
                        <Ionicons name="md-return-up-back-outline" size={35} color={StandardTheme.White} style={PagesCreateForm.backForm}/>
                    </Pressable>
                    <View style={PagesCreateForm.LogoContainer}>
                        <Text style={PagesCreateForm.textLogo}>Create New <Text style={{color: StandardTheme.Red}}>Expense</Text></Text>
                        <Text style={PagesCreateForm.description}>Select Category</Text>
                    </View>

                    <Carousel
                        items={Categories.map(el => {
                            return (
                                <Pressable 
                                    key={el.id} 
                                    style={{alignItems: 'center', gap: 5}}
                                    onPress={() => {
                                        setExpense({...expense, category: el.id})
                                    }}
                                >
                                    <StatCard
                                        data = {el}
                                    />
                                    <RadioButton
                                        value={el.id}
                                        status={expense.category == el.id ?'checked' :'unchecked'}
                                    />
                                </Pressable>
                                
                            )
                        })}
                    />   
                    
                    {
                        expense.category
                        ?
                        <View style={PagesCreateForm.ButtonContainer}>
                            <Button 
                                color={StandardTheme.Red} 
                                text='Create' 
                                action={createExpense}/>
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

export default ExpenseCreateForm;