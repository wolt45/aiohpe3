$data.Entity.extend("$ipadrbg.types.jdata_ClosePEdsig", {
	dsigRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	, NursePIN: { type: "string"}
	, DoctorPIN: { type: "string"}
	, b64a: { type: "string"}
	, b64b: { type: "string"}
	, b64c: { type: "string"}
	, Deleted: { type: "string"}
				
	, SynchStatus: { type: "string"}
});