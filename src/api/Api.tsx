import axios from 'axios';
import { pairUrl } from '../config/config';
import auth from '@react-native-firebase/auth';

export const pairScooter = async (data: any): Promise<any> => {
  return axios
    .get(`${pairUrl}?apiKey=${auth().currentUser?.uid}`, { data: data })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
