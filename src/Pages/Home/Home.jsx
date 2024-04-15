import React, {useContext, useEffect, useState} from 'react';
import { View, ScrollView, Text, Dimensions, Alert} from 'react-native';

import { StandardTheme } from '../../Styles/Theme';
import Button from '../../Components/Button/Button';
import IncomeCardsSlider from '../../Components/Cards/IncomeCard/Index';
import OutcomeCardsSlider from '../../Components/Cards/OutcomeCard/Index';
import { Styles } from './Styles';

import { AuthContext } from '../../Context/UserContext';

import useTransactionTotals from '../../Hooks/Transactions/useTransactionTotals';
import formatCurrency from '../../Utils/formatCurrency';
import Navbar from '../../Components/Navbar/Index';
import { BarChart, PieChart } from 'react-native-chart-kit';
import useCategoriesChart from '../../Hooks/Categories/useCategoriesChart';
import { useIsFocused } from '@react-navigation/native';
import IncomeCreateForm from '../../Components/Forms/IncomeCreateForm';
import ExpenseCreateForm from '../../Components/Forms/ExpenseCreateForm';
import { askNotificationsPermissions } from '../../Utils/PushNotifications';

const Home = ({navigation}) => {
    const { User, IsAuth } = useContext(AuthContext);

    const [showModalIncome, setShowModalIncome] = useState(false); 
    const [showModalOutcome, setShowModalOutcome] = useState(false)

    const {IncomeTotal, OutcomeTotal, fetchTransactionTotals, error} = useTransactionTotals();
    const {data: dataChart, fetchCategoriesChart, error: errorChart} = useCategoriesChart();
    const useFocused = useIsFocused();

    useEffect(() => {
        askNotificationsPermissions()
    }, [])

    useEffect(() => {
        fetchTransactionTotals();
        fetchCategoriesChart();
    }, [useFocused]);

    const dataPie = [
        {
        name: "Income",
        population:  IncomeTotal.amount ?? 0,
        color: StandardTheme.GreenPieChart,
        legendFontColor: "white",
        legendFontSize: 15
        },
        {
        name: "Expenses",
        population: OutcomeTotal.amount ?? 0,
        color: StandardTheme.RedPieChart,
        legendFontColor: "white",
        legendFontSize: 15
        }
    ];

    useEffect(() => {
        if(!IsAuth) {
            navigation.navigate('Login');
        }
    }, [IsAuth]);

    
    return(
        <View style={{height: '100%'}}>
            <ScrollView>
                <View style={Styles.Header}>
                    <View style={Styles.username}>  
                        <View style={Styles.username.user}>
                            <Text style={Styles.username.name}>Welcome, {User?.firstName || ""} {User?.lastName || ""}</Text>
                        </View>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={Styles.lastestIncome}>
                            <Text style={Styles.lastestIncome.text}>Current Balance</Text>
                            <Text style={Styles.lastestIncome.amount}>{formatCurrency({amount: User?.balance, decimals: true}) || 0.00}</Text>
                        </View>


                        <View style={{...Styles.lastestIncome, alignItems: 'center', gap: 10}}>
                            <View style={{width: '70%', alignSelf: 'flex-end'}}>
                                <Button 
                                    color={StandardTheme.Green} 
                                    text="Deposit" 
                                    action={() => {
                                        setShowModalIncome(true)
                                    }}
                                />
                            </View>
                            
                            <View style={{width: '70%', alignSelf: 'flex-end'}} >
                                <Button 
                                    color={'#ffffff1a'} 
                                    text="Withdraw" 
                                    action={() => {
                                        setShowModalOutcome(true)
                                    }}
                                />
                            </View>
                            
                        </View>
                    </View>

                    <View style={{...Styles.chartContainer, width: '100%', marginBottom: 50}}>
                            <Text style={Styles.chartTitle}>Incomes VS Expenses</Text>
                            <PieChart
                                data={dataPie}
                                width={Dimensions.get('window').width - 70}
                                height={170}
                                chartConfig={{
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgb(255, 255, 255)`,
                                    style: {
                                        borderRadius: 10,
                                    }
                                }}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                            />
                    </View>

                    <View style={Styles.incomeTrackContainer}>
                        <View style={Styles.incomeTrack}>
                            <View style={Styles.Income}>
                                <Text style={Styles.Income.text}>Income</Text>
                                <Text style={Styles.Income.amount}>+{formatCurrency({amount: IncomeTotal.amount, decimals: true})}</Text>
                            </View>

                            <View style={{backgroundColor: StandardTheme.Grey, borderBottomColor: StandardTheme.Grey, borderWidth: .5, width: '100%', height: 1}} />

                            <View style={Styles.Outcome}>
                                <Text style={Styles.Outcome.text}>Outcome</Text>
                                <Text style={Styles.Outcome.amount}>-{formatCurrency({amount: OutcomeTotal.amount, decimals: true})}</Text>
                            </View>
                        </View>
                    </View>

                </View>

                <View style={{...Styles.chartContainer, marginTop: 130, paddingVertical: 50}}>
                    <Text style={{...Styles.chartTitle, marginBottom: 40, marginLeft: 25}}>Category's Limit Tracking</Text>
                    {
                        Object.keys(dataChart).length > 0 
                        ?
                            <BarChart
                                data={dataChart}
                                width={Dimensions.get('window').width - 40}
                                height={350}
                                yAxisLabel={'%'}
                                chartConfig={{
                                    decimalPlaces: 1,
                                    backgroundGradientFrom: '#041E42',
                                    backgroundGradientTo: '#041E42',
                                    fillShadowGradientFrom: '#2dc653',
                                    fillShadowGradientFromOpacity: 1,
                                    fillShadowGradientTo: '#2dc653',
                                    fillShadowGradientToOpacity: .1,
                                    propsForBackgroundLines: {
                                        opacity: 0
                                    },
                                    color: (opacity = 1) => `linear-gradient(180deg, rgba(242,249,253,1) 0%, rgba(4,30,66,1) 100%);`,
                                    strokeWidth: 5,
                                    style:{
                                    }
                                }}
                            />
                        : null
                    }
                    
                </View>  


                <View style={{marginTop: 50, alignItems: 'center', gap: 20}}>
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: StandardTheme.DarkBlue}}>Incomes</Text>
                    </View>
                    <IncomeCardsSlider/>
                </View>

                <View style={{width: '100%', marginTop: 30, marginBottom: 120, alignItems: 'center', gap: 20}}>
                    <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: StandardTheme.DarkBlue}}>Expenses</Text>
                    </View>
                    <OutcomeCardsSlider />
                </View>

            </ScrollView>
                    
            <IncomeCreateForm
                showModal={showModalIncome}
                setShowModal={setShowModalIncome}
                afterCreateIncome={() => {
                    Alert.alert('New Income Created')
                    fetchTransactionTotals()
                    fetchCategoriesChart()
                }}
            />

            <ExpenseCreateForm 
                showModal={showModalOutcome}
                setShowModal={setShowModalOutcome}
                afterCreateExpense ={() => {
                    Alert.alert('New Expense Created')
                    fetchTransactionTotals()
                    fetchCategoriesChart()
                }}
            />

            
            <Navbar navigation={navigation}/>
        </View>
    )
}

export default Home;