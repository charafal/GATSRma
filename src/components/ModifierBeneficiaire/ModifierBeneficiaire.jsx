import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  Typography,
} from "@mui/material";

const ModifierBeneficiaire = () => {
  const { id } = useParams();
  const [beneficiaire, setBeneficiaire] = useState(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [matricule, setMatricule] = useState("");
  const [centrecout, setCentrecout] = useState("");
  const [centreCoutOptions, setCentreCoutOptions] = useState([]);

  useEffect(() => {
    const fetchBeneficiaire = async () => {
      try {
        const [beneficiaireResponse, centreCoutResponse] = await Promise.all([
          axios.get(`http://localhost:8089/beneficiaire/${id}`),
          axios.get("http://localhost:8089/centreCouts"),
        ]);
        setBeneficiaire(beneficiaireResponse.data);
        setNom(beneficiaireResponse.data.nom);
        setPrenom(beneficiaireResponse.data.prenom);
        setMatricule(beneficiaireResponse.data.matricule);
        setCentrecout(beneficiaireResponse.data.centrecout.centrecout);

        // Mettez à jour les options du centre cout
        setCentreCoutOptions(centreCoutResponse.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du bénéficiaire :",
          error
        );
      }
    };
  }, [id]);

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };
  const handleMatriculeChange = (event) => {
    setMatricule(event.target.value);
  };
  const handleCentrecoutChange = (event) => {
    setCentrecout(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedBeneficiaire = { ...beneficiaire, nom, prenom };
      await axios.put(
        `http://localhost:8089/beneficiaire/updateBeneficiaire2/{id}`,
        updatedBeneficiaire
      );
      // Gérer la réussite de la modification, par exemple, rediriger l'utilisateur vers une autre page
    } catch (error) {
      console.error("Erreur lors de la modification du bénéficiaire :", error);
    }
  };

  //   const handleCancel = () => {
  //     history.goBack(); // Redirige l'utilisateur vers la page précédente
  //   };

  return (
    <Box
      sx={{
        width: "60ch",
        margin: "auto",
        transform: "translateY(50%)",
      }}
    >
      {true && (
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <Typography
              variant="h3"
              textAlign={"center"}
              fontWeight={"600"}
              fontSize={32}
              mb={1}
            >
              Modifier le bénéficiaire
            </Typography>
            <Stack direction={"row"} gap={2}>
              <TextField
                label="Nom"
                variant="outlined"
                value={nom}
                onChange={handleNomChange}
                fullWidth
              />
              <TextField
                label="Prénom"
                variant="outlined"
                value={prenom}
                onChange={handlePrenomChange}
                fullWidth
              />
              {/* Ajoutez d'autres champs de saisie pour les autres informations du bénéficiaire */}
            </Stack>
            <Stack direction={"row"} gap={2}>
              <TextField
                label="Matricule"
                variant="outlined"
                value={matricule}
                onChange={handleMatriculeChange}
                fullWidth
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel id="centreCout-label">Centre de coût</InputLabel>
                <Select
                  labelId="centreCout-label"
                  value={centrecout}
                  onChange={(e) => setCentrecout(e.target.value)}
                  label="Centre de coût"
                  disabled={beneficiaire === null}
                >
                  {centreCoutOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.centreCout.centreCout}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Ajoutez d'autres champs de saisie pour les autres informations du bénéficiaire */}
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Button variant="outlined" component={Link} to="/beneficiaires">
                Annuler
              </Button>
              <Button type="submit" variant="contained" disableElevation>
                Enregistrer
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
    </Box>
  );
};

export default ModifierBeneficiaire;
