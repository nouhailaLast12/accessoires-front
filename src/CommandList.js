import React from 'react';
import styled from 'styled-components';

const CommandeList = () => {
  const commandes = [
    { id: 1, plat: 'Pizza Margherita', statut: 'Prêt', date: '2025-02-14' },
    { id: 2, plat: 'Pâtes Carbonara', statut: 'En préparation', date: '2025-02-14' },
    { id: 3, plat: 'Burger Classique', statut: 'Servi', date: '2025-02-14' },
  ];

  // Fonction pour déterminer les couleurs en fonction du statut
  const getStatusColor = (statut) => {
    switch (statut) {
      case 'Prêt':
        return '#FF69B4'; // Vert
      case 'En préparation':
        return '#FF91A4'; // Jaune
      case 'Servi':
        return '#FFC0CB'; // Bleu
      default:
        return '#f8f9fa'; // Gris clair par défaut
    }
  };

  const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
  `;

  const TableRow = styled.tr`
    background-color: ${(props) => getStatusColor(props.statut)};
    color: ${(props) => (props.statut === 'En préparation' ? 'black' : 'white')};
    &:hover {
      background-color: #ddd;
    }
  `;

  const TableCell = styled.td`
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  `;

  const ActionButton = styled.button`
    margin: 0 10px;
    background-color: ${(props) => (props.delete ? '#FF4136' : '#007BFF')};
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => (props.delete ? '#d9534f' : '#0056b3')};
    }
  `;

  const handleModifier = (id) => {
    alert(`Modifier la commande ${id}`);
  };

  const handleSupprimer = (id) => {
    alert(`Supprimer la commande ${id}`);
  };

  return (
    <div className="table-container">
      <h1>FoodXpress - Liste des Commandes</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Plat</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <TableRow key={commande.id} statut={commande.statut}>
              <TableCell>{`#${commande.id}`}</TableCell>
              <TableCell>{commande.plat}</TableCell>
              <TableCell>{commande.statut}</TableCell>
              <TableCell>{commande.date}</TableCell>
              <TableCell>
                <ActionButton onClick={() => handleModifier(commande.id)}>Modifier</ActionButton>
                <ActionButton onClick={() => handleSupprimer(commande.id)} delete>
                  Supprimer
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CommandeList;
