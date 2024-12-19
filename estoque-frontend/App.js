import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './screens/Home';
import CreateProduct from './screens/CreateProduct';
import ConfirmDelete from './screens/ConfirmDelete';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';

const store = createStore(reducer);

const Stack = createStackNavigator();

const myOptions = {
  title: 'App de Estoque de Produtos',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#006aff',
  },
};

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={myOptions} />
      <Stack.Screen
        name="Create"
        component={CreateProduct}
        options={{ ...myOptions, title: 'Produto' }}
      />
      <Stack.Screen
        name="ConfirmDelete"
        component={ConfirmDelete}
        options={{ ...myOptions, title: 'Confirmar exclusão' }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0', // Isso ainda pode ser utilizado, se necessário, para algum View adicional
  },
});
