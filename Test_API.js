const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MzQ5NTA1NzEsIm5iZiI6MTczNDk1MDI3MSwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9yYWRzNHZldC5iMmNsb2dpbi5jb20vZDE3OThiYmYtYjg1YS00ZDk0LWE1NGEtZDM5OWNlODYyZDQxL3YyLjAvIiwic3ViIjoiNDhmNjVlZjgtOGU5Yi00YjYzLTg5MWEtZjE5ZDVmNWQ2NzE2IiwiYXVkIjoiOWNkNDkyZGMtYmJmYy00ZjE2LWFjOTItMDczZDEzZDkwYzVkIiwibm9uY2UiOiIwMTkzZjMxNy1lMWM5LTdhOWEtODVlOC00NTgyYzMxZGQyMDUiLCJpYXQiOjE3MzQ5NTAyNzEsImF1dGhfdGltZSI6MTczNDk1MDI2OCwib2lkIjoiNDhmNjVlZjgtOGU5Yi00YjYzLTg5MWEtZjE5ZDVmNWQ2NzE2IiwiZmFtaWx5X25hbWUiOiJTdXBlckFkbWluIiwibmFtZSI6IlZpZ2VuIFN1cGVyQWRtaW4iLCJnaXZlbl9uYW1lIjoiVmlnZW4iLCJlbWFpbHMiOlsidmlnYWRtaW5AbWFpbGRyb3AuY2MiXSwidGZwIjoiQjJDXzFfc2lnbnVwc2lnbmluIn0.i-TAZ1OVPplUyv2FY0Og-_N8fNKsvkLHUEotZOVWCjJCx2CggMD9xAEU1bsU-r8IJUiJbgjfCZPi9g6TVGUHLuuN-v7WMHnWr_ezFEZgMwtKWSFie4vy5ABjEx3djiz6UDr6xrA8hO47w7lVJffLGY5nby41G4za6Lrr4_xEnfBUY-UiQPd3ET8eF3vT3bWahH74vumBY5V2mGj5e6K2X_YN5pNYm1MOM68xOUAmLh5wn6kOTUD0-mXtnglGIod359HdMcgQkKHP_ckYqwiQBLBdH9h8uyPhrxS1KQpLPUSWGFSWwCGrHkwXyhYzdCxHS-1AwdI8tFa05ZHQmZDuyw';
const template_data = {
  "TemplateName": "sample_3",
  "Content": "This is a test content for the API.",
  "SpeciesId": 3,
  "ModalityTypeId": 4,
  "StudyTypeId": "123e4567-e89b-12d3-a456-426614174000", // Replace with a valid GUID
  "Description": "This is a sample template description for demonstration purposes.",
  "IsActive": false
};

async function getCatalog(templateData) {
  const url = 'https://devvetsapimanagement.azure-api.net/ReportingMicroservice/api/Report/CreateTemplate';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Accept': '*/*'
      },
      body: JSON.stringify(templateData)
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Response status:', response.status);
      console.error('Response headers:', response.headers);
      console.error('Response body:', errorBody);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Catalog data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching catalog:', error);
    if (error.response) {
      console.error('Response:', await error.response.text());
    }
  }
}

// Example usage
getCatalog(template_data);
