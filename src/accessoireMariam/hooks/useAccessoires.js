import { useState, useEffect } from 'react';
import { accessoires } from '../data/accessoires';

const useAccessoires = () => {
  const [accessoiresList, setAccessoiresList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simuler un appel API
    const fetchAccessoires = async () => {
      try {
        // Dans une vraie app, vous feriez un appel API ici
        setTimeout(() => {
          setAccessoiresList(accessoires);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAccessoires();
  }, []);

  return { accessoiresList, loading, error };
};

export default useAccessoires;