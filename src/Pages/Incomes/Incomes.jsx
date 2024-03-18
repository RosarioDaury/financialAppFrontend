import { useContext, useEffect, useState } from "react";
import { Pressable, View, Text, Alert } from "react-native";

import { StandardTheme } from '../../Styles/Theme';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Input from "../../Components/Input/Input";

import { AuthContext } from "../../Context/UserContext";
import { SwipeListView } from "react-native-swipe-list-view";
import { styles } from "./styles";
import useTransactionsByType from "../../Hooks/Transactions/useTransactionsByType";
import Pages from "../../Components/Pagination/Index";
import IncomeCardDetailed from "../../Components/Cards/IncomeCardDetailed/Index";
import TransactionServices from "../../Services/TransactionServices";
import getCurrentDateTime from "../../Utils/generateDate";
import IncomeCreateForm from "../../Components/Forms/IncomeCreateForm";

const transactionServices = new TransactionServices();

export default function Incomes({navigation}) {
    const { User } = useContext(AuthContext);
    const [filters, setFilters] = useState({page: 1, pageSize: 5})
    const [showModal, setShowModal] = useState(false);

    const { Transactions, Pagination, fetchTransactions, error } = useTransactionsByType({filters, type: 1})

    const handleNext = () => {
        setFilters({...filters, page: filters.page + 1})
    }

    const handlePrev = () => {
        setFilters({...filters, page: filters.page - 1})
    }

    const createIncome = async ({income}) => {
        try {
            const {title, description, amount} = income;
            const body = {
                date: getCurrentDateTime(),
                title,
                description,
                amount,
                type_id: 1
            }
            
            await transactionServices.CreateTransaction({body, token: User.token})
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

    useEffect(() => {
        if(error) {
            Alert.alert(error)
        }
    }, [error])

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
                onChange={(e) => setFilters({page: 1, pageSize: 5, title: e})}
                value={filters.title}
            />
        </View>

        <Pages current={Pagination.currentPage} totalPages={Pagination.pages} handleNext={handleNext} handlePrev={handlePrev}/>
        
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

        <IncomeCreateForm 
            showModal  = {showModal}
            setShowModal = {setShowModal} 
            createIncome = {createIncome}
        />

    </View>
    )
}


