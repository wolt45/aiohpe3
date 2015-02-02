$data.Entity.extend("$ipadrbg.types.clinix_HipStanding", {
	HipStandingRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, Standing: { type: "string"}
	, Left: { type: "string"}
	, Right: { type: "string"}
});