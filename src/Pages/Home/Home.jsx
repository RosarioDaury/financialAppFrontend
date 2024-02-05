import React, {useContext, useEffect, useState} from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';
import Button from '../../Common/Button/Button';
import { Styles } from './Styles';
import { AuthContext } from '../../Context/UserContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '../../Common/Cards/StatCard/Index';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Carousel from '../../Common/Carousel/Index';
import IncomeCard from '../../Common/Cards/IncomeCard/Index';
import OutcomeCard from '../../Common/Cards/OutcomeCard/Index';

import useTransactions from '../../Hooks/Transactions/useTransactions';
import useCategories from '../../Hooks/Categories/useCategories';

const Home = ({navigation}) => {
    const { User, IsAuth } = useContext(AuthContext);
    const [IncomesCards, setIncomesCards] = useState([]);
    const [OutcomesCards, setOutcomesCards] = useState([]);

    const {
        Transactions: Incomes,
        error: errorIncomes
    } = useTransactions({filters: {field: 'Type', value: 1}})

    const {
        Transactions: Outcomes,
        error: errorOutcomes
    } = useTransactions({filters: {field: 'Type', value: 2}})

    const {Categories} = useCategories();

    if(!IsAuth) {
        navigation.navigate('Login')
        return
    }

    useEffect(() => {
        const {data} = Incomes;
        if(data){
            let cards = data.map(el => {
                return <IncomeCard data={el}/>
            })
            setIncomesCards(cards)
        }
    }, [Incomes])

    useEffect(() => {
        const {data} = Outcomes;
        if(data){
            let cards = data.map(el => {
                return <OutcomeCard data={el}/>
            })
            setOutcomesCards(cards)
        }
    }, [Outcomes])    

    return(
        <ScrollView>
            {/* Header */}
            <View style={Styles.Header}>
                {/* User */}
                <View style={Styles.username}>  
                    <View style={Styles.username.user}>
                        <FontAwesome5 name="user-alt" size={25} color={StandardTheme.White} />
                    </View>

                    <View style={Styles.username.user}>
                        <Text style={Styles.username.name}>{User?.first_name || ""} {User?.last_name || ""}</Text>
                    </View>
                </View>

                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={Styles.lastestIncome}>
                        <Text style={Styles.lastestIncome.text}>Current Balance</Text>
                        <Text style={Styles.lastestIncome.amount}>RD$ {User?.Budget || 0.00}</Text>
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
                            <Text style={Styles.Income.amount}>RD${Incomes?.total || 0}</Text>
                        </View>

                        <View style={{backgroundColor: StandardTheme.Grey, borderLeftColor: StandardTheme.DarkBlue, borderWidth: .5, width: 1, height: '80%'}} />
                        
                        <View style={Styles.Outcome}>
                            <Text style={Styles.Outcome.text}>Outcome</Text>
                            <Text style={Styles.Outcome.amount}>RD${Outcomes?.total || 0}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* Header */}

            {/* Incomes */}

            <View style={{marginTop: 100, alignItems: 'center', gap: 20}}>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Incomes</Text>
                    <Text style={{color: StandardTheme.Grey}}>See All</Text>
                </View>
                <Carousel items={IncomesCards}/>
            </View>

            <View style={{width: '100%', marginTop: 30, alignItems: 'center', gap: 20}}>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Outcomes</Text>
                    <Text style={{color: StandardTheme.Grey}}>See All</Text>
                </View>
                <Carousel items={OutcomesCards}/>
            </View>
            {/* Incomes */}


            {/* Main */}
            <View style={Styles.StatsContainer}>
                {
                    Categories.map(el => {
                        return (
                            <StatCard
                                data = {el}
                            />
                        )
                    })
                }
                {/* <StatCard 
                    Icon={<AntDesign name="heart" size={25} color={StandardTheme.Red} />}
                    Color={StandardTheme.Red}
                    Name={"Health and Care"}
                />

                <StatCard 
                    Icon={<MaterialIcons name="sports-mma" size={25} color={StandardTheme.Green} />}
                    Color={StandardTheme.Green}
                    Name={"Sports and Gym"}
                />

                <StatCard 
                    Icon={<Ionicons name="fast-food" size={25} color='black' />}
                    Color='black'
                    Name={"Food And Drinks"}
                />

                <StatCard 
                    Icon={<AntDesign name="creditcard" size={25} color={StandardTheme.Golden} />}
                    Color={StandardTheme.Golden}
                    Name={"Credit Card"}
                />

                <StatCard 
                    Icon={<Ionicons name="ios-car-sport" size={25} color='black'/>}
                    Color={'black'}
                    Name={"Pal Camry"}
                /> */}
            </View>
            {/* Main */}
        </ScrollView>
    )
}

export default Home;