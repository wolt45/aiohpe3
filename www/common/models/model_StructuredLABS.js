$data.Entity.extend("$ipadrbg.types.clinix_StructuredLABS", {
	StructLabsRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, labDate: { type: "date"}
	, labSource: { type: "string"}
	
	, WBC: { type: "string"}
	, HgB: { type: "string"}
	, Hematocrit: { type: "string"}

	, SynchStatus: { type: "int" }
});