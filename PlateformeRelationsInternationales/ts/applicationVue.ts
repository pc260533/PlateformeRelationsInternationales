import { Plateforme } from "./modelePlateforme/plateforme";

import { Component, Vue } from "vue-property-decorator";
import VuePartenaire from "./vuesPlateforme/vuePartenaires";
import { ControleurPlateforme } from "./controleurPlateforme";
import { Partenaire } from "./modelePlateforme/partenaire";

@Component({
    template: require("./vuesPlateforme/templates/applicationVue.html"),
    components: {
        VuePartenaire
    },
})
export default class ApplicationVue extends Vue {
    private plateforme: Plateforme;
    private controleurPlateforme: ControleurPlateforme;
    private msg: string;

    public constructor() {
        super();
        this.msg = "oui";
        this.plateforme = new Plateforme();
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