import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default function DetScreen({ id }) {
  const [receita, setReceita] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarDetalhes() {
      try {
        const resposta = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        setReceita(resposta.data.meals?.[0] || null);
      } catch (error) {
        setErro('Erro ao carregar a receita.');
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      buscarDetalhes();
    } else {
      setErro('Receita não identificada.');
      setCarregando(false);
    }
  }, [id]);

  if (carregando) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (erro || !receita) {
    return (
      <View style={styles.container}>
        <Text>{erro || 'Receita não encontrada.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{receita.strMeal}</Text>

      <Image
        source={{ uri: receita.strMealThumb }}
        style={styles.imagem}
      />

      <Text style={styles.subtitulo}>Categoria:</Text>
      <Text style={styles.texto}>{receita.strCategory}</Text>

      <Text style={styles.subtitulo}>Instruções:</Text>
      <Text style={styles.texto}>{receita.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagem: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    lineHeight: 24,
  },
});