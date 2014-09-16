$data.Entity.extend("$ipadrbg.types.clinix_MedHist", {
	MedHistlRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, HeartMedsYes: { type: "boolean"}
	, HeartMeds: { type: "string"}

	, HeartSurgeryYes: { type: "boolean"}
	, HeartSurgeryDate: { type: "string"}

	, HypertensionYes: { type: "boolean" }
	, Hypertension: { type: "string" }

	, DiabetesYes: { type: "boolean"}
	, Diabetes: { type: "string"}

	, KidneyYes: { type: "boolean"}
	, Kidney: { type: "string"}

	, GIsYes: { type: "boolean"}
	, GIs: { type: "string"}

	, AllergiesYes: { type: "boolean"}
	, Allergies: { type: "string"}

	, InfectionHistoryYes: { type: "boolean"}
	, InfectionHistory: { type: "string"}

	, LungsYes: { type: "boolean"}
	, Lungs: { type: "string"}

	, TraumaYes: { type: "boolean"}
	, Trauma: { type: "string"}

	, CNSYes: { type: "boolean"}
	, CNS: { type: "string"}

	, Others: { type: "string"}
});