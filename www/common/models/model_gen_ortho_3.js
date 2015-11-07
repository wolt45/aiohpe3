$data.Entity.extend("$ipadrbg.types.jdata_genotho_3", {
	GenOrthoRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, xfindings: { type: "string"}
	, AbnormalDes: { type: "string"}
			
	, SynchStatus: { type: "string"}
});