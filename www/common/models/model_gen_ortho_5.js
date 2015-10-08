$data.Entity.extend("$ipadrbg.types.jdata_genotho_5", {
	GenOrthoRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, XrayDate: { type: "string"}
	, XrayReport: { type: "string"}
	, MRIDate: { type: "string"}
	, MRIReport: { type: "string"}
	, CTSCANDate: { type: "string"}
	, CTSCANReport: { type: "string"}
	, BloodExams: { type: "string"}
	, BloodExamsWhere: { type: "string"}
	, BloodReports: { type: "string"}
			
	, SynchStatus: { type: "string"}
});