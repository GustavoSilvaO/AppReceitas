import React, { useEffect, useState } from 'react';
import {View,Text,FlatList,Image,TouchableOpacity,ActivityIndicator,StyleSheet,} from 'react-native';
import axios from 'axios';
import {router} from 'expo-router';

export default function HomeScreen({}) {
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    buscarReceitas();
  }, []);

  async function buscarReceitas() {
    try {
      const resposta = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'
      );

      setReceitas(resposta.data.meals || []);
    } catch (error) {
      setErro('Não foi possível carregar as receitas.');
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (erro) {
    return <Text style={styles.mensagem}>{erro}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Receitas de Frango</Text>

      <FlatList
        data={receitas}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({ 
                pathname: '/detalhes',
                params: {
                    id: item.idMeal,
                },
               })
            }
          >
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.imagem}
            />
            <Text style={styles.nome}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  imagem: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 12,
  },
  mensagem: {
    textAlign: 'center',
    marginTop: 30,
  },
});