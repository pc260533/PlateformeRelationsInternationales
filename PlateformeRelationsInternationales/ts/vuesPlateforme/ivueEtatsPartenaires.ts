import { EtatPartenaire } from "../modelePlateforme/etatpartenaire";
import { IVuePlateforme } from "../ivuePlateforme";

export interface IVueEtatsPartenaires extends IVuePlateforme {

    ajoutEtatPartenaire(etatPartenaire: EtatPartenaire): void;

    suppressionEtatPartenaire(etatPartenaire: EtatPartenaire): void;

    modificationEtatPartenaire(etatPartenaire: EtatPartenaire): void;

}