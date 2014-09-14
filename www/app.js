function DataController($rootScope,$scope,$http) {

	// request for transactions from the server via REST

	// let say we have this sample transactions
    $scope.clinix = [];

    $scope.pullData = function(){
    	// detect for internet connection
    	// if internet is available
    	// check for data version
    	// if local data is outdated then pull data from server
    	// if local data is latest then push to server 
		$http({method: 'GET', url: 'http://192.168.0.99/RBGsrvr_todayset/srvr_clinix.php'}).
	    success(function(data, status, headers, config) {
	      	// this callback will be called asynchronously
	      	// when the response is available

	      	// console.log(data);

	      	// save to websql
		    for(idx in data){
		    	var clinix = new $ipadrbg.types.clinix();
		    	var clinix_chiefcomp = new $ipadrbg.types.clinix_chiefcomp();
		    	var clinix_etiology = new $ipadrbg.types.clinix_etiology();
		    	
				clinix.ClinixRID = data[idx].ClinixRID;
		    	clinix.PxRID = data[idx].PxRID;
				clinix.pxname = data[idx].pxname;
				clinix.Address = data[idx].Address;
				clinix.pxstatus = data[idx].pxstatus;
				clinix.pxregdate = data[idx].pxregdate;
				clinix.Foto = data[idx].Foto;

				//clinix_chiefcomp.ChiefRID = idx;
				clinix_chiefcomp.ClinixRID = data[idx].ClinixRID;
		    	clinix_chiefcomp.PxRID = data[idx].PxRID;
				clinix_chiefcomp.MyBone = 2;
				clinix_chiefcomp.MyBoneLRB = "MyBoneComplaint";
				clinix_chiefcomp.Remarks = "Other Information Here!!!";

				// //clinix_chiefcomp.EtiologyRID = idx;
				// clinix_etiology.ClinixRID = data[idx].ClinixRID;
				// clinix_etiology.PxRID = data[idx].PxRID;
				// clinix_etiology.Injury = true;
				// clinix_etiology.DateEtio = data[idx].pxregdate;
				// clinix_etiology.WorkRelated = true;
				// clinix_etiology.WorkRelatedDetails = "Details of injury details here...";
				// clinix_etiology.Duration = data[idx].PxRID;
				// clinix_etiology.DurationUnit = "DAYS";
				// clinix_etiology.Severity = "MODERATE";

				$ipadrbg.context.clinix.add(clinix);
				// $ipadrbg.context.clinix_chiefcomp.add(clinix_chiefcomp);
				// $ipadrbg.context.clinix_etiology.add(clinix_etiology);
		    }

			$ipadrbg.context.saveChanges();

			// bind data to scope
			$scope.clinix = data;
			alert("Import from Server Successful!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
    }
}