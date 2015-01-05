$data.Entity.extend("$ipadrbg.types.clinix_KneeXRays", {
	KneeXRaysRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, APDate: { type: "string"}
	
	, APStanding: { type: "string"}
	, APDegrees: { type: "string"}
	, APSeverity: { type: "string"}
	, APMedial: { type: "string"}
	, APLateral: { type: "string"}

	, Varus: { type: "string"}
	, VarusDegrees: { type: "string"}
	, VarusSeverity: { type: "string"}
	, VarusMedial: { type: "string"}
	, VarusLateral: { type: "string"}

	, Valgus: { type: "string"}
	, ValgusDegrees: { type: "string"}
	, ValgusSeverity: { type: "string"}
	, ValgusMedial: { type: "string"}
	, ValgusLateral: { type: "string"}

	, Lateral30: { type: "string"}
	, Lateral30Degrees: { type: "string"}
	, Lateral30Severity: { type: "string"}
	, Lateral30Medial: { type: "string"}
	, Lateral30Lateral: { type: "string"}

	, LaurinPatella: { type: "string"}
	, LaurinPatellaDegrees: { type: "string"}
	, LaurinPatellaSeverity: { type: "string"}
	, LaurinPatellaMedial: { type: "string"}
	, LaurinPatellaLateral: { type: "string"}
});