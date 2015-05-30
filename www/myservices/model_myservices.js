$data.EntityContext.extend("$ipadrbg.types.ngpxContext", {
	  clinix: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix }
	, lkup_TranStatus: { type: $data.EntitySet, elementType: $ipadrbg.types.lkup_TranStatus }
	, lkup_PEChargesTariff: { type: $data.EntitySet, elementType: $ipadrbg.types.lkup_PEChargesTariff }
	
	, LAB_Results: { type: $data.EntitySet, elementType: $ipadrbg.types.LAB_Results }
});

$ipadrbg.context = new $ipadrbg.types.ngpxContext({ name: "webSql", databaseName: "ipadrbg" });