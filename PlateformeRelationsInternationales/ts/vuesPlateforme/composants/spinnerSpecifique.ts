import { Component, Prop, Vue } from "vue-property-decorator";

import { Spinner } from "spin.js";
import "spin.js/spin.css";

@Component({
    template: require("../templates/spinnerSpecifique.html")
})
export default class SpinnerSpecifique extends Vue {
    private spinner: Spinner;
    private elementSpinner: HTMLElement;

    mounted() {
        var options = {
            lines: 12,
            length: 80,
            width: 9,
            radius: 84,
            scale: 0.85,
            corners: 1,
            color: "#999ED6",
            fadeColor: "transparent",
            speed: 1,
            rotate: 0,
            animation: "spinner-line-fade-quick",
            direction: 1,
            zIndex: 2e9,
            className: "spinner",
            top: "50%",
            left: "50%",
            shadow: "0 0 1px transparent",
            position: "fixed"
        };
        this.elementSpinner = $(this.$el).get(0) as HTMLElement;
        this.spinner = new Spinner(options);
    }

    public montrerSpinner(): void {
        this.spinner.spin(this.elementSpinner);
    }

    public cacherSpinner(): void {
        this.spinner.stop();
    }

}

