// const createTemplate = async () => {
//     const url = "https://devvetsapimanagement.azure-api.net/ReportingMicroservice/api/Report/CreateTemplate";
    
    const axios = require("axios");
    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MzQ2MDYzNjgsIm5iZiI6MTczNDYwNjA2OCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9yYWRzNHZldC5iMmNsb2dpbi5jb20vZDE3OThiYmYtYjg1YS00ZDk0LWE1NGEtZDM5OWNlODYyZDQxL3YyLjAvIiwic3ViIjoiNDhmNjVlZjgtOGU5Yi00YjYzLTg5MWEtZjE5ZDVmNWQ2NzE2IiwiYXVkIjoiOWNkNDkyZGMtYmJmYy00ZjE2LWFjOTItMDczZDEzZDkwYzVkIiwibm9uY2UiOiIwMTkzZGU5My04MzgwLTcyODMtYWE1MC00ZTE1ZGI5ODVlZDAiLCJpYXQiOjE3MzQ2MDYwNjgsImF1dGhfdGltZSI6MTczNDYwNjA2NSwib2lkIjoiNDhmNjVlZjgtOGU5Yi00YjYzLTg5MWEtZjE5ZDVmNWQ2NzE2IiwiZmFtaWx5X25hbWUiOiJTdXBlckFkbWluIiwibmFtZSI6IlZpZ2VuIFN1cGVyQWRtaW4iLCJnaXZlbl9uYW1lIjoiVmlnZW4iLCJlbWFpbHMiOlsidmlnYWRtaW5AbWFpbGRyb3AuY2MiXSwidGZwIjoiQjJDXzFfc2lnbnVwc2lnbmluIn0.Taf2eJb5agem_wwbb4Mr0WVu-TUtXxGfDf2R4ceSEGuLkyLqCS066vd1Cd4vNL8tDXip_bwAtMfU0sTBVvTIlo0t0dTksUj1jgu0eOQJtIs3dTnCkrio_8fPWaOIJpaXcX12-zkk1MdHI-Ja4YHJFfQWilEI6Wa6uaIxD7YrODZfmj5K2GyCVQgKaOIPy0fC0nrHQD_w1kNmJMYIqs7qtZPqJcJEkihh2RUPCUe_dC1Js36hjn50FHm2Fjx1DfF0C5mt6_96FaC64r4xiCdE6uzdgk8dliyiKO7G50cuQPvCbNSwyDceyUHPeYmgwz0ZvS4AetonUrP4OnRx0t5akQ"; // Replace this with your actual token
    
const createTemplate = async () => {
  const url = "https://devvetsapimanagement.azure-api.net/ReportingMicroservice/api/Report/CreateTemplate";
//   const token = "YOUR_ACCESS_TOKEN"; // Replace with your actual token

  const body = {
    TemplateName: "Sample2",
    Content: "content 2",
    SpeciesId: 1,
    ModalityTypeId: 2,
    StudyTypeId: "a3f5d5f1-3a89-4c8b-8e91-0b28b6d6d1e3",
    Description: "This is a sample template description for demonstration purposes.",
    IsActive: true,
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Template Created:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Data:", error.response.data);
    } else {
      console.error("Error creating template:", error.message);
    }
  }
};

// Call the function
createTemplate()
