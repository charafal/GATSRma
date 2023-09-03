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

const headCells = [
  {
    id: 'numLigne',
    numeric: true,
    disablePadding: true,
    label: 'Numéro de Ligne',
  },
 
  {
    id: 'direction',
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
    label: 'Date activation',
  },
  {
    id: 'date_resilliation',
    numeric: true,
    disablePadding: true,
    label: 'Date de Résiliation',
  },
  {
    id: 'terminal',
    numeric: true,
    disablePadding: true,
    label: 'terminal',
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
  const [currentPage, setCurrentPage] = useState(1);
  const [lignesPerPage] = useState(5);
  
  const initialData = [
    {
      "id": 0,
      "version": 0,
      "numLigne": "string",
      "dateActivation": "2023-09-03T18:54:37.307Z",
      "dateResilliation": "2023-09-03T18:54:37.307Z",
      "dateRenouvelement": "2023-09-03T18:54:37.307Z",
      "forfait": {
        "id": 0,
        "version": 0,
        "nomForfait": "string",
        "option_forfait": "string",
        "soldeData": "string",
        "soldeAppels": "string",
        "montant": 0,
        "dateActivation": "2023-09-03T18:54:37.307Z",
        "dateResiliation": "2023-09-03T18:54:37.307Z",
        "dateRenouvelement": "2023-09-03T18:54:37.307Z",
        "rfForfait": {
          "id": 0,
          "version": 0,
          "statutForfait": "string",
          "creeLe": "2023-09-03T18:54:37.307Z",
          "creePar": "string",
          "modifierLe": "2023-09-03T18:54:37.307Z",
          "modifierPar": "string"
        },
        "creeLe": "2023-09-03T18:54:37.307Z",
        "creePar": "string",
        "modifierLe": "2023-09-03T18:54:37.307Z",
        "modifierPar": "string"
      },
      "refLigne": {
        "id": 0,
        "version": 0,
        "statutLigne": "string",
        "creeLe": "2023-09-03T18:54:37.307Z",
        "creePar": "string",
        "modifierLe": "2023-09-03T18:54:37.307Z",
        "modifierPar": "string"
      },
      "terminal": {
        "id": 0,
        "version": 0,
        "dateReception": "2023-09-03T18:54:37.307Z",
        "dateCession": "2023-09-03T18:54:37.307Z",
        "nomTerminal": "string",
        "imei": "string",
        "garantie": 0,
        "rfTerminal": {
          "id": 0,
          "version": 0,
          "etatTerminal": "string",
          "creeLe": "2023-09-03T18:54:37.307Z",
          "creePar": "string",
          "modifierLe": "2023-09-03T18:54:37.307Z",
          "modifierPar": "string",
          "statutTerminal": "string"
        },
        "creeLe": "2023-09-03T18:54:37.307Z",
        "creePar": "string",
        "modifierLe": "2023-09-03T18:54:37.307Z",
        "modifierPar": "string"
      },
      "creeLe": "2023-09-03T18:54:37.307Z",
      "creePar": "string",
      "modifierLe": "2023-09-03T18:54:37.307Z",
      "modifierPar": "string"
    }
  ];
  const [lignes, setLignes] = useState(initialData);

  

  useEffect(() => {
    axios
      .get('http://localhost:8089/lignes/ligne')
      .then((response) => {
        console.log(response.data)
        setLignes(response.data)
      
      })
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
                  
                  .map((ligne, index) => {
                    return (
                      <TableRow hover key={index}>
                        <TableCell>{ligne.numLigne}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>{ligne.forfait.nomForfait}</TableCell>
                        <TableCell>{ligne.dateActivation}</TableCell>
                        <TableCell>{ligne.dateResilliation}</TableCell>
                        <TableCell>{ligne.terminal.nomTerminal}</TableCell>

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

