function DataController($rootScope, $scope, $http) {

	// Pull All Clinix
    $scope.pullAllClinix = function(){
    	if (confirm('Download ALL TRANSACTIONS from SERVER, proceed?')) {
		    $scope.clinix = [];

			$http({method: 'GET', url: 'http://192.168.0.99/RBGsrvr_todayset/srvr_clinix_ALL.php'}).
		    success(function(data, status, headers, config) {
				if (data !== null ) {

			      	// save to websql
				    for(idx in data){
				    	if (data[idx].ClinixRID	> 0) {
				    		var clinix = new $ipadrbg.types.clinix();
						
							clinix.ClinixRID 	= data[idx].ClinixRID;
							clinix.AppDateSet 	= Date(Date.parse(data[idx].AppDateSet)).toString();
					    	clinix.PxRID 		= data[idx].PxRID;
							clinix.pxname 		= data[idx].pxname;
							clinix.pxAddress 	= data[idx].pxAddress;
							clinix.pxstatus 	= data[idx].pxstatus;
							clinix.pxregdate 	= Date(Date.parse(data[idx].pxregdate)).toString();
							clinix.pxFoto 		= data[idx].pxFoto;
							clinix.TranStatus 	= data[idx].TranStatus;
							clinix.TranStatusDisp = data[idx].TranStatusDisp;

							$ipadrbg.context.clinix.add(clinix);
						}
				    }
				    $ipadrbg.context.clinix.saveChanges();

					// bind data to scope
					$scope.clinix = data;
					
					// notify iPad User
					alert("Import from Server Successful!");
				}
				else
					alert("Nothing to Import from Server!");
		    }).
		    	error(function(data, status, headers, config) {
		    });
	    }
	}
    
	// Pull clinix
    $scope.pullData = function(){
    	if (confirm('Download Appoinments, proceed?')) {
	    	// var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
		    //    db.transaction(function (tx) {
		    //        tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix'");
		    //        tx.executeSql("delete from 'clinix'");
		    //    });

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

							clinix.ClinixRID 	= data[idx].ClinixRID;
							clinix.AppDateSet 	= Date(Date.parse(data[idx].AppDateSet)).toString();
					    	clinix.PxRID 		= data[idx].PxRID;
							clinix.pxname 		= data[idx].pxname;
							clinix.pxAddress 	= data[idx].pxAddress;
							clinix.pxstatus 	= data[idx].pxstatus;
							clinix.pxregdate 	= Date(Date.parse(data[idx].pxregdate)).toString();
							clinix.pxFoto 		= data[idx].pxFoto;
							clinix.TranStatus 	= data[idx].TranStatus;
							clinix.TranStatusDisp = data[idx].TranStatusDisp;

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
	}


    // PULL Tran Status
	$scope.pullTranStatus = function(){
		if (confirm('Download latest Transaction Codes table, proceed?')) {
	    	// empty first iPad Table
	        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='lkup_TranStatus'");
	            tx.executeSql("delete from 'lkup_TranStatus'");

	            // tx.executeSql("delete from 'tbl_TranStatus'");
	            // tx.executeSql("drop table 'tbl_TranStatus'");
	        });
	        //db.close();
	        // after truncate

			$http({method: 'GET', url: 'http://192.168.0.99/RBGsrvr_todayset/pull_TranStatus.php'}).
		    success ( function ( data, status, headers, config ) {

				if (data !== null ) {
			      	// save to websql
				    for(idx in data){
				    	if (data[idx].TrnSttsRID > 0) {
				    		var lkup_TranStatus = new $ipadrbg.types.lkup_TranStatus();

							lkup_TranStatus.TrnSttsRID 		= data[idx].TrnSttsRID;
							lkup_TranStatus.TrnStts 		= data[idx].TrnStts;
							lkup_TranStatus.preForeColor 	= data[idx].preForeColor;
							lkup_TranStatus.preBackColor 	= data[idx].preBackColor;
							lkup_TranStatus.Deleted 		= data[idx].Deleted;

							$ipadrbg.context.lkup_TranStatus.add(lkup_TranStatus);
						}
				    }
					$ipadrbg.context.lkup_TranStatus.saveChanges();

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
	}

	 // PULL Tariff
	$scope.pullTariff = function(){
		if (confirm('Download latest TARIFF Charges table, proceed?')) {
	    	// empty first iPad Table
	        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='lkup_PEChargesTariff'");
	            tx.executeSql("delete from 'lkup_PEChargesTariff'");

	            // tx.executeSql("drop table ' put tablename here '");
	        });
	        //db.close();
	        // after truncate

			$http({method: 'GET', url: 'http://192.168.0.99/RBGsrvr_todayset/pull_ChargesTariff.php'}).
		    success ( function ( data, status, headers, config ) {

				if (data !== null ) {
			      	// save to websql
				    for(idx in data){
				    	if (data[idx].FeeRID > 0) {
				    		var lkup_PEChargesTariff = new $ipadrbg.types.lkup_PEChargesTariff();

							lkup_PEChargesTariff.FeeRID 		= data[idx].FeeRID;
							lkup_PEChargesTariff.Parent 		= data[idx].Parent;
							lkup_PEChargesTariff.ParentFeeRID 	= data[idx].ParentFeeRID;
							lkup_PEChargesTariff.Description	= data[idx].Description;
							lkup_PEChargesTariff.SortOrder 		= data[idx].SortOrder;
							lkup_PEChargesTariff.Tariff 		= data[idx].Tariff;
							lkup_PEChargesTariff.ChargeAmount 	= data[idx].ChargeAmount;
							lkup_PEChargesTariff.Discount 		= data[idx].Discount;
							lkup_PEChargesTariff.Deleted 		= data[idx].Deleted;
							
							$ipadrbg.context.lkup_PEChargesTariff.add(lkup_PEChargesTariff);
						}
				    }
					$ipadrbg.context.lkup_PEChargesTariff.saveChanges();

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
}	