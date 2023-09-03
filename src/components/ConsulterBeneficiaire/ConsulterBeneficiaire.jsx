import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Cancel as CancelIcon, Terminal } from '@mui/icons-material';
import PrintIcon from '@mui/icons-material/Print';
import jsPDF from 'jspdf';
import Beneficiaires from '../../pages/Beneficiaires';


const ConsulterBeneficiaire = () => {
  const { id } = useParams();
  const [beneficiaire, setBeneficiaire] = useState(null);
  const [terminal,setterminal] = useState(null)
  const handlePrintPDF = async () => {
    const pageWidth = 310; // Largeur
  const pageHeight = 297; 
    const doc = new jsPDF({
      unit: 'mm',
    format: [pageWidth, pageHeight],
    });
    
    doc.text(`A Mr : ${beneficiaire.nom} ${beneficiaire.prenom}`, 50, 10);
    
    doc.text(`Matricule: ${beneficiaire.matricule}`, 50, 20);
    doc.text(`Objet : Telephone Mobile GSM  `, 5, 30);
    
    doc.text(`Nous vous remettons ci-joint un appareil telephnique GSM dont ci-apres les caracterestiques : `, 5, 40);
    doc.text(`Modele Terminal            ${beneficiaire.ligne.terminal.nomTerminal}`, 5, 60);
    doc.text(`Numero d'Imei               ${beneficiaire.ligne.terminal.imei}`, 5, 70);
    doc.text(`Numero d'abonnement  ${beneficiaire.ligne.numLigne}`, 5, 80);
    doc.text(`Nous tenons a vous informer que cet appareil et son abonnement vous sont octoryer dans le cadre de votre `, 5,90);
    doc.text(`fonction.`,5,100);
    doc.text(`Celui-ci etant toujours la prioriete de RMA en cas de changement de fonction ou de depart, vous vous `, 5, 110);
    doc.text(`engager a restituer a la Direction Ressources Humaines & Moyens genereaux contre accuse de reception`, 5, 120);
    doc.text(`l'ensemble du pack. Aussi les frais de son remplacement, en cas de perte, de casse ou de vol, ainsi que sa`, 5, 130);
    doc.text(`reparation en dehors de la garantie, seront a votre charge.`, 5, 140);
    doc.text(`Cordialement`, 5, 150);
    doc.text(`Direction Ressources Humaines & Moyens genereaux`, 30, 170);
    doc.text(`Accuse de reception`, 5, 180);
    doc.text(`Je soussigne reconnais avoir recu de Departement APPROVISIONNEMENT le GSM sumentionne et m'engage a  `, 5, 190);
    doc.text(`respecter`, 5, 200);
    doc.text(`les termes du present document.`, 5, 210);
    doc.text(`Signe`, 5, 220);
    doc.text(`Le .../.../2023`, 5, 230);
    // Ajoutez d'autres détails comme cela
  
    // Sauvegarder le PDF
    doc.save('details_beneficiaire.pdf');
  };

  useEffect(() => {
    fetchBeneficiaire();
  }, []);

  const fetchBeneficiaire = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8089/beneficiaire/${id}`,
      ).then(
        //getTerminal()
      )
      setBeneficiaire(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération du bénéficiaire :', error);
    }
  };

  const getTerminal = async () => {
    console.log(beneficiaire)
    try {
      const response = await axios.get(
        `http://localhost:8089/lignes/${beneficiaire.ligne.id}`,
      )
      setterminal(response.data.terminal);
    } catch (error) {
      console.error('Erreur lors de la récupération du terminal :', error);
    }
  }

  if (!beneficiaire && !terminal) {
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
                  <strong>Numero de ligne:</strong>
                </TableCell>
                <TableCell>{beneficiaire.ligne?.numLigne}</TableCell>
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
                <TableCell>
                  {beneficiaire.rfBeneficiaire.statutBeneficiaire}
                </TableCell>
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
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
          onClick={handlePrintPDF}
        >
          Imprimer en PDF
        </Button>
      </Box>
    </Box>
  );
};

export default ConsulterBeneficiaire;
