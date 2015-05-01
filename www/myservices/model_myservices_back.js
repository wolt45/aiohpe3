$data.EntityContext.extend("$ipadrbg.types.ngpxContext", {
	clinix: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix }
	, clinix_chiefcomp: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_chiefcomp }
	, clinix_spineIntl: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_spineIntl }
	, clinix_etiology: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_etiology }
	, clinix_treatment: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_treatment }
	, clinix_previousSurgeries: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_previousSurgeries }
	, clinix_LABS: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_LABS }
	, clinix_MedHist: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_MedHist }

	, clinix_AmbuStatus: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_AmbuStatus }
	, clinix_HipMeasures: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_HipMeasures }
	, clinix_HipStanding: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_HipStanding }
	, clinix_HipMotionRange: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_HipMotionRange }
	, clinix_HipXRays: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_HipXRays }

	, clinix_KneeMeasures: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_KneeMeasures }
	, clinix_KneeAppearance: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_KneeAppearance }
	, clinix_KneeAlignment: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_KneeAlignment }
	, clinix_KneeMotionRange: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_KneeMotionRange }
	, clinix_KneeXRays: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_KneeXRays }	

	, clinix_Diagnosis: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_Diagnosis }
	, clinix_DiagsManagement: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsManagement }
	, clinix_DiagsMedication: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsMedication }
	, clinix_DiagSchedSurgery: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagSchedSurgery }
	, clinix_DiagsDisposition: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsDisposition }
	, clinix_DiagsNotes: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsNotes }
	
	, clinix_StructuredDiagnosis: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredDiagnosis }
	, clinix_StructuredSchedSurgery: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredSchedSurgery }
	, clinix_StructuredHospitalization: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredHospitalization }
	, clinix_StructuredLABS: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredLABS }
	, clinix_StructuredDisposition: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredDisposition }
	, clinix_StructuredManagement: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredManagement }
	, clinix_StructuredMedication: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredMedication }
	
	, clinix_PREOp_HIP_preform: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_PREOp_HIP_preform }
	, clinix_POSTOp_HIP_preform: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_POSTOp_HIP_preform }
	, clinix_PREOp_KNEE_preform: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_PREOp_KNEE_preform }
	, clinix_POSTOp_KNEE_preform: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_POSTOp_KNEE_preform }

	, jdata_OPHIP_2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_2 }
	, jdata_OPHIP_3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_3 }
	, jdata_OPHIP_4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_4 }
	, jdata_OPHIP_5: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_5 }
	, jdata_OPHIP_6: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_6 }

	, jdata_OPKNEE_2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_2 }
	, jdata_OPKNEE_3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_3 }
	, jdata_OPKNEE_4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_4 }
	, jdata_OPKNEE_5: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_5 }

	, zclinix: { type: $data.EntitySet, elementType: $ipadrbg.types.zclinix }
});

$ipadrbg.context = new $ipadrbg.types.ngpxContext({ name: "webSql", databaseName: "ipadrbg" });

// $ipadrbg.context.onReady(function(){
// 	angular.element('#view').scope().ShowData();
// });