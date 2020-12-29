import { Partenaire } from "../modelePlateforme/partenaire";
import { IVuePlateforme } from "../ivuePlateforme";

export interface IVuePartenaires extends IVuePlateforme {

    ajoutPartenaire(partenaire: Partenaire): void;

    suppressionPartenaire(partenaire: Partenaire): void;

    modificationPartenaire(partenaire: Partenaire): void;

}