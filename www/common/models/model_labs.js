$data.Entity.extend("$ipadrbg.types.clinix_LABS", {
	LabsRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, labCategory: { type: "string"}
	, labDate: { type: "string"}
	, labSource: { type: "string"}
	, labReport: { type: "string"}

	, SynchStatus: { type: "string"}
});