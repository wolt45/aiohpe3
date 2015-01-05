$data.Entity.extend("$ipadrbg.types.clinix_HipXRays", {
	HipXRaysRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, APPelvisBothHipsDate: { type: "date"}
	, Pelvis: { type: "string"}
	, HipJoint: { type: "string"}
	, Avascular: { type: "string"}
	, NarrowingHipJoint: { type: "string"}
	, Subluxation: { type: "string"}
	, Osteoporosis: { type: "string"}
	, FractionsNeck: { type: "string"}
	, Others: { type: "string"}
});