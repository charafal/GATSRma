import React from 'react';
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FilterListIcon from "@mui/icons-material/FilterList";
import { styled } from "@mui/material";
import RenderText from "../../utils/RenderText";
import ApiContext from "../../context/ApiContext";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { ITerminal } from '../../context/types';
export {}; // Add this line to make the file a module

// Rest of your code for "TableTerminal.tsx"

// ...

const StyledTypography = styled(Typography)({
  color: "#1d2442",
  fontSize: "25px",
  fontWeight: 500,
});

interface HeadCell {
  disablePadding: boolean;
  id: keyof ITerminal;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "imei",
    numeric: false,
    disablePadding: false,
    label: "IMEI",
  },
  {
    id: "etatTerminal",
    numeric: false,
    disablePadding: false,
    label: "État du terminal",
  },
  {
    id: "dateReception",
    numeric: false,
    disablePadding: false,
    label: "Date de réception",
  },
  {
    id: "dateCession",
    numeric: false,
    disablePadding: false,
    label: "Date de cession",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Actions",
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
  const { terminals } = React.useContext(ApiContext);
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

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
                {terminals?.map((t: any) => (
                  <TableRow hover key={t.id}>
                    <TableCell>{t.imei}</TableCell>
                    <TableCell>{t.rfTerminal.etatTerminal}</TableCell>
                    <TableCell>{t.dateReception}</TableCell>
                    <TableCell>{t.dateCession}</TableCell>
                    <TableCell>
                      <Tooltip title="Modifier">
                        <IconButton
                          color="primary"
                          aria-label="modifier"
                          component={Link}
                          to={`/modifierTerminal/${t.id}`}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Consulter">
                        <IconButton
                          color="primary"
                          aria-label="consulter"
                          component={Link}
                          to={`/consulterTerminal/${t.id}`}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
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
            {terminals && terminals?.length === 0 && <Typography variant="body1" color='#898989'>Aucun terminal trouvé.</Typography>}
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
