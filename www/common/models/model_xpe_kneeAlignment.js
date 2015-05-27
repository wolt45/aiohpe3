$data.Entity.extend("$ipadrbg.types.clinix_KneeAlignment", {
	KneeAlignmentRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, Normal: { type: "string"}
	, Alignment: { type: "string"}
	, Varus: { type: "string"}
	, Valgus: { type: "string"}

	, SynchStatus: { type: "string"}
});