$data.Entity.extend("$ipadrbg.types.jdata_ICD10", {
	SpineRID: { type: "int", key: true, computed: true }
	
	, lkup_ICDRID: { type: "string"}
	, icd_code: { type: "string"}
	, icd_description: { type: "string"}

	, SynchStatus: { type: "string"}
});