$data.Entity.extend("$ipadrbg.types.clinix_Diagnosis", {
	DiagnosisRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, Diagnosis: { type: "string"}
	
	, SynchStatus: { type: "string"}
});