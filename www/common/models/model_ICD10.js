$data.Entity.extend("$ipadrbg.types.jdata_ICD10", {
	lkup_ICDRID: { type: "int", key: true, computed: true }
	, icd_code: { type: "string"}
	, icd_description: { type: "string"}
	, SynchStatus: { type: "string"}
});