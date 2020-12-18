import { DHXView } from "dhx-optimus";
import { getChapterContent, updateContent } from "../../api/chapterApi";
import { getDocumentContent } from "../../api/documentsApi";
var doc_content = require("templates/document.html");

export class DocumentContentView extends DHXView{
	render(){

		let app = this.app;
		


		this.ui = this.root.attachHTMLString(doc_content({
			content: "",
		}));

		this.attachEvent("UpdateChapterContent", (content) => {
			this._update(content);
		});

		this.attachEvent("showDocumentContent", (id, level) => {
			this._showContent(id, level);
		});


	}

	_update(content){
		var cId = this.app.getService("DocumentGrid").selected();
		updateContent({notes:content}, cId);
	}

	_showContent(id, level){
		tinymce.activeEditor.setContent("");

		if (level > 0) {
			getChapterContent(tinymce, id);
		} else {
			getDocumentContent(tinymce, id.substring(4));
		}
			
	}
}