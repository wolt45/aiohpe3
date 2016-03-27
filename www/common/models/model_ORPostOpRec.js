$data.Entity.extend("$ipadrbg.types.jdata_ORpostOpRec", {
	ORRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, PostOpTime: { type: "string"}
	, AccompBy: { type: "string"}
	, PreOpBP: { type: "string"}
	, P: { type: "string"}
	, Temp: { type: "string"}
	, Sp02: { type: "string"}
	, Via: { type: "string"}
	, FromStr: { type: "string"}
	, Anesthesia: { type: "string"}
	, O2MaskCan: { type: "string"}
			
	, SynchStatus: { type: "string"}
});