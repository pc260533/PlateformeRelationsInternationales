import { Partenaire } from "./modelePlateforme/partenaire";

export interface IVuePlateforme {

    afficherImages(): void;

    ajoutPartenaire(partenaire: Partenaire): void;

    modificationPartenaire(partenaire: Partenaire): void;

    suppressionPartenaire(partenaire: Partenaire): void;

}