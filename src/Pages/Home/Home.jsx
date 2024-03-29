import React, {useContext, useEffect} from 'react';
import { View, ScrollView, Text, Dimensions} from 'react-native';

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

const Home = ({navigation}) => {
    const { User, IsAuth } = useContext(AuthContext);
    const {IncomeTotal, OutcomeTotal, fetchTransactionTotals, error} = useTransactionTotals();
    const {data: dataChart, fetchCategoriesChart, error: errorChart} = useCategoriesChart();
    const useFocused = useIsFocused();


    useEffect(() => {
        fetchTransactionTotals();
        fetchCategoriesChart();
    }, [useFocused]);

    const dataPie = [
        {
        name: "Income",
        population:  IncomeTotal.amount ?? 0,
        color: StandardTheme.GreenPieChart,
        legendFontColor: "grey",
        legendFontSize: 15
        },
        {
        name: "Expenses",
        population: OutcomeTotal.amount ?? 0,
        color: StandardTheme.RedPieChart,
        legendFontColor: "grey",
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
                                    color={'#ffffff1a'} 
                                    text="Deposit" 
                                    action={() => {
                                        navigation.navigate('Incomes')
                                    }}
                                />
                            </View>
                            
                            <View style={{width: '70%', alignSelf: 'flex-end'}} >
                                <Button 
                                    color={'#ffffff1a'} 
                                    text="Withdraw" 
                                    action={() => {
                                        navigation.navigate('Expenses')
                                    }}
                                />
                            </View>
                            
                        </View>
                    </View>

                    <View style={Styles.incomeTrackContainer}>
                        <View style={Styles.incomeTrack}>
                            <View style={Styles.Income}>
                                <Text style={Styles.Income.text}>Income</Text>
                                <Text style={Styles.Income.amount}>{formatCurrency({amount: IncomeTotal.amount, decimals: true})}</Text>
                            </View>

                            <View style={{backgroundColor: StandardTheme.Grey, borderBottomColor: StandardTheme.Grey, borderWidth: .5, width: '100%', height: 1}} />

                            <View style={Styles.Outcome}>
                                <Text style={Styles.Outcome.text}>Outcome</Text>
                                <Text style={Styles.Outcome.amount}>{formatCurrency({amount: OutcomeTotal.amount, decimals: true})}</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <View style={{...Styles.chartContainer, width: '88%', marginTop: 140, marginBottom: 10}}>
                            <Text style={Styles.chartTitle}>Incomes vs Expenses</Text>
                            <PieChart
                                data={dataPie}
                                width={Dimensions.get('window').width - 70}
                                height={140}
                                chartConfig={{
                                    backgroundColor: '#041E42',
                                    backgroundGradientFrom: '#041E42',
                                    backgroundGradientTo: '#041E42',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 10
                                    }
                                }}
                                accessor={"population"}
                                backgroundColor={"transparent"}
                                paddingLeft={"0"}
                            />
                </View>


                <View style={{marginTop: 50, alignItems: 'center', gap: 20}}>
                    <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: StandardTheme.DarkBlue}}>Incomes</Text>
                    </View>
                    <IncomeCardsSlider/>
                </View>

                <View style={{width: '100%', marginTop: 30, alignItems: 'center', gap: 20}}>
                    <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: StandardTheme.DarkBlue}}>Expenses</Text>
                    </View>
                    <OutcomeCardsSlider />
                </View>

                <View style={{...Styles.chartContainer, marginBottom: 100}}>
                    <Text style={{...Styles.chartTitle, marginBottom: 10}}>Category's Limit Tracking</Text>
                    {
                        Object.keys(dataChart).length > 0 
                        ?
                            <BarChart
                                data={dataChart}
                                width={Dimensions.get('window').width - 40}
                                height={300}
                                yAxisLabel={'%'}
                                chartConfig={{
                                    backgroundGradientFrom: '#041E42',
                                    backgroundGradientTo: '#041E42',
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    strokeWidth: 2,
                                    style:{
                                        borderRadius: 10
                                    }
                                }}
                            />
                        : null
                    }
                    
                </View>                

            </ScrollView>
            
            <Navbar navigation={navigation}/>
        </View>
    )
}

export default Home;