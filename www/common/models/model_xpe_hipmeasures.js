$data.Entity.extend("$ipadrbg.types.clinix_HipMeasures", {
	HipMeasuresRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, SupineLength: { type: "string"}
	, LR: { type: "string"}
	, AbsentNormal: { type: "string"}
	, Others: { type: "string"}

	, SynchStatus: { type: "string"}
});