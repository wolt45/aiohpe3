$data.Entity.extend("$ipadrbg.types.clinix_KneeAppearance", {
	KneeAppearanceRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, NormalR: { type: "string"}
	, SwellingR: { type: "string"}
	, RedR: { type: "string"}

	, SynovitisR: { type: "string"}
	, EffusionR: { type: "string"}
	, PainActiveROMR: { type: "string"}
	, PainPassiveROMR: { type: "string"}

	, NormalL: { type: "string"}
	, SwellingL: { type: "string"}
	, RedL: { type: "string"}

	, SynovitisL: { type: "string"}
	, EffusionL: { type: "string"}
	, PainActiveROML: { type: "string"}
	, PainPassiveROML: { type: "string"}

	, SynchStatus: { type: "string"}
});