$data.Entity.extend("$ipadrbg.types.clinix_StructuredSchedSurgery", {
	StructuredSchedSurgRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, SurgeryType : { type: "string"}
	, SurgeryDate : { type: "date"}
	, Surgeon	  : { type: "string"}
	, Assistant	  : { type: "string"}
	, Cardio	  : { type: "string"}
	, Anesthesio  : { type: "string"}
	, Hospital	  : { type: "string"}
	, Others	  : { type: "string"}

	, SynchStatus: { type: "string"}
});