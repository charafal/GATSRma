import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material';
import RenderText from '../../utils/RenderText';
import ApiContext from '../../context/ApiContext';
import { IBeneficiare } from '../../context/types';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const StyledTypography = styled(Typography)({
  color: '#1d2442',
  fontSize: '25px',
  fontWeight: 500,
});

interface HeadCell {
  disablePadding: boolean;
  id: keyof IBeneficiare;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'nom',
    numeric: true,
    disablePadding: true,
    label: 'Nom',
  },
  {
    id: 'prenom',
    numeric: false,
    disablePadding: false,
    label: 'Prénom',
  },
  {
    id: 'matricule',
    numeric: false,
    disablePadding: false,
    label: 'Matricule',
  },
  // {
  //   id: "lignes",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "NumLigne",
  // },
  {
    id: 'direction',
    numeric: false,
    disablePadding: false,
    label: 'Direction',
  },
  {
    id: 'centreCout',
    numeric: false,
    disablePadding: false,
    label: 'Centre de Cout',
  },
  {
    id: 'statut',
    numeric: false,
    disablePadding: false,
    label: 'Statut bénéficaire',
  },
  {
    id: 'ligne',
    numeric: true,
    disablePadding: false,
    label: 'NumLigne',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];

function EnhancedTableHead() {
  return (
    <TableHead sx={{ paddingLeft: '20px' }}>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <b>{headCell.label}</b>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar>
      <StyledTypography
        sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
        variant="h6"
        id="tableTitle"
      >
        <RenderText value="Résultats de recherche" />
      </StyledTypography>

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

const BeneficiaireTable = () => {
  const [dense, setDense] = useState(true);
  const { beneficaires } = React.useContext(ApiContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [beneficiairesPerPage] = useState(5);

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const pageCount = beneficaires
    ? Math.ceil(beneficaires.length / beneficiairesPerPage)
    : 0;

  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
  const [lignes, setLignes] = useState([]);

  useEffect(() => {
    // Récupérer les données des lignes depuis l'API
    axios
      .get('http://localhost:8089/lignes/ligne')
      .then((response) => setLignes(response.data))
      .catch((error) =>
        console.error('Erreur lors de la récupération des lignes :', error),
      );
  }, []);
  

  return (
    <Box sx={{ width: '95%', marginX: '2%' }}>
      <EnhancedTableToolbar />
      <Paper
        sx={{
          width: '100%',
          mb: 2,
          border: '1px solid rgba(0, 0, 0, .1)',
          paddingLeft: '10px',
        }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead />
            <TableBody>
              {beneficaires &&
                beneficaires
                  .slice(
                    (currentPage - 1) * beneficiairesPerPage,
                    currentPage * beneficiairesPerPage,
                  )
                  .map((b: any, index) => {
                    return (
                      <TableRow hover key={b.id}>
                        <TableCell key={b.nom}>{b.nom}</TableCell>
                        <TableCell key={b.prenom}>{b.prenom}</TableCell>
                        <TableCell key={b.matricule}>{b.matricule}</TableCell>
                        <TableCell key={b.rfDirection.nomDirection}>
                          {b.rfDirection.nomDirection}
                        </TableCell>
                        <TableCell>
      {b?.centreCout?.centreCout ?? 'N/A'}
    </TableCell>
                        <TableCell key={b.rfBeneficiaire.statutBeneficiaire}>
                          {b.rfBeneficiaire.statutBeneficiaire}
                        </TableCell>
                        <TableCell >
                          
                        </TableCell>

                        <TableCell key={b.actions}>
                          <Tooltip title="Modifier">
                            <IconButton
                              color="primary"
                              aria-label="modifier"
                              component={Link}
                              to={`/modifierBeneficiaire/${b.id}`}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Consulter">
                            <IconButton
                              color="primary"
                              aria-label="consulter"
                              component={Link}
                              to={`/consulterBeneficiaire/${b.id}`}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            padding: '1%',
            margin: 'auto',
            width: 'fit-content',
            alignItems: 'center',
          }}
        >
          {beneficaires && beneficaires?.length === 0 && (
            <Typography variant="body1" color="#898989">
              Chercher un bénéficiaire ...
            </Typography>
          )}
        </Box>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant="contained"
            color={currentPage === number ? 'primary' : 'inherit'}
            value={number}
            onClick={(e) => handleChangePage(e, number)}
          >
            {number}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default BeneficiaireTable;
