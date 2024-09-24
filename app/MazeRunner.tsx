import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const { width, height } = Dimensions.get('window');
const BALL_SIZE = 20; // Tamanho da bolinha
const MAZE_SIZE = 10; // Tamanho da matriz do labirinto
const CELL_SIZE = (Math.min(width, height) - 80) / MAZE_SIZE; // Tamanho das células do labirinto

const mazeLayout = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const EXIT_X = (MAZE_SIZE - 2) * CELL_SIZE; // Ajuste conforme a coordenada da linha de chegada
const EXIT_Y = (MAZE_SIZE - 9) * CELL_SIZE; // Ajuste conforme a coordenada da linha de chegada

const getValidStartPosition = () => {
  for (let row = 0; row < MAZE_SIZE; row++) {
    for (let col = 0; col < MAZE_SIZE; col++) {
      if (mazeLayout[row][col] === 0) { // Célula vazia
        const startX = col * CELL_SIZE;
        const startY = row * CELL_SIZE;
        if (!isColliding(startX, startY)) {
          return { x: startX, y: startY };
        }
      }
    }
  }
  return { x: 0, y: 0 };
};

// Função de colisão
const isColliding = (x: number, y: number) => {
  return mazeLayout.some((row, rowIndex) =>
    row.some((cell, colIndex) => {
      if (cell === 1) {
        const cellX = colIndex * CELL_SIZE;
        const cellY = rowIndex * CELL_SIZE;
        return (
          x < cellX + CELL_SIZE &&
          x + BALL_SIZE > cellX &&
          y < cellY + CELL_SIZE &&
          y + BALL_SIZE > cellY
        );
      }
      return false;
    })
  );
};

const MazeRunner = () => {
  const [ballPosition, setBallPosition] = useState(new Animated.ValueXY(getValidStartPosition()));
  const [start, setStart] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const ballRef = useRef(new Animated.ValueXY(getValidStartPosition())).current;

  useEffect(() => {
    Accelerometer.setUpdateInterval(10);
    const subscription = Accelerometer.addListener(accelerometerData => {
      if (start && !gameOver) {
        const { x, y } = accelerometerData;
        const moveX = x * 20; // Ajuste a sensibilidade
        const moveY = y * 20;

        // Atualiza a posição da bola
        let newX = ballRef.x._value - moveX;
        let newY = ballRef.y._value + moveY;

        // Limita o movimento dentro da área do labirinto
        newX = Math.max(0, Math.min((MAZE_SIZE - 1) * CELL_SIZE - BALL_SIZE, newX));
        newY = Math.max(0, Math.min((MAZE_SIZE - 1) * CELL_SIZE - BALL_SIZE, newY));

        // Verifica colisões com obstáculos
        if (!isColliding(newX, newY)) {
          ballRef.setValue({ x: newX, y: newY });
          setBallPosition(ballRef);

          // Verifica se a bolinha chegou na linha de chegada
          if (newX >= EXIT_X &&
              newX <= EXIT_X + CELL_SIZE &&
              newY >= EXIT_Y &&
              newY <= EXIT_Y + CELL_SIZE) {
            setGameOver(true);
            setStart(false);
          }
        }
      }
    });

    return () => subscription.remove();
  }, [start, gameOver]);

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime]);

  const startGame = () => {
    setStart(true);
    setStartTime(Date.now());
    setGameOver(false);
  };

  const handleReset = () => {
    setStart(false);
    setGameOver(false);
    setBallPosition(new Animated.ValueXY(getValidStartPosition()));
    setElapsedTime(0);
    setStartTime(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Maze Runner</Text>
      {gameOver ? (
        <>
          <View style={styles.winContainer}>
            <Text style={styles.winText}>Você Venceu!</Text>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {start && (
            <>
              <Text style={styles.timer}>Tempo: {elapsedTime}s</Text>
              <View style={styles.mazeContainer}>
                <View style={styles.maze}>
                  {mazeLayout.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      cell === 1 && (
                        <View
                          key={`${rowIndex}-${colIndex}`}
                          style={[styles.obstacle, {
                            left: colIndex * CELL_SIZE,
                            top: rowIndex * CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                          }]}
                        />
                      )
                    ))
                  )}
                  <Animated.View
                    style={[styles.ball, {
                      transform: [
                        { translateX: ballPosition.x },
                        { translateY: ballPosition.y }
                      ]
                    }]}
                  />
                  <View style={styles.finishLine} />
                </View>
              </View>
            </>
          )}
          {!start && !gameOver && (
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>Iniciar Jogo</Text>
            </TouchableOpacity>
          )}
        </>
      )}
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
  timer: {
    fontSize: 18,
    marginBottom: 20,
  },
  startButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 20,
  },
  startButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  mazeContainer: {
    width: MAZE_SIZE * CELL_SIZE,
    height: MAZE_SIZE * CELL_SIZE,
    position: 'relative',
  },
  maze: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    position: 'relative',
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    backgroundColor: '#ff5722',
    borderRadius: BALL_SIZE / 2,
    position: 'absolute',
  },
  obstacle: {
    backgroundColor: '#757575',
    position: 'absolute',
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#FF5722',
    borderRadius: 5,
  },
  resetButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  winContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
  },
  winText: {
    fontSize: 36,
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  finishLine: {
    position: 'absolute',
    top: (MAZE_SIZE - 9) * CELL_SIZE,
    left: (MAZE_SIZE - 2) * CELL_SIZE,
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#4CAF50',
  },
});

export default MazeRunner;
