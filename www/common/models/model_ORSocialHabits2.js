$data.Entity.extend("$ipadrbg.types.jdata_ORSocHab2", {
	ORRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, Name: { type: "string"}
	, Dose: { type: "string"}
	, Route: { type: "string"}
	, Frequency: { type: "string"}
			
	, SynchStatus: { type: "string"}
});