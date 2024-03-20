import { supabase } from './supabase';

async function probarConexion() {
    try {
      const { data, error } = await supabase.from('Plans').select('*');
      if (error) {
        console.error('Error al obtener datos:', error.message);
      } else {
        console.log('Datos obtenidos:', data);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error.message);
    }
  }
  
  probarConexion();