import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import TabNavigator from './src/navigation/TabNavigator';
import { loadFavoritesFromStorage } from './src/redux/slices/favoritesSlice';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFavoritesFromStorage());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
