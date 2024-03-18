import { ScrollView, Modal, Pressable, View, Text,  } from "react-native"
import { useState } from "react";

import Input from "../Input/Input"
import Button from "../Button/Button";

import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { SimpleCreateForm } from "./styles";
import { StandardTheme } from "../../Styles/Theme";

const CategoryCreateForm = ({showModal, setShowModal, createCategory }) => {
    const [category, setCategory] = useState({name: '', limit: ''});

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
                            onPress={() => setShowModal(false)}
                            style={SimpleCreateForm.Header}
                        >
                            <AntDesign name="down" size={30} color={StandardTheme.White}/>
                        </Pressable>


                        <View style={SimpleCreateForm.LogoContainer}>
                            <Text style={SimpleCreateForm.textLogo}>Create Category</Text>
                            <Text style={SimpleCreateForm.description}>Fill the form to create your new category</Text>
                        </View>

                        <View style={SimpleCreateForm.InputsContainer}>
                            <Input 
                                placeholder='Name' 
                                Icon={<Feather name="file-text" size={15} color={StandardTheme.DarkBlue} />} 
                                type='default'
                                onChange={(e) => {setCategory({...category, name: e})}}
                                value={category.name}
                            />

                            <Input 
                                placeholder='Limit' 
                                Icon={<Octicons name="stop" size={15} color={StandardTheme.DarkBlue}/>} 
                                type='numeric'
                                onChange={(e) => {setCategory({...category, limit: e})}}
                                value={String(category.limit)}
                            />
                        </View>

                        {
                            !category.name || !category.limit
                            ?
                                <View style={SimpleCreateForm.ButtonContainer}>
                                    <Button color={StandardTheme.Grey} text='Create' action={() => {}}/>
                                </View>
                            :
                                <View style={SimpleCreateForm.ButtonContainer}>
                                    <Button color={StandardTheme.Blue} text='Create' action={() => createCategory({category})}/>
                                </View>
                        }
                        
            </ScrollView>
                    
        </Modal>
    )
}


export default CategoryCreateForm