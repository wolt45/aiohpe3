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

	, clinix_PREOp_HIP_preform: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_PREOp_HIP_preform }
	, clinix_POSTOp_HIP_preform: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_POSTOp_HIP_preform }
	, clinix_PREOp_KNEE_preform: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_PREOp_KNEE_preform }
	, clinix_POSTOp_KNEE_preform: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_POSTOp_KNEE_preform }

	, clinix_Diagnosis: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_Diagnosis }
	, clinix_DiagsManagement: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsManagement }
	, clinix_DiagsMedication: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsMedication }
	, clinix_DiagSchedSurgery: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagSchedSurgery }
	, clinix_DiagsDisposition: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsDisposition }
	, clinix_DiagsNotes: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_DiagsNotes }

	, clinix_PEcharges: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_PEcharges }

	, jdata_OPHIP_3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_3 }
	, jdata_OPHIP_4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_4 }
	, jdata_OPHIP_5: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_5 }
	, jdata_OPHIP_6: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPHIP_6 }

	, jdata_OPKNEE_2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_2 }
	, jdata_OPKNEE_3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_3 }
	, jdata_OPKNEE_4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_4 }
	, jdata_OPKNEE_5: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OPKNEE_5 }

	, clinix_StructuredDiagnosis: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredDiagnosis }
	, clinix_StructuredSchedSurgery: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredSchedSurgery }
	, clinix_StructuredHospitalization: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredHospitalization }
	, clinix_StructuredLABS: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredLABS }
	, clinix_StructuredDisposition: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredDisposition }
	, clinix_StructuredManagement: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredManagement }
	, clinix_StructuredMedication: { type: $data.EntitySet, elementType: $ipadrbg.types.clinix_StructuredMedication }
	
	, zclinix: { type: $data.EntitySet, elementType: $ipadrbg.types.zclinix }

 	, jdata_SkelTrauma_1: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_SkelTrauma_1 }
 	, jdata_SkelTrauma_2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_SkelTrauma_2 }
	
	, jdata_genotho_1: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_genotho_1 }
	, jdata_genotho_2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_genotho_2 }
	, jdata_genotho_3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_genotho_3 }
	, jdata_genotho_4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_genotho_4 }
	, jdata_genotho_5: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_genotho_5 }
	, jdata_genotho_6: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_genotho_6 }

	, jdata_spine_1: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_spine_1 }
	, jdata_spine_2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_spine_2 }
	, jdata_spine_3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_spine_3 }
	, jdata_spine_4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_spine_4 }

	, jdata_FootAnkle_1: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_FootAnkle_1 }
	, jdata_FootAnkle_2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_FootAnkle_2 }
	, jdata_FootAnkle_3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_FootAnkle_3 }
	, jdata_FootAnkle_4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_FootAnkle_4 }
	, jdata_FootAnkle_5: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_FootAnkle_5 }
	, jdata_FootAnkle_6: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_FootAnkle_6 }
	, jdata_FootAnkle_7: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_FootAnkle_7 }
	, jdata_FootAnkle_8: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_FootAnkle_8 }
	, jdata_FootAnkle_9: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_FootAnkle_9 }

	, jdata_Knee_1: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_Knee_1 }
	, jdata_Knee_2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_Knee_2 }
	, jdata_Knee_3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_Knee_3 }
	, jdata_Knee_4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_Knee_4 }
	, jdata_Knee_5: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_Knee_5 }
	, jdata_Knee_6: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_Knee_6 }
	, jdata_Knee_7: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_Knee_7 }
	, jdata_Knee_8: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_Knee_8 }

	, jdata_shoulder_1: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_shoulder_1}
	, jdata_shoulder_2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_shoulder_2}
	, jdata_shoulder_3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_shoulder_3}
	, jdata_shoulder_4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_shoulder_4}
	, jdata_shoulder_5: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_shoulder_5}
	, jdata_shoulder_6: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_shoulder_6}
	, jdata_shoulder_7: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_shoulder_7}
	, jdata_shoulder_8: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_shoulder_8}
	, jdata_shoulder_9: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_shoulder_9}

	, jdata_ICD10: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ICD10}
	, jdata_RVS: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_RVS}
	
	, jdata_PTHist: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_PTHist}
	, jdata_PT1: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_PT1}
	, jdata_PT2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_PT2}
	, jdata_PT3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_PT3}
	, jdata_PT4: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_PT4}
	, jdata_PTNotes1: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_PTNotes1}

	, jdata_ORpreOp: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORpreOp}
	, jdata_ORMedHist: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORMedHist}
	, jdata_ORSocHab: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORSocHab}
	, jdata_ORSocHab2: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORSocHab2}
	, jdata_ORSocHab3: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORSocHab3}
	, jdata_ORIntraOp: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORIntraOp}
	, jdata_ORSkinPrep: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORSkinPrep}
	, jdata_ORBladder: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORBladder}
	, jdata_ORPotProb: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORPotProb}
	, jdata_ORpostOpRec: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORpostOpRec}
	, jdata_ORPass: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORPass}
	
	, jdata_dsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_dsig}
	, jdata_ORPreOpdsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORPreOpdsig}
	, jdata_ORIntraOpdsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORIntraOpdsig}
	, jdata_ORPostOpdsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ORPostOpdsig}

	, jdata_ITFdsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ITFdsig}
	, jdata_PreOpHipdsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_PreOpHipdsig}
	, jdata_OpHipdsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OpHipdsig}
	, jdata_PostHipdsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_PostHipdsig}
	
	, jdata_PreOpKneedsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_PreOpKneedsig}
	, jdata_OpKneedsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_OpKneedsig}
	, jdata_PostOpKneedsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_PostOpKneedsig}

	, jdata_StrucDiscdsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_StrucDiscdsig}
	, jdata_ClosePEdsig: { type: $data.EntitySet, elementType: $ipadrbg.types.jdata_ClosePEdsig}
});

$ipadrbg.context = new $ipadrbg.types.ngpxContext({ name: "webSql", databaseName: "ipadrbg" });