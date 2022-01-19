import { InsegnamentoRegola } from 'src/app/API/InsegnamentoRegola';
import { AttivitaDidattica } from 'src/app/API/AttivitaDidattica';
import { Orientamento } from 'src/app/API/Orientamento';
export interface PPS {
    attivitaDidatticheAScelta :AttivitaDidattica[];
    orientamento: InsegnamentoRegola[];
    coorte: number;
}
