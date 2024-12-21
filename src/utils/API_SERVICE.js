import axios from "axios";

const API_BASE_URL = "https://devvetsapimanagement.azure-api.net/ReportingMicroservice/api";

const createAxiosInstance = (accessToken) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`, // Corrected
    },
  });
};

export const getCatalog = async (catalogType, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/Catalog/GetCatalog'; // Corrected

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
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/Report/CreateTemplate'; // Corrected

  try {
    const response = await axiosInstance.post(endpoint, templateData);
    return response.data;
  } catch (error) {
    console.error("Error creating template:", error);
    throw error;
  }
};
