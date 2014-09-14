
NOT USED, FOR DELETE

// entity metadata
$data.Entity.extend("$ipadrbg.types.clinix", {
	ClinixRID: { type: "string"},
	PxRID: { type: "string"},
	pxname: { type: "string" },
	Address: { type: "string" },
	pxstatus: { type: "string" },
	pxregdate: {type:"string"},
	Foto: {type:"string"}
});

$data.Entity.extend("$ipadrbg.types.clinix_chiefcomp", {
	ChiefRID: { type: "int", key: true, computed: true },
	ClinixRID: { type: "string"},
	PxRID: { type: "string"},
	MyBone: { type: "string"},
	MyBoneLRB: { type: "string" },
	MyBoneComplaint: { type: "string"},
	Remarks: { type: "string"}
});




// entity metadata to SQLite
$data.EntityContext.extend("$ipadrbg.types.ngpxContext", {
	clinix: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix },
	clinix_chiefcomp: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_chiefcomp }
});

// start of DB context definitions
$ipadrbg.context = new $ipadrbg.types.ngpxContext({ name: "webSql", databaseName: "ipadrbg" });

$ipadrbg.context.onReady(function(){
	angular.element('#view').scope().ShowData();
});
// end of DB context definitions