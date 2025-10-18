import React from 'react';
import { useParams } from 'react-router-dom';
import { accessoires } from '../data/accessoires';
import '../styles/AccessoireMariam.css';

const DetailAccessoireMariam = () => {
  const { id } = useParams();
  const accessoire = accessoires.find(item => item.id === parseInt(id));

  if (!accessoire) {
    return <div>Accessoire non trouvé</div>;
  }

  return (
    <div className="accessoire-detail">
      <img src={accessoire.image} alt={accessoire.nom} />
      <h2>{accessoire.nom}</h2>
      <p className="price">{accessoire.prix} €</p>
      <p className="description">{accessoire.description}</p>
      <p>{accessoire.enStock ? 'En stock' : 'Rupture de stock'}</p>
    </div>
  );
};

export default DetailAccessoireMariam;