import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    template: require("../templates/modalSpecifique.html")
})
export default class ModalSpecifique extends Vue {

    mounted() {

    }

    public montrerModal(): void {
        ($(this.$el) as any).modal();
    }

    public cacherModal(): void {
        ($(this.$el) as any).modal("hide");
    }

}