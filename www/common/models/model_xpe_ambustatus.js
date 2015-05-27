$data.Entity.extend("$ipadrbg.types.clinix_AmbuStatus", {
	AmbuStatusRID: { type: "int", key: true, computed: true }
	,ClinixRID: { type: "string"}
	,PxRID: { type: "string"}
	
	, PhysicalCondition: { type: "string"}
	, AmbulatoryAid: { type: "string"}
	, AbleTo: { type: "string"}

	, SynchStatus: { type: "string"}
});