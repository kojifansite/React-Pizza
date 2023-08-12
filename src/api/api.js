import axios from 'axios';

const apiUrl = 'https://63150049fa82b738f7520d84.mockapi.io/';

export default axios.create({
  baseURL: apiUrl,
});
