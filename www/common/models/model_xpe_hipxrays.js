$data.Entity.extend("$ipadrbg.types.clinix_HipXRays", {
	HipXRaysRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, APPelvisBothHipsDate: { type: "date"}
	, Pelvis: { type: "string"}
	, XRayArea: { type: "string"}
	, XRayAreaSeverity: { type: "string"}
	, XRayOthers: { type: "string"}
});