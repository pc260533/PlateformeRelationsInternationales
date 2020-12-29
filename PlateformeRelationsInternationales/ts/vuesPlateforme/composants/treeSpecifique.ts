import { NoeudTreeSpecifique } from "./noeudTreeSpecifique";

import { Component, Prop, Vue } from "vue-property-decorator";

import "jstree"
import "jstree/dist/themes/default/style.min.css"
import "jstree-bootstrap-theme/dist/themes/proton/style.min.css"

@Component({
    template: require("../templates/treeSpecifique.html")
})
export default class TreeSpecifique extends Vue {
    @Prop() private idTree!: string;
    private jsTree: JSTree;

    public constructor() {
        super();
    }

    mounted() {
        this.jsTree = $(this.$el).jstree({
            "core": {
                "check_callback": true,
                //"dots": false,
                "icons": false,
                "themes": {
                    "name": "proton",
                    "responsive": true,
                    "icons": false,
                }
            },
            "checkbox": {
                "keep_selected_style": false
            },
            "plugins": ["checkbox"],
        });
        this.jsTree = $(this.$el).jstree();
    }

    public getListeFeuilleSelectionne(): NoeudTreeSpecifique[] {
        var listeNoeudsSpecifiqueSelectionnes = [];
        this.jsTree.get_selected(true).forEach((node: any) => {
            if (this.jsTree.is_leaf(node)) {
                listeNoeudsSpecifiqueSelectionnes.push(new NoeudTreeSpecifique(node.id, node.text));
            }
        });
        return listeNoeudsSpecifiqueSelectionnes;
    }

    public selectionnerNoeud(noeudTreeSpecifique: NoeudTreeSpecifique): void {
        this.jsTree.select_node(noeudTreeSpecifique.IdentifiantNoeud);
    }

    public deselectionnerTousLesNoeuds(): void {
        this.jsTree.deselect_all();
    }

    public ajouterNoeudRacine(noeudTreeSpecifique: NoeudTreeSpecifique): void {
        this.jsTree.create_node("#", {
            "id": noeudTreeSpecifique.IdentifiantNoeud,
            "text": noeudTreeSpecifique.TexteNoeud,
            "state": {
                "opened": noeudTreeSpecifique.EstOuvert,
                "disabled": noeudTreeSpecifique.EstInactive,
                "selected": noeudTreeSpecifique.EstSelectionne
            }
        }, "last", false);
    }

    public ajouterNoeud(noeudTreeSpecifiqueAAjouter: NoeudTreeSpecifique, noeudTreeSpecifiqueParent: NoeudTreeSpecifique): void {
        this.jsTree.create_node(noeudTreeSpecifiqueParent.IdentifiantNoeud, {
            "id": noeudTreeSpecifiqueAAjouter.IdentifiantNoeud,
            "text": noeudTreeSpecifiqueAAjouter.TexteNoeud,
            "state": {
                "opened": noeudTreeSpecifiqueAAjouter.EstOuvert,
                "disabled": noeudTreeSpecifiqueAAjouter.EstInactive,
                "selected": noeudTreeSpecifiqueAAjouter.EstSelectionne
            }
        }, "last", false);
    }

}