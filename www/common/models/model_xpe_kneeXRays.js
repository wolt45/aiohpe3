$data.Entity.extend("$ipadrbg.types.clinix_KneeXRays", {
	KneeXRaysRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, APDate: { type: "string"}
	, Normal: { type: "string"}
	, VarusDegrees: { type: "string"}
	, JointSpaceVarusR: { type: "string"}
	, JointSpaceVarusL: { type: "string"}
	, ValgusDegrees: { type: "string"}
	, JointSpaceValgusR: { type: "string"}
	, JointSpaceValgusL: { type: "string"}
	, BilateralJointSpace: { type: "string"}
	, LaurinPatel_LR: { type: "string"}
	, LaurinPatel_LRSeverity: { type: "string"}

	, SynchStatus: { type: "string"}
});