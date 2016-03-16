$data.Entity.extend("$ipadrbg.types.jdata_ORIntraOp", {
	ORRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, MentStats: { type: "string"}
	, Equipment: { type: "string"}
	, Site1: { type: "string"}
	, Site1Set: { type: "string"}
	, Site2: { type: "string"}
	, Site2Set: { type: "string"}
	, AntiEm: { type: "string"}
	, NurseScrub: { type: "string"}
	, NurseCircu: { type: "string"}
	, Position: { type: "string"}
			
	, SynchStatus: { type: "string"}
});