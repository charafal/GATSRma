// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepButton from '@mui/material/StepButton';

// import Typography from '@mui/material/Typography';
// import { TextField, Button, Box, Paper } from '@mui/material';
// import axios from 'axios';
// import {MenuItem } from '@mui/material';
// import { Fragment, useContext, useEffect, useState } from 'react';


// import ApiContext from "../../context/ApiContext";

// const steps = ['Création du bénéficiaire', 'Affecter une ligne', 'Affecter un forfait'];

// export default function HorizontalNonLinearStepper() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [completed, setCompleted] = useState({});
//   const totalSteps = () => {
//     return steps.length;
//   };

//   const completedSteps = () => {
//     return Object.keys(completed).length;
//   };

//   const isLastStep = () => {
//     return activeStep === totalSteps() - 1;
//   };

//   const allStepsCompleted = () => {
//     return completedSteps() === totalSteps();
//   };

//   const handleNext = () => {
//     const newActiveStep =
//       isLastStep() && !allStepsCompleted()
//         ? steps.findIndex((step, i) => !(i in completed))
//         : activeStep + 1;
//     setActiveStep(newActiveStep);
//     setFormData({ ...formData, [steps[activeStep]]: formData });
//   };

//   const handleBack = () => {
    
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     setFormData({ ...formData, [steps[activeStep - 1]]: formData });
//   };

//   const handleStep = (step) => () => {
//     setActiveStep(step);
//   };

//   const handleComplete = async () => {
//     const newCompleted = completed;
//     newCompleted[activeStep] = true;
//     setCompleted(newCompleted);
  
//     if (allStepsCompleted()) {
//       try {
//         // Récupérez les données du formulaire
//         const formData = {
//           nom: 'nom', // Valeur du champ nom
//           prenom: 'prenom', // Valeur du champ prénom
//           matricule: 'matricule', // Valeur du champ matricule
//           centreCout:'centrecout',
//           rfBeneficiaire:'statutBeneficiaire',
//           rfDirections: 'rfDirection',
//           // Autres champs du formulaire
//         };
  
//         // Envoyez les données au backend en utilisant une requête POST
//         const response = await axios.post('http:localhost/8089/beneficiaire',formData);
//         const newBeneficiaryId = response.data.id; 
//         console.log(newBeneficiaryId.id);

  
//         // Vérifiez la réponse du backend et effectuez des actions en conséquence
//         if (response.status === 200) {
//           // L'ajout du bénéficiaire a réussi
//           console.log('Bénéficiaire ajouté avec succès !');
//           // Effectuez ici d'autres actions ou affichez un message de succès à l'utilisateur
//         } else {
//           // Il y a eu une erreur lors de l'ajout du bénéficiaire
//           console.log("Erreur lors de l'ajout du bénéficiaire");
//           // Effectuez ici d'autres actions ou affichez un message d'erreur à l'utilisateur
//         }
  
//         // Mettez à jour l'état de la ligne affectée
//         const ligne_id = formData.ligne_id; // Remplacez "ligneId" par le champ approprié qui contient l'ID de la ligne affectée
//         const updatedLigne = await axios.put(
//           `http://localhost:8089/lignes/updateLigne`,
//           { etat: 'affecté' } // Remplacez "etat" par le champ approprié qui représente l'état de la ligne
//         );
//         setLigneAffectee(updatedLigne.data);
  
//         // Réinitialisez le formulaire et les étapes
//         handleReset();
//       } catch (error) {
//         // Gérez les erreurs de la requête
//         console.error("Erreur lors de l'appel de l'API d'ajout du bénéficiaire :", error);
//         // Effectuez ici d'autres actions ou affichez un message d'erreur à l'utilisateur
//       }
//     } else {
//       handleNext();
//     }
//   };
  
//   useEffect(() => {
//     const fetchCentreCout = async () => {
//       try {
//         const response = await axios.get('http://localhost:8089/centreCouts');
//         setCentreCout(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des centres de coût :', error);
//       }
//     };
  
//     fetchCentreCout();
//   }, []);
//   useEffect(() => {
//     const fetchRfBeneficiaires = async () => {
//       try {
//         const response = await axios.get('http://localhost:8089/rfbeneficiaires');
//         setRfBeneficiaire(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des RfBeneficiaires :', error);
//       }
//     };

//     fetchRfBeneficiaires();
//   }, []);

  

//   useEffect(() => {
//     const fetchRfDirections = async () => {
//       try { 
//         const response = await axios.get('http://localhost:8089/rfdirections');
//         setRfDirections(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des RfDirections :', error);
//       }
//     };

//     fetchRfDirections();
//   }, []);

//   // useEffect(() => {
//   //   const fetchLigne = async () => {
//   //     try { 
//   //       const response = await axios.get('http://localhost:8089/lignes/RFLingWithstatus?status=En%20Stock');
//   //       setLigne(response.data);
//   //     } catch (error) {
//   //       console.error('Erreur lors de la récupération des lignes :', error);
//   //     }
//   //   };

//   //   fetchLigne();
//   // }, []);

//   useEffect(() => {
//     const fetchForfait = async () => {
//       try { 
//         const response = await axios.get('http://localhost:8089/forfaits');
//         setForfait(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des forfaits :', error);
//       }
//     };

//     fetchForfait();
//   }, []);
//   const [centreCout, setCentreCout] = useState([]);
//   const [rfDirections, setRfDirections] = useState([]);
//   const [option_forfait, setOption_forfait] = useState([]);
//   const [nomForfait, setNomForfait]= useState([]);
//   const [forfait, setForfait]= useState([]);
  

//   const handleReset = () => {
//     setActiveStep(0);
//     setCompleted({});
//   };
 
//   const [formData, setFormData] = useState({
//     nomForfait: '',
//     option_forfait: '',
//     soldeData: '',
//     soldeAppels:'',
//     statutforfait:'',
//     montant:'',
//     // Autres champs du formulaire
//   });


//   const renderForm = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <form>
//             <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
//               <TextField label="NomForfait" variant="outlined" fullWidth value= {formData.nomForfait}
//                onChange={(e) => setFormData({ ...formData, nomForfait: e.target.value })} />
//               <TextField label="soldeData" variant="outlined" fullWidth
//               value= {formData.soldeData}
//               onChange={(e) => setFormData({ ...formData, soldeData: e.target.value })} />
//             </Box>
//             <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
//               <TextField label="soldeAppels" variant="outlined" fullWidth 
//               value= {formData.soldeAppels}
//               onChange={(e) => setFormData({ ...formData, soldeAppels: e.target.value })}/>
//               <TextField
//                 label="option forfait"
//                 variant="outlined"
//                 fullWidth
//                 select
//                 value= {formData.option_forfait}
//                onChange={(e) => setFormData({ ...formData, option_forfait: e.target.value })}
//               >
                
//               </TextField>
//             </Box>
//             <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
//               {/* <TextField
//                 label="statu forfait"
//                 variant="outlined"
//                 fullWidth
//                 select
//                 value= {formData.rfForfait}
//                onChange={(e) => setFormData({ ...formData, rfForfait: e.target.value })}
//               >
//                  {rfForfait.map((rfForfait) => (
//                       <MenuItem key={rfForfait.id} value={rfForfait.id}>
//                         {rfForfait.statutforfait}
//                       </MenuItem>
//                   ))}
//               </TextField> */}
//               <TextField
//                 label="Montant"
//                 variant="outlined"
//                 fullWidth
//                 select
//                 value= {formData.montant}
//                onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
//               >
                
//               </TextField>
//             </Box>
//             <Box sx={{display: 'flex', justifyContent: 'flex-end', py: 1}}>
//             <Button onClick={handleCreerBeneficiaire} variant='contained' disableElevation>Creer</Button>
//             </Box>
//           </form>
//         );
//       case 1:
//         return (
//           <form>
//             {/* Votre formulaire pour la deuxième étape */}
//             <TextField
//           label="Les numéros de lignes disponnibles"
//           variant="outlined"
//           fullWidth
//           select
//           sx={{ width: '50%' }}
//           value={formData.numLigne}
//           onChange={(e) => setFormData({ ...formData, numLigne: e.target.value })}
//         >
//           {ligne.map((ligne) => (
//             <MenuItem key={ligne.id} value={ligne.id}>
//               {ligne.numLigne}
//             </MenuItem>
//           ))}
//         </TextField>

             
//           </form>
//         );
//       case 2:
//         return (
//           <form>
//             {/* Votre formulaire pour la troisième étape */}
//             <Box sx={{ display: 'flex', gap: '20px', margin: '10px' }}>
//             <TextField
//                 label="Le forfait"
//                 variant="outlined"
//                 fullWidth
//                 select
//                 sx={{ width: '50%' }}
                
//                 value= {formData.nomForfait}
//                onChange={(e) => setFormData({ ...formData, nomForfait: e.target.value })}
//               >
//                 {forfait.map((forfait : any) => (
//                   <MenuItem key={forfait.id} value={forfait.id}>
//                     {forfait.nomForfait}
//                   </MenuItem>
//                 ))}
//               </TextField>
//               </Box>
//           </form>
//         );
       
//       default:
//         return null;
//     }
//   };

//   const { AjouterForfait, loading} = useContext(ApiContext);
//   const handleCreerForfait = async () => {
//     // console.log("handleCreerBeneficiaire: " + formData.rfBeneficiaire);
//     try {
//       const data = await AjouterForfait(
//         {...formData}
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper  sx={{ width: "100%", mb: 2, padding: "1%" }}>
//       <Stepper nonLinear activeStep={activeStep}>
//         {steps.map((label, index) => (
//           <Step key={label} completed={completed[index]}>
//             <StepButton color="inherit" onClick={handleStep(index)}>
//               {label}
//             </StepButton>
//           </Step>
//         ))}
//       </Stepper>
//       <Box>
//         <Box sx={{pt: 2}}>
//           {renderForm(activeStep)}
//         </Box>
//         {allStepsCompleted() ? (
//           <Fragment>
//             <Typography sx={{ mt: 2, mb: 1 }}>
//               All steps completed - you&apos;re finished
//             </Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//               <Box sx={{ flex: '1 1 auto' }} />
//               <Button onClick={handleReset}>Reset</Button>
//             </Box>
//           </Fragment>
//         ) : (
//           <Fragment>
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 pt: 2,
//                 marginTop: '20px',
//               }}
//             >
//               <Button
//                 color="inherit"
//                 disabled={activeStep === 0}
//                 onClick={handleBack}  
//               >
//                 Back
//               </Button>
//               <Box sx={{ flex: '1 1 auto' }} />
              
//               {activeStep + 1 === steps.length ?
//                 <Button onClick={handleComplete}>
//                   Finish
//                 </Button> : 
//                 <Button onClick={handleNext}>
//                   Next
//                 </Button>
//               }
//             </Box>
//           </Fragment>
//         )}
//       </Box>
//       </Paper>
//     </Box>
//   );
// }
import React from 'react'
import Forfait from '../../pages/Forfait'
import { Navigate, useNavigate } from 'react-router-dom';

export default function AjouterForfait() {
  let navigate = useNavigate();

  // const handleAjouter = () => {
  //   Navigate('/AjouterForfait'); // Use push() to navigate to the desired route
  // };
  return (
    <div>
      Add forfait
    </div>
  )
}
