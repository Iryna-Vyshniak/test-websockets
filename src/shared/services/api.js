import axios from 'axios';
import { BASE_URL } from '../constants/constants';

axios.defaults.baseURL = BASE_URL;

export const getAllInfo = async () => {
  try {
    const { data } = await axios.get('/info');
    return data;
  } catch (error) {
    throw new Error('Oops, there is no info');
  }
};

export const addInfoCard = data => {
  return axios.post('/info/add', data);
};

export const editInfoCard = data => {
  return axios.patch(`/info/edit/${data.id}`, {
    name: data.name,
    orgname: data.orgname,
    datecreate: data.datecreate
  });
};

export const editNameCard = data => {
  return axios.patch(`/info/edit/${data.id}`, {
    name: data.name
  });
};

export const getInfoById = async id => {
  try {
    const { data } = await axios.get(`/info/${id}`);
    return data;
  } catch (error) {
    throw new Error('Oops, there is no info');
  }
};
