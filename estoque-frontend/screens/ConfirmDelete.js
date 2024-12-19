import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ConfirmDelete = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation();

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/produtos/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert('Produto excluído com sucesso!');
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert('Erro ao excluir produto');
      });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Tem certeza de que deseja excluir este produto?</Text>
      <View style={styles.buttonGroup}>
        <Button
          mode="contained"
          onPress={handleDelete}
          style={styles.buttonDelete}
        >
          Sim, excluir
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.buttonCancel}
        >
          Cancelar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonDelete: {
    backgroundColor: '#b00020',
    marginRight: 10,
  },
  buttonCancel: {
    backgroundColor: '#6200ee',
  },
});

export default ConfirmDelete;
