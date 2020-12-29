import { Partenaire } from "./modelePlateforme/partenaire";
import { SousSpecialite } from "./modelePlateforme/sousspecialite";
import { Mobilite } from "./modelePlateforme/mobilite";
import { AideFinanciere } from "./modelePlateforme/aideFinanciere";
import { Contact } from "./modelePlateforme/contact";
import { Cout } from "./modelePlateforme/cout";
import { ErreurSerializable } from "./erreur/erreurSerializable";
import { InformationSerializable } from "./information/informationSerializable";

export interface IVuePlateforme {

    afficheErreur(erreur: ErreurSerializable): void;

    afficheInformation(information: InformationSerializable): void;

    ajoutPartenaire(partenaire: Partenaire): void;

    suppressionPartenaire(partenaire: Partenaire): void;

    modificationPartenaire(partenaire: Partenaire): void;

    ajoutAideFinanciere(aideFinanciere: AideFinanciere): void;

    suppressionAideFinanciere(aideFinanciere: AideFinanciere): void;

    modificationAideFinanciere(aideFinanciere: AideFinanciere): void;

    ajoutContact(contact: Contact): void;

    suppressionContact(contact: Contact): void;

    modificationContact(contact: Contact): void;

    ajoutCout(cout: Cout): void;

    modificationCout(cout: Cout): void;

}