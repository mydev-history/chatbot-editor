import axios from 'axios';

import { apiUrl } from '../config/url';

export async function getLines() {
  try {
    const response = await axios.get(`${apiUrl}/ai_canvas`, {
      header: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
}

export async function addLine(line) {
  try {
    const response = await axios.post(`${apiUrl}/ai_canvas`, line, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
}

export async function delLine(sPId) {
  try {
    const response = await axios.delete(`${apiUrl}/ai_canvas/${sPId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  }
  catch (error) {
    throw new Error('Something went wrong');
  }
}