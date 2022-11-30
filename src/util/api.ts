import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://vemser-dbc.dbccompany.com.br:39000/vemser/allocation-back'
})