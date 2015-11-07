$data.Entity.extend("$ipadrbg.types.clinix_StructuredManagement", {
	StructuredMgmtRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, PhysicalTherapy : { type: "string"}

	, ExProg_FootAnkle : { type: "string"}
	, ExProg_QuadsHams : { type: "string"}
	, ExProg_FullWeight	: { type: "string"}
	, ExProg_SLR : { type: "string"}

	, AmbulatoryAid : { type: "string"}
	, TEDS : { type: "string"}
	, Shower : { type: "string"}
	, Notes : { type: "string"}
	, FollowUp : { type: "string"}

	, SynchStatus: { type: "string"}
});