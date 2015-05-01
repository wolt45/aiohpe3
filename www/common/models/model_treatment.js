$data.Entity.extend("$ipadrbg.types.clinix_treatment", {
	TreatmentRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "text"}
	, PxRID: { type: "text"}
	
	, medAnalgesic: { type: "text"}
	, medAntiInflamatory: { type: "text"}
	, medOthers	: { type: "text"}

	, injSteroidsVolume: { type: "text"}
	, injSteroidsWhen: { type: "text"}
	, injSteroidsResult: { type: "boolean"}
	, injSteroidsDetails: { type: "text"}

	, injHyaluronicAcid: { type: "text"}
	, injHyaluronicResult: { type: "boolean"}
	, injHyaluronicDetails: { type: "text"}
});