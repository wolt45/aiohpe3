$data.Entity.extend("$ipadrbg.types.clinix_KneeAlignment", {
	KneeAlignmentRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, Alignment: { type: "string"}
	, Degrees1: { type: "string"}
	, Degrees2: { type: "string"}
});