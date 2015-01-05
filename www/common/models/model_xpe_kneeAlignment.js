$data.Entity.extend("$ipadrbg.types.clinix_KneeAlignment", {
	KneeAlignmentRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, Alignment: { type: "string"}
	, Degrees: { type: "string"}
});