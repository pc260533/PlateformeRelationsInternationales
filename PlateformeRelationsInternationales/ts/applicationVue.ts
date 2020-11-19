import { Plateforme } from "./modelePlateforme/plateforme";
import { ControleurPlateforme } from "./controleurPlateforme";
import { Partenaire } from "./modelePlateforme/partenaire";

import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

import imageLogo from "../images/logo.png";
import imageFavicon from "../images/favicon.png";

@Component({
    template: require("./vuesPlateforme/templates/applicationVue.html")
})
export default class ApplicationVue extends Vue {
    //private plateforme: Plateforme;
    //private controleurPlateforme: ControleurPlateforme;

    public constructor() {
        super();
        /*this.plateforme = new Plateforme();
        console.log(this.plateforme);
        let partenaire = new Partenaire();
        partenaire.NomPartenaire = "testNomPartenaire";
        this.plateforme.ajouterPartenaire(partenaire);
        this.controleurPlateforme = new ControleurPlateforme(this.plateforme);*/
    }

    created() {

    }

    mounted() {
        $("link").attr("href", imageFavicon);
        $("#imageLogo").attr("src", imageLogo);
    }

    @Watch("$route", { immediate: true })
    onRouteChanged(to: Route, from: Route) {
        document.title = to.meta.title;
    }

}