$data.EntityContext.extend("$ipadrbg.types.ngpxContext", {
	  clinix: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix }
	, clinix_chiefcomp: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_chiefcomp }
	, clinix_spineIntl: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_spineIntl }
	, clinix_etiology: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_etiology }
	, clinix_treatment: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_treatment }
	, clinix_previousSurgeries: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_previousSurgeries }
	, clinix_LABS: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_LABS }
	, clinix_MedHist: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_MedHist }
	, lkup_TranStatus: { type: $data.EntitySet, elementType: $ipadrbg.types.lkup_TranStatus }
	
	, zclinix: { type: $data.EntitySet, elementType: $ipadrbg.types.zclinix }

	, LAB_Results: { type: $data.EntitySet, elementType: $ipadrbg.types.LAB_Results }
	, jdata_SF3601: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_SF3601 }
	, jdata_SF3602: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_SF3602 }
	, jdata_SF3603: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_SF3603 }
	, jdata_SF3604: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_SF3604 }
	, jdata_SF3605: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_SF3605 }
	, jdata_SF3606: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_SF3606 }
	, jdata_SF3607: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_SF3607 }
	, jdata_SF3608: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_SF3608 }
});

$ipadrbg.context = new $ipadrbg.types.ngpxContext({ name: "webSql", databaseName: "ipadrbg" });

$ipadrbg.context.onReady(function(){
	angular.element('#view').scope().ShowData();
});
// end of DB context definitions