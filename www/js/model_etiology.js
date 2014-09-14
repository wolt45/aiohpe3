$data.Entity.extend("$ipadrbg.types.clinix_etiology", {
	EtiologyRID: { type: "int", key: true, computed: true },
	ClinixRID: { type: "string"},
	PxRID: { type: "string"},
	Injury: { type: "boolean"},
	DateEtio: { type: "string"},
	WorkRelated: { type: "boolean" },
	WorkRelatedDetails: { type: "string" },
	OnsetAccuteGradual: { type: "int"},
	Duration: { type: "string"},
	DurationUnit: { type: "string"},
	Severity: { type: "string"}
});