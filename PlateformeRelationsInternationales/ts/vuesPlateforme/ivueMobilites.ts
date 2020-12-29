import { Mobilite } from "../modelePlateforme/mobilite";
import { IVuePlateforme } from "../ivuePlateforme";

export interface IVueMobilites extends IVuePlateforme {

    ajoutMobilite(mobilite: Mobilite): void;

    suppressionMobilite(mobilite: Mobilite): void;

    modificationMobilite(mobilite: Mobilite): void;

}