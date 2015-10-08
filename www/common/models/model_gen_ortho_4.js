$data.Entity.extend("$ipadrbg.types.jdata_genotho_4", {
	GenOrthoRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, Medications: { type: "string"}
	, Injections: { type: "string"}
	, PhysicalTherapy: { type: "string"}
	, Others: { type: "string"}
	, Disposition: { type: "string"}
			
	, SynchStatus: { type: "string"}
});