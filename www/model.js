$data.Entity.extend("$ipadrbg.types.px_data", {
	PxRID: { type: "string"},
	pxname: { type: "string" },
	Address: { type: "string" },
	pxstatus: { type: "string" },
	pxregdate: {type:"string"},
	Foto: {type:"string"}
});

$data.EntityContext.extend("$ipadrbg.types.ngpxContext", {
	px_data: { type: $data.EntitySet, elementType: $ipadrbg.types.px_data }
});

$ipadrbg.context = new $ipadrbg.types.ngpxContext({ name: "webSql", databaseName: "ipadrbg" });