import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import Favorites from '../routes/Favorites/Favorites';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="HomeTab" component={StackNavigator} options={{ title: 'Home' }} />
    <Tab.Screen name="Favorites" component={Favorites} />
  </Tab.Navigator>
);

export default TabNavigator;
