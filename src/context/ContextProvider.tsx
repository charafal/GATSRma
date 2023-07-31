import { ReactNode, useState } from 'react';
import ApiContext from './ApiContext';
import axios from 'axios';
import {IBeneficiare} from './types';
import { IForfait } from './types';
import { ITerminal } from './types';
interface IContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: IContextProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [beneficaires, setBeneficaires] = useState<IBeneficiare[] | null>(null);
  const [forfaits, setForfaits]= useState<IForfait[] | null>(null);
  const [terminals, setTerminals]= useState<ITerminal[]>([]);

  const getBeneficiaires = async ({
    nom,
    prenom,
    matricule,
  }: {
    nom: string;
    prenom: string;
    matricule: string;
  }): Promise<IBeneficiare[]> => {
    setLoading(true);
    try {
      let url = 'http://localhost:8089/beneficiaire/recherche?';
  
      if (nom) {
        url += `nom=${encodeURIComponent(nom)}&`;
      }
  
      if (prenom) {
        url += `prenom=${encodeURIComponent(prenom)}&`;
      }
  
      if (matricule) {
        url += `matricule=${encodeURIComponent(matricule)}`;
      }
  
      const response = await axios.get(url);
      console.log(response.data);
      setBeneficaires(response.data as IBeneficiare[]);
  
      setLoading(false);
      return response.data as IBeneficiare[];
    } catch (error) {
      console.log(error);
      setLoading(false);
      return [];
    }
  };
  const getForfaits = async ({
    nomForfait,
    soldeData,
    soldeAppels,
    montant,
  }: {
    nomForfait: string;
    soldeData: string;
    soldeAppels: string;
    montant: string;
  }): Promise<IForfait[]> => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:8089/forfaits/rechercheForfait',
      );
      console.log(response.data);
      setForfaits(response.data as IForfait[]);
      setLoading(false);
      return response.data as IForfait[];
    } catch (error) {
      console.log(error);
      setLoading(false);
      return []; 
    }
  };
  const getTerminals = async ({
    imei,
    etatTerminal,
    dateReception ,
    dateCession ,
                   
  }: {
    imei : String;
    etatTerminal: String;
    dateReception : String;
    dateCession: String;
  }): Promise<ITerminal[]> => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:8089/terminals/terminal',
      );
      console.log(response.data);
      setTerminals(response.data );
      setLoading(false);
      return response.data as ITerminal[];
    } catch (error) {
      console.log(error);
      setLoading(false);
      return []; 
    }
  };

  const addBeneficiaire = async ({
    nom,
    prenom,
    matricule,
    centreCout,
    rfDirection,
    rfBeneficiaire,
    lignes,
  }: {
    nom: string;
    prenom: string;
    matricule: string;
    centreCout: number;
    rfDirection: number;
    rfBeneficiaire: number;
    lignes: number;
  }): Promise<IBeneficiare[]> => {
    setLoading(true);
    try {
      console.log('GGGGGGGGGG' + rfDirection);
      const response = await axios.post(
        'http://localhost:8089/beneficiaire',
        {
          nom: nom,
          prenom: prenom,
          matricule: matricule,
          rfDirection: {id: rfDirection},
          rfBeneficiaire: {id: rfBeneficiaire},
          centreCout: {id: centreCout},
          lignes: {id: lignes},
        }
      );
      {console.log(response.data);
      setBeneficaires(response.data as IBeneficiare[]);
      console.log(">>>>>>>>>1 ", beneficaires);
      setLoading(false);
      setBeneficaires(response.data as IBeneficiare[]);
      console.log(">>>>>>>>>2 ", beneficaires);}
      return response.data as IBeneficiare[];
    } catch (error) {
      console.log(error);
      setLoading(false);
      return []; 
    }
  };
  const addForfait = async ({
    nomForfait,
    soldeData,
    soldeAppels,
    montant,
  }: {
    nomForfait: string;
    soldeData: string;
    soldeAppels: string;
    montant: string;
  }): Promise<IForfait[]> => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8089/forfaits', // Remplacez l'URL par l'URL de votre API pour ajouter un forfait
        {
          nomForfait: nomForfait,
          soldeData: soldeData,
          soldeAppels: soldeAppels,
          montant: montant,
        }
      );
  
      // Ici, vous pouvez effectuer des traitements supplémentaires si nécessaire avec la réponse de l'API
  
      setLoading(false);
      setForfaits(response.data as IForfait[]); // Assurez-vous d'avoir défini setForfaits et loading dans votre composant
  
      return response.data as IForfait[];
    } catch (error) {
      console.log(error);
      setLoading(false);
      return [];
    }
  };
  

  const apiContextValue = {
    getBeneficiaires,
    addBeneficiaire,
    addForfait,
    getForfaits,
    getTerminals,
    forfaits: forfaits,
    terminals: terminals,
    beneficaires: beneficaires,
    loading,
  };

  return (
     <ApiContext.Provider value={apiContextValue}>
      {children}
    </ApiContext.Provider>
  );
};

export default ContextProvider;

function async(arg0: { nomForfait: any; soldeAppel: any; soldeData: any; montant: any; }, arg1: { nomForfait: any; }) {
  throw new Error('Function not implemented.');
}
