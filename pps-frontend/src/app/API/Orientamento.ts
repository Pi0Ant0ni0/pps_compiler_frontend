import { InsegnamentoRegola } from './InsegnamentoRegola';
export interface Orientamento {
    denominazione :string;
    insegnamentiVincolati: InsegnamentoRegola[];
    insegnamentiLiberi: InsegnamentoRegola[];
    quotaCFULiberi :number;
    quotaCFUVincolati : number;
}
