import Vue from "vue";

export class Application {
    private applicationVue: Vue;

    public constructor() {
        this.applicationVue = new Vue({

        });
        console.log("test");
    }

}