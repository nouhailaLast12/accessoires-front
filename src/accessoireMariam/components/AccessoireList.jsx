import React, { useEffect, useState } from 'react';
import AccessoireCard from './AccessoireCard';
import '../styles/AccessoireList.css';

const AccessoireList = () => {
  const [accessoires, setAccessoires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simuler récupération données (remplace par ton API si besoin)
    const data = [
      {
        id: '1',
        nom: 'Sac à main',
        image: 'images/accessoires2.jpg',
        prix: 49.99,
        ancienPrix: 59.99,
        rating: 4,
        reviews: 12,
        description: 'Un sac à main élégant et pratique.',
        nouveau: true,
        solde: 15
      },
      {
        id: '2',
        nom: 'Lunettes de soleil',
        image: 'images/accessoires2.jpg',
        prix: 29.99,
        rating: 5,
        reviews: 8,
        description: 'Protection UV garantie.',
        nouveau: false,
        solde: 0
      },
      {
        id: '3',
        nom: 'Ceinture cuir',
        image: 'images/accessoires2.jpg',
        prix: 19.99,
        rating: 3,
        reviews: 5,
        description: 'Ceinture en cuir véritable.',
        nouveau: false,
        solde: 0
      },
      // ajoute plus d’accessoires si tu veux
    ];

    setTimeout(() => {
      setAccessoires(data);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Chargement des accessoires...</div>;
  if (error) return <div>{error}</div>;
  if (accessoires.length === 0) return <div>Aucun accessoire disponible.</div>;

  return (
    <div className="accessoire-list-horizontal" aria-label="Liste des accessoires">
      {accessoires.map(accessoire => (
        <AccessoireCard
          key={accessoire.id}
          accessoire={accessoire}
          layout="horizontal"
        />
      ))}
    </div>
  );
};

export default AccessoireList;
