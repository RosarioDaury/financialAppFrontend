import { useContext, useState } from "react"
import { ScrollView, Text, View, Modal, Pressable} from "react-native"

import Input from "../Input/Input"
import Button from "../Button/Button"
import { StandardTheme } from "../../Styles/Theme"
import { SimpleCreateForm } from "./styles"

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import TransactionServices from "../../Services/TransactionServices"
import getCurrentDateTime from "../../Utils/generateDate"
import { AuthContext } from "../../Context/UserContext"

const service = new TransactionServices()

const defaultIncomeValue = {title: '', description: '', amount: ''}
const IncomeCreateForm =  ({showModal, setShowModal, afterCreateIncome}) => {
    const { User } = useContext(AuthContext);
    const [income, setIncome] = useState(defaultIncomeValue);

    const createIncome = async () => {
        try {
            const {title, description, amount} = income;
            const body = {
                date: getCurrentDateTime(),
                title,
                description,
                amount,
                type_id: 1
            }
            
            await service.CreateTransaction({body, token: User.token})
            setShowModal(false);
            setIncome(defaultIncomeValue)
            afterCreateIncome();
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

            <ScrollView style={SimpleCreateForm.Container}>

                    <Pressable
                        onPress={() => {
                            setShowModal(false);
                            setIncome(defaultIncomeValue);
                        }}
                        style={SimpleCreateForm.Header}
                    >
                        <AntDesign name="down" size={30} color={StandardTheme.White}/>
                    </Pressable>


                    <View style={SimpleCreateForm.LogoContainer}>
                        <Text style={SimpleCreateForm.textLogo}>Create New <Text style={{color: StandardTheme.Green}}>Income</Text></Text>
                        <Text style={SimpleCreateForm.description}>Fill the form to create your new Transaction {"("}Income{")"}</Text>
                    </View>

                    <View style={SimpleCreateForm.InputsContainer}>
                        <Input 
                            placeholder='Title' 
                            Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => {setIncome({...income, title: e})}}
                            value={income.title}
                        />

                        <Input 
                            placeholder='Description' 
                            Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => {setIncome({...income, description: e})}}
                            value={income.description}
                            multiline={true}
                        />

                        <Input 
                            placeholder='Amount' 
                            Icon={<MaterialIcons name="attach-money" size={20} color={StandardTheme.DarkBlue} />} 
                            type='numeric'
                            onChange={(e) => {setIncome({...income, amount: e})}}
                            value={income.amount}
                        />
                    </View>

                    {       
                        income.title && income.description && income.amount
                            ?
                                <View style={SimpleCreateForm.ButtonContainer}>
                                    <Button color={StandardTheme.Green} text='Create' action={createIncome}/>
                                </View>
                            : 
                                <View style={SimpleCreateForm.ButtonContainer}>
                                    <Button color={StandardTheme.Grey} text='Create' action={() => {}}/>
                                </View>
                    }
            </ScrollView>
            
        </Modal>
    )
}

export default IncomeCreateForm;


