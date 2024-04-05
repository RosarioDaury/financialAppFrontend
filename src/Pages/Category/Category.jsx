import { useContext, useEffect, useState } from "react";
import { Pressable, View, Text, Alert } from "react-native";

import { StandardTheme } from '../../Styles/Theme';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Input from "../../Components/Input/Input";
import useCategories from "../../Hooks/Categories/useCategories";
import CategoryServices from "../../Services/CategoryServices";
import { AuthContext } from "../../Context/UserContext";
import { SwipeListView } from "react-native-swipe-list-view";
import CategoryCard from "../../Components/Cards/CategoryCard/Index";
import { styles } from "./styles";
import DeleteHide from "../../Components/DeleteHide/DeleteHide";
import CategoryCreateForm from "../../Components/Forms/CategoryCreateForm";
import { ActivityIndicator } from "react-native-paper"

const categoryService = new CategoryServices();

export default function Category({navigation}) {
  const { User } = useContext(AuthContext);
  const [filters, setFilters] = useState({page: 1, pageSize: 100, name: ''})
  const [showModal, setShowModal] = useState(false);
  const {Categories,fetchCategories, error } = useCategories({filters});

  useEffect(() => {
    fetchCategories({filters})
  }, [filters]);

  useEffect(() => {
    if(error) {
      Alert.alert(error)
    }
  }, [error])

  const handleCreate = async ({category}) => {
    try{
      await categoryService.createCategory({body: category, token: User.token})
      setFilters({page: 1, pageSize: 100, name: ''});
      fetchCategories({filters})
      setShowModal(false);
    } catch(error) {
      console.log(error)
      Alert.alert('Error while creating Category')
    }
  }

  const handleDelete = async ({id}) => {
    try{
      await categoryService.deleteCategory({id, token: User.token });
      fetchCategories({filters});
    } catch (error) {
      console.log(error)
      Alert.alert('Error while deleting category')
    }
  }

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
            Category
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

      {
        Categories.length > 0
        ?
          <SwipeListView
            data={Categories}
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

        :
            error
            ?
              null
            :
              <ActivityIndicator size='large' style={{marginTop: 50}} color={StandardTheme.Grey}/>
      }
      
      
      <CategoryCreateForm 
        showModal={showModal}
        setShowModal={setShowModal}
        createCategory={handleCreate}
      />
    </View>
  )
}


