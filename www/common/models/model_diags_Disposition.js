$data.Entity.extend("$ipadrbg.types.clinix_DiagsDisposition", {
	DiagsDispoRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, Disposition : { type: "string"}
	, DispoValue  : { type: "string"}
	, FollowUpDate: { type: "date"}
});