$data.Entity.extend("$ipadrbg.types.clinix", {
	ClinixRID: { type: "int", key: true, computed: true },

	AppDateSet: { type: "string"},
	TranStatus: { type: "int"},

	PxRID: { type: "int"},
	pxname: { type: "string" },
	pxAddress: { type: "string" },
	pxstatus: { type: "string" },
	pxregdate: {type:"string"},
	pxFoto: {type:"string"}
});

// { type: "int", key: true, computed: true }