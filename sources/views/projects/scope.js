import { DHXView } from "dhx-optimus";
// import { getScopeContent, updateContent } from "../../api/ScopeApi";
var doc_content = require("templates/scope.html");

export class ScopeContentView extends DHXView{
	render(){

		// let app = this.app;

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