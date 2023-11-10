import axios from 'axios';
import { BASE_URL } from '../constants/constants';

axios.defaults.baseURL = BASE_URL;

export const getALL = async () => {
  try {
    const { data } = await axios.get('/info');
    //console.log('GET ALL data: ', data);
    return data;
  } catch (error) {
    throw new Error('Oops, there is no info');
  }
};

export const addInfoCard = data => {
  return axios.post('/add', data);
};

export const editInfoCard = data => {
  return axios.patch(`/edit/${data.id}`, {
    name: data.name,
    orgname: data.orgname,
    datecreate: data.datecreate
  });
};

export const editNameCard = data => {
  return axios.patch(`/edit/${data.id}`, {
    name: data.name
  });
};

export const getInfoCard = async id => {
  try {
    const { data } = await axios.get(`/info/${id}`);
    //console.log('GET ALL data: ', data);
    return data;
  } catch (error) {
    throw new Error('Oops, there is no info');
  }
};
