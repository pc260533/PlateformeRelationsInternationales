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
import { InformationSerializable } from "../information/informationSerializable";

import "../../scss/vues/vueErreur.scss";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    template: require("./templates/vueErreur.html")
})
export default class VueErreur extends Vue implements IVuePlateforme {
    @Prop() private plateforme!: Plateforme;
    @Prop() private controleurPlateforme!: ControleurPlateforme;
    @Prop() private erreurSerializable!: ErreurSerializable;

    public afficheErreur(erreur: ErreurSerializable): void {

    }

    public afficheInformation(information: InformationSerializable): void {

    }

    public constructor() {
        super();
        this.controleurPlateforme.inscrire(this);
        var jsonErreur = $("#donneeJsonException").text();
        if (jsonErreur != "") {
            var jsonErreurObjet = JSON.parse(jsonErreur);
            this.erreurSerializable.MessageErreur = jsonErreurObjet.messageErreur;
            this.erreurSerializable.TitreErreur = jsonErreurObjet.titreErreur;
            this.erreurSerializable.StatusErreur = jsonErreurObjet.statusErreur;
            this.erreurSerializable.DeveloppeurMessageErreur = jsonErreurObjet.developpeurMessageErreur;
            this.erreurSerializable.StackTraceErreur = jsonErreurObjet.stackTraceErreur;
        }
    }

    mounted() {

    }

    beforeDestroy() {
        this.controleurPlateforme.resilier(this);
    }

}