import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, View, Text, Modal, Alert } from "react-native";

import { StandardTheme } from '../../Styles/Theme';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import { AuthContext } from "../../Context/UserContext";
import { SwipeListView } from "react-native-swipe-list-view";
import { styles, modalStyles } from "./styles";
import useTransactionsByType from "../../Hooks/Transactions/useTransactionsByType";
import Pages from "../../Components/Pagination/Index";
import IncomeCardDetailed from "../../Components/Cards/IncomeCardDetailed/Index";
import TransactionServices from "../../Services/TransactionServices";
import getCurrentDateTime from "../../Utils/generateDate";

const transactionServices = new TransactionServices();

export default function Incomes({navigation}) {
    const { User } = useContext(AuthContext);
    const [filters, setFilters] = useState({page: 1, pageSize: 5})
    const [showModal, setShowModal] = useState(false);
    const [newIncome, setNewIncome] = useState({title: '', description: '', amount: 0});
    const { Transactions, Pagination: pagination, fetchTransactions, error} = useTransactionsByType({filters, type: 1})

    const handleNext = () => {
        setFilters({...filters, page: filters.page + 1})
    }

    const handlePrev = () => {
        setFilters({...filters, page: filters.page - 1})
    }

    const createIncome = async () => {
        try {
            const {title, description, amount} = newIncome;
            const body = {
                date: getCurrentDateTime(),
                title,
                description,
                amount,
                type_id: 1
            }
            
            await transactionServices.CreateTransaction({body, token: User.token})
            setNewIncome({title: '', description: '', amount: 0});
            setShowModal(false);
            setFilters({page: 1, pageSize: 5});
            fetchTransactions({filters, type: 1})
        } catch(error) {
            console.log(error);
            Alert.alert('Error while creating transaction, try later');
        }
    }

    useEffect(() => {
        fetchTransactions({filters, type: 1})
    }, [filters])


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
                Incomes
            </Text>

            <Pressable
            onPress={() => {
                setShowModal(true);
            }}
            >
            <Ionicons name="add-circle" size={30} color={StandardTheme.Green} />
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
                <IncomeCardDetailed data={data.item}/>
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

            <ScrollView style={modalStyles.Container}>

                    <Pressable
                        onPress={() => setShowModal(false)}
                        style={modalStyles.Header}
                    >
                        <AntDesign name="down" size={30} color={StandardTheme.White}/>
                    </Pressable>


                    <View style={modalStyles.LogoContainer}>
                        <Text style={modalStyles.textLogo}>Create New <Text style={{color: StandardTheme.Green}}>Income</Text></Text>
                        <Text style={modalStyles.description}>Fill the form to create your new Transaction {"("}Income{")"}</Text>
                    </View>

                    <View style={modalStyles.InputsContainer}>
                        <Input 
                            placeholder='Title' 
                            Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => {setNewIncome({...newIncome, title: e})}}
                            value={newIncome.title}
                        />

                        <Input 
                            placeholder='Description' 
                            Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => {setNewIncome({...newIncome, description: e})}}
                            value={newIncome.description}
                            multiline={true}
                        />

                        <Input 
                            placeholder='Amount' 
                            Icon={<MaterialIcons name="attach-money" size={20} color={StandardTheme.DarkBlue} />} 
                            type='numeric'
                            onChange={(e) => {setNewIncome({...newIncome, amount: e})}}
                            value={newIncome.amount}
                        />
                    </View>

                    {       
                        newIncome.title && newIncome.description && newIncome.amount
                            ?
                                <View style={modalStyles.ButtonContainer}>
                                    <Button color={StandardTheme.Green} text='Create' action={createIncome}/>
                                </View>
                            : 
                                <View style={modalStyles.ButtonContainer}>
                                    <Button color={StandardTheme.Grey} text='Create' action={() => {}}/>
                                </View>
                    }
            </ScrollView>
                
        </Modal>

    </View>
)
}


