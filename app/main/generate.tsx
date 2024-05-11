import React, { useState } from 'react';
import { View, TextInput, Alert, Text } from 'react-native';
import { Button } from '@/components';

const GeneratePlan = ({ navigation }) => {
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchDataAndNavigate = async () => {
    try {
      // Verifica si la fecha tiene el formato correcto (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!date.match(dateRegex)) {
        setErrorMessage(
          'Por favor, ingrese en formato "YYYY-MM-DD" con guiones'
        );
        return;
      }

      // Verifica si la fecha es válida y no es anterior al día actual (sin incluirlo)
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Establece la hora del día actual a las 00:00:00
      const inputDate = new Date(date);
      inputDate.setHours(0, 0, 0, 0); // Establece la hora de la fecha ingresada a las 00:00:00
      if (inputDate < currentDate) {
        setErrorMessage('Por favor, ponga una fecha actual o a futuro');
        return;
      }

      // Realiza una llamada a la API con la fecha proporcionada por el usuario
      const response = await fetch(
        `https://ejemplo-api.com/endpoint?fecha=${date}`
      );
      const data = await response.json();

      // Verifica si la respuesta de la API es válida antes de navegar a la siguiente pantalla
      if (response.ok) {
        // Navega a la siguiente pantalla y pasa los datos recibidos de la API como parámetro
        navigation.navigate('Screen2', { responseData: data });
      } else {
        // Muestra una alerta si hay un problema con la respuesta de la API
        Alert.alert(
          'Error',
          'Hubo un problema al generar un plan, pruebe más tarde'
        );
      }
    } catch (error) {
      // Maneja cualquier error de red u otros errores durante la llamada a la API
      console.error('Error fetching data:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al generar un plan, pruebe más tarde'
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#262626',
      }}
    >
      <Text style={{ color: 'white', marginBottom: 10 }}>
        Diga para qué día quiere el plan:
      </Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
          color: 'white',
          textAlign: 'center',
          borderRadius: 10,
        }}
        placeholder="Año-Mes-Día"
        placeholderTextColor="white"
        value={date}
        onChangeText={(text) => {
          setDate(text);
          setErrorMessage('');
        }}
      />
      {errorMessage ? (
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
          {errorMessage}
        </Text>
      ) : null}
      <Button onPress={fetchDataAndNavigate} stylish="outline">
        Generar Plan
      </Button>
    </View>
  );
};

export default GeneratePlan;
