$data.Entity.extend("$ipadrbg.types.jdata_PT4", {
	PTRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, LandMark: { type: "string"}
	, RightMeasurement: { type: "string"}
	, LeftMeasurement: { type: "string"}
	, Difference : { type: "string"}
	
	, Deleted: { type: "string"}
	, SynchStatus: { type: "string"}
});