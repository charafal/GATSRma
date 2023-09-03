export interface IBeneficiare {
  id: Number;
  nom: String;
  prenom: String;
  terminal: String;
  imei: String;
  matricule: String;
  direction: String;
  centreCout: String;
  statut: String;
  dateLivraison: String;
  ligne: number;
  actions: any;
}

export interface IForfait {
  //rfForfait: any;
  id: number;
  nomForfait: String;
  option_forfait: String;
  soldeData: String;
  montant: string;
  //statutForfait : String;
  soldeAppels: String;
  action: any;
  rfForfait: {
    id: number;
    statutForfait: String;
  };
}
export interface ITerminal {
  id: number;
  imei: string;
  nomTerminal: string;
  etatTerminal: String;
  dateReception: String;
  dateCession: String;
  action: any;
};
export interface ILigne{
  id: number;
  numLigne: String;
  rfLigne: String;
  direction:String;
  forfait: String ;
  date_activation: String;
  date_resilliation: String;
  action: any;
}