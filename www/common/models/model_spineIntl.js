$data.Entity.extend("$ipadrbg.types.clinix_spineIntl", {
	SpineIntlRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, MySpineNeck: { type: "string"}
	, MySpineUpperBack: { type: "string"}
	, MySpineLowerBack: { type: "string"}
	, MySpineOthers: { type: "string"}

	, SynchStatus: { type: "string"}
});