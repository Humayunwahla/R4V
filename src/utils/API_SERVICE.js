import axios from "axios";

const API_BASE_URL = "https://devvetsapimanagement.azure-api.net/ReportingMicroservice/api/Report";

const createAxiosInstance = (accessToken) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  console.log("Axios instance headers:", instance.defaults.headers);
  return instance;
};


export const createTemplate = async (templateData, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/CreateTemplate';

  try {
    const response = await axiosInstance.post(endpoint, templateData);
    console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating template:", {
      message: error.message,
      config: error.config,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      } : null,
    });

    throw error;
  }
};
