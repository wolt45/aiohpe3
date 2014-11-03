$data.EntityContext.extend("$ipadrbg.types.ngpxContext", {
	  clinix: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix }
	, clinix_chiefcomp: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_chiefcomp }
	, clinix_spineIntl: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_spineIntl }
	, clinix_etiology: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_etiology }
	, clinix_treatment: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_treatment }
	, clinix_previousSurgeries: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_previousSurgeries }
	, clinix_LABS: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_LABS }
	, clinix_MedHist: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_MedHist }

	// , clinix_AmbuStatus: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_AmbuStatus }
	
	// , clinix_HipMeasures: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_HipMeasures }
	// , clinix_HipStanding: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_HipStanding }
	// , clinix_HipMotionRange: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_HipMotionRange }
	// , clinix_HipXRays: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_HipXRays }
	
	// , clinix_KneeMeasures: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_KneeMeasures }
	// , clinix_KneeAppearance: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_KneeAppearance }

	, lkup_TranStatus: { type: $data.EntitySet, elementType: $ipadrbg.types.lkup_TranStatus }
});

$ipadrbg.context = new $ipadrbg.types.ngpxContext({ name: "webSql", databaseName: "ipadrbg" });

$ipadrbg.context.onReady(function(){
	angular.element('#view').scope().ShowData();
});
// end of DB context definitions