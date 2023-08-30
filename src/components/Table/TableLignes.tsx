import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, styled, FormControlLabel, Switch, Tooltip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import RenderText from '../../utils/RenderText';
import { ILigne } from '../../context/types';

const StyledTypography = styled(Typography)({
  color: '#1d2442',
  fontSize: '25px',
  fontWeight: 500,
});

interface HeadCell {
  disablePadding: boolean;
  id: keyof ILigne;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'numLigne',
    numeric: true,
    disablePadding: true,
    label: 'Numéro de Ligne',
  },
 
  {
    id: 'Direction',
    numeric: true,
    disablePadding: true,
    label: 'Direction',
  },
  {
    id: 'forfait',
    numeric: true,
    disablePadding: true,
    label: 'Forfait',
  },
  {
    id: 'date_activation',
    numeric: false,
    disablePadding: false,
    label: 'Date d\'activation',
  },
  {
    id: 'date_resilliatiom',
    numeric: true,
    disablePadding: true,
    label: 'Date de Résiliation',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: true,
    label: 'Action',
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
    </Toolbar>
  );
}

const LigneTable = () => {
  const [dense, setDense] = useState(true);
  const [lignes, setLignes] = useState<ILigne[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lignesPerPage] = useState(5);

  useEffect(() => {
    axios
      .get('http://localhost:8089/lignes/ligne')
      .then((response) => setLignes(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des lignes :', error));
  }, []);

  function handleChangeDense(event: ChangeEvent<HTMLInputElement>, checked: boolean): void {
    setDense(checked);
  }

  function handleChangePage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, number: any): void {
    setCurrentPage(number);
  }

  const pageCount = lignes
    ? Math.ceil(lignes.length / lignesPerPage)
    : 0;

  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

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
              {lignes &&
                lignes
                  .slice(
                    (currentPage - 1) * lignesPerPage,
                    currentPage * lignesPerPage,
                  )
                  .map((ligne: ILigne, index) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell>{ligne.numLigne}</TableCell>
                        <TableCell>{ligne.Direction}</TableCell>
                        <TableCell>{ligne.forfait.nomForfait}</TableCell>
                        <TableCell>{ligne.date_activation}</TableCell>
                        <TableCell>{ligne.date_resilliatiom}</TableCell>

                        <TableCell>
                          <Tooltip title="Modifier">
                            <IconButton
                              color="primary"
                              aria-label="modifier"
                              component={Link}
                              to={`/modifierLigne/${ligne.id}`}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Consulter">
                            <IconButton
                              color="primary"
                              aria-label="consulter"
                              component={Link}
                              to={`/consulterLigne/${ligne.id}`}
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
          {lignes && lignes.length === 0 && (
            <Typography variant="body1" color="#898989">
              Aucune ligne trouvée ...
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

export default LigneTable;

