import { ContactEtranger } from "../modelePlateforme/contactEtranger";
import { IVuePlateforme } from "../ivuePlateforme";

export interface IVueContactsEtrangers extends IVuePlateforme {

    ajoutContactEtranger(contactEtranger: ContactEtranger): void;

    suppressionContactEtranger(contactEtranger: ContactEtranger): void;

    modificationContactEtranger(contactEtranger: ContactEtranger): void;

}