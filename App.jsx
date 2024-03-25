import {View,Text,SafeAreaView,StyleSheet,StatusBar,TouchableOpacity,Image,} from 'react-native';
import {useState} from 'react';
import {COLORS} from './src/util/constant';
import {choices} from './src/data/mockData';

const App = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const handleUserChoice = userChoice => {
    setUserChoice(userChoice);
    randomComputerChoice(userChoice);
  };

  const randomComputerChoice = userChoice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[randomIndex];
    setComputerChoice(computerChoice);
    determineWinner(userChoice, computerChoice);
    console.log('Computer Choice:', computerChoice);
    console.log('User Choice:', userChoice);
  };

  const determineWinner = (user, computer) => {
    if (user.name === computer.name) {
      setResult('Berabere!!');
    } else if (
      (user?.name === 'Taş' && computer?.name === 'Makas') ||
      (user?.name === 'Kağıt' && computer?.name === 'Taş') ||
      (user?.name === 'Makas' && computer?.name === 'Kağıt')
    ) {
      setResult('Kazandın!!');
    } else {
      setResult('Kaybettin!!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Text style={styles.title}>TAŞ KAĞIT MAKAS</Text>
        <Text style={styles.choiceText}>Kullanıcının Seçimi:</Text>
        <View style={styles.choices}>
          {choices?.map(choice => (
            <TouchableOpacity
              key={`${choice.id}-choice`}
              style={
                choice?.name === userChoice?.name
                  ? [styles.button, styles.activeButton]
                  : styles.button
              }
              onPress={() => handleUserChoice(choice)}>
              <Image source={choice.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.resultText}>{result}</Text>

        {computerChoice && (
          <>
            <Text style={styles.choiceText}>Bilgisayarın Seçimi:</Text>
            <View style={styles.button}>
              <Image source={computerChoice?.image} style={styles.image} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
  },
  choiceText: {
    marginVertical: 20,
    fontSize: 20,
    color: COLORS.white,
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  image: {
    width: 90,
    height: 90,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.white,
  },
  activeButton: {
    borderWidth: 4,
    borderColor: 'red',
  },
});
