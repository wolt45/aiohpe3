$data.Entity.extend("$ipadrbg.types.clinix_StructuredMedication", {
	StructuredMedsRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "text"}
	, PxRID: { type: "text"}
	
	, GenericName	: { type: "text"}
	, Brand			: { type: "text"}
	, Qty			: { type: "text"}
	, DropName		: { type: "text"}
	, Dose			: { type: "text"}
});