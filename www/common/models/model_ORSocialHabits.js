$data.Entity.extend("$ipadrbg.types.jdata_ORSocHab", {
	ORRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, PatientUsed: { type: "string"}
	, Transportation: { type: "string"}
	, TransSel: { type: "string"}
	, NameRef: { type: "string"}
	, PhoneRef: { type: "string"}
	, Allergies: { type: "string"}
	, MedicationAll: { type: "string"}
	, FoodAll: { type: "string"}
			
	, SynchStatus: { type: "string"}
});