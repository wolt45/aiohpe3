$data.Entity.extend("$ipadrbg.types.clinix_DiagsNotes", {
	DiagsNotesRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, Notes: { type: "string"}
});