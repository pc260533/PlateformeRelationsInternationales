import { Component, Vue } from "vue-property-decorator";

import { Plateforme } from "./modelePlateforme/plateforme";
import { ControleurPlateforme } from "./controleurPlateforme";
import { Partenaire } from "./modelePlateforme/partenaire";

@Component({
    template: require("./vuesPlateforme/templates/applicationVue.html")
})
export default class ApplicationVue extends Vue {
    private plateforme: Plateforme;
    private controleurPlateforme: ControleurPlateforme;

    public constructor() {
        super();
        this.plateforme = new Plateforme();
        console.log(this.plateforme);
        let partenaire = new Partenaire();
        partenaire.NomPartenaire = "testNomPartenaire";
        this.plateforme.ajouterPartenaire(partenaire);
        this.controleurPlateforme = new ControleurPlateforme(this.plateforme);
    }

    created() {
        console.log("created");
    }

    mounted() {
        console.log("mounted");
    }

}