import axios from "axios";

const API_BASE_URL = "https://devvetsapimanagement.azure-api.net/ReportingMicroservice/api";

// Create an Axios instance with the access token
const createAxiosInstance = (accessToken) => {
  if (!accessToken) {
    throw new Error("Access token is required to create an Axios instance.");
  }

  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  // console.log("Axios instance headers:", instance.defaults.headers);
  return instance;
};

// Get Catalog
export const getCatalog = async (catalogType, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/Catalog/GetCatalog';

  try {
    const response = await axiosInstance.post(endpoint, catalogType);
    console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching catalog:", {
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

// Create Template
export const createTemplate = async (templateData, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/Report/CreateTemplate';
  // console.log("Template Data:", templateData);
  // console.log("Access Token from api service:", accessToken);
  

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

// Check if Template Exists
export const isTemplateExists = async (templateName, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/Report/IsTemplateExists';

  try {
    const response = await axiosInstance.post(endpoint, { TemplateName: templateName });
    console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking template existence:", {
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

// Get Template
export const getTemplate = async (templateId, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/Report/GetTemplates';

  try {
    const response = await axiosInstance.post(endpoint, templateId);
    console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching template:", {
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

// Delete Template
export const deleteTemplate = async (templateId, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/DeleteTemplate';

  try {
    const response = await axiosInstance.post(endpoint, { TemplateId: templateId });
    console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting template:", {
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

// Create Macro
export const createMacro = async (macroData, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/CreateMacro';

  try {
    const response = await axiosInstance.post(endpoint, macroData);
    console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating macro:", {
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

// Check if Macro Exists
export const isMacroExists = async (macroName, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/IsMacroExists';

  try {
    const response = await axiosInstance.post(endpoint, { MacroName: macroName });
    console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking macro existence:", {
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

// Get Macro
export const getMacro = async (macroName, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/GetMacros';

  try {
    const response = await axiosInstance.post(endpoint, { MacroName: macroName });
    console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching macro:", {
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

// Delete Macro
export const deleteMacro = async (macroId, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/DeleteMacro';

  try {
    const response = await axiosInstance.post(endpoint, { MacroId: macroId });
    console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting macro:", {
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

// Convert HTML to PDF
export const convertHtmlToPdf = async (file, accessToken) => {
  const axiosInstance = createAxiosInstance(accessToken);
  const endpoint = '/ConvertHtmlToPdf';

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axiosInstance.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("API Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error converting HTML to PDF:", {
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
