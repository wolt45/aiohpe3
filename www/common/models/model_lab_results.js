$data.Entity.extend("$ipadrbg.types.LAB_Results", {
	LabRexRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, LabRexTypeRID	: { type: "string"}
	, LCatRID: { type: "string"}
	, RefNum: { type: "string"}
	, RefDate: { type: "string"}
	, DateEntered: { type: "string"}

	, DateDone: { type: "string"}
	, ScannedUploaded: { type: "string"}
	, EnteredBy: { type: "string"}
	, SourceLocation: { type: "string"}

	, ImageFolder: { type: "string"}
	, ImageFileName: { type: "string"}
	, SysFileName: { type: "string"}	
	, HangRID: { type: "string"}	
	, data64: { type: "string"}	
		
	, Final: { type: "string"}	
	, remarks: { type: "string"}		
	, Deleted: { type: "string"}		
	, SynchStatus: { type: "string"}
});