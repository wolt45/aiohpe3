$data.Entity.extend("$ipadrbg.types.clinix_StructuredLABS", {
	StructLabsRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, labCategory: { type: "string"}
	, labDate: { type: "date"}
	, labSource: { type: "string"}
	, labReport: { type: "string"}
	, SynchStatus: { type: "int" }
});