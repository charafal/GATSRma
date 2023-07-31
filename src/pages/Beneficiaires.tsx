import React from 'react';
import EnhancedTable from '../components/Table/Table';
import SearchQuittancesForm from '../components/SearchQuittancesForm/SearchBeneficaireForm';

const Beneficiaires = () => {
  return (
    <>
      <SearchQuittancesForm />
      <EnhancedTable />
    </>
  );
};

export default Beneficiaires;
