import { DHXView } from "dhx-optimus";
var doc_content = require("templates/document.html");

export class MoodleTopicContentView extends DHXView {

    render(){

        let app = this.app;

        tinymce.init({
            selector:"textarea#document",
            height: 706,
            plugins: [
                "save advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste emoticons textcolor colorpicker textpattern autosave responsivefilemanager"
            ],
            toolbar1: "save | insertfile undo redo | styleselect | fontselect |  bold italic underline strikethrough | localautosave",
            toolbar2: "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons",
            image_advtab: true,
            save_enablewhendirty: true,
            paste_data_images: true,
            media_live_embeds: true,

            save_onsavecallback: function () {
                var content = tinymce.activeEditor.getContent();
                // app.callEvent("UpdateChapterContent", [content]);
            }

        });

        this.ui = this.root.attachHTMLString(doc_content({
            content: "",
        }));

        // this.attachEvent("UpdateChapterContent", (content) => {
        //     this._update(content);
        // });
        //
        this.attachEvent("showCourseContent", (content) => {
            tinymce.activeEditor.setContent(content);
        });

    }
}