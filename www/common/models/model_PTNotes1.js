$data.Entity.extend("$ipadrbg.types.jdata_PTNotes1", {
	PTRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, DateEntered: { type: "string"}
	, PTNotes: { type: "string"}
	, ROM: { type: "string"}
	, MMT: { type: "string"}
	, PAIN: { type: "string"}
	, SENSORY: { type: "string"}
	, PROBLEMLIST: { type: "string"}
	, STG: { type: "string"}
	, LTG: { type: "string"}
	, PLAN: { type: "string"}


	, Deleted: { type: "string"}
	, SynchStatus: { type: "string"}
});