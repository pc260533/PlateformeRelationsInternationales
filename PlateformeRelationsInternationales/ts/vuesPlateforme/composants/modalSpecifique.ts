import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    template: require("../templates/modalSpecifique.html")
})
export default class ModalSpecifique extends Vue {
    @Prop() private idModal!: string;
    @Prop() private tailleModal!: string;
    @Prop() private classeHeader!: string;

    mounted() {

    }

    public montrerModal(): void {
        ($(this.$el) as any).modal();
    }

    public cacherModal(): void {
        ($(this.$el) as any).modal("hide");
    }

    public onMontrerModal(callbackMontrerModal: () => void): void {
        $(this.$el).on("shown.bs.modal", () => {
            callbackMontrerModal();
        });
    }

    public onCacherModal(callbackCacherModal: () => void): void {
        $(this.$el).on("hidden.bs.modal", () => {
            callbackCacherModal();
        });
    }

}