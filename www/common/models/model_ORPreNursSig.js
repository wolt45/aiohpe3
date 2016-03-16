$data.Entity.extend("$ipadrbg.types.jdata_ORNurseSig", {
	ORRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, dsig_pin: { type: "string"}
	, dsig_spec: { type: "string"}
	, dsig_img: { type: "string"}
	, dsig_pxrid: { type: "string"}
				
	, SynchStatus: { type: "string"}
});