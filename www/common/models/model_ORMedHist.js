$data.Entity.extend("$ipadrbg.types.jdata_ORMedHist", {
	ORRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, IVStarted: { type: "string"}
	, SolutionUsed: { type: "string"}
			
	, SynchStatus: { type: "string"}
});