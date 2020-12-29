import { IVuePlateforme } from "../ivuePlateforme";
import { Specialite } from "../modelePlateforme/specialite";
import { SousSpecialite } from "../modelePlateforme/sousspecialite";

export interface IVueSpecialites extends IVuePlateforme {

    ajoutSpecialite(specialite: Specialite): void;

    suppressionSpecialite(specialite: Specialite): void;

    modificationSpecialite(specialite: Specialite): void;

    ajoutSousSpecialite(sousSpecialite: SousSpecialite): void;

    suppressionSousSpecialite(sousSpecialite: SousSpecialite): void;

    modificationSousSpecialite(sousSpecialite: SousSpecialite): void;

}