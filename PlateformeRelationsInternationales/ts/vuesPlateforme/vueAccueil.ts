import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    template: require("./templates/vueAccueil.html")
})
export default class VueAccueil extends Vue implements IVuePlateforme {
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
        console.log(this.plateforme);
        //this.controleurPlateforme.inscrire(this);
        console.log(this.controleurPlateforme);
    }

    created() {
        console.log(this.plateforme);
    }

    mounted() {
        console.log(this.plateforme);
    }

}