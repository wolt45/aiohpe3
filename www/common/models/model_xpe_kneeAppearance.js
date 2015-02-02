$data.Entity.extend("$ipadrbg.types.clinix_KneeAppearance", {
	KneeAppearanceRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, AppearanceR: { type: "string"}
	, SeverityR: { type: "string"}

	, SynovitisR: { type: "string"}
	, EffusionR: { type: "string"}
	, PainActiveROMR: { type: "string"}
	, PainPassiveROMR: { type: "string"}

	, AppearanceL: { type: "string"}
	, SeverityL: { type: "string"}

	, SynovitisL: { type: "string"}
	, EffusionL: { type: "string"}
	, PainActiveROML: { type: "string"}
	, PainPassiveROML: { type: "string"}
});