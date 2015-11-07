$data.Entity.extend("$ipadrbg.types.clinix_KneeMotionRange", {
	KneeMeasuresRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, FlexionContracture: { type: "string"}
	, Extension: { type: "string"}
	, Flexion: { type: "string"}

	, SynchStatus: { type: "string"}
});