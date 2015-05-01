$data.Entity.extend("$ipadrbg.types.clinix_StructuredDiagnosis", {
	StructuredDiagnosisRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, Diagnosis: { type: "string"}
});