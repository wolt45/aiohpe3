$data.Entity.extend("$ipadrbg.types.clinix_HipXRays", {
	HipXRaysRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, APPelvisBothHipsDate: { type: "date"}
	, Pelvis: { type: "string"}
	, PelvisInches: { type: "string"}
	
	, Avascular: { type: "string"}
	, Narrowing: { type: "string"}
	, Subluxation: { type: "string"}
	, Osteoporosis: { type: "string"}
	, FracturesNeck: { type: "string"}
	, Intertrouch: { type: "string"}
	, Others: { type: "string"}

	, SynchStatus: { type: "string"}
});