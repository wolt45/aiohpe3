$data.Entity.extend("$ipadrbg.types.clinix_StructuredDisposition", {
	StrucDispoRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, Disposition : { type: "string"}
	, DispoValue : { type: "string"}

	, SynchStatus: { type: "string"}
});