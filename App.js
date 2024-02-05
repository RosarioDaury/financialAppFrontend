import { AuthProvider } from './src/Context/UserContext';
import Home from './src/Pages/Home/Home';
import Landing from './src/Pages/Lading/Landing';
import Login from './src/Pages/Login/Login';
import SignUp from './src/Pages/SignUp/SignUp';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

