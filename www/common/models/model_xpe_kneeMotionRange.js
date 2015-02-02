$data.Entity.extend("$ipadrbg.types.clinix_KneeMotionRange", {
	KneeMeasuresRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, MotionArea: { type: "string"}
	, Left: { type: "string"}
	, Right: { type: "string"}
});