$data.Entity.extend("$ipadrbg.types.jdata_PTHist", {
	PTRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, PTHistory: { type: "string"}

	, Deleted: { type: "string"}
	, SynchStatus: { type: "string"}
});