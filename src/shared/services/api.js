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

// export const getAllInfo = ws => {
//   return new Promise((resolve, reject) => {
//     ws.send(JSON.stringify({ event: 'getAllInfo' }));

//     ws.onmessage = event => {
//       // console.log(JSON.parse(event.data));
//       try {
//         const data = JSON.parse(event.data);
//         if (data.event === 'getAllInfoResponse') {
//           // console.log('data.event: ', data.event);
//           resolve(data.payload);
//         } else if (data.event === 'error') {
//           reject(new Error(data.payload));
//         }
//       } catch (error) {
//         reject(new Error('Invalid message format'));
//       }
//     };
//   });
// };

// export const addInfoCard = (data, ws) => {
//   console.log('Sending WebSocket message:', data);
//     // Send the WebSocket message
//     ws.send(JSON.stringify({ event: 'addInfoCard', payload: data }));
// };

// export const editInfoCard = (data, ws) => {
//   ws.send(JSON.stringify({ event: 'editInfoCard', payload: data }));
// };

// export const editNameCard = (data, ws) => {
//   ws.send(JSON.stringify({ event: 'editNameCard', payload: data }));
// };

// export const getInfoCard = (id, ws) => {
//   return new Promise((resolve, reject) => {
//     ws.send(JSON.stringify({ event: 'getInfoCard', payload: id }));

//     ws.on('message', message => {
//       try {
//         const data = JSON.parse(message);
//         if (data.event === 'getInfoCardResponse') {
//           resolve(data.payload);
//         } else if (data.event === 'error') {
//           reject(new Error(data.payload));
//         }
//       } catch (error) {
//         reject(new Error('Invalid message format'));
//       }
//     });
//   });
// };
