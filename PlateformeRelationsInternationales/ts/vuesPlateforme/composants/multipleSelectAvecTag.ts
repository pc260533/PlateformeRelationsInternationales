import { OptionMultipleSelectAvecTag } from "./optionMultipleSelectAvecTag";

import { Component, Prop, Vue } from "vue-property-decorator";

import "select2";
import "select2/dist/css/select2.css";
import "@ttskch/select2-bootstrap4-theme/dist/select2-bootstrap4.css"
import { OptionData, SearchOptions } from "select2";

@Component({
    template: require("../templates/multipleSelectAvecTag.html")
})
export default class MultipleSelectAvecTag extends Vue {
    @Prop() private idMultipleSelectAvecTag!: string;
    @Prop() private placeholderSelect!: string;
    @Prop() private tagActive!: boolean;
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
            allowClear: true,
            tags: this.tagActive,
            createTag: function (params: SearchOptions) {
                var valeurTag = $.trim(params.term);
                if (!/\S+@\S+\.\S+/.test(valeurTag)) {
                  return null;
                }
                return {
                    id: valeurTag,
                    text: valeurTag,
                    newTag: true
                }
            }
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

    public getListeOptionsSelectionneeAvecGroupe(): OptionMultipleSelectAvecTag[] {
        var listeOptionsSelectionnees: OptionMultipleSelectAvecTag[] = [];
        this.multipleSelect.select2("data").forEach((optionData: OptionData) => {
            var optionMultipleSelectAvecTag: OptionMultipleSelectAvecTag = new OptionMultipleSelectAvecTag(optionData.id, optionData.text);
            optionMultipleSelectAvecTag.GroupeParentOption = $(optionData.element).prevAll().filter("optgroup").first().attr("label");
            listeOptionsSelectionnees.push(optionMultipleSelectAvecTag);
        });
        return listeOptionsSelectionnees;
    }

    public ajouterOptionGroupDansSelect(optionGroupLabel: string): void {
        this.multipleSelect.append('<optgroup label="' + optionGroupLabel + '">').trigger("change");
    }

    public ajouterOptionDansSelect(optionMultipleSelectAvecTag: OptionMultipleSelectAvecTag): void {
        this.multipleSelect.append(new Option(optionMultipleSelectAvecTag.TexteOption, optionMultipleSelectAvecTag.IdentifiantOption, false, false)).trigger("change");
    }

    public viderSelect(): void {
        this.multipleSelect.empty().trigger("change");
    }

}