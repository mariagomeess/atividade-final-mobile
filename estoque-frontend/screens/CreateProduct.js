import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera'; // Corrigido para expo-camera

const CreateProduct = ({ navigation, route }) => {
  // Função para obter os dados existentes (em caso de edição)
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case 'nome':
          return route.params.nome;
        case 'descricao':
          return route.params.descricao;
        case 'quantidade':
          return route.params.quantidade;
        case 'foto':
          return route.params.foto;
      }
    }
    return '';
  };

  // Estados para os campos do produto
  const [nome, setNome] = useState(getDetails('nome'));
  const [descricao, setDescricao] = useState(getDetails('descricao'));
  const [quantidade, setQuantidade] = useState(getDetails('quantidade'));
  const [foto, setFoto] = useState(getDetails('foto'));
  const [modal, setModal] = useState(false);

  // Submeter dados para criar um novo produto
  const submitData = () => {
    fetch('http://localhost:3000/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        descricao,
        quantidade,
        foto,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.nome} foi cadastrado com sucesso!`);
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert('Algo deu errado: ' + err);
      });
  };

  // Função para escolher imagem da galeria
  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(); // Alterado para a nova API
    if (status === 'granted') {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) { // Corrigido para 'cancelled'
        setFoto(data.assets[0].uri);
        setModal(false);
      }
    } else {
      Alert.alert('Você precisa conceder permissão para acessar a galeria');
    }
  };

  // Função para tirar foto com a câmera
  const pickFromCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync(); // Alterado para a nova API
    if (status === 'granted') {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) { // Corrigido para 'cancelled'
        setFoto(data.assets[0].uri);
        setModal(false);
      }
    } else {
      Alert.alert('Você precisa conceder permissão para acessar a câmera');
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" style={styles.root}>
      <View>
        <TextInput
          label="Nome do Produto"
          style={styles.inputStyle}
          value={nome}
          mode="outlined"
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          label="Descrição"
          style={styles.inputStyle}
          value={descricao}
          mode="outlined"
          onChangeText={(text) => setDescricao(text)}
        />
        <TextInput
          label="Quantidade"
          style={styles.inputStyle}
          value={quantidade}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(text) => setQuantidade(text)}
        />

        <Button
          style={styles.inputStyle}
          icon={foto === '' ? 'upload' : 'check'}
          mode="contained"
          onPress={() => setModal(true)}
        >
          {foto === '' ? 'Upload de Imagem' : 'Imagem Selecionada'}
        </Button>

        <Button
          style={styles.inputStyle}
          icon="content-save"
          mode="contained"
          onPress={() => submitData()}
        >
          Salvar Produto
        </Button>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button icon="camera" mode="contained" onPress={pickFromCamera}>
                Câmera
              </Button>
              <Button icon="image" mode="contained" onPress={pickFromGallery}>
                Galeria
              </Button>
            </View>
            <Button onPress={() => setModal(false)}>Cancelar</Button>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  inputStyle: {
    marginBottom: 10,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default CreateProduct;
