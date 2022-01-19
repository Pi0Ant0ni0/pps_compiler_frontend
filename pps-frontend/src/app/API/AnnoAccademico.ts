import { Orientamento } from './Orientamento';
import { InsegnamentoRegola } from './InsegnamentoRegola';
import { AttivitaDidatticheVincolateDalCorsoDiStudio } from './AttivitaDidatticheVincolateDalCorsoDiStudio';
export interface AnnoAccademico {
    attivitaDidatticheVincolateDalCorsoDiStudio : AttivitaDidatticheVincolateDalCorsoDiStudio[];
    insegnamentiObbligatori : InsegnamentoRegola[];
    orientamenti: Orientamento[];
    cfuAScelta: number;
}
