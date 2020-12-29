import Vue from "vue";
import Vuex from "vuex";
import StoreModuleAuthentification from "./storeModuleAuthentification";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        storeModuleAuthentification: StoreModuleAuthentification
    }
});