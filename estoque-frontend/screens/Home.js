import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const navigation = useNavigation();

  // Carregar lista de produtos
  useEffect(() => {
    fetch('http://localhost:3000/api/produtos')
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error(err));
  }, []);

  // Navegar para a tela de criação ou edição de produto
  const handleEdit = (produto) => {
    navigation.navigate('CreateProduct', { ...produto });
  };

  // Excluir produto
  const handleDelete = (id) => {
    navigation.navigate('ConfirmDelete', { id });
  };

  return (
    <View style={styles.root}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('CreateProduct')}
        style={styles.buttonAdd}
      >
        Adicionar Produto
      </Button>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.nome}
            description={`Quantidade: ${item.quantidade}`}
            left={() => <List.Icon icon="folder" />}
            right={() => (
              <View style={styles.buttonGroup}>
                <Button
                  mode="contained"
                  onPress={() => handleEdit(item)}
                  style={styles.buttonEdit}
                >
                  Editar
                </Button>
                <Button
                  mode="contained"
                  onPress={() => handleDelete(item.id)}
                  style={styles.buttonDelete}
                >
                  Excluir
                </Button>
              </View>
            )}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  buttonAdd: {
    marginBottom: 20,
    backgroundColor: '#6200ee',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  buttonEdit: {
    backgroundColor: '#03dac6',
    marginRight: 10,
  },
  buttonDelete: {
    backgroundColor: '#b00020',
  },
});

export default Home;
