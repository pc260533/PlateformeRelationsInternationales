﻿import { Partenaire } from "./modelePlateforme/partenaire";
import { Specialite } from "./modelePlateforme/specialite";
import { Mobilite } from "./modelePlateforme/mobilite";
import { AideFinanciere } from "./modelePlateforme/aideFinanciere";
import { Contact } from "./modelePlateforme/contact";

export interface IVuePlateforme {

    ajoutPartenaire(partenaire: Partenaire): void;

    suppressionPartenaire(partenaire: Partenaire): void;

    modificationPartenaire(partenaire: Partenaire): void;

    ajoutSpecialiteDansPartenaire(specialite: Specialite, partenaire: Partenaire): void;

    suppressionSpecialiteDansPartenaire(specialite: Specialite, partenaire: Partenaire): void;

    ajoutMobiliteDansPartenaire(mobilite: Mobilite, partenaire: Partenaire): void;

    suppressionMobiliteDansPartenaire(mobilite: Mobilite, partenaire: Partenaire): void;

    ajoutAideFinanciereDansPartenaire(aideFinanciere: AideFinanciere, partenaire: Partenaire): void;

    suppressionAideFinanciereDansPartenaire(aideFinanciere: AideFinanciere, partenaire: Partenaire): void;

    ajoutContactDansPartenaire(contact: Contact, partenaire: Partenaire): void;

    suppressionContactDansPartenaire(contact: Contact, partenaire: Partenaire): void;

    ajoutAideFinanciere(aideFinanciere: AideFinanciere): void;

    suppressionAideFinanciere(aideFinanciere: AideFinanciere): void;

    modificationAideFinanciere(aideFinanciere: AideFinanciere): void;

    ajoutContact(contact: Contact): void;

    suppressionContact(contact: Contact): void;

    modificationContact(contact: Contact): void;

}