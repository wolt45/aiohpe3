$data.Entity.extend("$ipadrbg.types.clinix_KneeXRays", {
	KneeXRaysRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, APDate: { type: "string"}
	
	, APStandingR: { type: "string"}
	, APDegreesR: { type: "string"}
	, APSeverityR: { type: "string"}
	, APMedialR: { type: "string"}
	, APLateralR: { type: "string"}

	, APStandingL: { type: "string"}
	, APDegreesL: { type: "string"}
	, APSeverityL: { type: "string"}
	, APMedialL: { type: "string"}
	, APLateralL: { type: "string"}

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

	, LaurinPatellaSeverityR: { type: "string"}
	, LaurinPatellaSeverityL: { type: "string"}
});