$data.Entity.extend("$ipadrbg.types.clinix_PEcharges", {
	PEChargesRID: { type: "int", key: true, computed: true }
	, ClinixRID: { type: "string"}
	, PxRID: { type: "string"}
	
	, ChargeRID: { type: "int"}
	, ChargeItem: { type: "string"}
	, Tariff: { type: "number" }
	, ChargeAmount: { type: "number" }
	, Discount: { type: "number" }

	, PHIC: { type: "number" }
	, HMOs: { type: "number" }
	, SrCIT: { type: "number" }

	, NetAmount: { type: "number" }
	, LinePayment: { type: "number" }
	, LineBalance: { type: "number" }
	, SynchStatus: { type: "int" }

	, SynchStatus: { type: "string"}
});