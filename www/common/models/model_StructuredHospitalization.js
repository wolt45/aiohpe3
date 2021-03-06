$data.Entity.extend("$ipadrbg.types.clinix_StructuredHospitalization", {
	StructuredHospitalzRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}

	, DateAdmitted: { type: "string"}
	, TimeAdmitted: { type: "string"}
	, DateDischarged: { type: "string"}
	, TimeDischarged: { type: "string"}
	, HospitalCourse: { type: "string"}
	, WoundAppearance: { type: "string"}
	, SynchStatus: { type: "int" }

	, SynchStatus: { type: "string"}
});