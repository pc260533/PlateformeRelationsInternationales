import { InformationSerializable } from "../../information/informationSerializable";

import ModalSpecifique from "./modalSpecifique";

import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
    template: require("../templates/modalInformation.html"),
    components: {
        ModalSpecifique
    }
})
export default class ModalInformation extends Vue {
    @Ref("modalInformation") readonly modalInformation!: ModalSpecifique;

    public constructor() {
        super();
    }

    public afficherInformation(information: InformationSerializable): void {
        $("#titreInformation").text(information.TitreInformation);
        $("#messageInformation").text(information.MessageInformation);
        $("#detailsInformation").text(information.DetailsInformation);
        this.modalInformation.montrerModal();
    }

}