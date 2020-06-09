import {DHXView} from "dhx-optimus";

export class DocumentsGridView extends DHXView{
	render(){
        this.ui = this.root.attachGrid();
        this.ui.setIconsPath("./codebase/imgs/");

        this.ui.setHeader([
          "ID",
          "Title",
          "Owner",
          "Date Created",
          "Publish",
          "Show Details",
        ]);
        this.ui.setColTypes("ro,ed,ro,dhxCalendar,ch,ch");
      
        this.ui.setColSorting("int,str,str,date,int,int");
        this.ui.setInitWidths("*,*,*,*,*,*");
        this.ui.init();
		this._load();
			
		this.ui.attachEvent("onRowSelect", e =>{
			let data = {};
			this.ui.forEachCell(e, (cell,ind)=>data[this.ui.getColumnId(ind)] = cell.getValue());
			this.app.callEvent("onDocumentSelect",[{data:data}]);
		});
		this.ui.attachEvent("onRowInserted",(r, index)=>{
			this.ui.setCellTextStyle(this.ui.getRowId(index), this.ui.getColIndexById("name"), "font-weight:bold;border-left-width:0px;");
		});
	}
	
	_load(){
		// this.ui.load("codebase/data/contacts.xml",()=>{
		// 	if(this.app.$device==="desktop"){
		// 		this.ui.selectRow(0,true);
		// 	}
		// });
	}
	
}
