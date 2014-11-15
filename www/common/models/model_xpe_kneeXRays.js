$data.Entity.extend("$ipadrbg.types.clinix_KneeXRays", {
	KneeXRaysRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, APDate: { type: "date"}
	, APXRayItem: { type: "string"}
	, XRayArea: { type: "string"}
	, Medial: { type: "string"}
	, Lateral: { type: "string"}
});