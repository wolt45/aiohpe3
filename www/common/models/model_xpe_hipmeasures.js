$data.Entity.extend("$ipadrbg.types.clinix_HipMeasures", {
	HipMeasuresRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, Supine: { type: "string"}
	, Left: { type: "string"}
	, Right: { type: "string"}
});