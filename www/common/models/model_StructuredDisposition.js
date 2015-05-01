$data.Entity.extend("$ipadrbg.types.clinix_StructuredDisposition", {
	StrucDispoRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, Dispo : { type: "string"}
	, DispoDetail : { type: "string"}
});