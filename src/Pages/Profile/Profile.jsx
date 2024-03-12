import { StyleSheet, View, Text, ScrollView, Pressable, Modal, Alert } from 'react-native';
import { StandardTheme } from '../../Styles/Theme';
import { FontSizes } from '../../Styles/GlobalStyles';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import useCategories from '../../Hooks/Categories/useCategories';
import StatCard from '../../Components/Cards/StatCard/Index';
import Carousel from '../../Components/Carousel/Index'
import { AuthContext } from '../../Context/UserContext';
import { useContext, useState, useEffect } from 'react';
import formatCurrency from '../../Utils/formatCurrency';
import Input from '../../Components/Input/Input';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Button from '../../Components/Button/Button';
import UserServices from '../../Services/UserServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Service = new UserServices();

const Profile = ({navigation}) => {
    const [showModal, setShowModal] = useState(false);
    const { User, IsAuth, setUser, logOut, setUserFromToken } = useContext(AuthContext);
    const {Categories} = useCategories({filters: {page: 1, pageSize: 100}});
    const [update, setUpdate] = useState({
        firstName: User.firstName, 
        lastName: User.lastName, 
        username: User.username,
        email: User.email
    })

    const updateUser = async () => {
        try {
            const response = await Service.updateUser({body: update, token: User.token})
            await AsyncStorage.setItem('token', response.token);
            setUserFromToken({token: response.token})
            setShowModal(false);
        } catch(err) {
            console.log(err);
            Alert.alert(err);
        }
        
    }

    useEffect(() => {
        if(!IsAuth) {
            navigation.navigate('Login');
        }
    }, [IsAuth])


    return(
        <View style={{height: '100%'}}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Home');
                            }}
                        >
                            <Ionicons name="md-return-up-back-outline" size={35} color={StandardTheme.White} />
                        </Pressable>
                        
                        <Pressable style={styles.edit} onPress={() => setShowModal(true)}>
                            <AntDesign name="edit" size={30} color={StandardTheme.White}/>
                        </Pressable>
                    </View>

                    <View style={styles.userinfofloat}>
                        <FontAwesome name="user-circle" size={80} color={StandardTheme.White} />
                        <View style={styles.username}>
                            <Text style={styles.name}>{User?.firstName || ""} {User?.lastName || ""}</Text>
                            <Text style={styles.type}>{User?.type ? User.type.type : ""}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.information}>
                    <View style={styles.itemInformation}>
                        <Text style={styles.informationTitle}>Username</Text>
                        <Text style={styles.informationData}>{User?.username || ""}</Text>
                    </View>
                    
                    <View style={{backgroundColor: StandardTheme.Grey, borderBottomColor: StandardTheme.Grey, borderWidth: .5, width: '100%', height: 1}} />

                    <View style={styles.itemInformation}>
                        <Text style={styles.informationTitle}>Email</Text>
                        <Text style={styles.informationData}>{User?.email || ""}</Text>
                    </View>

                    <View style={{backgroundColor: StandardTheme.Grey, borderBottomColor: StandardTheme.Grey, borderWidth: .5, width: '100%', height: 1}} />

                    <View style={styles.itemInformation}>
                        <Text style={styles.informationTitle}>Current balance</Text>
                        <Text style={styles.informationData}>{formatCurrency({amount: User.balance, decimals: true}) || ""}</Text>
                    </View>

                </View>
                
                <View
                    style={styles.mycategories}
                >
                    <Text style={styles.mycategoriestext}>My Categories</Text>
                    <Carousel
                        items={Categories.map(el => {
                            return (
                                <StatCard
                                    data = {el}
                                    key={el.id}
                                />
                            )
                        })}
                    />   
                </View>
                
            </ScrollView>
                            
            <Pressable style={styles.logout} onPress={logOut}>
                <SimpleLineIcons name="logout" size={20} color='white' />
            </Pressable> 

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
                        <Text style={modalStyles.textLogo}>Update User</Text>
                    </View>

                    <View style={modalStyles.InputsContainer}>

                        <View style={modalStyles.Titles}>
                            <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.White}} />
                            <Text style={modalStyles.Titles.Text}>Personal Information</Text>
                            <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.White}} />
                        </View>

                        <Input 
                            placeholder='First Name' 
                            Icon={<FontAwesome5 name="user-edit" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => setUpdate({...update, firstName: e})}
                            value={update.firstName}
                        />

                        <Input 
                            placeholder='Last Name' 
                            Icon={<FontAwesome5 name="user-edit" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => setUpdate({...update, lastName: e})}
                            value={update.lastName}
                        />

                        <Input 
                            placeholder='Email' 
                            Icon={<Entypo name="email" size={15} color={StandardTheme.DarkBlue} />} 
                            type='email-address'
                            onChange={(e) => setUpdate({...update, email: e})}
                            value={update.email}
                        />
                        
                        
                        <View style={modalStyles.Titles}>
                            <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.White}} />
                            <Text style={modalStyles.Titles.Text}>Account Information</Text>
                            <View style={{flex: 1, height: 1, backgroundColor: StandardTheme.White}} />
                        </View>

                        <Input 
                            placeholder='Username' 
                            Icon={<FontAwesome5 name="user-alt" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => setUpdate({...update, username: e})}
                            value={update.username}
                        />

                    </View>

                    <View style={modalStyles.ButtonContainer}>
                        <Button color={StandardTheme.Blue} text='Update' action={updateUser}/>
                    </View>
                </ScrollView>
            </Modal>
        </View>
        
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: StandardTheme.DarkBlue,
        height: 220,
        position: 'relative',
        alignItems: 'center',
    },
    title: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '75%',
    },
    titleText: {
        fontSize: FontSizes.normal,
        color: StandardTheme.DarkBlue,
        fontWeight: 'bold'
    },
    userinfofloat: {
        position: 'absolute',
        top: 105,
        margin: 'auto',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 30, 
        paddingVertical: 30,
        backgroundColor: StandardTheme.DarkBlue,
        gap: 10,
    },
    edit: {
        alignSelf: 'flex-end'
    },  
    username: {
        alignItems: 'center',
        gap: 5
    },
    name: {
        fontSize: FontSizes.large,
        fontWeight: 'bold',
        color: StandardTheme.White
    },
    type: {
        color: StandardTheme.Grey
    },
    logout: {
        backgroundColor: '#d21504b2',
        width: 60,
        height: 60,
        position:'absolute',
        bottom: 30,
        right: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    StatsContainer: {
        marginTop: 200,
        marginBottom: 100,
        gap: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    information: {
        marginTop: 120,
        width: '100%',
        alignSelf: 'center',
        gap: 15
    },
    itemInformation: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    informationTitle: {
        color: StandardTheme.DarkBlue,
        fontSize: FontSizes.medium,
        fontWeight: 'bold'
    },
    informationData: {
        fontSize: FontSizes.medium,
        fontWeight: 'bold',
        color: 'grey'
    },
    mycategories: {
        marginLeft: 10,
        marginTop: 50,
        gap: 15
    },
    mycategoriestext: {
        width: '90%',
        fontSize: 16,
        fontWeight: 'bold', 
        color: StandardTheme.DarkBlue,
        alignSelf: 'center'
    }
});

const modalStyles = StyleSheet.create({
    Container:{
        padding: 25,
        zIndex: 10,
        backgroundColor: StandardTheme.DarkBlue,
    },  
    Header:{
        marginTop: 40,
        marginBottom: 20,
        alignSelf: 'flex-end'
    },
    LogoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 25,
        marginBottom: 15
    },  
    IconContainer: {
        borderColor: StandardTheme.White,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Icon: {
        color: StandardTheme.DarkBlue,
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'center',
        shadowColor: StandardTheme.DarkBlue,
    },
    textLogo: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: StandardTheme.White
    },
    InputsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'center'
    },
    Titles: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
        marginTop: 35,
        width: '80%',
        Text: {
            fontSize: 16,
            color: StandardTheme.White
        }
    },
    ButtonContainer: {
        marginTop: 30,
        marginBottom: 50,
        gap: 5,
        width: '70%',
        alignSelf:'center'
    },
})

export default Profile;