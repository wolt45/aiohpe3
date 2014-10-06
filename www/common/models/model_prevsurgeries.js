$data.Entity.extend("$ipadrbg.types.clinix_previousSurgeries", {
	PrevSurgRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "text"}
	, PxRID: { type: "text"}
	
	, SurgeryType: { type: "text"}
	, SurgeryWhen: { type: "text"}
	, SurgeryWhere	: { type: "text"}
	, SurgeryWho: { type: "text"}
	
	, SurgeryHelped: { type: "text"}
	, SurgeryHowMany: { type: "text"}
	, SurgeryHowManyUnit: { type: "text"}
});