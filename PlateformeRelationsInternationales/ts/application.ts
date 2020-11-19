import Vue from "vue";
import App from "./vuesPlateforme/App.vue";

import { Plateforme } from "./modelePlateforme/plateforme";

export class Application {
    private applicationVue: Vue;
    private plateforme: Plateforme;

    public constructor() {
        this.applicationVue = new Vue({
            render: h => h(App)
        }).$mount("#app");
    }

}