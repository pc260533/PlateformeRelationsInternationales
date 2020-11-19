import { IVuePlateforme } from "../ivuePlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";

import { Component, Prop, Vue } from "vue-property-decorator";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";

@Component({
    template: require("./templates/vuePartenaires.html")
})
export default class VuePartenaire extends Vue implements IVuePlateforme {
    @Prop() private msg!: string;
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
        this.controleurPlateforme.chargerPartenaires();
        console.log(this.msg);
        console.log(this.plateforme);
        console.log(this.controleurPlateforme);
    }

    mounted() {
        //this.test();
    }

    public test(): void {
        $("h1").text("AHHHHH");
    }

}