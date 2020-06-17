import { DHXView } from "dhx-optimus";
// import { getScopeContent, updateContent } from "../../api/ScopeApi";
var doc_content = require("templates/scope.html");

export class ScopeContentView extends DHXView{
	render(){

		let app = this.app;
		
		tinymce.init({
			selector:"textarea#scope",
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
				app.callEvent("UpdateScopeContent", [content]);
			}

		});

		this.ui = this.root.attachHTMLString(doc_content({
			content: "",
		}));

		this.attachEvent("UpdateScopeContent", (content) => {
			this._update(content);
		});

		this.attachEvent("showScopeContent", (id) => {
			this._showContent(id);
		});


	}

	_update(content){
		var cId = this.app.getService("DocumentGrid").selected();
		// updateContent({notes:content}, cId);
	}

	_showContent(id){
		tinymce.activeEditor.setContent("");
		// getScopeContent(tinymce, id);
	}
}