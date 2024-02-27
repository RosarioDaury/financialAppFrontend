import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './src/Context/UserContext';
import Home from './src/Pages/Home/Home';
import Landing from './src/Pages/Lading/Landing';
import Login from './src/Pages/Login/Login';
import SignUp from './src/Pages/SignUp/SignUp';
import Profile from './src/Pages/Profile/Profile';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CarouselExample from './src/Pages/Category/Category';
import Category from './src/Pages/Category/Category';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
          />
          
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Landing"
            component={Landing}
          />
          
          <Stack.Screen
            name="Signup"
            component={SignUp}
          />

          <Stack.Screen
            name="Profile"
            component={Profile}
          />

          <Stack.Screen
            name="Category"
            component={Category}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

