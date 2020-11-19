import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { Partenaire } from "../modelePlateforme/partenaire";
import { SousSpecialite } from "../modelePlateforme/sousspecialite";
import { Mobilite } from "../modelePlateforme/mobilite";
import { AideFinanciere } from "../modelePlateforme/aideFinanciere";
import { Contact } from "../modelePlateforme/contact";
import { Cout } from "../modelePlateforme/cout";
import { ErreurSerializable } from "../erreur/erreurSerializable";

import imagePartenaires from "../../images/accueil/partenaires.png";
import imagesAidesFinancieres from "../../images/accueil/aidesfinancieres.png";
import imageContacts from "../../images/accueil/contacts.png";
import imageCouts from "../../images/accueil/couts.png";
import imageAPropos from "../../images/accueil/apropos.png";

import CarouselSpecifique from "./composants/carouselSpecifique";
import ModalErreur from "./composants/modalErreur";

import "../../scss/vues/vueAccueil.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("./templates/vueAccueil.html"),
    components: {
        CarouselSpecifique,
        ModalErreur
    }
})
export default class VueAccueil extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;

    @Ref("carouselAccueil") readonly carouselAccueil!: CarouselSpecifique;
    @Ref("modalErreur") readonly modalErreur!: ModalErreur;

    public afficheErreur(erreur: ErreurSerializable): void {
        this.modalErreur.afficherErreur(erreur);
    }

    public ajoutPartenaire(partenaire: Partenaire): void {

    }

    public modificationPartenaire(partenaire: Partenaire): void {

    }

    public suppressionPartenaire(partenaire: Partenaire): void {

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

    public ajoutCout(cout: Cout): void {

    }

    public modificationCout(cout: Cout): void {

    }

    private afficherImages(): void {
        $("#imagePartenaires").attr("src", imagePartenaires);
        $("#imageAidesFinancieres").attr("src", imagesAidesFinancieres);
        $("#imageContacts").attr("src", imageContacts);
        $("#imageCouts").attr("src", imageCouts);
        $("#imageAPropos").attr("src", imageAPropos);
    }

    private afficherCarousel(): void {
        this.carouselAccueil.ajouterSlide("https://esirem.u-bourgogne.fr/wp-content/uploads/2020/01/%C3%A9tudiants-%C3%A0-nex-york-1024x887.jpg", "New York", "New York", true);
        this.carouselAccueil.ajouterSlide("https://esirem.u-bourgogne.fr/wp-content/uploads/2020/01/nouvelle-z%C3%A9lande-1-1024x683.jpg", "Nouvelle-Zélande", "Nouvelle-Zélande", false);
        this.carouselAccueil.ajouterSlide("https://esirem.u-bourgogne.fr/wp-content/uploads/2020/01/japon.jpg", "Japon", "Japon", false);
        this.carouselAccueil.ajouterSlide("https://esirem.u-bourgogne.fr/wp-content/uploads/2020/01/19665656_1558722814201763_1632916992237948771_n-1.jpg", "Miami", "Miami", false);
        this.carouselAccueil.ajouterSlide("https://esirem.u-bourgogne.fr/wp-content/uploads/2020/01/kentucky.jpg", "Kentucky", "Kentucky", false);
        this.carouselAccueil.ajouterSlide("https://esirem.u-bourgogne.fr/wp-content/uploads/2020/01/remi.jpg", "Corée", "Corée", false);
        this.carouselAccueil.ajouterSlide("https://esirem.u-bourgogne.fr/wp-content/uploads/2020/01/japon-1.jpg", "Japon", "Japon", false);
    }

    public constructor() {
        super();
        this.controleurPlateforme.inscrire(this);
    }

    mounted() {
        //import(/* webpackChunkName: "accueilscss" */"../../scss/vues/vueAccueil.scss");
        this.afficherImages();
        this.afficherCarousel();
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

}