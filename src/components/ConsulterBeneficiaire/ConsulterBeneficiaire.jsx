import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Cancel as CancelIcon } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';

const ConsulterBeneficiaire = () => {
  const { id } = useParams();
  const [beneficiaire, setBeneficiaire] = useState(null);

  useEffect(() => {
    fetchBeneficiaire();
  }, []);

  const fetchBeneficiaire = async () => {
    try {
      const response = await axios.get(`http://localhost:8089/beneficiaire/${id}`);
      setBeneficiaire(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération du bénéficiaire :', error);
    }
  };

  if (!beneficiaire) {
    return <div>Chargement...</div>;
  }

  return (
    <Box sx={{ width: '95%', marginX: '2%' }}>
      <Paper sx={{ width: '100%', mb: 2, padding: '1%' }}>
        <h1>Consultation du bénéficiaire</h1>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <strong>Nom:</strong>
                </TableCell>
                <TableCell>{beneficiaire.nom}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Prénom:</strong>
                </TableCell>
                <TableCell>{beneficiaire.prenom}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Matricule:</strong>
                </TableCell>
                <TableCell>{beneficiaire.matricule}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Date de départ:</strong>
                </TableCell>
                <TableCell>{beneficiaire.dateDepart}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Direction:</strong>
                </TableCell>
                <TableCell>{beneficiaire.rfDirection.nomDirection}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Statut bénéficiaire:</strong>
                </TableCell>
                <TableCell>{beneficiaire.rfBeneficiaire.statutBeneficiaire}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>Centre de Coût:</strong>
                </TableCell>
                <TableCell>{beneficiaire.centreCout.centreCout}</TableCell>
              </TableRow>
              {/* Rest of the table rows */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="contained"
          startIcon={<CancelIcon />}
          component={Link}
          to={`/beneficiaires`}
          sx={{ marginRight: '100px' }}
        >
          Annuler
        </Button>

        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={() => window.print()}
        >
          Imprimer en PDF
        </Button>
      </Box>
    </Box>
  );
};

export default ConsulterBeneficiaire;
