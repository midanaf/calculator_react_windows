import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, NativeModules } from 'react-native';

const App = () => {
  const [resultValue, setResultValue] = useState('');
  const [operator, setOperator] = useState('');
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [shouldReset, setShouldReset] = useState(false);

  const handleNumberPress = (num: string) => {
    if (shouldReset) {
      setResultValue(num);
      setShouldReset(false);
    } else {
      setResultValue(prevValue => (prevValue === '0' ? num : prevValue + num));
    }
    if (!operator) {
      setFirstValue(prevValue => prevValue + num);
    } else {
      setSecondValue(prevValue => prevValue + num);
    }
  };

  const handleOperatorPress = (op: string) => {
    if (firstValue !== '' && secondValue !== '') {
      calculate();
    }
    setOperator(op);
    setShouldReset(true);
  };

  const calculate = async () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);
    let result = 0;

    //const { CalculatorModule } = NativeModules;

    //result = Calculator.calculate(num1, num2, operator);
    result = (await NativeModules.CalculatorModule.calculate(num1, num2, operator));
    /*switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      default:
        break;
    }*/

    setResultValue(result.toString());
    setFirstValue(result.toString());
    setSecondValue('');
    setOperator('');
  };

  const handleClearPress = () => {
    setResultValue('0');
    setOperator('');
    setFirstValue('');
    setSecondValue('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{resultValue}</Text>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={() => handleClearPress()}>
          <Text>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleClearPress()}>
          <Text>CE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('')}>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('/')}>
          <Text>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('7')}>
          <Text>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('8')}>
          <Text>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('9')}>
          <Text>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('*')}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('4')}>
          <Text>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('5')}>
          <Text>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('6')}>
          <Text>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('-')}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('1')}>
          <Text>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('2')}>
          <Text>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('3')}>
          <Text>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('+')}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('0')}>
          <Text>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('00')}>
          <Text>00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('.')}>
          <Text>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => calculate()}>
          <Text>=</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  display: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    margin: 5,
    backgroundColor: '#808080',
  },
});

export default App;
