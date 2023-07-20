import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import axios from 'axios';
// import RenderText from '../../utils/RenderText';
// import styled from '@emotion/styled';
// import { Box, Typography, Card, CardHeader } from '@mui/material';
// const StyledTypography = styled(Typography)({
//     //color: "#1d2442",
//     //color: "#3ba5df",
//     fontSize: "19px",
//     fontWeight: "bold",
//     //textAlign: "left",
// });
// function createData(
//     name: string,
//     calories: number,
//     fat: number,
//     carbs: number,
//     protein: number,
// ) {
//     return { name, calories, fat, carbs, protein };
// }


// function BoxSx(props: any) {
//     return (
//         <Box
//             sx={{
//                 width: 50,
//                 height: 400,
//                 backgroundColor: 'primary.dark',
//                 '&:hover': {
//                     backgroundColor: 'primary.main',
//                     opacity: [0.9, 0.8, 0.7],
//                 },
//             }}
//         />
//     );
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];



// export default function TableRepartition(props: { quittanceRepar: any, quittanceGlobal: any }) {

//     const [quittanceRepartion, setQuittanceRepartion] = React.useState([]);

//     React.useEffect(() => {
//         axios
//             .get(`http://localhost:8081/quittance/nativeSearchReaprtition?numQuittance=${props.quittanceRepar}`)

//             .then(function (response) {
//                 setQuittanceRepartion(response.data);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }, []);

//     return (
//         <>
//             <Card 
//                 elevation={0}
//             >
//                 <CardHeader
//                     sx={{ bgcolor: "#1D2A5C", color: "#fff" }}
//                      title={`Numero Quittance : ${props.quittanceGlobal.numQuittance }`}
//                      subheader={`Raison Sociale: ${props.quittanceGlobal.raisonSociale}`}
//                      subheaderTypographyProps={{color:"#fff"}}
//                 />

//                 <Box sx={{ p: 4 }}  >

//                     <TableContainer elevation={0} component={Paper}>

//                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                             <Typography> <>{BoxSx}</></Typography>
//                             <TableHead>


//                                 { }

//                                 <StyledTypography sx={{ color: "#AF7F1F" }}>


//                                     <RenderText value="Quittance Global" />
//                                 </StyledTypography>

//                                 <TableRow>

//                                     {/* <TableCell align="left">CD Décentral</TableCell> */}
//                                     <TableCell align="left">N° Police</TableCell>
//                                     <TableCell align="left">N° Quittance</TableCell>
//                                     <TableCell align="left">Etat Quittance</TableCell>
//                                     <TableCell align="left">Date Etat</TableCell>
//                                     <TableCell align="left">Prime Net</TableCell>
//                                     <TableCell align="left">Raison Sociale</TableCell>
//                                     <TableCell align="left">Ref Reglement</TableCell>
//                                     <TableCell align="left">Date Reglement </TableCell>
//                                     <TableCell align="left">Tax Eve Cat</TableCell>

//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 <TableRow
//                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                 >

//                                     {/* <TableCell >{props.quittanceGlobal.bgd}</TableCell> */}
//                                     <TableCell >{props.quittanceGlobal.numPolice}</TableCell>
//                                     <TableCell >{props.quittanceGlobal.numQuittance}</TableCell>
//                                     <TableCell >{props.quittanceGlobal.etatQuittance}</TableCell>
//                                     <TableCell >{props.quittanceGlobal.dateEtat}</TableCell>
//                                     <TableCell >{props.quittanceGlobal.primeNet}</TableCell>
//                                     <TableCell >{props.quittanceGlobal.raisonSociale}</TableCell>
//                                     <TableCell >{props.quittanceGlobal.refReglement}</TableCell>
//                                     <TableCell >{props.quittanceGlobal.dateReglement}</TableCell>
//                                     <TableCell >{props.quittanceGlobal.taxEveCat}</TableCell>
//                                 </TableRow>
//                             </TableBody>
//                         </Table>
//                     </TableContainer>


//                     <TableContainer elevation={0} component={Paper}>
//                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                             <TableHead>

//                                 <StyledTypography sx={{ color: "#AF7F1F" }}>
//                                     <RenderText value="Repartitions" />
//                                 </StyledTypography>

//                                 <TableRow>

//                                     {/* <TableCell align="left">bgd</TableCell> */}
//                                     {/* <TableCell align="left">N° Quittance</TableCell> */}
//                                     {/* <TableCell align="left">Order</TableCell> */}
//                                     <TableCell align="left">Tau Par</TableCell>
//                                     <TableCell align="left">PrimeCMP</TableCell>
//                                     <TableCell align="left">PrimeNet</TableCell>
//                                     <TableCell align="left">Etat</TableCell>
//                                     <TableCell align="left">DT</TableCell>
//                                     {/* <TableCell align="left">RS</TableCell> */}
//                                     <TableCell align="left">Compagine </TableCell>
//                                     <TableCell align="left">TaxEveCat</TableCell>
//                                     <TableCell align="left">STCNAT</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {quittanceRepartion.map((row: any, index) => (
//                                     <TableRow

//                                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                         key={index}
//                                     >

//                                         {/* <TableCell component="th" scope="row" align="left" >{row.bgd}</TableCell> */}
//                                         {/* <TableCell align="left">{row.numQuittance}</TableCell> */}
//                                         {/* <TableCell align="left" >{row.ordre}</TableCell> */}
//                                         <TableCell align="left">{row.tauPar}</TableCell>
//                                         <TableCell align="left">{row.primeCmp}</TableCell>
//                                         <TableCell align="left">{row.primeNet}</TableCell>
//                                         <TableCell align="left">{row.etat}</TableCell>
//                                         <TableCell align="left">{row.dt}</TableCell>
//                                         {/* <TableCell align="left">{row.rs}</TableCell> */}
//                                         <TableCell align="left">{row.compagnie}</TableCell>
//                                         <TableCell align="left">{row.taEveCat}</TableCell>
//                                         <TableCell align="left">{row.stcnat}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Box>
//             </Card>
//         </>
//     );
// }
