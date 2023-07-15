import axios from 'axios';

import { apiUrl } from '../config/url';

export async function getSteps() {
  try {
    const response = await axios.get(`${apiUrl}/ai_step`);
    return response.data;
  }
  catch (error) {
    throw new Error('Something went wrong');
  }
}

export async function addStep(step) {
  try {
    const response = await axios.post(`${apiUrl}/ai_step`, step, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
}

export async function editStep(step) {
  try {
    const response = await axios.put(`${apiUrl}/ai_step/${step._id}`, step, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
}

export async function delStep(id) {
  try {
    const response = await axios.delete(`${apiUrl}/ai_step/${id}`, {
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
