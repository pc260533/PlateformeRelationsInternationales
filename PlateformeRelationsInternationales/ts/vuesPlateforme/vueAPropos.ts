import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";
import { Specialite } from "../modelePlateforme/specialite";
import { Mobilite } from "../modelePlateforme/mobilite";
import { AideFinanciere } from "../modelePlateforme/aideFinanciere";
import { Contact } from "../modelePlateforme/contact";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    template: require("./templates/vueAPropos.html")
})
export default class VueAPropos extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;

    public ajoutPartenaire(partenaire: Partenaire): void {

    }

    public modificationPartenaire(partenaire: Partenaire): void {

    }

    public suppressionPartenaire(partenaire: Partenaire): void {

    }

    public ajoutSpecialiteDansPartenaire(specialite: Specialite, partenaire: Partenaire): void {

    }

    public suppressionSpecialiteDansPartenaire(specialite: Specialite, partenaire: Partenaire): void {

    }

    public ajoutMobiliteDansPartenaire(mobilite: Mobilite, partenaire: Partenaire): void {

    }

    public suppressionMobiliteDansPartenaire(mobilite: Mobilite, partenaire: Partenaire): void {

    }

    public ajoutAideFinanciereDansPartenaire(aideFinanciere: AideFinanciere, partenaire: Partenaire): void {

    }

    public suppressionAideFinanciereDansPartenaire(aideFinanciere: AideFinanciere, partenaire: Partenaire): void {

    }

    public ajoutContactDansPartenaire(contact: Contact, partenaire: Partenaire): void {

    }

    public suppressionContactDansPartenaire(contact: Contact, partenaire: Partenaire): void {

    }

    public ajoutAideFinanciere(aideFinanciere: AideFinanciere): void {

    }

    public suppressionAideFinanciere(aideFinanciere: AideFinanciere): void {

    }

    public modificationAideFinanciere(aideFinanciere: AideFinanciere): void {

    }

    public ajoutContact(contact: Contact): void {

    }

    public suppressionContact(contact: Contact): void {

    }

    public modificationContact(contact: Contact): void {

    }

    public constructor() {
        super();
        this.controleurPlateforme.inscrire(this);
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

}