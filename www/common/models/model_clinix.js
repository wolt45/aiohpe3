$data.Entity.extend("$ipadrbg.types.clinix", {
	ClinixRID: { type: "int", key: true, computed: true }

	,AppDateSet: { type: "string"}
	,AppDateAge: { type: "int"}
	,TranStatus: { type: "int"}

	,TranStatusDisp: { type: "string"}
	,preForeColor: { type: "string"}
	,preBackColor: { type: "string"}

	,PxRID: { type: "int"}
	,pxname: { type: "string" }
	,pxAddress: { type: "string" }
	,pxstatus: { type: "string" }

	,pxregdate: {type: "string"}
	,pxFoto: {type: "string"}

	,HospitalRID: {type: "string"}
	,Hospital: {type: "string"}
	
	,PurposeOfVisit: {type: "string"}
	,Dok: {type: "string"}
	
	, SynchStatus: { type: "string"}
});