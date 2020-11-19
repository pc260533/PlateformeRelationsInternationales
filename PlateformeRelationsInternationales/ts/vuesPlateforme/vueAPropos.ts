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

import ModalErreur from "./composants/modalErreur";

import imageAPropos from "../../images/apropos/apropos.png";

import "../../scss/vues/vueAPropos.scss";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("./templates/vueAPropos.html"),
    components: {
        ModalErreur
    }
})
export default class VueAPropos extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;

    private nomApplication: string;
    private versionApplication: string;
    private databaseHostApplication: string;
    private listeCreditsClientsApplication: any[];
    private listeCreditsServeursApplication: any[];
    private listeAuteursApplication: any[];

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

    public constructor() {
        super();
        this.controleurPlateforme.inscrire(this);
        this.nomApplication = process.env.NOM_APPLICATION;
        this.versionApplication = process.env.VERSION_APPLICATION;
        this.databaseHostApplication = process.env.DATASOURCENAME_BASEDEDONNEEPLATEFORME;
        this.listeCreditsClientsApplication = JSON.parse(process.env.LISTECREDITSCLIENTS_APPLICATION);
        this.listeCreditsServeursApplication = JSON.parse(process.env.LISTECREDITSSERVEURS_APPLICATION);
        this.listeAuteursApplication = JSON.parse(process.env.AUTEURS_APPLICATION);
    }

    mounted() {
        $("#imageAPropos").attr("src", imageAPropos);
    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

}