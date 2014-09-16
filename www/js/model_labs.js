$data.Entity.extend("$ipadrbg.types.clinix_LABS", {
	SpineIntlRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, labXRayDate: { type: "string"}
	, labXRayReport: { type: "string"}
	, MRIDate: { type: "string"}
	, MRIReport: { type: "string"}

	, CTSCanDate: { type: "string"}
	, CTScanReport: { type: "string"}
	, BloodTest: { type: "string"}
	, BloodTestWhere: { type: "string"}
	, BloodTestReport: { type: "string"}
});