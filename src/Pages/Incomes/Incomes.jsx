import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, View, Text, Modal, Alert } from "react-native";

import { StandardTheme } from '../../Styles/Theme';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import Input from "../../Common/Input/Input";
import Button from "../../Common/Button/Button";
import { AuthContext } from "../../Context/UserContext";
import { SwipeListView } from "react-native-swipe-list-view";
import { styles, modalStyles } from "./styles";



export default function Category({navigation}) {
    const { User, IsAuth, setUser, logOut, setUserFromToken } = useContext(AuthContext);
    const [filters, setFilters] = useState({page: 1, pageSize: 100, name: ''})
    const [showModal, setShowModal] = useState(false);
    const [newIncome, setNewIncome] = useState({name: '', limit: 0});


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
            Transactions {'('}Incomes{')'}
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
        {/* {
        Categories
        ?
            <SwipeListView
            data={Categories ? Categories : []}
            renderItem={ (data, rowMap) => (
                <CategoryCard data={data.item}/>
            )}
            renderHiddenItem={ (data, rowMap) => (
                <DeleteHide data={data.item} handleDelete={handleDelete}/>
            )}
            rightOpenValue={-85}
            style={{
                marginTop: 20
            }}
            />

        : null
      } */}

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
                        <Text style={modalStyles.textLogo}>Create Category</Text>
                        <Text style={modalStyles.description}>Fill the form to create your new category</Text>
                    </View>

                    <View style={modalStyles.InputsContainer}>
                        <Input 
                            placeholder='Name' 
                            Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                            type='default'
                            onChange={(e) => {setNewCategory({...newCategory, name: e})}}
                            value={newCategory.name}
                        />

                        <Input 
                            placeholder='Limit' 
                            Icon={<Octicons name="stop" size={15} color={StandardTheme.DarkBlue}/>} 
                            type='numeric'
                            onChange={(e) => {setNewCategory({...newCategory, limit: e})}}
                            value={newCategory.limit}
                        />
                    </View>

                    <View style={modalStyles.ButtonContainer}>
                        <Button color={StandardTheme.Blue} text='Create' action={handleCreate}/>
                    </View>
        </ScrollView>
                
        </Modal>
    </View>
)
}


