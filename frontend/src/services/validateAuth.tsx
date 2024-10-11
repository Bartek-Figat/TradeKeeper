import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const validateToken = async (token: string) => {
  try {
    const { data } = await axios.post(`${API_URL}/validate-token`, { token });
    return data;
  } catch (error) {
    console.error("Token validation error:");
  }
};
