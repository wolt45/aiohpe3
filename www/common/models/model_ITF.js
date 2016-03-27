$data.Entity.extend("$ipadrbg.types.jdata_ITF", {
	ITFRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, Hospital: { type: "string"}
	, RefHosp: { type: "string"}
	, PreOpBP: { type: "string"}
	, RecPhy: { type: "string"}
	, TimeRef: { type: "string"}
	, BrifHist: { type: "string"}
	, T: { type: "string"}
	, O2sat: { type: "string"}
	, Width: { type: "string"}
	, Height: { type: "string"}
	, Lab: { type: "string"}
	, MedGiven: { type: "string"}
	, Diagnosis: { type: "string"}
	, MedTansfer: { type: "string"}
			
	, SynchStatus: { type: "string"}
});