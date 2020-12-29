import { Component, Prop, Vue } from "vue-property-decorator";

import tinymce from "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/skins/ui/oxide/skin.min.css"
import "tinymce/skins/ui/oxide/content.min.css"

import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/print";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/paste";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";

@Component({
    template: require("../templates/editeurHtml.html")
})
export default class EditeurHtml extends Vue {
    @Prop() private idEditeurHtml!: string;

    public constructor() {
        super();
    }

    mounted() {
        tinymce.remove("#" + this.idEditeurHtml);
        tinymce.init({
            selector: "#" + this.idEditeurHtml,
            skin: false,
            content_css: false,
            height: 500,
            menubar: false,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste help wordcount"
            ],
            toolbar: "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "link image | removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        });
    }

    beforeDestroy() {
        //tinymce.remove("#" + this.idEditeurHtml);
        //tinymce.EditorManager.editors = []; 
    }

    public getContenuHtml(): string {
        return tinymce.get(this.idEditeurHtml).getContent();
    }

    public setContenuHtml(contenuHtml: string): void {
        tinymce.get(this.idEditeurHtml).setContent(contenuHtml);
    }

    public viderContenuHtml(): void {
        tinymce.get(this.idEditeurHtml).setContent("");
    }

}