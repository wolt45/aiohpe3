$data.Entity.extend("$ipadrbg.types.clinix_DiagsDisposition", {
	DiagsDispoRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, DispoCardioClearance: { type: "string"}
	, DispoHome: { type: "string"}
	, DispoHospital: { type: "string"}
	, DispoAccompanying: { type: "string"}
});