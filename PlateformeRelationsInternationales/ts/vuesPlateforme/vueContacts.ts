import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    template: require("./templates/vueContacts.html")
})
export default class VueContacts extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;

    ajoutPartenaire(partenaire: Partenaire): void {

    }

    modificationPartenaire(partenaire: Partenaire): void {

    }

    suppressionPartenaire(partenaire: Partenaire): void {

    }

    public constructor() {
        super();
        this.controleurPlateforme.inscrire(this);
        console.log(this.plateforme);
        console.log(this.controleurPlateforme);
    }

}