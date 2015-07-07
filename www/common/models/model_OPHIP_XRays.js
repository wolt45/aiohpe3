// NOT USED, MOVED TO lab results table instead
// NOT USED, MOVED TO lab results table instead
// NOT USED, MOVED TO lab results table instead
// NOT USED, MOVED TO lab results table instead

$data.Entity.extend("$ipadrbg.types.jdata_OPHIP_XRays", {
	OPHIP_XRaysRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, IsPostOp: { type: "string"}
	, xrDate: { type: "string"}
	, xrSource: { type: "string"}
	, xrResult: { type: "string"}
	
	, SynchStatus: { type: "string"}
});