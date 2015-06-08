// 254.99
function DataController($rootScope, $scope, $http) {

	// CLEAN TRANS
	$scope.CleanClinix = function(){
		if (confirm('ARE YOU SURE TO CLEAR ALL Transactions, proceed?')) {
	    	// empty first iPad Table
	        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	        	tx.executeSql("delete from 'clinix'");
	          	//tx.executeSql("delete from 'px_data'");

	          	// tx.executeSql("delete from 'tbl_TranStatus'");
	          	alert("All Transactions were cleared!!!");
	      	});
	    }
	}

	// Pull All Clinix
    $scope.pullAllClinix = function(){  
    	if (confirm('Download ALL TRANSACTIONS from SERVER, proceed?')) {
		    $scope.clinix = [];

		    var serverIP = "192.168.254.99";

			$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/srvr_clinix_ALL.php'}).
		    success(function(data, status, headers, config) {
				if (data !== null ) {

			      	// save to websql 
				    for(idx in data){
				    	if (data[idx].ClinixRID	> 0) {
				    		var clinix = new $ipadrbg.types.clinix();
						
							clinix.ClinixRID 	= data[idx].ClinixRID;
							
							//clinix.AppDateSet 	= Date(Date.parse(data[idx].AppDateSet)).toString();
							clinix.AppDateSet 	= data[idx].AppDateSet;

							clinix.AppDateAge  	= data[idx].AppDateAge;

					    	clinix.PxRID 		= data[idx].PxRID;
							clinix.pxname 		= data[idx].pxname;
							clinix.pxAddress 	= data[idx].pxAddress;
							clinix.pxstatus 	= data[idx].pxstatus;

							//clinix.pxregdate 	= Date(Date.parse(data[idx].pxregdate)).toString();
							clinix.pxregdate 	= data[idx].pxregdate;

							clinix.pxFoto 		= data[idx].pxFoto;
							clinix.TranStatus 	= data[idx].TranStatus;
							clinix.TranStatusDisp = data[idx].TranStatusDisp;

							clinix.HospitalRID = data[idx].HospitalRID;
							clinix.Hospital = data[idx].Hospital;
							clinix.PurposeOfVisit = data[idx].PurposeOfVisit;
							clinix.Dok = data[idx].Dok;

							$ipadrbg.context.clinix.add(clinix);
						}
				    }
				    $ipadrbg.context.clinix.saveChanges();

					// bind data to scope
					$scope.clinix = data;
					
					// notify iPad User
					alert("Importing from Server was Successful!");
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
    		var serverIP = "192.168.254.99";

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

			$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/srvr_clinix.php'}).
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

							// clinix.AppDateSet 	= Date(Date.parse(data[idx].AppDateSet)).toString();
							clinix.AppDateSet 	= data[idx].AppDateSet;

							clinix.AppDateAge 	= data[idx].AppDateAge;

					    	clinix.PxRID 		= data[idx].PxRID;
							clinix.pxname 		= data[idx].pxname;
							clinix.pxAddress 	= data[idx].pxAddress;
							clinix.pxstatus 	= data[idx].pxstatus;

							//clinix.pxregdate 	= Date(Date.parse(data[idx].pxregdate)).toString();
							clinix.pxregdate 	= data[idx].pxregdate;

							clinix.pxFoto 		= data[idx].pxFoto;
							clinix.TranStatus 	= data[idx].TranStatus;
							clinix.TranStatusDisp = data[idx].TranStatusDisp;

							clinix.HospitalRID = data[idx].HospitalRID;
							clinix.Hospital = data[idx].Hospital;

							clinix.PurposeOfVisit = data[idx].PurposeOfVisit;
							clinix.Dok = data[idx].Dox;

							// now add it
							$ipadrbg.context.clinix.add(clinix);
						}
				    }
					$ipadrbg.context.clinix.saveChanges();

					// bind data to scope
					$scope.clinix = data;
					
					// notify REST and change TranStatus, that iPad already received appointments set

					ClinixPulled += '{"ClinixRID":0}]'; // closing the bracket here 

					if (data.length > 0 ) {
						//var clinixJson = JSON.stringify(ClinixPulled);
						$http({
							method: 'POST'
							, url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_clinix_pulled.php?clinixJson=' + ClinixPulled
							, contentType : 'application/json'
							, data : ClinixPulled
							, cache : false
						});
					}

					// notify iPad User
					alert("Importing from Server was Successful!");
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
		var serverIP = "192.168.254.99";

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

			$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_TranStatus.php'}).
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
					alert("Importing TranStatus from Server was Successful! " + serverIP);
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
		var serverIP = "192.168.254.99";

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

			$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_ChargesTariff.php'}).
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
					alert("Importing Charges Tariff from Server was Successful!: " + serverIP);
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


	// PULL LABs Reults
	$scope.pullLABResults = function(){
		var serverIP = "192.168.254.99";

		if (confirm('Download LAB Results, proceed?')) {
	    	// empty first iPad Table
	        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='LAB_Results'");
	            tx.executeSql("delete from 'LAB_Results'");

	            // tx.executeSql("drop table ' put tablename here '");
	        });
	        //db.close();
	        // after truncate

			$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_LABResults.php'}).
		    success ( function ( data, status, headers, config ) {

				if (data !== null ) {
			      	// save to websql
				    for(idx in data){
				    	// get only the Finals
				    	if (data[idx].Final > 0 && data[idx].Deleted == 0) {
				    		var LAB_Results = new $ipadrbg.types.LAB_Results();

							LAB_Results.LabRexRID 		= data[idx].LabRexRID;

							LAB_Results.ClinixRID 		= data[idx].ClinixRID;
							LAB_Results.PxRID 			= data[idx].PxRID;

							LAB_Results.LCatRID 		= data[idx].LCatRID;
							LAB_Results.RefNum			= data[idx].RefNum;
							LAB_Results.Result			= data[idx].Result;
							LAB_Results.LabRexTypeRID 	= data[idx].LabRexTypeRID;
							LAB_Results.RefDate 		= data[idx].RefDate;
							LAB_Results.DateEntered 	= data[idx].DateEntered;

							LAB_Results.DateDone 		= data[idx].DateDone;
							LAB_Results.ScannedUploaded	= data[idx].ScannedUploaded	
							LAB_Results.EnteredBy		= data[idx].EnteredBy							
							LAB_Results.SourceLocation	= data[idx].SourceLocation	

							LAB_Results.ImageFolder		= data[idx].ImageFolder								
							LAB_Results.ImageFileName	= data[idx].ImageFileName							
							LAB_Results.SysFileName		= data[idx].SysFileName		
							LAB_Results.HangRID			= data[idx].HangRID							
							LAB_Results.data64			= data[idx].data64

							LAB_Results.Final			= data[idx].Final
							LAB_Results.remarks			= data[idx].remarks							
							LAB_Results.Deleted			= data[idx].Deleted	

							LAB_Results.SynchStatus		= "222"							

							$ipadrbg.context.LAB_Results.add(LAB_Results);
						}
				    }
					$ipadrbg.context.LAB_Results.saveChanges();

					// notify iPad User
					alert("Importing LAB Results from Server was Successful!: " + serverIP);
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