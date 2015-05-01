$data.Entity.extend("$ipadrbg.types.clinix_HipStanding", {
	HipStandingRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, PelvisLevel: { type: "string"}
	, Trendelenberg: { type: "string"}
});