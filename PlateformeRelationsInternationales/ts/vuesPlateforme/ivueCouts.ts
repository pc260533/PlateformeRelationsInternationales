import { Cout } from "../modelePlateforme/cout";
import { IVuePlateforme } from "../ivuePlateforme";

export interface IVueCouts extends IVuePlateforme {

    ajoutCout(cout: Cout): void;

    modificationCout(cout: Cout): void;

}