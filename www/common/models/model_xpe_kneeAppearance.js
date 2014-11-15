$data.Entity.extend("$ipadrbg.types.clinix_KneeAppearance", {
	KneeAppearanceRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, AppearanceItem: { type: "string"}
	, NatureOfAppearance: { type: "string"}
	, AppearanceSeverity: { type: "string"}
});