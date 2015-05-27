$data.Entity.extend("$ipadrbg.types.clinix_PEcharges", {
	PEChargesRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, ChargeRID: { type: "int"}
	, ChargeItem: { type: "string"}
	, Tariff: { type: "float" }
	, ChargeAmount: { type: "float" }
	, Discount: { type: "float" }
	, NetAmount: { type: "float" }
	, LinePayment: { type: "float" }
	, LineBalance: { type: "float" }
	, SynchStatus: { type: "int" }

	, SynchStatus: { type: "string"}
});