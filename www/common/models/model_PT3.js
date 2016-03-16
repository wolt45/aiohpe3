$data.Entity.extend("$ipadrbg.types.jdata_PT3", {
	PTRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, CutaneousIntact: { type: "string"}
	, CutaneousImpaired: { type: "string"}
	, CutaneousComments: { type: "string"}
	, ProprioceptionIntact : { type: "string"}
	, ProprioceptionImpaired: { type: "string"}
	, ProprioceptionComments: { type: "string"}

	
	, Deleted: { type: "string"}
	, SynchStatus: { type: "string"}
});