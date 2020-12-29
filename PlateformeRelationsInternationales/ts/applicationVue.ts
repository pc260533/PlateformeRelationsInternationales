import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

import imageLogo from "../images/logo.png";
import imageLogoNoir from "../images/logoNoir.png";
import imageFavicon from "../images/favicon.png";

@Component({
    template: require("./vuesPlateforme/templates/applicationVue.html")
})
export default class ApplicationVue extends Vue {

    public constructor() {
        super();
    }

    created() {

    }

    mounted() {
        $("link").attr("href", imageFavicon);
        $("#imageLogo").attr("src", imageLogoNoir);
        $("#imageLogo").attr("src", imageLogo);
    }

    @Watch("$route", { immediate: true })
    onRouteChanged(to: Route, from: Route) {
        document.title = to.meta.title;
    }

}