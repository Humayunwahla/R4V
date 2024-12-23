import React, { useEffect, useState } from 'react';
import { createTemplate } from '../utils/API_SERVICE';
import { useAuth } from '../Hooks/useAuth';

const Test = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const accessToken = useAuth();

  const query = {
    TemplateName: "Sample2",
    Content: "content 2",
    SpeciesId: 1,
    ModalityTypeId: 2,
    StudyTypeId: "a3f5d5f1-3a89-4c8b-8e91-0b28b6d6d1e3",
    Description: "This is a sample template description for demonstration purposes.",
    IsActive: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken) {
          console.log("Access token available:", accessToken);

          const result = await createTemplate(query, accessToken);
          console.log("Template creation result:", result);

          setData(result);
        } else {
          throw new Error('Access token is missing');
        }
      } catch (fetchError) {
        console.error('Error fetching data:', fetchError);
        setError(fetchError);
      }
    };

    fetchData();
  }, [accessToken]);

  if (error) {
    return <div>Error: {error.message || 'Unknown error occurred'}</div>;
  }

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
};

export default Test;
