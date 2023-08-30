import { createContext } from 'react';
import { IBeneficiare, ILigne, ITerminal } from './types';
import { IForfait } from './types';


interface IApiContext {
  getBeneficiaires: ({
    nom,
    prenom,
    matricule,
  }: {
    nom: string;
    prenom: string;
    matricule: string;
  }) => Promise<IBeneficiare[]>;
 
 getForfaits: ({
  nomForfait,
  // option_forfait,
  soldeData,
  soldeAppels,
   montant,
 }: {
  nomForfait: string;
  // option_forfait: string;
  soldeData: string;
  soldeAppels: string;
    montant: string;
  }) => Promise<IForfait[]>;

  getTerminals: ({
    imei,
    etatTerminal,
    dateReception,
    dateCession,
    action,
  }: {
    imei: string;
    etatTerminal: string;
    dateReception: string;
    dateCession: string;
    action: any;
  }) => Promise<ITerminal[]>;

  addBeneficiaire: ({
    nom,
    prenom,
    matricule,
    centreCout,
    rfDirection,
    rfBeneficiaire,
    ligne,
  }: {
    nom: string;
    prenom: string;
    matricule: string;
    centreCout: number;
    rfDirection: number;
    rfBeneficiaire: number;
    ligne: number;
  }) => Promise<IBeneficiare[]>;
  addForfait: ({
    nomForfait,
    soldeData,
    soldeAppels,
    option_forfait,
    montant,
  }: {
    nomForfait: string;
    soldeData: string;
    option_forfait: string;
    soldeAppels: string;
    montant: string;
  }) => Promise<IForfait[]>;
  addTerminal: ({
    imei,
    dateReception,
    dateCession,
    etatTerminal,
  }:{
    imei: string;
    dateReception: string;
    dateCession: string ;
    etatTerminal: string
  }) => Promise<ITerminal[]>;

  addLigne: ({
    numLigne,
    forfait,
    direction,
    date_activation,
    date_resilliation,
  }:{
    numLigne: string;
    forfait:number;
    direction: number;
    date_activation: string;
    date_resilliation: string;
  })=> Promise<ILigne[]>;

  getLigne: ({
    numLigne,
    forfait,
    direction,  
    date_activation,
    date_resilliation,
  }:{
    numLigne: string;
    forfait:number;
    direction: number;
    date_activation: string;
    date_resilliation: string;
  })=> Promise<ILigne[]>;
  loading: boolean;
  beneficaires: IBeneficiare[] | null;
  forfaits: IForfait[] | null;
  terminals: ITerminal[] | null;
  lignes: ILigne[] | null;
}


const ApiContext = createContext<IApiContext>({
  getBeneficiaires: async () => [],
  addBeneficiaire: async () => [],
  addForfait: async () => [],
  addTerminal: async () => [],
  getForfaits: async () => [],
  getTerminals: async () => [],
  getLigne: async () => [],
  addLigne: async () => [],
  forfaits: [],
  beneficaires: [],
  terminals: [],
  lignes: [],
  loading: false,
});

export default ApiContext;
