$data.Entity.extend("$ipadrbg.types.clinix_DiagsMedication", {
	DiagsMedsRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "text"}
	, PxRID: { type: "text"}
	
	, GenericName	: { type: "text"}
	, Brand			: { type: "text"}
	, Qty			: { type: "text"}
	, DropName		: { type: "text"}
	, Dose			: { type: "text"}
	, Duration		: { type: "text"}

	, SynchStatus: { type: "string"}
});