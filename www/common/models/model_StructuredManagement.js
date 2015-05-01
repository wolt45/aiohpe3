$data.Entity.extend("$ipadrbg.types.clinix_StructuredManagement", {
	StructuredMgmtRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, Management		: { type: "string"}
	, ManagementDetail	: { type: "string"}
});