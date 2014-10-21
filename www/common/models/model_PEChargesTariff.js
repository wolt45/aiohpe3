$data.Entity.extend("$ipadrbg.types.tbl_Tariff", {
	  FeeRID: { type: "int", key: true, computed: true }
	, Parent: { type: "int" }
	, ParentFeeRID: { type: "int" }
	, Description: { type: "string" }
	, SortOrder: { type: "int" }
	, DefaultAmount: { type: "float" }
	, Deleted: { type: "int"}
});