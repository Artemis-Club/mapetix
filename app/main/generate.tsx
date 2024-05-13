import React, { useState } from 'react';
import { View, TextInput, Alert, Platform } from 'react-native';
import { Text } from '@/components';
import { Button } from '@/components';
import dayjs from 'dayjs';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { useGeneratePlanMutation } from '@/api/plan';
import { useRouter } from 'expo-router';

const GeneratePlan = () => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');
  const [generatePlan, {}] = useGeneratePlanMutation();

  const onDatePickerOpen = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        minimumDate: new Date(),
        value: date,
        onChange: (_, selectedDate) => {
          setDate(selectedDate || new Date());
        },
      });
    } else {
    }
  };

  const fetchDataAndNavigate = async () => {
    try {
      // Verifica si la fecha es válida y no es anterior al día actual (sin incluirlo)
      setErrorMessage(null);

      if (dayjs(date).isBefore(dayjs(), 'day')) {
        setErrorMessage('Por favor, ponga una fecha actual o a futuro');
        return;
      }

      const response = await generatePlan({
        date: dayjs(date).format('YYYY-MM-DD'),
      });

      console.log(response);
      // Realiza una llamada a la API con la fecha proporcionada por el usuario
      // const response = await fetch(
      //   `https://ejemplo-api.com/endpoint?fecha=${date}`
      // );
      // const data = await response.json();

      // Verifica si la respuesta de la API es válida antes de navegar a la siguiente pantalla
      if (response.data) {
        // Navega a la siguiente pantalla y pasa los datos recibidos de la API como parámetro
        router.push('/main/my-plans');
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
    <View className="flex-1 justify-center items-center bg-neutral-800 px-4">
      <Text bold style={{ color: 'white', marginBottom: 10 }}>
        ¿Para qué dia?
      </Text>
      {Platform.OS === 'android' && (
        <Button onPress={onDatePickerOpen} stylish="outline" block={false}>
          {date.toLocaleDateString()}
        </Button>
      )}
      {Platform.OS === 'ios' && (
        <DateTimePicker
          display="calendar"
          mode="date"
          value={date}
          onChange={(_, date) => setDate(date || new Date())}
        />
      )}

      {errorMessage ? (
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
          {errorMessage}
        </Text>
      ) : null}
      <Button
        onPress={fetchDataAndNavigate}
        stylish="fill"
        className="mx-auto mt-4"
        block={false}
      >
        Generar Plan
      </Button>
    </View>
  );
};

export default GeneratePlan;
