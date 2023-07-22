import axios from "axios";
import { apiUrl } from "../config/url";

export async function addVariable(variable) {
  try {
    const response = await axios.post(`${apiUrl}/ai_variable`, variable, {
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

export async function getAllVariables() {
  const response = await axios.get(`${apiUrl}/ai_variable`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.data;
}

export async function delVariable(id) {
  const response = await axios.delete(`${apiUrl}/ai_variable/${id}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.data;
}