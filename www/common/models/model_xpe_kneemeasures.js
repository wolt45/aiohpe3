$data.Entity.extend("$ipadrbg.types.clinix_KneeMeasures", {
	KneeMeasuresRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, Supine: { type: "string"}
	, Left: { type: "string"}
	, Right: { type: "string"}
});