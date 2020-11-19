import { ErreurSerializable } from "../../erreur/erreurSerializable";

import ModalSpecifique from "./modalSpecifique";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("../templates/modalErreur.html"),
    components: {
        ModalSpecifique
    }
})
export default class ModalErreur extends Vue {
    @Ref("modalErreur") readonly modalErreur!: ModalSpecifique;

    public constructor() {
        super();
    }

    public afficherErreur(erreur: ErreurSerializable): void {
        $("#message").text(erreur.MessageErreur);
        $("#titreErreur").text(erreur.TitreErreur);
        $("#status").text(erreur.StatusErreur);
        $("#developpeurMessage").text(erreur.DeveloppeurMessageErreur);
        $("#stackTrace").text(erreur.StackTraceErreur);
        this.modalErreur.montrerModal();
    }

}