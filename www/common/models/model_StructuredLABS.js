$data.Entity.extend("$ipadrbg.types.clinix_StructuredLABS", {
	StructLabsRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, labDate: { type: "string"}
	, labSource: { type: "string"}
	
	, WBC: { type: "string"}
	, HgB: { type: "string"}
	, Hematocrit: { type: "string"}
	, Others: { type: "string"}

	, SynchStatus: { type: "int" }

	, SynchStatus: { type: "string"}
});