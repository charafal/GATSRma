import { createContext } from 'react';
import { IBeneficiare, ITerminal } from './types';
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
  
 }) =>Promise<IForfait[]>;


 getTerminals: ({
  imei,
  etatTerminal,
  dateReception,
  dateCession,
  action,
}: {
  
  imei : string;
  etatTerminal: string;
  dateReception : string;
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
  }: {
    nom: string;
    prenom: string;
    matricule: string;
    centreCout: number;
    rfDirection: number;
    rfBeneficiaire: number;
  }) => Promise<IBeneficiare[]>;
  
  
  loading: boolean;
  beneficaires: IBeneficiare[] | null;
  forfaits : IForfait[] | null;
  terminals : ITerminal[] | null;
}

const ApiContext = createContext<IApiContext>({
  getBeneficiaires: async () => [],
  addBeneficiaire: async () => [],  
  getForfaits: async () => [],
  getTerminals: async () => [],
  forfaits: [],
  beneficaires: [],
  terminals: [],
  loading: false,

});

export default ApiContext;
