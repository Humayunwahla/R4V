// API_SERVICE.js
import axios from "axios";

const API_BASE_URL = "https://devvetsapimanagement.azure-api.net/ReportingMicroservice/api";

// Function to create axios instance
const createAxiosInstance = (accessToken) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
};

export const getCatalog = async (catalogType, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);  // Pass accessToken as argument
  const endpoint = `/Catalog/GetCatalog`;
  const payload = { catalogType };

  try {
    const response = await axiosInstance.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching catalog:", error);
    throw error;
  }
};

export const createTemplate = async (templateData, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);  // Pass accessToken as argument
  const endpoint = `/Report/CreateTemplate`;

  try {
    const response = await axiosInstance.post(endpoint, templateData);
    return response.data;
  } catch (error) {
    console.error("Error creating template:", error);
    throw error;
  }
};
