import { useContext, useEffect, useState, useRef } from "react";
import { Pressable, View, Text, Modal, Dimensions, Animated } from "react-native";

import { StandardTheme } from '../../Styles/Theme';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { AuthContext } from "../../Context/UserContext";
import { SwipeListView } from "react-native-swipe-list-view";
import { styles, modalStyles } from "./styles";
import useTransactionsByType from "../../Hooks/Transactions/useTransactionsByType";
import Pages from "../../Components/Pagination/Index";
import ExpensesCardDetailed from "../../Components/Cards/ExpensesCardDetailed/Index";
import useCategories from "../../Hooks/Categories/useCategories";
import Carousel from "../../Components/Carousel/Index";
import StatCard from "../../Components/Cards/StatCard/Index";
import { RadioButton } from "react-native-paper";
import TransactionServices from "../../Services/TransactionServices";
import getCurrentDateTime from "../../Utils/generateDate";

const transactionServices = new TransactionServices();

export default function Expenses({navigation}) {
    const { User } = useContext(AuthContext);
    const [filters, setFilters] = useState({page: 1, pageSize: 5})
    const [showModal, setShowModal] = useState(false);
    const [newExpense, setnewExpense] = useState({title: '', description: '', amount: 0, category: null});
    const { Transactions, Pagination: pagination, fetchTransactions, error} = useTransactionsByType({filters, type: 2});
    const {Categories, fetchCategories } = useCategories({filters: {page: 1, pageSize: 100, name: ''}});
    const animatedValue = useRef(new Animated.Value(0)).current;

    const { width, height } = Dimensions.get('window');

    const handleNext = () => {
        setFilters({...filters, page: filters.page + 1})  
    }

    const handlePrev = () => {
        setFilters({...filters, page: filters.page - 1})
    }

    useEffect(() => {
        fetchTransactions({filters, type: 2})
    }, [filters])

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

    const createExponse = async () => {
        try {
            const {title, description, amount, category} = newExpense;
            const body = {
                date: getCurrentDateTime(),
                title,
                description,
                amount,
                type_id: 2,
                category_id: category,
            }
            
            await transactionServices.CreateTransaction({body, token: User.token})
            setnewExpense({title: '', description: '', amount: 0, category: null});
            setShowModal(false);
            setFilters({page: 1, pageSize: 5});
            fetchTransactions({filters, type: 2})
        } catch(error) {
            console.log(error);
            Alert.alert('Error while creating transaction, try later');
        }
    }
    
    useEffect(() => {
        // Reset the animated value when the component mounts
        animatedValue.setValue(0);
    }, []);
    
    const interpolatedValue = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * -1], // Adjust the transform values
    });

    return(
    <View style={{height: '100%', width: '98%', alignSelf: 'center'}}>
        <View style={styles.header}>
            <Pressable
                onPress={() => {
                navigation.navigate('Home');
                }}
            >
                    <Ionicons name="md-return-up-back-outline" size={35} color={StandardTheme.DarkBlue} />
            </Pressable>
            
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    Expenses
                </Text>

                <Pressable
                onPress={() => {
                    setShowModal(true);
                }}
                >
                <Ionicons name="add-circle" size={30} color={StandardTheme.DarkBlue} />
                </Pressable>
            </View>
        
        </View>
        
        <View style={styles.search}>
            <Input
                placeholder='Search' 
                Icon={<AntDesign name="search1" size={15} color={StandardTheme.DarkBlue} />}
                type='default'    
                onChange={(e) => setFilters({...filters, name: e})}
                value={filters.name}
            />
        </View>

        <Pages current={pagination.currentPage} totalPages={pagination.pages} handleNext={handleNext} handlePrev={handlePrev}/>
        
        <SwipeListView
            data={Transactions ? Transactions : []}
            renderItem={ (data, rowMap) => (
                <ExpensesCardDetailed data={data.item} />
            )}
            rightOpenValue={-85}
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
                    width: width * 2,
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
                        <Text style={modalStyles.textLogo}>Create New <Text style={{color: StandardTheme.Red}}>Expense</Text></Text>
                        <Text style={modalStyles.description}>Fill the form to create your new Transaction</Text>
                    </View>
                
                    <View style={modalStyles.InputsContainer}>
                        <Input 
                            placeholder='Title' 
                            Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => {setnewExpense({...newExpense, title: e})}}
                            value={newExpense.title}
                        />

                        <Input 
                            placeholder='Description' 
                            Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => {setnewExpense({...newExpense, description: e})}}
                            value={newExpense.description}
                            multiline={true}
                        />
                        
                        <Input 
                            placeholder='Amount' 
                            Icon={<MaterialIcons name="attach-money" size={20} color={StandardTheme.DarkBlue} />} 
                            type='numeric'
                            onChange={(e) => {setnewExpense({...newExpense, amount: e})}}
                            value={newExpense.amount}
                        />

                        {       
                            newExpense.title && newExpense.description && newExpense.amount
                            ?
                                <View style={modalStyles.ButtonContainer}>
                                    <Button color={StandardTheme.Blue} text='Next' action={handleNextPageForm}/>
                                </View>
                            : 
                            <View style={modalStyles.ButtonContainer}>
                                <Button color={StandardTheme.Grey} text='Next' action={() => {}}/>
                            </View>
                        }

                    </View>
                
                </View>

                <View style={modalStyles.ContainerCategory}>
                    <Pressable
                        onPress={handlePrevPageForm}
                    >
                        <Ionicons name="md-return-up-back-outline" size={35} color={StandardTheme.White} style={modalStyles.backForm}/>
                    </Pressable>
                    <View style={modalStyles.LogoContainer}>
                        <Text style={modalStyles.textLogo}>Create New Expense</Text>
                        <Text style={modalStyles.description}>Select Category</Text>
                    </View>

                    <Carousel
                        items={Categories.map(el => {
                            return (
                                <Pressable 
                                    key={el.id} 
                                    style={{alignItems: 'center', gap: 5}}
                                    onPress={() => {
                                        setnewExpense({...newExpense, category: el.id})
                                    }}
                                >
                                    <StatCard
                                        data = {el}
                                    />
                                    <RadioButton
                                        value={el.id}
                                        status={newExpense.category == el.id ?'checked' :'unchecked'}
                                    />
                                </Pressable>
                                
                            )
                        })}
                    />   
                    
                    {
                        newExpense.category
                        ?
                        <View style={modalStyles.ButtonContainer}>
                            <Button color={StandardTheme.Blue} text='Create' action={createExponse}/>
                        </View>  
                        :
                        <View style={modalStyles.ButtonContainer}>
                            <Button color={StandardTheme.Grey} text='Create' action={() => {}}/>
                        </View>  
                    }
                </View>
            </Animated.View>
        </Modal>

    </View>
)
}


