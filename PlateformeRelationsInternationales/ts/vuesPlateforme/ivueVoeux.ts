import { Voeu } from "../modelePlateforme/voeu";
import { IVuePlateforme } from "../ivuePlateforme";

export interface IVueVoeux extends IVuePlateforme {

    ajoutVoeu(voeu: Voeu): void;

    suppressionVoeu(voeu: Voeu): void;

}