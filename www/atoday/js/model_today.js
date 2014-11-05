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
});

$ipadrbg.context = new $ipadrbg.types.ngpxContext({ name: "webSql", databaseName: "ipadrbg" });

$ipadrbg.context.onReady(function(){
	angular.element('#view').scope().ShowData();
});
// end of DB context definitions