import { DomaineDeCompetence } from "../modelePlateforme/domaineDeCompetence";
import { IVuePlateforme } from "../ivuePlateforme";

export interface IVueDomainesDeCompetences extends IVuePlateforme {

    ajoutDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void;

    suppressionDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void;

    modificationDomaineDeCompetence(domaineDeCompetence: DomaineDeCompetence): void;

}