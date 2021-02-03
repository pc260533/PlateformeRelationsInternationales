import { IVuePlateforme } from "../ivuePlateforme";
import { Plateforme } from "../modelePlateforme/plateforme";
import { ControleurPlateforme } from "../controleurPlateforme";
import { ErreurSerializable } from "../erreur/erreurSerializable";
import { InformationSerializable } from "../information/informationSerializable";

import imagePartenaires from "../../images/accueil/partenaires.png";
import imagesAidesFinancieres from "../../images/accueil/aidesfinancieres.png";
import imageCoordinateurs from "../../images/accueil/coordinateurs.png";
import imageCouts from "../../images/accueil/couts.png";
import imageMails from "../../images/accueil/mails.png";
import imageAPropos from "../../images/accueil/apropos.png";
import imageAdministration from "../../images/accueil/administration.png";

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

    public afficheInformation(information: InformationSerializable): void {

    }

    private afficherImages(): void {
        $("#imagePartenaires").attr("src", imagePartenaires);
        $("#imageAidesFinancieres").attr("src", imagesAidesFinancieres);
        $("#imageCoordinateurs").attr("src", imageCoordinateurs);
        $("#imageCouts").attr("src", imageCouts);
        $("#imageMails").attr("src", imageMails);
        $("#imageAPropos").attr("src", imageAPropos);
        $("#imageAdministration").attr("src", imageAdministration);
    }

    private afficherCarousel(): void {
        var listeImagesEtudiants = JSON.parse(process.env.IMAGES_ETUDIANTS);
        var estActive: boolean = true;
        listeImagesEtudiants.forEach((imageEtudiant: any) => {
            if (estActive) {
                this.carouselAccueil.ajouterSlide(imageEtudiant.cheminImage, imageEtudiant.titreImage, imageEtudiant.sousTitreImage, true);
                estActive = false;
            }
            else {
                this.carouselAccueil.ajouterSlide(imageEtudiant.cheminImage, imageEtudiant.titreImage, imageEtudiant.sousTitreImage, false);
            }
        });
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