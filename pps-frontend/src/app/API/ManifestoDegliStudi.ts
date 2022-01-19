import { AttivitaDidattica } from './AttivitaDidattica';
import { AnnoAccademico } from './AnnoAccademico';
export interface ManifestoDegliStudi {
    coorte:string;
    codiceCorsoDiStudio: string;
    annoOrdinamento:string;
    cfuASceltaLibera:string;
    cfuOrientamento:string;
    cfuTotali:string;
    cfuExtra:string;
    anniAccademici:Map<number,AnnoAccademico>;
    curricula:string;
    attivitaDidatticheAScelta:AttivitaDidattica[];
    dataInizioCompilazionePiano: Date;
    dataFineCompilazionePiano: Date;
}
