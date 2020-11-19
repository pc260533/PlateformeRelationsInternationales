import Vue from "vue";
import Router from "vue-router";
import VuePartenaire from "./vuesPlateforme/vuePartenaires";
import { Plateforme } from "./modelePlateforme/plateforme";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/partenaires",
            name: "partenaires",
            component: VuePartenaire,
            props: true
        },
        /*{
            path: "/about",
            name: "about",
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ /*"./views/About.vue"),
        },*/
    ],
});