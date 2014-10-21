function DataController($rootScope,$scope,$http) {

	// Pull clinix
    $scope.pullData = function(){
    	// request for transactions from the server via REST
    	// let say we have this sample transactions
	    $scope.clinix = [];
	    var ClinixPulled = "[";

    	// detect for internet connection
    	// if internet is available
    	// check for data version
    	// if local data is outdated then pull data from server
    	// if local data is latest then push to server 

		$http({method: 'GET', url: 'http://192.168.0.99/RBGsrvr_todayset/srvr_clinix.php'}).
		//$http({method: 'GET', url: 'http://localhost/RBGsrvr_todayset/srvr_clinix.php'}).
	    success(function(data, status, headers, config) {
	      	// this callback will be called asynchronously
	      	// when the response is available

	      	// console.log(data);
			//if (data.length > 0 ) {
			if (data !== null ) {

		      	// save to websql
			    for(idx in data){
			    	if (data[idx].ClinixRID	> 0) {
			    		var clinix = new $ipadrbg.types.clinix();
				    	// var clinix_chiefcomp = new $ipadrbg.types.clinix_chiefcomp();
				    	// var clinix_etiology = new $ipadrbg.types.clinix_etiology();
					
						ClinixPulled += '{"ClinixRID":' + data[idx].ClinixRID + '},';  // for Pulled Notification at REST 

						clinix.ClinixRID = data[idx].ClinixRID;
						clinix.AppDateSet = data[idx].AppDateSet;
						
				    	clinix.PxRID = data[idx].PxRID;
						clinix.pxname = data[idx].pxname;
						clinix.pxAddress = data[idx].pxAddress;
						clinix.pxstatus = data[idx].pxstatus;
						clinix.pxregdate = data[idx].pxregdate;
						clinix.pxFoto = data[idx].pxFoto;
						clinix.TranStatus = data[idx].TranStatus;

						//clinix_chiefcomp.ChiefRID = idx;
						// clinix_chiefcomp.ClinixRID = data[idx].ClinixRID;
				 		// clinix_chiefcomp.PxRID = data[idx].PxRID;
						// clinix_chiefcomp.MyBone = 2;
						// clinix_chiefcomp.MyBoneLRB = "MyBoneComplaint";
						// clinix_chiefcomp.Remarks = "Other Information Here!!!";

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
			    }
				$ipadrbg.context.clinix.saveChanges();

				// bind data to scope
				$scope.clinix = data;
				
				// notify REST and change TranStatus, that iPad already received appointments set

				ClinixPulled += '{"ClinixRID":0}]';
				if (data.length > 0 ) {
					//var clinixJson = JSON.stringify(ClinixPulled);
					$http({
						method: 'POST'
						, url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_clinix_pulled.php?clinixJson=' + ClinixPulled
						, contentType : 'application/json'
						, data : ClinixPulled
						, cache : false
					});
				}

				// notify iPad User
				alert("Import from Server Successful!");
			}
			else
				alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
    }


    // PULL Tran Status
	$scope.pullTranStatus = function(){

		$http({method: 'GET', url: 'http://192.168.0.99/RBGsrvr_todayset/pull_TranStatus.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	if (data[idx].TrnSttsRID > 0) {
			    		var tbl_TranStatus = new $ipadrbg.types.tbl_TranStatus();
						tbl_TranStatus.TrnSttsRID = data[idx].TrnSttsRID;
						tbl_TranStatus.TrnStts = data[idx].TrnStts;

						$ipadrbg.context.tbl_TranStatus.add(tbl_TranStatus);
					}
			    }
				$ipadrbg.context.tbl_TranStatus.saveChanges();

				// notify iPad User
				alert("Import TranStatus from Server Successful!");
			}
			else
				alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	 // PULL Tariff
	$scope.pullTariff = function(){

		$http({method: 'GET', url: 'http://192.168.0.99/RBGsrvr_todayset/pull_ChargesTariff.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	if (data[idx].FeeRID > 0) {
			    		var tbl_Tariff = new $ipadrbg.types.tbl_Tariff();
						tbl_Tariff.FeeRID = data[idx].FeeRID;
						tbl_Tariff.Parent = data[idx].Parent;
						tbl_Tariff.ParentFeeRID = data[idx].ParentFeeRID;
						tbl_Tariff.Description = data[idx].Description;
						tbl_Tariff.SortOrder = data[idx].SortOrder;
						tbl_Tariff.DefaultAmount = data[idx].DefaultAmount;
						tbl_Tariff.Deleted = data[idx].Deleted;
						
						$ipadrbg.context.tbl_Tariff.add(tbl_Tariff);
					}
			    }
				$ipadrbg.context.tbl_Tariff.saveChanges();

				// notify iPad User
				alert("Import Charges Tariff from Server Successful!");
			}
			else
				alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}
}	