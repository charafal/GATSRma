import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Card, CardHeader, Modal, Pagination, styled } from "@mui/material";
import RenderText from "../../utils/RenderText";
import ApiContext from "../../context/ApiContext";
import { IForfait } from "../../context/types";
import Forfait from "../../pages/Forfait";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
const StyledTypography = styled(Typography)({
  color: "#1d2442",
  fontSize: "25px",
  fontWeight: 500,
});

interface HeadCell {
  disablePadding: boolean;
  id: keyof IForfait;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [

  {
    id: "nomForfait",
    numeric: false,
    disablePadding: true,
    label: "NomForfait",
  },
  {
    id: "soldeData",
    numeric: false,
    disablePadding: true,
    label: "soldeData",
  },
  {
    id: "soldeAppels",
    numeric: false,
    disablePadding: true,
    label: "Solde appel",
  },
 
  {
    id: "option_forfait",
    numeric: false,
    disablePadding: true,
    label: "option forfait",
  },
  {
    id: "rfForfait",
    numeric: false,
    disablePadding: true,
    label: "Statut forfait",
  },
  {
    id: "montant",
    numeric: false,
    disablePadding: true,
    label: "montant",
  },

  {
    id: "action",
    numeric: false,
    disablePadding: true,
    label: "actions",
  },
  
  
  
];


function EnhancedTableHead() {
  return (
    <TableHead sx={{ paddingLeft: '20px' }}>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
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
        sx={{ flex: "1 1 100%", fontWeight: "bold" }}
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





export default function EnhancedTable() {
  const [dense, setDense] = React.useState(true);

 
  const {forfaits} = React.useContext(ApiContext);
  
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };


  
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 24

  };



  const [open, setOpen] = React.useState(false);


  return (
    <>
      <Box sx={{ width: "95%", marginX: "2%" }} key={Math.random()}>



        <EnhancedTableToolbar />
        <Paper sx={{ width: "100%", mb: 2, border: "1px solid rgba(0, 0, 0, .1)", paddingLeft: "10px" }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}

            >
              <EnhancedTableHead />
              <TableBody>

                {forfaits?.map((f) => {
                  return (
                    <TableRow hover key={f.id}>
                      <TableCell>{f.nomForfait}</TableCell>
                       <TableCell>{f.soldeAppels}</TableCell>
                      <TableCell>{f.soldeData}</TableCell>
                      <TableCell>{f.option_forfait}</TableCell>
                      <TableCell>{f.rfForfait?.statutForfait}</TableCell>
                      <TableCell>{f.montant}</TableCell>
                      <TableCell>{f.action}
                      <Tooltip title="Modifier">
                        <IconButton  color="primary"
                                      aria-label="modifier"
                                      component={Link}
                                      to={`/modifierForfait/${f.id}`}
                                     >
                          
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Consulter">
                      <IconButton
                          color="primary"
                          aria-label="consulter"
                          
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
              padding: "1%",
              margin: "auto",
              width: "fit-content",
              alignItems: "center",
            }}
          >
            
          </Box>
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </>
  );


}