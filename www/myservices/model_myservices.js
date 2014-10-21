$data.EntityContext.extend("$ipadrbg.types.ngpxContext", {
	  clinix: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix }
	, tbl_TranStatus: { type: $data.EntitySet, elementType: $ipadrbg.types.tbl_TranStatus }
	, tbl_Tariff: { type: $data.EntitySet, elementType: $ipadrbg.types.tbl_Tariff }
});

$ipadrbg.context = new $ipadrbg.types.ngpxContext({ name: "webSql", databaseName: "ipadrbg" });