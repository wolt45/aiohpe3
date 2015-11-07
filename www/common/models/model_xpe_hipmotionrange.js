$data.Entity.extend("$ipadrbg.types.clinix_HipMotionRange", {
	HipMeasuresRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, FlexionContra: { type: "string"}
	, Flexion: { type: "string"}
	, Extension: { type: "string"}
	, IR: { type: "string"}
	, ER: { type: "string"}
	, AbductionSupine: { type: "string"}
	, AbductionLateral: { type: "string"}
	, Adduction: { type: "string"}
	
	, SLR_Ryn: { type: "string"}
	, SLRValR: { type: "string"}
	, SLR_Lyn: { type: "string"}
	, SLRValL: { type: "string"}

	, Resist_Ryn: { type: "string"}
	, ResistRight: { type: "string"}
	, Resist_Lyn: { type: "string"}
	, ResistLeft: { type: "string"}

	, SynchStatus: { type: "string"}
});