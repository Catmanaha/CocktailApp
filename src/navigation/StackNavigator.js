import { createStackNavigator } from '@react-navigation/stack';
import Home from '../routes/Home/Home';
import Details from '../routes/Details/Details';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={Home} 
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

export default StackNavigator;
