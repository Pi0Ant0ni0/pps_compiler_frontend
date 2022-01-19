import { InsegnamentoRegola } from './InsegnamentoRegola';
export interface AttivitaDidatticheVincolateDalCorsoDiStudio {
    insegnamentiRegola:InsegnamentoRegola[];
    corsoDiStudioVincolante :string;
    numeroCfuDaScegliere: number;
}
