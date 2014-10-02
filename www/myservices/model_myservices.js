$data.EntityContext.extend("$ipadrbg.types.ngpxContext", {
	clinix: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix }
});

$ipadrbg.context = new $ipadrbg.types.ngpxContext({ name: "webSql", databaseName: "ipadrbg" });