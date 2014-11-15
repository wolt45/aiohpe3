$data.Entity.extend("$ipadrbg.types.clinix", {
	ClinixRID: { type: "int", key: true, computed: true }
	,AppDateSet: { type: "date"}
	,TranStatus: { type: "int"}

	,TranStatusDisp: { type: "string"}
	,preForeColor: { type: "string"}
	,preBackColor: { type: "string"}

	,PxRID: { type: "int"}
	,pxname: { type: "string" }
	,pxAddress: { type: "string" }
	,pxstatus: { type: "string" }
	,pxregdate: {type: "date"}
	,pxFoto: {type: "string"}
});