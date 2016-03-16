$data.Entity.extend("$ipadrbg.types.jdata_ORPotProb", {
	ORRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, PotentProb: { type: "string"}
	, Transport: { type: "string"}
	, TransReco: { type: "string"}
	, SupportDev: { type: "string"}
	, MentalStats: { type: "string"}
	, MentalStatsOth: { type: "string"}
	, IntraOp: { type: "string"}
			
	, SynchStatus: { type: "string"}
});