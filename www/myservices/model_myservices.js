$data.EntityContext.extend("$ipadrbg.types.ngpxContext", {
	  clinix: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix }
	, lkup_TranStatus: { type: $data.EntitySet, elementType: $ipadrbg.types.lkup_TranStatus }
	, lkup_PEChargesTariff: { type: $data.EntitySet, elementType: $ipadrbg.types.lkup_PEChargesTariff }
	
	, LAB_Results: { type: $data.EntitySet, elementType: $ipadrbg.types.LAB_Results }
	, clinix_chiefcomp: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_chiefcomp }
	, clinix_etiology: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_etiology }
	, clinix_treatment: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_treatment }
	, clinix_previousSurgeries: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_previousSurgeries }
	, clinix_LABS: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_LABS }
	, clinix_MedHist: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_MedHist }

	, clinix_Diagnosis: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_Diagnosis }
	, clinix_DiagsManagement: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsManagement }
	, clinix_DiagsMedication: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsMedication }
	, clinix_DiagSchedSurgery: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagSchedSurgery }
	, clinix_DiagsDisposition: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsDisposition }
	, clinix_DiagsNotes: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsNotes }



	, jdata_OPHIP_2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_2 }
	, jdata_OPHIP_3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_3 }
	, jdata_OPHIP_4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_4 }
	, jdata_OPHIP_5: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_5 }
	, jdata_OPHIP_6: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_6 }

	, jdata_OPKNEE_2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_2 }
	, jdata_OPKNEE_3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_3 }
	, jdata_OPKNEE_4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_4 }
	, jdata_OPKNEE_5: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_5 }


});

$ipadrbg.context = new $ipadrbg.types.ngpxContext({ name: "webSql", databaseName: "ipadrbg" });