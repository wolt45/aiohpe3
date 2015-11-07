$data.Entity.extend("$ipadrbg.types.lkup_PEChargesTariff", {
	  FeeRID: { type: "int", key: true, computed: true }
	, Parent: { type: "int" }
	, ParentFeeRID: { type: "int" }
	, Description: { type: "string" }
	, SortOrder: { type: "int" }
	, Tariff: { type: "float" }
	, ChargeAmount: { type: "float" }
	, Discount: { type: "float" }
	, Deleted: { type: "int"}

	, ClinixRID: { type: "int" }
	, PxRID: { type: "int" }

	, SynchStatus: { type: "string"}
});