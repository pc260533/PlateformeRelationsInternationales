import { IVuePlateforme } from "../ivuePlateforme";
import { Mail } from "../modelePlateforme/mail";

export interface IVueMails extends IVuePlateforme {

    ajoutMail(mail: Mail): void;

    suppressionMail(mail: Mail): void;

}