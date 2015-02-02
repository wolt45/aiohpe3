$data.Entity.extend("$ipadrbg.types.clinix_etiology", {
	EtiologyRID: { type: "int", key: true, computed: true }
	,ClinixRID: { type: "string"}
	,PxRID: { type: "string"}

	,Injury: { type: "string"}
	,DateEtio: { type: "string"}
	,WorkRelated: { type: "string" }
	,WorkRelatedDetails: { type: "string" }
	,OnsetAccuteGradual: { type: "string"}
	,Duration: { type: "string"}
	,DurationUnit: { type: "string"}
	,Severity: { type: "string"}
	,AmbulatoryAid: { type: "string"}
});