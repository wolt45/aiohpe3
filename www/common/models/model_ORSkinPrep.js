$data.Entity.extend("$ipadrbg.types.jdata_ORSkinPrep", {
	ORRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, SiteDef: { type: "string"}
	, Site: { type: "string"}
	, NurstimeStart: { type: "string"}
	, NurstimeEnd: { type: "string"}
	, CountOff: { type: "string"}
	, CountOffCor: { type: "string"}
	
			
	, SynchStatus: { type: "string"}
});