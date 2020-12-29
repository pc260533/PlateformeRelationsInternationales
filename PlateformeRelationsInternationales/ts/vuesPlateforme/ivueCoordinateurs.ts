import { Coordinateur } from "../modelePlateforme/coordinateur";
import { IVuePlateforme } from "../ivuePlateforme";

export interface IVueCoordinateurs extends IVuePlateforme {

    ajoutCoordinateur(coordinateur: Coordinateur): void;

    suppressionCoordinateur(coordinateur: Coordinateur): void;

    modificationCoordinateur(coordinateur: Coordinateur): void;

}