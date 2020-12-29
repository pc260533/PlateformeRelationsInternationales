import { OptionMultipleSelectAvecTag } from "./OptionMultipleSelectAvecTag";

import { Component, Prop, Vue } from "vue-property-decorator";

import "select2";
import "select2/dist/css/select2.css";
import "@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.css"
import { OptionData } from "select2";

@Component({
    template: require("../templates/multipleSelectAvecTag.html")
})
export default class MultipleSelectAvecTag extends Vue {
    @Prop() private idMultipleSelectAvecTag!: string;
    @Prop() private placeholderSelect!: string;
    private multipleSelect: JQuery<Element>;

    public constructor() {
        super();
    }

    mounted() {
        this.multipleSelect = $(this.$el);
        this.multipleSelect.select2({
            placeholder: this.placeholderSelect,
            theme: "bootstrap4",
            width: "100%",
            allowClear: true
        });
    }

    beforeDestroy() {
        this.multipleSelect.select2("destroy");
    }

    public onChange(callbackMontrerModal: () => void): void {
        this.multipleSelect.on("change", () => {
            callbackMontrerModal();
        });
    }

    public getListeOptionsSelectionnee(): OptionMultipleSelectAvecTag[] {
        var listeOptionsSelectionnees: OptionMultipleSelectAvecTag[] = [];
        this.multipleSelect.select2("data").forEach((optionData: OptionData) => {
            listeOptionsSelectionnees.push(new OptionMultipleSelectAvecTag(optionData.id, optionData.text));
        });
        return listeOptionsSelectionnees;
    }

    public ajouterOptionGroupDansSelect(optionGroupLabel: string): void {
        this.multipleSelect.append('<optgroup label="' + optionGroupLabel + '">').trigger("change");
    }

    public ajouterOptionDansSelect(optionMultipleSelectAvecTag: OptionMultipleSelectAvecTag): void {
        this.multipleSelect.append(new Option(optionMultipleSelectAvecTag.TexteOption, optionMultipleSelectAvecTag.IdentifiantOption, false, false)).trigger("change");
    }

}