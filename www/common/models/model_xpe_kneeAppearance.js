$data.Entity.extend("$ipadrbg.types.clinix_KneeAppearance", {
	KneeAppearanceRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, Appearance: { type: "string"}
	, Severity: { type: "string"}
});