import React, { useEffect, useState } from 'react';
import { getCatalog } from '../utils/API_SERVICE';
import { useAuth } from '../Hooks/useAuth';

const Test = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const accessToken = useAuth();  // Get the accessToken using the custom hook
// console.log("token", accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken) {  // Ensure accessToken is available before making the request
          console.log("Entered");
          
          const result = await getCatalog(1, accessToken);  // Pass accessToken to getCatalog
          console.log("result", result);
          
          setData(result);
        } else {
          setError(new Error('Access token is missing'));
        }
      } catch (fetchError) {
        console.error('Error fetching catalog:', fetchError);
        setError(fetchError);
      }
    };

    fetchData();
  }, [accessToken]);  // Re-fetch if accessToken changes

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
};

export default Test;
