import { AuthProvider } from './src/Context/UserContext';
import Home from './src/Pages/Home/Home';
import Landing from './src/Pages/Lading/Landing';
import Login from './src/Pages/Login/Login';
import SignUp from './src/Pages/SignUp/SignUp';
import Profile from './src/Pages/Profile/Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Category from './src/Pages/Category/Category';
import Incomes from './src/Pages/Incomes/Incomes';
import Expenses from './src/Pages/Expenses/Expenses';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Reminders from './src/Pages/Reminders/Reminder';

const Stack = createNativeStackNavigator();

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

          <Stack.Screen
            name="Incomes"
            component={Incomes}
          />

          <Stack.Screen
            name="Expenses"
            component={Expenses}
          />

          <Stack.Screen
            name="Reminders"
            component={Reminders}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

