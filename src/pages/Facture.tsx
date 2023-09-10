import React from 'react';
import SearchFacture from '../components/SearchFacture/SearchFacture';
import EnhancedTable from '../components/Table/Table';



const Facture = () => {
  return (
    <>
      <SearchFacture onSearch={function (mois: string, annee: string): void {
        throw new Error('Function not implemented.');
      } } />
    </>
  );
};

export default Facture;
