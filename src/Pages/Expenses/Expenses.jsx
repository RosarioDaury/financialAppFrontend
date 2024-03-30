import { useEffect, useState } from "react";
import { Pressable, View, Text, Alert } from "react-native";

import { StandardTheme } from '../../Styles/Theme';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import Input from "../../Components/Input/Input";
import { SwipeListView } from "react-native-swipe-list-view";
import { styles } from "./styles";
import useTransactionsByType from "../../Hooks/Transactions/useTransactionsByType";
import Pages from "../../Components/Pagination/Index";
import ExpensesCardDetailed from "../../Components/Cards/ExpensesCardDetailed/Index";
import ExpenseCreateForm from "../../Components/Forms/ExpenseCreateForm";



export default function Expenses({navigation}) {
    const [filters, setFilters] = useState({page: 1, pageSize: 5})
    const [showModal, setShowModal] = useState(false);
    const { Transactions, Pagination: pagination, fetchTransactions, error} = useTransactionsByType({filters, type: 2});


    const handleNext = () => {
        setFilters({...filters, page: filters.page + 1})  
    }

    const handlePrev = () => {
        setFilters({...filters, page: filters.page - 1})
    }

    useEffect(() => {
        fetchTransactions({filters, type: 2})
    }, [filters])

    const afterCreateExpense = async () => {
        setFilters({page: 1, pageSize: 5});
        fetchTransactions({filters, type: 2})
    }

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
                    Expenses
                </Text>

                <Pressable
                onPress={() => {
                    setShowModal(true);
                }}
                >
                <Ionicons name="add-circle" size={30} color={StandardTheme.Red} />
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

        <ExpenseCreateForm 
            showModal = {showModal}
            setShowModal = {setShowModal}
            afterCreateExpense = {afterCreateExpense}
        />
    </View>
)
}


