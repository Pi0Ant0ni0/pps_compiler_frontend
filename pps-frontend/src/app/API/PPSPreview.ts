import { AttivitaDidatticaDettagliata } from './AttivitaDidatticaDettagliata';
export interface PPSPreview {
    codiceCorsoDiStudio: string,
    email:string,
    dataCompilazione: Date,
    approvato: boolean,
    rifiutato: boolean,
    nome:string,
    cognome:string,
    orientamento: AttivitaDidatticaDettagliata[],
    liberi: AttivitaDidatticaDettagliata[],
    curriculum: string,
}
