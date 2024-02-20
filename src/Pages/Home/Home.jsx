import React, {useContext, useEffect, useState} from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';

import { StandardTheme } from '../../Styles/Theme';
import Button from '../../Common/Button/Button';
import StatCard from '../../Common/Cards/StatCard/Index';
import IncomeCardsSlider from '../../Common/Cards/IncomeCard/Index';
import OutcomeCardsSlider from '../../Common/Cards/OutcomeCard/Index';
import { Styles } from './Styles';

import { AuthContext } from '../../Context/UserContext';

import useCategories from '../../Hooks/Categories/useCategories';
import useTransactionTotals from '../../Hooks/Transactions/useTransactionTotals';
import formatCurrency from '../../Utils/formatCurrency';
import Navbar from '../../Common/Navbar/Index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Home = ({navigation}) => {
    const { User, IsAuth } = useContext(AuthContext);
    const {Categories} = useCategories({filters: {}});
    const {IncomeTotal, OutcomeTotal, fetchTransactionTotals, error} = useTransactionTotals();

    if(!IsAuth) {
        navigation.navigate('Login')
        return
    }

    return(
        <View>
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
                            <Text style={Styles.lastestIncome.amount}>{formatCurrency(User?.balance) || 0.00}</Text>
                        </View>
                        <View style={{...Styles.lastestIncome, alignItems: 'center', gap: 10}}>
                            <View style={{width: '70%', alignSelf: 'flex-end'}}>
                                <Button 
                                    color={'#ffffff1a'} 
                                    text="Deposit" 
                                    action={() => {
                                        navigation.navigate('Login')
                                    }}
                                />
                            </View>
                            
                            <View style={{width: '70%', alignSelf: 'flex-end'}} >
                                <Button 
                                    color={'#ffffff1a'} 
                                    text="Withdraw" 
                                    action={() => {
                                        navigation.navigate('Login')
                                    }}
                                />
                            </View>
                            
                        </View>
                    </View>

                    <View style={Styles.incomeTrackContainer}>
                        <View style={Styles.incomeTrack}>
                            <View style={Styles.Income}>
                                <Text style={Styles.Income.text}>Income</Text>
                                <Text style={Styles.Income.amount}>{formatCurrency(IncomeTotal.amount)}</Text>
                            </View>

                            <View style={{backgroundColor: StandardTheme.Grey, borderLeftColor: StandardTheme.DarkBlue, borderWidth: .5, width: 1, height: '80%'}} />
                            
                            <View style={Styles.Outcome}>
                                <Text style={Styles.Outcome.text}>Outcome</Text>
                                <Text style={Styles.Outcome.amount}>{formatCurrency(OutcomeTotal.amount)}</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <View style={{marginTop: 100, alignItems: 'center', gap: 20}}>
                    <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Incomes</Text>
                        <Text style={{color: StandardTheme.Grey}}>See All</Text>
                    </View>
                    <IncomeCardsSlider/>
                </View>

                <View style={{width: '100%', marginTop: 30, alignItems: 'center', gap: 20}}>
                    <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Outcomes</Text>
                        <Text style={{color: StandardTheme.Grey}}>See All</Text>
                    </View>
                    <OutcomeCardsSlider />
                </View>


                <View style={Styles.StatsContainer}>
                    {
                        Categories.map(el => {
                            return (
                                <StatCard
                                    data = {el}
                                    key={el.id}
                                />
                            )
                        })
                    }
                </View>

            </ScrollView>
            
            <Navbar/>
        </View>
        
    )
}

export default Home;