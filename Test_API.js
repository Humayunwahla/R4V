const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MzQ5MzM4OTQsIm5iZiI6MTczNDkzMzU5NCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9yYWRzNHZldC5iMmNsb2dpbi5jb20vZDE3OThiYmYtYjg1YS00ZDk0LWE1NGEtZDM5OWNlODYyZDQxL3YyLjAvIiwic3ViIjoiNDhmNjVlZjgtOGU5Yi00YjYzLTg5MWEtZjE5ZDVmNWQ2NzE2IiwiYXVkIjoiOWNkNDkyZGMtYmJmYy00ZjE2LWFjOTItMDczZDEzZDkwYzVkIiwibm9uY2UiOiIwMTkzZjIxNy1hMmM0LTdiZDItODBmOS0wYTJiZjg4YjQ2N2EiLCJpYXQiOjE3MzQ5MzM1OTQsImF1dGhfdGltZSI6MTczNDkzMzU4Nywib2lkIjoiNDhmNjVlZjgtOGU5Yi00YjYzLTg5MWEtZjE5ZDVmNWQ2NzE2IiwiZmFtaWx5X25hbWUiOiJTdXBlckFkbWluIiwibmFtZSI6IlZpZ2VuIFN1cGVyQWRtaW4iLCJnaXZlbl9uYW1lIjoiVmlnZW4iLCJlbWFpbHMiOlsidmlnYWRtaW5AbWFpbGRyb3AuY2MiXSwidGZwIjoiQjJDXzFfc2lnbnVwc2lnbmluIn0.B65RvYZ4i71crjm1YbJMvUZOQlNyll8mtFNQnFMikKWzRHCB4Mupu_ohGlYMg5bHhwVuarcKlQh9wc0jQaacshq2mwAsqsVPwAkjyHTquPoGO0kpPOIMYDIVnkJ_wf9K0ObjcKLfsNBfpkOaNo7gxAhYdVF4HPz9XaWIJebaSQk4ZLdeN5HX_1HmxJApettV_5GoOL910REHLzMKJ2vs1VFCNODePsXNDEfW9pwxtJfYTHk8JXW-Au9Ti416K9_iK2e7vS9721dCBAvu57XL74ZyC310qLmNbbP8iYmsb-HkFg8URlQKL0VFvuO6EhnVguH72LLHlBbRICK1tkKE_w';

async function getCatalog(catalogType) {
  const url = 'https://devvetsapimanagement.azure-api.net/ReportingMicroservice/api/Catalog/GetCatalog';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Accept': '*/*'
      },
      body: JSON.stringify({ catalogType: catalogType })
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
getCatalog(1);