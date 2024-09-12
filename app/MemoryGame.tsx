import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

// Imagens dos cartões com caminhos para imagens locais
const cardImages = [
  { id: 1, uri: require('./assets/anime1.jpg') },
  { id: 2, uri: require('./assets/anime2.jpg') },
  { id: 3, uri: require('./assets/anime3.jpg') },
  { id: 4, uri: require('./assets/anime4.jpg') },
  { id: 5, uri: require('./assets/anime5.jpg') },
  { id: 6, uri: require('./assets/anime6.jpg') },
];

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const { width } = Dimensions.get('window');
const cardSize = (width - 40) / 3; // Ajuste o tamanho do cartão para se ajustar à tela

const MemoryGame = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);

  useEffect(() => {
    const cardPairs = [...cardImages, ...cardImages];
    setCards(shuffleArray(cardPairs.map(card => ({ ...card, isFlipped: false, isMatched: false }))));
  }, []);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.id === secondCard.id) {
        setMatchedIndices(prev => [...prev, firstIndex, secondIndex]);
      } else {
        setTimeout(() => {
          setCards(prevCards => prevCards.map((card, index) => 
            index === firstIndex || index === secondIndex
              ? { ...card, isFlipped: false }
              : card
          ));
        }, 1000);
      }
      setFlippedIndices([]);
    }
  }, [flippedIndices]);

  const handleCardPress = (index: number) => {
    if (flippedIndices.length < 2 && !cards[index].isFlipped && !cards[index].isMatched) {
      setCards(prevCards =>
        prevCards.map((card, i) =>
          i === index ? { ...card, isFlipped: true } : card
        )
      );
      setFlippedIndices(prev => [...prev, index]);
    }
  };

  const renderCard = (card: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.card,
        {
          width: cardSize,
          height: cardSize,
          backgroundColor: card.isFlipped || card.isMatched ? 'white' : 'gray',
        }
      ]}
      onPress={() => handleCardPress(index)}
    >
      {card.isFlipped || card.isMatched ? (
        <Image
          source={card.uri}
          style={[styles.cardImage, { width: cardSize, height: cardSize }]}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.cardText}>?</Text>
      )}
    </TouchableOpacity>
  );

  const isGameFinished = cards.every(card => card.isMatched);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isGameFinished ? 'Você Ganhou!' : 'Jogo da Memória'}</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => renderCard(card, index))}
      </View>
      <TouchableOpacity 
        style={styles.restartButton} 
        onPress={() => {
          const cardPairs = [...cardImages, ...cardImages];
          setCards(shuffleArray(cardPairs.map(card => ({ ...card, isFlipped: false, isMatched: false }))));
          setFlippedIndices([]);
          setMatchedIndices([]);
        }}
      >
        <Text style={styles.restartButtonText}>Reiniciar Jogo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    elevation: 3, 
  },
  cardText: {
    fontSize: 36,
    color: '#333',
  },
  cardImage: {
    borderRadius: 8,
  },
  restartButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  restartButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default MemoryGame;
