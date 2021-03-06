// ' + serverIP + '
function PushController($rootScope, $scope, $http) {

	$scope.clinix = [];
	$scope.ClinixPush = [];

	var ShowData = function(){
    	var promise = $ipadrbg.context.clinix.filter(function (px) { 
    		return (px.ClinixRID > this.id && px.TranStatus > this.TranStatus)},
    		// Apply Status filter to Closed PE
    		{ id : 0, TranStatus : 0 }).order('TranStatus', 'AppDateSet', 'ClinixRID').toLiveArray();
    
	    promise.then (function(pxresult) {
	    	// this loop is not part of the context, but to fill ClinixPush, to limit only fields to PushBack to server
		    for(key in pxresult){
		    	row = {
			        ClinixRID       : pxresult[key].ClinixRID,
			        PxRID           : pxresult[key].PxRID,
              TranStatus      : pxresult[key].TranStatus,
			        TranStatusDisp  : pxresult[key].TranStatusDisp,
              AppDateSet      : pxresult[key].AppDateSet
			        
              //AppDateAge      : pxresult[key].AppDateAge
				  };
	      	$scope.ClinixPush.push(row); 
		    }

		    $scope.clinix = pxresult;
		    $scope.$apply();
	    });
	};

	ShowData();

	// PUSH BACKS 11.99
	// PUSH BACKS
	// PUSH BACKS
	// PUSH BACKS
	// PUSH BACKS

	// RETAIN this sample for reference
	$scope.Push_ClinixZZZZ = function(clinix){
		var clinixJson = JSON.stringify(clinix);

		// http://www.9lessons.info/2013/02/json-input-string-using-javascript.html

		//function post_data(url,encodedata, success){
		$.ajax({
			type : "POST",
			url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_clinix.php',
			data : clinixJson,
			dataType : "json",
			restful : true,
			contentType : 'application/json',
			cache : false,
			timeout : 20000,
			async : true,
			beforeSend : function(clinixJson) { },
			success : function(clinixJson){
				success.call(this, clinixJson);
			},
			error:function(clinixJson){
				alert("Error In Connecting");
			}
		});

		alert("Export to Server Successful!");
  };


	$scope.pushIOHPE = function() {
		if (confirm('PROCEED with IOHPE Synch-Push BACK Process?')) {
			$scope.PushIOH_ChiefComp();
			//$scope.PushIOH_spineIntl();
			$scope.PushIOH_Ethiology();
			$scope.PushIOH_PastTreatments();
			$scope.PushIOH_PrevSurge();
			$scope.PushIOH_LABS();
      $scope.PushIOH_MedHist();

      $scope.Push_Clinix();
	    $scope.Push_ZClinix();

	    alert("EXPORT IOHPE to Server Successful!");
		}
	}

  //Push back Clinix
  $scope.Push_Clinix = function() {
    $scope.clinix = [];
    var promise = $ipadrbg.context.clinix.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix = pxresult;
      });

      // Note: Shorten the Array to limit the size
      var temp = "[";
      for(var i = 0; i < $scope.clinix.length; i++){
          temp += '{"ClinixRID" : ' + $scope.clinix[i]['ClinixRID'] + ', ';
          temp += '"TranStatus" : ' + $scope.clinix[i]['TranStatus'] + ', ';
          temp += '"TranStatusDisp" : "'+ $scope.clinix[i]['TranStatusDisp'] + '", ';
          temp += '"PxRID" : ' + $scope.clinix[i]['PxRID'] + '},';
      }
      var newTemp = temp.substring(0, temp.length-1);
      // temp += '{"ClinixRID" : 0 ,';
      // temp += '"TranStatus" : 0 ,';
      // temp += '"TranStatusDisp" : "0" ,';
      // temp += '"PxRID": 0 }]';
      newTemp += ']';

      $scope.clinix_JSON = newTemp;

      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_clinix.php' //?clinixJsonIzed=' + $scope.clinix_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_JSON
        , cache : false
      });
    });
  }


  //Push back Clinix
  $scope.Push_ZClinix = function() {
    $scope.clinix = [];
    var promise = $ipadrbg.context.zclinix.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.zclinix = pxresult;
      });

      // Note: Shorten the Array to limit the size
      var temp = "[";
      for(var i = 0; i < $scope.zclinix.length; i++){
          temp += '{"ClinixRID" : ' + $scope.zclinix[i]['ClinixRID'];
          temp += ', "HIP" : ' + $scope.zclinix[i]['HIP'];
          temp += ', "KNEE" : '+ $scope.zclinix[i]['KNEE'] 

          temp += ', "GENORTHO" : '+ $scope.zclinix[i]['GENORTHO'] 
          temp += ', "SKELTRAUMA" : '+ $scope.zclinix[i]['SKELTRAUMA'] 

          temp += ', "ANKLEFOOT" : '+ $scope.zclinix[i]['ANKLEFOOT'] 
          temp += ', "SHOULDERARM" : '+ $scope.zclinix[i]['SHOULDERARM'] 
          temp += ', "ELBOW" : '+ $scope.zclinix[i]['ELBOW'] 
          temp += ', "WRISTHAND" : '+ $scope.zclinix[i]['WRISTHAND'] 
          temp += ', "THIGH" : '+ $scope.zclinix[i]['THIGH'] 
          temp += ', "SPINE" : '+ $scope.zclinix[i]['SPINE'] 
          temp += '},';
      }
      var newTemp = temp.substring(0, temp.length-1);
      newTemp += ']';

      $scope.clinix_JSON = newTemp;

      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_Zclinix.php' //?clinixJsonIzed=' + $scope.clinix_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_JSON
        , cache : false
      });
    });
  }

  //Push Chief Complaint, filter id=0 means all
  $scope.PushIOH_ChiefComp = function() {
    $scope.clinix_chiefcomp = [];
    var promise = $ipadrbg.context.clinix_chiefcomp.filter(function (px) { 
      return px.ClinixRID > 0 }).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.clinix_chiefcomp = pxresult;
        });
        $scope.clinix_chiefcomp_JSON = JSON.stringify($scope.clinix_chiefcomp);
        //$sJSONized = "[" + $scope.clinix_chiefcomp_JSON + "]";
        $http({
          method: 'POST'
          , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_IOH_ChiefComp.php' //?clinixJsonIzed=' + $scope.clinix_chiefcomp_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_chiefcomp_JSON
          , cache : false
        });
    });
  }


	// floor of this $scope.pushIOHPE
	$scope.PushIOH_MedHist = function() {
    $scope.clinix_MedHist = [];
    var promise = $ipadrbg.context.clinix_MedHist.filter(function (px) { 
    	return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_MedHist = pxresult;
      });
      $scope.clinix_MedHist_JSON = JSON.stringify($scope.clinix_MedHist);
	    //$sJSONized = "[" + $scope.clinix_MedHist_JSON + "]";
      	$http({
      	  	method: 'POST'
      	  	, url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_IOH_MedHist.php' //?clinixJsonIzed=' + $scope.clinix_MedHist_JSON
      	  	, contentType : 'application/json'
      	  	, data : $scope.clinix_MedHist_JSON
      	  	, cache : false
      	});
    });
  }

	//Push LAB EXAMS filter id=0 means all
	$scope.PushIOH_LABS = function() {
      $scope.clinix_LABS = [];
      var promise = $ipadrbg.context.clinix_LABS.filter(function (px) { 
      	return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

      promise.then(function(pxresult) {
          $scope.$apply(function () {
            $scope.clinix_LABS = pxresult;
          });
          $scope.clinix_LABS_JSON = JSON.stringify($scope.clinix_LABS);
		       //$sJSONized = "[" + $scope.clinix_LABS_JSON + "]";
        	$http({
        	  	method: 'POST'
        	  	, url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_IOH_Labs.php' //?clinixJsonIzed=' + $scope.clinix_LABS_JSON
        	  	, contentType : 'application/json'
        	  	, data : $scope.clinix_LABS_JSON
        	  	, cache : false
        	});
      });
  }

    //Push PREV SURGERIES filter id=0 means all
	$scope.PushIOH_PrevSurge = function() {
      $scope.clinix_previousSurgeries = [];
      var promise = $ipadrbg.context.clinix_previousSurgeries.filter(function (px) { 
      	return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

      promise.then(function(pxresult) {
          $scope.$apply(function () {
            $scope.clinix_previousSurgeries = pxresult;
          });
          $scope.clinix_previousSurgeries_JSON = JSON.stringify($scope.clinix_previousSurgeries);
		      //$sJSONized = "[" + $scope.clinix_previousSurgeries_JSON + "]";
        	$http({
        	  	method: 'POST'
        	  	, url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_IOH_PrevSurgeries.php' //?clinixJsonIzed=' + $scope.clinix_previousSurgeries_JSON
        	  	, contentType : 'application/json'
        	  	, data : $scope.clinix_previousSurgeries_JSON
        	  	, cache : false
        	});
      });
  }

	//Push PAST TREATMENT filter id=0 means all
	$scope.PushIOH_PastTreatments = function() {
      $scope.clinix_treatment = [];
      var promise = $ipadrbg.context.clinix_treatment.filter(function (px) { 
      	return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

      promise.then(function(pxresult) {
          $scope.$apply(function () {
            $scope.clinix_treatment = pxresult;
          });
          $scope.clinix_treatment_JSON = JSON.stringify($scope.clinix_treatment);
		      //$sJSONized = "[" + $scope.clinix_treatment_JSON + "]";
        	$http({
        	  	method: 'POST'
        	  	, url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_IOH_PastTreatment.php' //?clinixJsonIzed=' + $scope.clinix_treatment_JSON
        	  	, contentType : 'application/json'
        	  	, data : $scope.clinix_treatment_JSON
        	  	, cache : false
        	});
      });
  }

  //Push ETHIOLOGY filter id=0 means all
  $scope.PushIOH_Ethiology = function() {
    $scope.clinix_etiology = [];
    var promise = $ipadrbg.context.clinix_etiology.filter(function (px) { 
    	return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.clinix_etiology = pxresult;
        });
        $scope.clinix_etiology_JSON = JSON.stringify($scope.clinix_etiology);
      	$http({
      	  	method: 'POST'
      	  	, url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_IOH_Ethiology.php' //?clinixJsonIzed=' + $scope.clinix_etiology_JSON
      	  	, contentType : 'application/json'
      	  	, data : $scope.clinix_etiology_JSON
      	  	, cache : false
      	});
    });
	}

	//Push SPINE filter id=0 means all
	$scope.PushIOH_spineIntl = function() {
    $scope.clinix_spineIntl = [];
    var promise = $ipadrbg.context.clinix_spineIntl.filter(function (px) { 
    	return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.clinix_spineIntl = pxresult;
        });

        $scope.clinix_spineIntl_JSON = JSON.stringify($scope.clinix_spineIntl);
	     //$sJSONized = "[" + $scope.clinix_spineIntl_JSON + "]";

      	$http({
      	  	method: 'POST'
      	  	, url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_IOH_SpineIntl.php' //?clinixJsonIzed=' + $scope.clinix_spineIntl_JSON
      	  	, contentType : 'application/json'
      	  	, data : $scope.clinix_spineIntl_JSON
      	  	, cache : false
      	});
    });
  }

  // PUSH BACKS Structured Disccharge Summary
  // PUSH BACKS Structured Disccharge Summary
  // PUSH BACKS Structured Disccharge Summary

  $scope.pushStructuredDS = function() {
    if (confirm('PROCEED with STRUCTURED DISCHARGE SUMMARY BACK Process?')) {
      // DEPRECATE // $scope.Push_StructuredDiagnosis();
      // DEPRECATE // $scope.Push_StructuredSchedSurgery();

      $scope.Push_StructuredHospitalization();
      $scope.Push_StructuredLABS();
      $scope.Push_StructuredDisposition();
      $scope.Push_StructuredManagement();
      $scope.Push_StructuredMedication();

      alert("EXPORT Structured Discharge Summary to Server Successful!");
    }
  }

  $scope.Push_StructuredDiagnosis = function() {
    $scope.clinix_StructuredDiagnosis = [];
    var promise = $ipadrbg.context.clinix_StructuredDiagnosis.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredDiagnosis = pxresult;
      });
      $scope.clinix_StructuredDiagnosis_JSON = JSON.stringify($scope.clinix_StructuredDiagnosis);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_StructuredDiagnosis.php' //?clinixJsonIzed=' + $scope.clinix_StructuredDiagnosis_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredDiagnosis_JSON
        , cache : false
      });
    });
  }


  $scope.Push_StructuredSchedSurgery = function() {
    $scope.clinix_StructuredSchedSurgery = [];
    var promise = $ipadrbg.context.clinix_StructuredSchedSurgery.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredSchedSurgery = pxresult;
      });
      $scope.clinix_StructuredSchedSurgery_JSON = JSON.stringify($scope.clinix_StructuredSchedSurgery);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_StructuredSchedSurgery.php?clinixJsonIzed=' + $scope.clinix_StructuredSchedSurgery_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredSchedSurgery_JSON
        , cache : false
      });
    });
  }


  $scope.Push_StructuredHospitalization = function() {
    $scope.clinix_StructuredHospitalization = [];
    var promise = $ipadrbg.context.clinix_StructuredHospitalization.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredHospitalization = pxresult;
      });
      $scope.clinix_StructuredHospitalization_JSON = JSON.stringify($scope.clinix_StructuredHospitalization);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_StructuredHospitalization.php' //?clinixJsonIzed=' + $scope.clinix_StructuredHospitalization_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredHospitalization_JSON
        , cache : false
      });
    });
  }


  $scope.Push_StructuredLABS = function() {
    $scope.clinix_StructuredLABS = [];
    var promise = $ipadrbg.context.clinix_StructuredLABS.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredLABS = pxresult;
      });
      $scope.clinix_StructuredLABS_JSON = JSON.stringify($scope.clinix_StructuredLABS);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_StructuredDischargeLabs.php' //?clinixJsonIzed=' + $scope.clinix_StructuredLABS_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredLABS_JSON
        , cache : false
      });
    });
  }


  $scope.Push_StructuredDisposition = function() {
    $scope.clinix_StructuredDisposition = [];
    var promise = $ipadrbg.context.clinix_StructuredDisposition.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredDisposition = pxresult;
      });
      $scope.clinix_StructuredDisposition_JSON = JSON.stringify($scope.clinix_StructuredDisposition);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_StructuredDisposition.php' //?clinixJsonIzed=' + $scope.clinix_StructuredDisposition_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredDisposition_JSON
        , cache : false
      });
    });
  }


  $scope.Push_StructuredManagement = function() {
    $scope.clinix_StructuredManagement = [];
    var promise = $ipadrbg.context.clinix_StructuredManagement.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredManagement = pxresult;
      });
      $scope.clinix_StructuredManagement_JSON = JSON.stringify($scope.clinix_StructuredManagement);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_StructuredManagement.php' //?clinixJsonIzed=' + $scope.clinix_StructuredManagement_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredManagement_JSON
        , cache : false
      });
    });
  }

  $scope.Push_StructuredMedication = function() {
    $scope.clinix_StructuredMedication = [];
    var promise = $ipadrbg.context.clinix_StructuredMedication.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_StructuredMedication = pxresult;
      });
      $scope.clinix_StructuredMedication_JSON = JSON.stringify($scope.clinix_StructuredMedication);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_StructuredMedication.php' //?clinixJsonIzed=' + $scope.clinix_StructuredMedication_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_StructuredMedication_JSON
        , cache : false
      });
    });
  }
  // SYNCH service Structured Discharge Summary - floor





	// PE PUSH BACKS Physical Examination
	// PE PUSH BACKS Physical Examination
	// PE PUSH BACKS Physical Examination

	$scope.pushData = function(){
		if (confirm('PROCEED With Sycnh Process?')) {
      // these two pushes were also pushed during IOHPE push back
      $scope.Push_Clinix();
      $scope.Push_ZClinix();
      // ##################

			$scope.pushAMBUStatus();

      $scope.pushHIPmeasurements();
      $scope.pushHIPstanding();
      $scope.pushHIPmotionRange();
      $scope.pushHIPxrays();

      $scope.pushKNEEmeasurements();
      $scope.pushKNEEappearance();
      $scope.pushKNEEalignment();
      $scope.pushKNEEmotionRange();
      $scope.pushKNEExrays();

      $scope.pushALLDiagnosis();
      $scope.pushALLDiagsManagement();
      $scope.pushALLDiagsMedications();
      $scope.pushALLDiagsSchedSurgery();
      $scope.pushALLDiagsDisposition();
      $scope.pushALLDiagsNotes();

      // ULUBRAHON...
      // PUSH BACK PE charges, look at controllers_PECharges.js lin 325 

		  alert("EXPORT to Server Successful!");
		}
	};

	

  //Push ALL Ambulatory Status
	$scope.pushAMBUStatus = function(){
  	$scope.clinix_AmbuStatus = [];
  	var promise = $ipadrbg.context.clinix_AmbuStatus.filter(function (px) { 
  		return px.ClinixRID > 0 }).toLiveArray();

  	promise.then(function(pxresult) {
  	  	$scope.$apply(function () {
  	    	$scope.clinix_AmbuStatus = pxresult;
  	  	});
  	  	$scope.clinix_AmbuStatus_JSON = JSON.stringify($scope.clinix_AmbuStatus);
  	  	$http({
  	  	  	method: 'POST'
  	  	  	, url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_AmbuStatus.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
  	  	  	, contentType : 'application/json'
  	  	  	, data : $scope.clinix_AmbuStatus_JSON
  	  	  	, cache : false
  	  	});
  	});
	};

  // HIP PUSH BACKS
  // HIP PUSH BACKS
  // HIP PUSH BACKS

  //Push HIP Measures
	$scope.pushHIPmeasurements = function(){
  	$scope.clinix_HipMeasures = [];
  	var promise = $ipadrbg.context.clinix_HipMeasures.filter(function (px) { 
  		return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

  	promise.then(function(pxresult) {
  	  	$scope.$apply(function () {
  	    	$scope.clinix_HipMeasures = pxresult;
  	  	});
  	  	$scope.clinix_HipMeasures_JSON = JSON.stringify($scope.clinix_HipMeasures);
  	  	$http({
  	  	  	method: 'POST'
  	  	  	, url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_HIPmeasures.php' //?clinixJsonIzed=' + $scope.clinix_HipMeasures_JSON
  	  	  	, contentType : 'application/json'
  	  	  	, data : $scope.clinix_HipMeasures_JSON
  	  	  	, cache : false
  	  	});
  	});
	};

  //Push HIP Standing
  $scope.pushHIPstanding = function(){
    
    $scope.clinix_HipStanding = [];
    var promise = $ipadrbg.context.clinix_HipStanding.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipStanding = pxresult;
      });
      $scope.clinix_HipStanding_JSON = JSON.stringify($scope.clinix_HipStanding);
      $http({
          method: 'POST'
          , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_HIPstanding.php' //?clinixJsonIzed=' + $scope.clinix_HipStanding_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_HipStanding_JSON
          , cache : false
      });
    });
  }

  //Push HIP Motion Range
  $scope.pushHIPmotionRange = function(){
    $scope.clinix_HipMotionRange = [];
    var promise = $ipadrbg.context.clinix_HipMotionRange.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipMotionRange = pxresult;
      });
      $scope.clinix_HipMotionRange_JSON = JSON.stringify($scope.clinix_HipMotionRange);
      $http({
          method: 'POST'
          , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_HIPmotionrange.php' //?clinixJsonIzed=' + $scope.clinix_HipMotionRange_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_HipMotionRange_JSON
          , cache : false
      });
    });
  }

  $scope.pushHIPxrays = function(){
    $scope.clinix_HipXRays = [];
    var promise = $ipadrbg.context.clinix_HipXRays.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipXRays = pxresult;
      });
      $scope.clinix_HipXRays_JSON = JSON.stringify($scope.clinix_HipXRays);
      $http({
          method: 'POST'
          , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_HIPxrays.php' //?clinixJsonIzed=' + $scope.clinix_HipXRays_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_HipXRays_JSON
          , cache : false
      });
    });
  } 

  /// KNEE Pushbacks
  /// KNEE Pushbacks
  /// KNEE Pushbacks

  $scope.pushKNEEmeasurements = function(){
    $scope.clinix_KneeMeasures = [];
    var promise = $ipadrbg.context.clinix_KneeMeasures.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeMeasures = pxresult;
      });
      $scope.clinix_KneeMeasures_JSON = JSON.stringify($scope.clinix_KneeMeasures);
      $http({
          method: 'POST'
          , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_KNEEMeasures.php' //?clinixJsonIzed=' + $scope.clinix_KneeMeasures_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_KneeMeasures_JSON
          , cache : false
      });
    });
  }


  $scope.pushKNEEappearance = function(){
    $scope.clinix_KneeAppearance = [];
    var promise = $ipadrbg.context.clinix_KneeAppearance.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeAppearance = pxresult;
      });
      $scope.clinix_KneeAppearance_JSON = JSON.stringify($scope.clinix_KneeAppearance);
      $http({
          method: 'POST'
          , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_KNEEappearance.php' //?clinixJsonIzed=' + $scope.clinix_KneeAppearance_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_KneeAppearance_JSON
          , cache : false
      });
    });
  }  


  $scope.pushKNEEalignment = function(){
    $scope.clinix_KneeAlignment = [];
    var promise = $ipadrbg.context.clinix_KneeAlignment.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeAlignment = pxresult;
      });
      $scope.clinix_KneeAlignment_JSON = JSON.stringify($scope.clinix_KneeAlignment);
      $http({
          method: 'POST'
          , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_KNEEalignment.php' //?clinixJsonIzed=' + $scope.clinix_KneeAlignment_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_KneeAlignment_JSON
          , cache : false
      });
    });
  }  


  $scope.pushKNEEmotionRange = function(){
    $scope.clinix_KneeMotionRange = [];
    var promise = $ipadrbg.context.clinix_KneeMotionRange.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeMotionRange = pxresult;
      });
      $scope.clinix_KneeMotionRange_JSON = JSON.stringify($scope.clinix_KneeMotionRange);
      $http({
          method: 'POST'
          , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_KNEEmotionrange.php' //?clinixJsonIzed=' + $scope.clinix_KneeMotionRange_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_KneeMotionRange_JSON
          , cache : false
      });
    });
  }  


  $scope.pushKNEExrays = function(){
    $scope.clinix_KneeXRays = [];
    var promise = $ipadrbg.context.clinix_KneeXRays.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeXRays = pxresult;
      });
      $scope.clinix_KneeXRays_JSON = JSON.stringify($scope.clinix_KneeXRays);
      $http({
          method: 'POST'
          , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_KNEExrays.php' //?clinixJsonIzed=' + $scope.clinix_KneeXRays_JSON
          , contentType : 'application/json'
          , data : $scope.clinix_KneeXRays_JSON
          , cache : false
      });
    });
  }  


  // Push ALL Diagnosis

  $scope.pushALLDiagnosis = function(){
    $scope.clinix_Diagnosis = [];
    var promise = $ipadrbg.context.clinix_Diagnosis.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_Diagnosis = pxresult;
      });
      $scope.clinix_Diagnosis_JSON = JSON.stringify($scope.clinix_Diagnosis);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_Diagnosis.php' //?clinixJsonIzed=' + $scope.clinix_Diagnosis_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_Diagnosis_JSON
        , cache : false
      });
    });
  }

  $scope.pushALLDiagsManagement = function(){
    $scope.clinix_DiagsManagement = [];
    var promise = $ipadrbg.context.clinix_DiagsManagement.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagsManagement = pxresult;
      });
      $scope.clinix_DiagsManagement_JSON = JSON.stringify($scope.clinix_DiagsManagement);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_DiagsManagement.php' // ?clinixJsonIzed=' + $scope.clinix_DiagsManagement_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_DiagsManagement_JSON
        , cache : false
      });
    });
  }

  // PUSH DiagsMedication 
  $scope.pushALLDiagsMedications = function() {
    $scope.clinix_DiagsMedication = [];
    var promise = $ipadrbg.context.clinix_DiagsMedication.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagsMedication = pxresult;
      });
      $scope.clinix_DiagsMedication_JSON = JSON.stringify($scope.clinix_DiagsMedication);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_DiagsMedication.php' //?clinixJsonIzed=' + $scope.clinix_DiagsMedication_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_DiagsMedication_JSON
        , cache : false
      });
    });
  }
  
  // PUSH DiagSchedSurgery 
  $scope.pushALLDiagsSchedSurgery = function() {
    $scope.clinix_DiagSchedSurgery = [];
    var promise = $ipadrbg.context.clinix_DiagSchedSurgery.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagSchedSurgery = pxresult;
      });
      $scope.clinix_DiagSchedSurgery_JSON = JSON.stringify($scope.clinix_DiagSchedSurgery);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_DiagsSchedSurgery.php' //?clinixJsonIzed=' + $scope.clinix_DiagSchedSurgery_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_DiagSchedSurgery_JSON
        , cache : false
      });
    });
  }

  // PUSH DiagsDisposition
  $scope.pushALLDiagsDisposition = function() {
    $scope.clinix_DiagsDisposition = [];
    var promise = $ipadrbg.context.clinix_DiagsDisposition.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagsDisposition = pxresult;
      });
      $scope.clinix_DiagsDisposition_JSON = JSON.stringify($scope.clinix_DiagsDisposition);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_DiagsDisposition.php' //?clinixJsonIzed=' + $scope.clinix_DiagsDisposition_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_DiagsDisposition_JSON
        , cache : false
      });
    });
  }

  // PUSH Diags Notes 
  $scope.pushALLDiagsNotes = function() {
    $scope.clinix_DiagsNotes = [];
    var promise = $ipadrbg.context.clinix_DiagsNotes.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagsNotes = pxresult;
      });
      $scope.clinix_DiagsNotes_JSON = JSON.stringify($scope.clinix_DiagsNotes);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_DiagsNotes.php' //?clinixJsonIzed=' + $scope.clinix_DiagsNotes_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_DiagsNotes_JSON
        , cache : false
      });
    });
  }

  // PRE-OPERATIVE Orders




  // HIP PRE-OPERATIVE section
  // HIP PRE-OPERATIVE section
  // HIP PRE-OPERATIVE section

  $scope.pushHIPops = function() {
    if (confirm('PROCEED with H I P Orders / Reports Synch-Push BACK Process?')) {
      $scope.Push_HIP_PREop_FORM();

      //DEPRECATE, CONTENT is in zipad_Diagnosis // $scope.Push_HIP_OP_Diagnosis();
      //DEPRECATE, CONTENT is in zipad_Diagnosis // $scope.Push_HIP_OP_Surgery();
      $scope.Push_HIP_OP_Implant();
      // DEPRECATE deprecate //$scope.Push_HIP_OP_Acetabular(); 
      $scope.Push_HIP_OP_Surgical(); 
      $scope.Push_HIP_OP_Operative();
      $scope.Push_HIP_POSTop_FORM();

      alert("EXPORT HIP Ops to Server Successful!");
    }
  }


  $scope.Push_HIP_PREop_FORM = function(){
    $scope.clinix_PREOp_HIP_preform = [];
    var promise = $ipadrbg.context.clinix_PREOp_HIP_preform.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_PREOp_HIP_preform = pxresult;
      });
      $scope.clinix_PREOp_HIP_preform_JSON = JSON.stringify($scope.clinix_PREOp_HIP_preform);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_PREop_HIP_Preform.php' //?clinixJsonIzed=' + $scope.clinix_PREOp_HIP_preform_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_PREOp_HIP_preform_JSON
        , cache : false
      });
    });
  }


  // HIP    OPERATIVE section
  // HIP    OPERATIVE section
  // HIP    OPERATIVE section
  // 1
  $scope.Push_HIP_OP_Diagnosis = function(){
    //DEPRECATE
    //DEPRECATE
    //DEPRECATE
    //DEPRECATE CONTENT is in zipad_Diagnosis
    $scope.jdata_OPHIP_1 = [];
    var promise = $ipadrbg.context.jdata_OPHIP_1.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_1 = pxresult;
      });
      $scope.jdata_OPHIP_1_JSON = JSON.stringify($scope.jdata_OPHIP_1);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_OPHIP_1.php' //?clinixJsonIzed=' + $scope.jdata_OPHIP_1_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_OPHIP_1_JSON
        , cache : false
      });
    });
  }

  // 2
  // FOR DEPRECATION May 14, 2015
  // FOR DEPRECATION May 14, 2015
  // FOR DEPRECATION May 14, 2015
  // FOR DEPRECATION May 14, 2015  CONTENT is in Diagnosis
  $scope.Push_HIP_OP_Surgery = function(){
    $scope.jdata_OPHIP_2 = [];
    var promise = $ipadrbg.context.jdata_OPHIP_2.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_2 = pxresult;
      });
      $scope.jdata_OPHIP_2_JSON = JSON.stringify($scope.jdata_OPHIP_2);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_OPHIP_2.php' //?clinixJsonIzed=' + $scope.jdata_OPHIP_2_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_OPHIP_2_JSON
        , cache : false
      });
    });
  }

  // 3
  $scope.Push_HIP_OP_Implant = function(){
    $scope.jdata_OPHIP_3 = [];
    var promise = $ipadrbg.context.jdata_OPHIP_3.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_3 = pxresult;
      });
      $scope.jdata_OPHIP_3_JSON = JSON.stringify($scope.jdata_OPHIP_3);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_OPHIP_3.php' //?clinixJsonIzed=' + $scope.jdata_OPHIP_3_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_OPHIP_3_JSON
        , cache : false
      });
    });
  }

  // 4   NOT USED ANYMORE, OKAY??
  $scope.Push_HIP_OP_Acetabular = function(){
    $scope.jdata_OPHIP_4 = [];
    var promise = $ipadrbg.context.jdata_OPHIP_4.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_4 = pxresult;
      });
      $scope.jdata_OPHIP_4_JSON = JSON.stringify($scope.jdata_OPHIP_4);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_OPHIP_4.php' //?clinixJsonIzed=' + $scope.jdata_OPHIP_4_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_OPHIP_4_JSON
        , cache : false
      });
    });
  }

  // 5
  $scope.Push_HIP_OP_Surgical = function(){
    $scope.jdata_OPHIP_5 = [];
    var promise = $ipadrbg.context.jdata_OPHIP_5.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_5 = pxresult;
      });
      $scope.jdata_OPHIP_5_JSON = JSON.stringify($scope.jdata_OPHIP_5);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_OPHIP_5.php' //?clinixJsonIzed=' + $scope.jdata_OPHIP_5_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_OPHIP_5_JSON
        , cache : false
      });
    });
  }

  // 6
  $scope.Push_HIP_OP_Operative = function(){
    $scope.jdata_OPHIP_6 = [];
    var promise = $ipadrbg.context.jdata_OPHIP_6.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_6 = pxresult;
      });
      $scope.jdata_OPHIP_6_JSON = JSON.stringify($scope.jdata_OPHIP_6);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_OPHIP_6.php' //?clinixJsonIzed=' + $scope.jdata_OPHIP_6_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_OPHIP_6_JSON
        , cache : false
      });
    });
  }


  // HIP   P O S T - OPERATIVE section
  // HIP   P O S T - OPERATIVE section
  // HIP   P O S T - OPERATIVE section


  $scope.Push_HIP_POSTop_FORM = function(){
    $scope.clinix_POSTOp_HIP_preform = [];
    var promise = $ipadrbg.context.clinix_POSTOp_HIP_preform.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_POSTOp_HIP_preform = pxresult;
      });
      $scope.clinix_POSTOp_HIP_preform_JSON = JSON.stringify($scope.clinix_POSTOp_HIP_preform);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_POSTop_HIP_Preform.php'
        , contentType : 'application/json'
        , data : $scope.clinix_POSTOp_HIP_preform_JSON
        , cache : true
      });
    });
  }
  //?clinixJsonIzed=' + $scope.clinix_POSTOp_HIP_preform_JSON



  // KNEE KNEE KNEE KNEE KNEE

 
  // KNEE PRE-OPERATIVE section
  // KNEE PRE-OPERATIVE section
  // KNEE PRE-OPERATIVE section

  $scope.pushKNEEops = function() {
    if (confirm('PROCEED with K N E E Operative Reports Synch-Push BACK Process?')) {
      $scope.Push_KNEE_PREop_FORM();

      // DEPRECATED, like the HIP // $scope.Push_KNEE_OP_Diagnosis();
      // DEPRECATED, like the HIP case // $scope.Push_KNEE_OP_Surgery();

      $scope.Push_KNEE_OP_Implant();
      $scope.Push_KNEE_OP_Surgical(); 
      $scope.Push_KNEE_OP_Operative();

      $scope.Push_KNEE_POSTop_FORM();

      alert("EXPORT KNEE Ops to Server Successful!");
    }
  }


  $scope.Push_KNEE_PREop_FORM = function(){
    $scope.clinix_PREOp_KNEE_preform = [];
    var promise = $ipadrbg.context.clinix_PREOp_KNEE_preform.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_PREOp_KNEE_preform = pxresult;
      });
      $scope.clinix_PREOp_KNEE_preform_JSON = JSON.stringify($scope.clinix_PREOp_KNEE_preform);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_PREop_KNEE_Preform.php' //?clinixJsonIzed=' + $scope.clinix_PREOp_KNEE_preform_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_PREOp_KNEE_preform_JSON
        , cache : false
      });
    });
  }

  $scope.Push_KNEE_PREop_CONTACT = function(){
    $scope.clinix_PREOp_KNEE_contact = [];
    var promise = $ipadrbg.context.clinix_PREOp_KNEE_contact.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_PREOp_KNEE_contact = pxresult;
      });
      $scope.clinix_PREOp_KNEE_contact_JSON = JSON.stringify($scope.clinix_PREOp_KNEE_contact);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_PREop_KNEE_Contact.php' //?clinixJsonIzed=' + $scope.clinix_PREOp_KNEE_contact_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_PREOp_KNEE_contact_JSON
        , cache : false
      });
    });
  }

  $scope.Push_KNEE_PREop_ANTIBIOTICS = function(){
    $scope.clinix_PREOp_KNEE_antibio = [];
    var promise = $ipadrbg.context.clinix_PREOp_KNEE_antibio.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_PREOp_KNEE_antibio = pxresult;
      });
      $scope.clinix_PREOp_KNEE_antibio_JSON = JSON.stringify($scope.clinix_PREOp_KNEE_antibio);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_PREop_KNEE_AntiBio.php' //?clinixJsonIzed=' + $scope.clinix_PREOp_KNEE_antibio_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_PREOp_KNEE_antibio_JSON
        , cache : false
      });
    });
  }

  $scope.Push_KNEE_PREop_REPEAT = function(){
    $scope.clinix_PREOp_KNEE_repeatBilateral = [];
    var promise = $ipadrbg.context.clinix_PREOp_KNEE_repeatBilateral.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_PREOp_KNEE_repeatBilateral = pxresult;
      });
      $scope.clinix_PREOp_KNEE_repeatBilateral_JSON = JSON.stringify($scope.clinix_PREOp_KNEE_repeatBilateral);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_PREop_KNEE_repeatB.php' //?clinixJsonIzed=' + $scope.clinix_PREOp_KNEE_repeatBilateral_JSON
        , contentType : 'application/json'
        , data : $scope.clinix_PREOp_KNEE_repeatBilateral_JSON
        , cache : false
      });
    });
  }

  // ZZZZZZZZZZZZZZZZZZZ  -  start
  // KNEE    OPERATIVE section
  // KNEE    OPERATIVE section
  // KNEE    OPERATIVE section
  // 1
  $scope.Push_KNEE_OP_Diagnosis = function(){
    $scope.jdata_OPKNEE_1 = [];
    var promise = $ipadrbg.context.jdata_OPKNEE_1.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_1 = pxresult;
      });
      $scope.jdata_OPKNEE_1_JSON = JSON.stringify($scope.jdata_OPKNEE_1);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_OPKNEE_1.php' //?clinixJsonIzed=' + $scope.jdata_OPKNEE_1_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_OPKNEE_1_JSON
        , cache : false
      });
    });
  }

  // 2
  $scope.Push_KNEE_OP_Surgery = function(){
    $scope.jdata_OPKNEE_2 = [];
    var promise = $ipadrbg.context.jdata_OPKNEE_2.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_2 = pxresult;
      });
      $scope.jdata_OPKNEE_2_JSON = JSON.stringify($scope.jdata_OPKNEE_2);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_OPKNEE_2.php' //?clinixJsonIzed=' + $scope.jdata_OPKNEE_2_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_OPKNEE_2_JSON
        , cache : false
      });
    });
  }

  // 3
  $scope.Push_KNEE_OP_Implant = function(){
    $scope.jdata_OPKNEE_3 = [];
    var promise = $ipadrbg.context.jdata_OPKNEE_3.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_3 = pxresult;
      });
      $scope.jdata_OPKNEE_3_JSON = JSON.stringify($scope.jdata_OPKNEE_3);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_OPKNEE_3.php' //?clinixJsonIzed=' + $scope.jdata_OPKNEE_3_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_OPKNEE_3_JSON
        , cache : false
      });
    });
  }

  // 4
  $scope.Push_KNEE_OP_Surgical = function(){
    $scope.jdata_OPKNEE_4 = [];
    var promise = $ipadrbg.context.jdata_OPKNEE_4.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_4 = pxresult;
      });
      $scope.jdata_OPKNEE_4_JSON = JSON.stringify($scope.jdata_OPKNEE_4);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_OPKNEE_4.php' //?clinixJsonIzed=' + $scope.jdata_OPKNEE_4_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_OPKNEE_4_JSON
        , cache : false
      });
    });
  }

  // 5
  $scope.Push_KNEE_OP_Operative = function(){
    $scope.jdata_OPKNEE_5 = [];
    var promise = $ipadrbg.context.jdata_OPKNEE_5.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_5 = pxresult;
      });
      $scope.jdata_OPKNEE_5_JSON = JSON.stringify($scope.jdata_OPKNEE_5);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_OPKNEE_5.php' //?clinixJsonIzed=' + $scope.jdata_OPKNEE_5_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_OPKNEE_5_JSON
        , cache : false
      });
    });
  }
  // ZZZZZZZZZZZZZZZZZ  END


  $scope.Push_KNEE_POSTop_FORM = function(){
    $scope.clinix_POSTOp_KNEE_preform = [];
    var promise = $ipadrbg.context.clinix_POSTOp_KNEE_preform.filter(function (px) { 
      return px.ClinixRID > this.id},{ id : 0 }).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_POSTOp_KNEE_preform = pxresult;
      });
      $scope.clinix_POSTOp_KNEE_preform_JSON = JSON.stringify($scope.clinix_POSTOp_KNEE_preform);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_POSTop_KNEE_Preform.php'
        , contentType : 'application/json'
        , data : $scope.clinix_POSTOp_KNEE_preform_JSON
        , cache : true
      });
    });
  }
  // ?clinixJsonIzed=' + $scope.clinix_POSTOp_KNEE_preform_JSON

  // floor of PUSHES 



  $scope.pushSkelTrauma = function(){
    if (confirm('PROCEED With Sycnh Process?')) {

      $scope.pushSkelTrauma_1();
      $scope.pushSkelTrauma_2();



      alert("EXPORT to Server Successful!");
    }
  }

  //Push ALL pushjdata_SkelTrauma_1 
  $scope.pushSkelTrauma_1 = function(){
    $scope.jdata_SkelTrauma_1 = [];
    var promise = $ipadrbg.context.jdata_SkelTrauma_1.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_SkelTrauma_1 = pxresult;
        });
        $scope.jdata_SkelTrauma_1_JSON = JSON.stringify($scope.jdata_SkelTrauma_1);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_SkelTrauma_1.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_SkelTrauma_1_JSON
            , cache : false
        });
    });
  };

  $scope.pushSkelTrauma_2 = function(){
    $scope.jdata_SkelTrauma_2 = [];
    var promise = $ipadrbg.context.jdata_SkelTrauma_2.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_SkelTrauma_2 = pxresult;
        });
        $scope.jdata_SkelTrauma_2_JSON = JSON.stringify($scope.jdata_SkelTrauma_2);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_SkelTrauma_2.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_SkelTrauma_2_JSON
            , cache : false
        });
    });
  };
  //Synch Process of Skeletal Trauma - end

  // floor of PUSHES 

   $scope.pushGenOrtho = function(){
    if (confirm('PROCEED With Sycnh Process?')) {

      $scope.pushGenOrtho_1();
      $scope.pushGenOrtho_2();
      $scope.pushGenOrtho_3();
      $scope.pushGenOrtho_4();
      $scope.pushGenOrtho_5();
      $scope.pushGenOrtho_6();

      alert("EXPORT to Server Successful!");
    }
  }

  //Push ALL pushjdata_GenOrtho_1 
  $scope.pushGenOrtho_1 = function(){
    $scope.jdata_genotho_1 = [];
    var promise = $ipadrbg.context.jdata_genotho_1.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_genotho_1 = pxresult;
        });
        $scope.jdata_genotho_1_JSON = JSON.stringify($scope.jdata_genotho_1);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_genotho_1.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_genotho_1_JSON
            , cache : false
        });
    });
  };

  $scope.pushGenOrtho_2 = function(){
    $scope.jdata_genotho_2 = [];
    var promise = $ipadrbg.context.jdata_genotho_2.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_genotho_2 = pxresult;
        });
        $scope.jdata_genotho_2_JSON = JSON.stringify($scope.jdata_genotho_2);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_genotho_2.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_genotho_2_JSON
            , cache : false
        });
    });
  };

  $scope.pushGenOrtho_3 = function(){
    $scope.jdata_genotho_3 = [];
    var promise = $ipadrbg.context.jdata_genotho_3.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_genotho_3 = pxresult;
        });
        $scope.jdata_genotho_3_JSON = JSON.stringify($scope.jdata_genotho_3);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_genotho_3.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_genotho_3_JSON
            , cache : false
        });
    });
  };

  $scope.pushGenOrtho_4 = function(){
    $scope.jdata_genotho_4 = [];
    var promise = $ipadrbg.context.jdata_genotho_4.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_genotho_4 = pxresult;
        });
        $scope.jdata_genotho_4_JSON = JSON.stringify($scope.jdata_genotho_4);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_genotho_4.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_genotho_4_JSON
            , cache : false
        });
    });
  };

  $scope.pushGenOrtho_5 = function(){
    $scope.jdata_genotho_5 = [];
    var promise = $ipadrbg.context.jdata_genotho_5.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_genotho_5 = pxresult;
        });
        $scope.jdata_genotho_5_JSON = JSON.stringify($scope.jdata_genotho_5);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_genotho_5.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_genotho_5_JSON
            , cache : false
        });
    });
  };

  $scope.pushGenOrtho_6 = function(){
    $scope.jdata_genotho_6 = [];
    var promise = $ipadrbg.context.jdata_genotho_6.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_genotho_6 = pxresult;
        });
        $scope.jdata_genotho_6_JSON = JSON.stringify($scope.jdata_genotho_6);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_genotho_6.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_genotho_6_JSON
            , cache : false
        });
    });
  };


  $scope.pushSpine = function(){
    if (confirm('PROCEED With Sycnh Process?')) {

      $scope.pushSpine_1();
      $scope.pushSpine_2();
      $scope.pushSpine_3();
      $scope.pushSpine_4();

      alert("EXPORT to Server Successful!");
    }
  }

  //Push ALL pushjdata_GenOrtho_1 
  $scope.pushSpine_1 = function(){
    $scope.jdata_spine_1 = [];
    var promise = $ipadrbg.context.jdata_spine_1.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_spine_1 = pxresult;
        });
        $scope.jdata_spine_1_JSON = JSON.stringify($scope.jdata_spine_1);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_spine_1.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_spine_1_JSON
            , cache : false
        });
    });
  };

  $scope.pushSpine_2 = function(){
    $scope.jdata_spine_2 = [];
    var promise = $ipadrbg.context.jdata_spine_2.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_spine_2 = pxresult;
        });
        $scope.jdata_spine_2_JSON = JSON.stringify($scope.jdata_spine_2);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_spine_2.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_spine_2_JSON
            , cache : false
        });
    });
  };


  $scope.pushSpine_3 = function(){
    $scope.jdata_spine_3 = [];
    var promise = $ipadrbg.context.jdata_spine_3.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_spine_3 = pxresult;
        });
        $scope.jdata_spine_3_JSON = JSON.stringify($scope.jdata_spine_3);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_spine_3.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_spine_3_JSON
            , cache : false
        });
    });
  };

  $scope.pushSpine_4 = function(){
    $scope.jdata_spine_4 = [];
    var promise = $ipadrbg.context.jdata_spine_4.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_spine_4 = pxresult;
        });
        $scope.jdata_spine_4_JSON = JSON.stringify($scope.jdata_spine_4);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_spine_4.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_spine_4_JSON
            , cache : false
        });
    });
  };

$scope.pushSportsAnkleFoot = function(){
    if (confirm('PROCEED With Sycnh Process?')) {

      $scope.pushSportsAnkleFoot_1();
      $scope.pushSportsAnkleFoot_2();
      $scope.pushSportsAnkleFoot_3();
      $scope.pushSportsAnkleFoot_4();
      $scope.pushSportsAnkleFoot_5();
      $scope.pushSportsAnkleFoot_6();
      $scope.pushSportsAnkleFoot_7();
      $scope.pushSportsAnkleFoot_8();
      $scope.pushSportsAnkleFoot_9();



      alert("EXPORT to Server Successful!");
    }
  }

  //Push ALL pushSportsAnkleFoot_1
    $scope.pushSportsAnkleFoot_1 = function(){
    $scope.jdata_FootAnkle_1 = [];
    var promise = $ipadrbg.context.jdata_FootAnkle_1.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_FootAnkle_1 = pxresult;
        });
        $scope.jdata_FootAnkle_1_JSON = JSON.stringify($scope.jdata_FootAnkle_1);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_anklefoot_1.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_FootAnkle_1_JSON
            , cache : false
        });
    });
  };
  //Push ALL pushSportsAnkleFoot_2
    $scope.pushSportsAnkleFoot_2 = function(){
    $scope.jdata_FootAnkle_2 = [];
    var promise = $ipadrbg.context.jdata_FootAnkle_2.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_FootAnkle_2 = pxresult;
        });
        $scope.jdata_FootAnkle_2_JSON = JSON.stringify($scope.jdata_FootAnkle_2);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_anklefoot_2.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_FootAnkle_2_JSON
            , cache : false
        });
    });
  };
  //Push ALL pushSportsAnkleFoot_2
    $scope.pushSportsAnkleFoot_3 = function(){
    $scope.jdata_FootAnkle_3 = [];
    var promise = $ipadrbg.context.jdata_FootAnkle_3.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_FootAnkle_3 = pxresult;
        });
        $scope.jdata_FootAnkle_3_JSON = JSON.stringify($scope.jdata_FootAnkle_3);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_anklefoot_3.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_FootAnkle_3_JSON
            , cache : false
        });
    });
  };

  //Push ALL pushSportsAnkleFoot_2
    $scope.pushSportsAnkleFoot_4 = function(){
    $scope.jdata_FootAnkle_4 = [];
    var promise = $ipadrbg.context.jdata_FootAnkle_4.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_FootAnkle_4 = pxresult;
        });
        $scope.jdata_FootAnkle_4_JSON = JSON.stringify($scope.jdata_FootAnkle_4);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_anklefoot_4.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_FootAnkle_4_JSON
            , cache : false
        });
    });
  };

  //Push ALL pushSportsAnkleFoot_2
    $scope.pushSportsAnkleFoot_5 = function(){
    $scope.jdata_FootAnkle_5 = [];
    var promise = $ipadrbg.context.jdata_FootAnkle_5.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_FootAnkle_5 = pxresult;
        });
        $scope.jdata_FootAnkle_5_JSON = JSON.stringify($scope.jdata_FootAnkle_5);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_anklefoot_5.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_FootAnkle_5_JSON
            , cache : false
        });
    });
  };

  //Push ALL pushSportsAnkleFoot_2
    $scope.pushSportsAnkleFoot_6 = function(){
    $scope.jdata_FootAnkle_6 = [];
    var promise = $ipadrbg.context.jdata_FootAnkle_6.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_FootAnkle_6 = pxresult;
        });
        $scope.jdata_FootAnkle_6_JSON = JSON.stringify($scope.jdata_FootAnkle_6);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_anklefoot_6.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_FootAnkle_6_JSON
            , cache : false
        });
    });
  };
  //Push ALL pushSportsAnkleFoot_2
    $scope.pushSportsAnkleFoot_7 = function(){
    $scope.jdata_FootAnkle_7 = [];
    var promise = $ipadrbg.context.jdata_FootAnkle_7.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_FootAnkle_7 = pxresult;
        });
        $scope.jdata_FootAnkle_7_JSON = JSON.stringify($scope.jdata_FootAnkle_7);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_anklefoot_7.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_FootAnkle_7_JSON
            , cache : false
        });
    });
  };

   $scope.pushSportsAnkleFoot_8 = function(){
    $scope.jdata_FootAnkle_8 = [];
    var promise = $ipadrbg.context.jdata_FootAnkle_8.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_FootAnkle_8 = pxresult;
        });
        $scope.jdata_FootAnkle_8_JSON = JSON.stringify($scope.jdata_FootAnkle_8);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_anklefoot_8.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_FootAnkle_8_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsAnkleFoot_9 = function(){
    $scope.jdata_FootAnkle_9 = [];
    var promise = $ipadrbg.context.jdata_FootAnkle_9.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_FootAnkle_9 = pxresult;
        });
        $scope.jdata_FootAnkle_9_JSON = JSON.stringify($scope.jdata_FootAnkle_9);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_anklefoot_9.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_FootAnkle_9_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsKnee = function(){
    if (confirm('PROCEED With Sycnh Process?')) {

      $scope.pushSportsKnee_1();
      $scope.pushSportsKnee_2();
      $scope.pushSportsKnee_3();
      $scope.pushSportsKnee_4();
      $scope.pushSportsKnee_5();
      $scope.pushSportsKnee_6();
      $scope.pushSportsKnee_7();
      $scope.pushSportsKnee_8();

      alert("EXPORT to Server Successful!");
    }
  }

  //Push ALL pushSportsanklefoot_1
    $scope.pushSportsKnee_1 = function(){
    $scope.jdata_Knee_1 = [];
    var promise = $ipadrbg.context.jdata_Knee_1.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_Knee_1 = pxresult;
        });
        $scope.jdata_Knee_1_JSON = JSON.stringify($scope.jdata_Knee_1);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsknee_1.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_Knee_1_JSON
            , cache : false
        });
    });
  };

    $scope.pushSportsKnee_2 = function(){
    $scope.jdata_Knee_2 = [];
    var promise = $ipadrbg.context.jdata_Knee_2.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_Knee_2 = pxresult;
        });
        $scope.jdata_Knee_2_JSON = JSON.stringify($scope.jdata_Knee_2);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsknee_2.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_Knee_2_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsKnee_3 = function(){
    $scope.jdata_Knee_3= [];
    var promise = $ipadrbg.context.jdata_Knee_3.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_Knee_3 = pxresult;
        });
        $scope.jdata_Knee_3_JSON = JSON.stringify($scope.jdata_Knee_3);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsknee_3.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_Knee_3_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsKnee_4 = function(){
    $scope.jdata_Knee_4= [];
    var promise = $ipadrbg.context.jdata_Knee_4.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_Knee_4 = pxresult;
        });
        $scope.jdata_Knee_4_JSON = JSON.stringify($scope.jdata_Knee_4);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsknee_4.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_Knee_4_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsKnee_5 = function(){
    $scope.jdata_Knee_5= [];
    var promise = $ipadrbg.context.jdata_Knee_5.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_Knee_5 = pxresult;
        });
        $scope.jdata_Knee_5_JSON = JSON.stringify($scope.jdata_Knee_5);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsknee_5.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_Knee_5_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsKnee_6 = function(){
    $scope.jdata_Knee_6= [];
    var promise = $ipadrbg.context.jdata_Knee_6.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_Knee_6 = pxresult;
        });
        $scope.jdata_Knee_6_JSON = JSON.stringify($scope.jdata_Knee_6);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsknee_6.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_Knee_6_JSON
            , cache : false
        });
    });
  };

   $scope.pushSportsKnee_7 = function(){
    $scope.jdata_Knee_7= [];
    var promise = $ipadrbg.context.jdata_Knee_7.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_Knee_7 = pxresult;
        });
        $scope.jdata_Knee_7_JSON = JSON.stringify($scope.jdata_Knee_7);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsknee_7.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_Knee_7_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsKnee_8 = function(){
    $scope.jdata_Knee_8= [];
    var promise = $ipadrbg.context.jdata_Knee_8.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_Knee_8 = pxresult;
        });
        $scope.jdata_Knee_8_JSON = JSON.stringify($scope.jdata_Knee_8);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsknee_8.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_Knee_8_JSON
            , cache : false
        });
    });
  };

 $scope.pushSportsSholder = function(){
    if (confirm('PROCEED With Sycnh Process?')) {

      $scope.pushSportsSholder_1();
      $scope.pushSportsSholder_2();
      $scope.pushSportsSholder_3();
      $scope.pushSportsSholder_4();
      $scope.pushSportsSholder_5();
      $scope.pushSportsSholder_6();
      $scope.pushSportsSholder_7();
      $scope.pushSportsSholder_8();
      $scope.pushSportsSholder_9();

      alert("EXPORT to Server Successful!");
    }
  }

  $scope.pushSportsSholder_1 = function(){
    $scope.jdata_shoulder_1= [];
    var promise = $ipadrbg.context.jdata_shoulder_1.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_shoulder_1 = pxresult;
        });
        $scope.jdata_shoulder_1_JSON = JSON.stringify($scope.jdata_shoulder_1);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsholder_1.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_shoulder_1_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsSholder_2 = function(){
    $scope.jdata_shoulder_2= [];
    var promise = $ipadrbg.context.jdata_shoulder_2.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_shoulder_2 = pxresult;
        });
        $scope.jdata_shoulder_2_JSON = JSON.stringify($scope.jdata_shoulder_2);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsholder_2.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_shoulder_2_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsSholder_3 = function(){
    $scope.jdata_shoulder_3= [];
    var promise = $ipadrbg.context.jdata_shoulder_3.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_shoulder_3 = pxresult;
        });
        $scope.jdata_shoulder_3_JSON = JSON.stringify($scope.jdata_shoulder_3);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsholder_3.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_shoulder_3_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsSholder_4 = function(){
    $scope.jdata_shoulder_4= [];
    var promise = $ipadrbg.context.jdata_shoulder_4.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_shoulder_4 = pxresult;
        });
        $scope.jdata_shoulder_4_JSON = JSON.stringify($scope.jdata_shoulder_4);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsholder_4.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_shoulder_4_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsSholder_5 = function(){
    $scope.jdata_shoulder_5= [];
    var promise = $ipadrbg.context.jdata_shoulder_5.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_shoulder_5 = pxresult;
        });
        $scope.jdata_shoulder_5_JSON = JSON.stringify($scope.jdata_shoulder_5);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsholder_5.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_shoulder_5_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsSholder_6 = function(){
    $scope.jdata_shoulder_6= [];
    var promise = $ipadrbg.context.jdata_shoulder_6.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_shoulder_6 = pxresult;
        });
        $scope.jdata_shoulder_6_JSON = JSON.stringify($scope.jdata_shoulder_6);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsholder_6.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_shoulder_6_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsSholder_7 = function(){
    $scope.jdata_shoulder_7= [];
    var promise = $ipadrbg.context.jdata_shoulder_7.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_shoulder_7 = pxresult;
        });
        $scope.jdata_shoulder_7_JSON = JSON.stringify($scope.jdata_shoulder_7);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsholder_7.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_shoulder_7_JSON
            , cache : false
        });
    });
  };

  $scope.pushSportsSholder_8 = function(){
    $scope.jdata_shoulder_8= [];
    var promise = $ipadrbg.context.jdata_shoulder_8.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_shoulder_8 = pxresult;
        });
        $scope.jdata_shoulder_8_JSON = JSON.stringify($scope.jdata_shoulder_8);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsholder_8.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_shoulder_8_JSON
            , cache : false
        });
    });
  };


  $scope.pushSportsSholder_9 = function(){
    $scope.jdata_shoulder_9= [];
    var promise = $ipadrbg.context.jdata_shoulder_9.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_shoulder_9 = pxresult;
        });
        $scope.jdata_shoulder_9_JSON = JSON.stringify($scope.jdata_shoulder_9);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_sportsholder_9.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_shoulder_9_JSON
            , cache : false
        });
    });
  };

  $scope.pushPhysicalTheraphy = function(){
    if (confirm('PROCEED With Sycnh Process?')) {

      $scope.pushphysctheraHist();
      $scope.pushphyscthera1();
      $scope.pushphyscthera2();
      $scope.pushphyscthera3();
      $scope.pushphyscthera4();
      $scope.pushphysctheraNotes();

      alert("EXPORT to Server Successful!");
    }
  }

  $scope.pushphysctheraHist = function(){
    $scope.jdata_PTHist= [];
    var promise = $ipadrbg.context.jdata_PTHist.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_PTHist = pxresult;
        });
        $scope.jdata_PTHist_JSON = JSON.stringify($scope.jdata_PTHist);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_PTHist.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_PTHist_JSON
            , cache : false
        });
    });
  };

  $scope.pushphyscthera1 = function(){
    $scope.jdata_PT1= [];
    var promise = $ipadrbg.context.jdata_PT1.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_PT1 = pxresult;
        });
        $scope.jdata_PT1_JSON = JSON.stringify($scope.jdata_PT1);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_PT1.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_PT1_JSON
            , cache : false
        });
    });
  };

  $scope.pushphyscthera2 = function(){
    $scope.jdata_PT2= [];
    var promise = $ipadrbg.context.jdata_PT2.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_PT2 = pxresult;
        });
        $scope.jdata_PT2_JSON = JSON.stringify($scope.jdata_PT2);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_PT2.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_PT2_JSON
            , cache : false
        });
    });
  };

  $scope.pushphyscthera3 = function(){
    $scope.jdata_PT3= [];
    var promise = $ipadrbg.context.jdata_PT3.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_PT3 = pxresult;
        });
        $scope.jdata_PT3_JSON = JSON.stringify($scope.jdata_PT3);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_PT3.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_PT3_JSON
            , cache : false
        });
    });
  };
  $scope.pushphyscthera4 = function(){
    $scope.jdata_PT4= [];
    var promise = $ipadrbg.context.jdata_PT4.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_PT4 = pxresult;
        });
        $scope.jdata_PT4_JSON = JSON.stringify($scope.jdata_PT4);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_PT4.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_PT4_JSON
            , cache : false
        });
    });
  };
  $scope.pushphysctheraNotes = function(){
    $scope.jdata_PTNotes1= [];
    var promise = $ipadrbg.context.jdata_PTNotes1.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_PTNotes1 = pxresult;
        });
        $scope.jdata_PTNotes1_JSON = JSON.stringify($scope.jdata_PTNotes1);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_PTNotes.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_PTNotes1_JSON
            , cache : false
        });
    });
  };


  $scope.pushORData = function(){
    if (confirm('PROCEED With Sycnh Process?')) {

      $scope.pushORBladder();
      $scope.pushORIntraOp();
      $scope.pushORpreOp();
      $scope.pushORMedHist();
      $scope.pushORPass();
      $scope.pushORPostOpRec();
      $scope.pushORPotProb();
      $scope.pushORSkinPrep();
      $scope.pushORSocialHabits();
      $scope.pushORSocialHabits2();
      $scope.pushORSocialHabits3();
      

      alert("EXPORT to Server Successful!");
    }
  }

  $scope.pushORBladder = function(){
    $scope.jdata_ORBladder= [];
    var promise = $ipadrbg.context.jdata_ORBladder.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORBladder = pxresult;
        });
        $scope.jdata_ORBladder_JSON = JSON.stringify($scope.jdata_ORBladder);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORBladder.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORBladder_JSON
            , cache : false
        });
    });
  };

  $scope.pushORIntraOp = function(){
    $scope.jdata_ORIntraOp= [];
    var promise = $ipadrbg.context.jdata_ORIntraOp.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORIntraOp = pxresult;
        });
        $scope.jdata_ORIntraOp_JSON = JSON.stringify($scope.jdata_ORIntraOp);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORIntraOp.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORIntraOp_JSON
            , cache : false
        });
    });
  };

  $scope.pushORpreOp = function(){
    $scope.jdata_ORpreOp= [];
    var promise = $ipadrbg.context.jdata_ORpreOp.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

     promise.then(function(pxresult) {
         $scope.$apply(function () {
           $scope.jdata_ORpreOp = pxresult;
         });
         $scope.jdata_ORpreOp_JSON = JSON.stringify($scope.jdata_ORpreOp);
         $http({
             method: 'POST'
             , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORpreOp.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
             , contentType : 'application/json'
             , data : $scope.jdata_ORpreOp_JSON
             , cache : false
         });
     });
    };
    $scope.pushORMedHist = function(){
    $scope.jdata_ORMedHist= [];
    var promise = $ipadrbg.context.jdata_ORMedHist.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

     promise.then(function(pxresult) {
         $scope.$apply(function () {
           $scope.jdata_ORMedHist = pxresult;
         });
         $scope.jdata_ORMedHist_JSON = JSON.stringify($scope.jdata_ORMedHist);
         $http({
             method: 'POST'
             , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORMedHist.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
             , contentType : 'application/json'
              , data : $scope.jdata_ORMedHist_JSON
              , cache : false
          });
      });
    };


  $scope.pushORPass = function(){
    $scope.jdata_ORPass= [];
    var promise = $ipadrbg.context.jdata_ORPass.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORPass = pxresult;
        });
        $scope.jdata_ORPass_JSON = JSON.stringify($scope.jdata_ORPass);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORPass.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORPass_JSON
            , cache : false
        });
    });
  };

  $scope.pushORPostOpRec = function(){
    $scope.jdata_ORpostOpRec= [];
    var promise = $ipadrbg.context.jdata_ORpostOpRec.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORpostOpRec = pxresult;
        });
        $scope.jdata_ORpostOpRec_JSON = JSON.stringify($scope.jdata_ORpostOpRec);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORPostOpRec.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORpostOpRec_JSON
            , cache : false
        });
    });
  };

  $scope.pushORPotProb = function(){
    $scope.jdata_ORPotProb= [];
    var promise = $ipadrbg.context.jdata_ORPotProb.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORPotProb = pxresult;
        });
        $scope.jdata_ORPotProb_JSON = JSON.stringify($scope.jdata_ORPotProb);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORPotProb.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORPotProb_JSON
            , cache : false
        });
    });
  };

  $scope.pushORSkinPrep = function(){
    $scope.jdata_ORSkinPrep= [];
    var promise = $ipadrbg.context.jdata_ORSkinPrep.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORSkinPrep = pxresult;
        });
        $scope.jdata_ORSkinPrep_JSON = JSON.stringify($scope.jdata_ORSkinPrep);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORSkinPrep.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORSkinPrep_JSON
            , cache : false
        });
    });
  };

  $scope.pushORSocialHabits = function(){
    $scope.jdata_ORSocHab = [];
    var promise = $ipadrbg.context.jdata_ORSocHab.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORSocHab = pxresult;
        });
        $scope.jdata_ORSocHab_JSON = JSON.stringify($scope.jdata_ORSocHab);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORSocHab.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORSocHab_JSON
            , cache : false
        });
    });
  };

  $scope.pushORSocialHabits2 = function(){
    $scope.jdata_ORSocHab2= [];
    var promise = $ipadrbg.context.jdata_ORSocHab2.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORSocHab2 = pxresult;
        });
        $scope.jdata_ORSocHab2_JSON = JSON.stringify($scope.jdata_ORSocHab2);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORSocHab2.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORSocHab2_JSON
            , cache : false
        });
    });
  }; 

  $scope.pushORSocialHabits3 = function(){
    $scope.jdata_ORSocHab3= [];
    var promise = $ipadrbg.context.jdata_ORSocHab3.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORSocHab3 = pxresult;
        });
        $scope.jdata_ORSocHab3_JSON = JSON.stringify($scope.jdata_ORSocHab3);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORSocHab3.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORSocHab3_JSON
            , cache : false
        });
    });
  };


  $scope.pushSignitures = function(){
    if (confirm('PROCEED With Sycnh Process?')) {

      $scope.pushORPreOp();
      $scope.pushORIntraOp();
      $scope.pushORPostOp();
      $scope.pushITF();
      $scope.pushStrucDiscdsig();
      $scope.pushPreOPHip();
      $scope.pushOPHip();
      $scope.pushPostOPHip();
      $scope.pushPreOPKnee();
      $scope.pushOPKnee();
      $scope.pushPostOPKnee();
      $scope.pushClosePE();

      alert("EXPORT to Server Successful!");
    }
  }

  $scope.pushORPreOp = function(){
    $scope.jdata_ORPreOpdsig= [];
    var promise = $ipadrbg.context.jdata_ORPreOpdsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORPreOpdsig = pxresult;
        });
        $scope.jdata_ORPreOpdsig_JSON = JSON.stringify($scope.jdata_ORPreOpdsig);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORPreOpdsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORPreOpdsig_JSON
            , cache : false
        });
    });
  };

  $scope.pushORIntraOp = function(){
    $scope.jdata_ORIntraOpdsig= [];
    var promise = $ipadrbg.context.jdata_ORIntraOpdsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORIntraOpdsig = pxresult;
        });
        $scope.jdata_ORIntraOpdsig_JSON = JSON.stringify($scope.jdata_ORIntraOpdsig);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORIntraOpdsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORIntraOpdsig_JSON
            , cache : false
        });
    });
  };

  $scope.pushORPostOp = function(){
    $scope.jdata_ORPostOpdsig= [];
    var promise = $ipadrbg.context.jdata_ORPostOpdsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ORPostOpdsig = pxresult;
        });
        $scope.jdata_ORPostOpdsig_JSON = JSON.stringify($scope.jdata_ORPostOpdsig);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_ORPostOpdsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ORPostOpdsig_JSON
            , cache : false
        });
    });
  };

  $scope.pushITF = function(){
    $scope.jdata_ITFdsig= [];
    var promise = $ipadrbg.context.jdata_ITFdsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_ITFdsig = pxresult;
        });
        $scope.jdata_ITFdsig_JSON = JSON.stringify($scope.jdata_ITFdsig);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_ITFdsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_ITFdsig_JSON
            , cache : false
        });
    });
  };

  $scope.pushStrucDiscdsig = function(){
    $scope.jdata_StrucDiscdsig= [];
    var promise = $ipadrbg.context.jdata_StrucDiscdsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_StrucDiscdsig = pxresult;
        });
        $scope.jdata_StrucDiscdsig_JSON = JSON.stringify($scope.jdata_StrucDiscdsig);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_jdata_StrucDiscdsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_StrucDiscdsig_JSON
            , cache : false
        });
    });
  };

  $scope.pushPreOPHip = function(){
    $scope.jdata_PreOpHipdsig= [];
    var promise = $ipadrbg.context.jdata_PreOpHipdsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_PreOpHipdsig = pxresult;
        });
        $scope.jdata_PreOpHipdsig_JSON = JSON.stringify($scope.jdata_PreOpHipdsig);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_PREop_HIP_Preform_dsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_PreOpHipdsig_JSON
            , cache : false
        });
    });
  };

  $scope.pushOPHip = function(){
    $scope.jdata_OpHipdsig= [];
    var promise = $ipadrbg.context.jdata_OpHipdsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_OpHipdsig = pxresult;
        });
        $scope.jdata_OpHipdsig_JSON = JSON.stringify($scope.jdata_OpHipdsig);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_Op_HIP_Preform_dsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_OpHipdsig_JSON
            , cache : false
        });
    });
  };

  $scope.pushPostOPHip = function(){
    $scope.jdata_PostHipdsig= [];
    var promise = $ipadrbg.context.jdata_PostHipdsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_PostHipdsig = pxresult;
        });
        $scope.jdata_PostHipdsig_JSON = JSON.stringify($scope.jdata_PostHipdsig);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_POSTop_HIP_Preform_dsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_PostHipdsig_JSON
            , cache : false
        });
    });
  };

  $scope.pushPreOPKnee = function(){
    $scope.jdata_PreOpKneedsig= [];
    var promise = $ipadrbg.context.jdata_PreOpKneedsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_PreOpKneedsig = pxresult;
        });
        $scope.jdata_PreOpKneedsig_JSON = JSON.stringify($scope.jdata_PreOpKneedsig);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_PREop_Knee_Preform_dsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_PreOpKneedsig_JSON
            , cache : false
        });
    });
  };

  $scope.pushOPKnee = function(){
    $scope.jdata_OpKneedsig= [];
    var promise = $ipadrbg.context.jdata_OpKneedsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_OpKneedsig = pxresult;
        });
        $scope.jdata_OpKneedsig_JSON = JSON.stringify($scope.jdata_OpKneedsig);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_Op_Knee_Preform_dsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_OpKneedsig_JSON
            , cache : false
        });
    });
  };

  $scope.pushPostOPKnee = function(){
    $scope.jdata_PostOpKneedsig= [];
    var promise = $ipadrbg.context.jdata_PostOpKneedsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
        $scope.$apply(function () {
          $scope.jdata_PostOpKneedsig = pxresult;
        });
        $scope.jdata_PostOpKneedsig_JSON = JSON.stringify($scope.jdata_PostOpKneedsig);
        $http({
            method: 'POST'
            , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_POSTop_Knee_Preform_dsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
            , contentType : 'application/json'
            , data : $scope.jdata_PostOpKneedsig_JSON
            , cache : false
        });
    });
  };

 $scope.pushClosePE = function(){
    $scope.jdata_ClosePEdsig= [];
    var promise = $ipadrbg.context.jdata_ClosePEdsig.filter(function (px) { 
      return px.ClinixRID > 0}).toLiveArray();

    promise.then(function(pxresult) {
      $scope.$apply(function () {
          $scope.jdata_ClosePEdsig = pxresult;
      });
        
      $scope.jdata_ClosePEdsig_JSON = JSON.stringify($scope.jdata_ClosePEdsig);
      $http({
        method: 'POST'
        , url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_back_ClosePE_dsig.php' //?clinixJsonIzed=' + $scope.clinix_AmbuStatus_JSON
        , contentType : 'application/json'
        , data : $scope.jdata_ClosePEdsig_JSON
        , cache : false
      });
    });
  };


}
