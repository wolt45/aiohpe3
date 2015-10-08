$data.Entity.extend("$ipadrbg.types.clinix_StructuredHospitalization", {
	StructuredHospitalzRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, DateAdmitted: { type: "string"}
	, DateDischarged: { type: "string"}
	, HospitalCourse: { type: "string"}
	, WoundAppearance: { type: "string"}
	, SynchStatus: { type: "int" }

	, SynchStatus: { type: "string"}
});