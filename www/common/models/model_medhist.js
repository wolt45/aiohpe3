$data.Entity.extend("$ipadrbg.types.clinix_MedHist", {
	MedHistlRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, MedHist: { type: "string"}
	, MedHistYN: { type: "string"}
	, MedHistDetails: { type: "string"}

	, SynchStatus: { type: "string"}
});