$data.Entity.extend("$ipadrbg.types.clinix_DiagsManagement", {
	DiagsMgmtRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, PhysicalTherapy : { type: "string"}
	, ExerProg_FootAnkle : { type: "string"}
	, ExerProg_QuadsHamstrings : { type: "string"}
	, ExerProg_SLR: { type: "string"}
	, AmbuTraining: { type: "string"}


	, HyaluronicAcid: { type: "string"}
	, ManageOthers: { type: "string"}

	, SynchStatus: { type: "string"}
});