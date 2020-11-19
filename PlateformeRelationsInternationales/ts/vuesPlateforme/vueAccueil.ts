import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";

import imageCategories from "../../images/accueil/categories.png";
import imageClients from "../../images/accueil/clients.png";
import imageMarques from "../../images/accueil/marques.png";
import imageProduits from "../../images/accueil/produits.png";

import imageLogo from "../../images/logo.png";
import imageFavicon from "../../images/favicon.png";

//import "../../scss/vues/vueAccueil.scss";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    template: require("./templates/vueAccueil.html")
})
export default class VueAccueil extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;

    public afficherImages(): void {
        $("#imageCategories").attr("src", imageCategories);
        $("#imageClients").attr("src", imageClients);
        $("#imageMarques").attr("src", imageMarques);
        $("#imageProduits").attr("src", imageProduits);

        $("link").attr("href", imageFavicon);
        $("#imageLogo").attr("src", imageLogo);
    }

    public ajoutPartenaire(partenaire: Partenaire): void {

    }

    public modificationPartenaire(partenaire: Partenaire): void {

    }

    public suppressionPartenaire(partenaire: Partenaire): void {

    }

    public constructor() {
        super();
        this.controleurPlateforme.inscrire(this);
        console.log(this.plateforme);
        console.log(this.controleurPlateforme);
    }

    mounted() {
        import(/* webpackChunkName: "accueilscss" */"../../scss/vues/vueAccueil.scss");
        this.afficherImages();
        console.log(this.controleurPlateforme);
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

}