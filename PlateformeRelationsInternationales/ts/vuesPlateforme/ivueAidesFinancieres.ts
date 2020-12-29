import { AideFinanciere } from "../modelePlateforme/aideFinanciere";
import { IVuePlateforme } from "../ivuePlateforme";

export interface IVueAidesFinancieres extends IVuePlateforme {

    ajoutAideFinanciere(aideFinanciere: AideFinanciere): void;

    suppressionAideFinanciere(aideFinanciere: AideFinanciere): void;

    modificationAideFinanciere(aideFinanciere: AideFinanciere): void;

}