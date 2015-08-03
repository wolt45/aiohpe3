// 192.168.0.99   
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

		    var serverIP = "192.168.0.99";

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
    		var serverIP = "192.168.0.99";

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
		var serverIP = "192.168.0.99";

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
		var serverIP = "192.168.0.99";

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
		var serverIP = "192.168.0.99";

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
							LAB_Results.ScannedUploaded	= data[idx].ScannedUploaded;
							LAB_Results.EnteredBy		= data[idx].EnteredBy;					
							LAB_Results.SourceLocation	= data[idx].SourceLocation;

							LAB_Results.ImageFolder		= data[idx].ImageFolder;							
							LAB_Results.ImageFileName	= data[idx].ImageFileName;							
							LAB_Results.SysFileName		= data[idx].SysFileName;		
							LAB_Results.HangRID			= data[idx].HangRID;							
							LAB_Results.data64			= data[idx].data64;

							LAB_Results.Final			= data[idx].Final;
							LAB_Results.remarks			= data[idx].remarks;						
							LAB_Results.Deleted			= data[idx].Deleted;

							LAB_Results.SynchStatus		= "222";						

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


	//
	//
	//
	//
	//
	//
	//
	// PULL INITIAL INTERVIEW RESULTS
  	$scope.puller_IOH = function() {
    	if (confirm('Download INITIAL INTERVIEW Results, proceed?')) {

      		//$scope.pullZClinix();

      		$scope.pullChiefComplaint();
      		$scope.pullEtiology();
      		$scope.pullPastTreats();
      		$scope.pullPrevSurg();
      		$scope.pullPrevLABS();
      		$scope.pullMedHist();

      		alert("Importing INITIAL INTERVIEW Results from Server was Successful!");
    	}
  	}	

	// PULL IOH - CHIEF COMPLAINT
	$scope.pullZClinix = function(){
		var serverIP = "192.168.0.99";

		//if (confirm('Download INITIAL INTERVIEW Results, proceed?')) {
	    	// empty first iPad Table
	        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='zclinix'");
	            tx.executeSql("delete from 'zclinix'");
	            // tx.executeSql("drop table ' put tablename here '");
	        });
	        //db.close();
	        // after truncate

			$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_ZClinix.php'}).
		    success ( function ( data, status, headers, config ) {

				if (data !== null ) {
			      	// save to websql
				    for(idx in data){
				    	var zclinix = new $ipadrbg.types.zclinix();

						zclinix.ClinixRID 		= data[idx].ClinixRID;

						zclinix.HIP 		= data[idx].HIP;
						zclinix.KNEE		= data[idx].KNEE;

						zclinix.SynchStatus	= "222";					

						$ipadrbg.context.zclinix.add(zclinix);
					}
					$ipadrbg.context.zclinix.saveChanges();

					// notify iPad User
					//alert("Importing INITIAL INTERVIEW Results from Server was Successful!: " + serverIP);
				}
				//else
					//alert("Nothing to Import from Server!");
		    }).
		    error(function(data, status, headers, config) {
		      	// called asynchronously if an error occurs
		      	// or server returns response with an error status.
		    });
		//}
	}


	// PULL IOH - CHIEF COMPLAINT
	$scope.pullChiefComplaint = function(){
		var serverIP = "192.168.0.99";

		//if (confirm('Download INITIAL INTERVIEW Results, proceed?')) {
	    	// empty first iPad Table
	        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_chiefcomp'");
	            tx.executeSql("delete from 'clinix_chiefcomp'");
	            // tx.executeSql("drop table ' put tablename here '");
	        });
	        //db.close();
	        // after truncate

			$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_IOH_chiefcomp.php'}).
		    success ( function ( data, status, headers, config ) {

				if (data !== null ) {
			      	// save to websql
				    for(idx in data){
				    	var clinix_chiefcomp = new $ipadrbg.types.clinix_chiefcomp();

						clinix_chiefcomp.ClinixRID 		= data[idx].ClinixRID;
						clinix_chiefcomp.PxRID 			= data[idx].PxRID;

						clinix_chiefcomp.MyBone 		= data[idx].MyBone;
						clinix_chiefcomp.MyBoneLRB		= data[idx].MyBoneLRB;
						clinix_chiefcomp.MyBoneComplaint= data[idx].MyBoneComplaint;
						clinix_chiefcomp.Remarks 		= data[idx].Remarks;

						clinix_chiefcomp.SynchStatus	= "222";					

						$ipadrbg.context.clinix_chiefcomp.add(clinix_chiefcomp);
					}
					//$ipadrbg.context.clinix_chiefcomp.saveChanges();

					// notify iPad User
					//alert("Importing INITIAL INTERVIEW Results from Server was Successful!: " + serverIP);
				}
				//else
					//alert("Nothing to Import from Server!");
		    }).
		    error(function(data, status, headers, config) {
		      	// called asynchronously if an error occurs
		      	// or server returns response with an error status.
		    });
		//}
	}

	// PULL IOH - Etiology
	$scope.pullEtiology = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_etiology'");
            tx.executeSql("delete from 'clinix_etiology'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_IOH_etiology.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_etiology = new $ipadrbg.types.clinix_etiology();
			    	
					clinix_etiology.ClinixRID 			= data[idx].ClinixRID;
					clinix_etiology.PxRID 				= data[idx].PxRID;

					clinix_etiology.Injury				= data[idx].Injury;
					clinix_etiology.DateEtio		 	= data[idx].DateEtio;
					clinix_etiology.WorkRelatedDetails  = data[idx].WorkRelatedDetails;
					clinix_etiology.OnsetAccuteGradual  = data[idx].OnsetAccuteGradual ;

					clinix_etiology.Duration  			= data[idx].Duration ;
					clinix_etiology.DurationUnit  		= data[idx].DurationUnit ;
					clinix_etiology.Severity  			= data[idx].Severity ;
					clinix_etiology.AmbulatoryAid  		= data[idx].AmbulatoryAid ;

					clinix_etiology.SynchStatus	= "222";					

					$ipadrbg.context.clinix_etiology.add(clinix_etiology);
				}
				//$ipadrbg.context.clinix_etiology.saveChanges();

				// notify iPad User
				//alert("Importing Etiology Results from Server was Successful!: " + serverIP);
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL IOH - PAST TREATMENTs 
	$scope.pullPastTreats = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_treatment'");
            tx.executeSql("delete from 'clinix_treatment'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_IOH_pasttreats.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_treatment = new $ipadrbg.types.clinix_treatment();
			    	
					clinix_treatment.ClinixRID 			= data[idx].ClinixRID;
					clinix_treatment.PxRID 				= data[idx].PxRID;

					clinix_treatment.medAnalgesic		= data[idx].medAnalgesic;
					clinix_treatment.medAntiInflamatory	= data[idx].medAntiInflamatory;

					clinix_treatment.medOthers  		= data[idx].medOthers ;

					clinix_treatment.injSteroidsVolume  = data[idx].injSteroidsVolume ;
					clinix_treatment.injSteroidsWhen  	= data[idx].injSteroidsWhen ;
					clinix_treatment.injSteroidsResult  = data[idx].injSteroidsResult ;
					clinix_treatment.injSteroidsDetails = data[idx].injSteroidsDetails ;

					clinix_treatment.injHyaluronicAcid  	= data[idx].injHyaluronicAcid ;
					clinix_treatment.injHyaluronicResult  	= data[idx].injHyaluronicResult ;
					clinix_treatment.injHyaluronicDetails  	= data[idx].injHyaluronicDetails ;

					clinix_treatment.SynchStatus = "222";					

					$ipadrbg.context.clinix_treatment.add(clinix_treatment);
				}
				//$ipadrbg.context.clinix_treatment.saveChanges();

				// notify iPad User
				//alert("Importing Etiology Results from Server was Successful!: " + serverIP);
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL IOH - PREV SURGERY  
	$scope.pullPrevSurg = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_previousSurgeries'");
            tx.executeSql("delete from 'clinix_previousSurgeries'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_IOH_prevsurg.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_previousSurgeries = new $ipadrbg.types.clinix_previousSurgeries();
			    	
					clinix_previousSurgeries.ClinixRID 			= data[idx].ClinixRID;
					clinix_previousSurgeries.PxRID 				= data[idx].PxRID;

					clinix_previousSurgeries.SurgeryType		= data[idx].SurgeryType;
					clinix_previousSurgeries.SurgeryWhen	= data[idx].SurgeryWhen;

					clinix_previousSurgeries.SurgeryWhere  		= data[idx].SurgeryWhere ;

					clinix_previousSurgeries.SurgeryWho  = data[idx].SurgeryWho ;
					clinix_previousSurgeries.SurgeryHelped  	= data[idx].SurgeryHelped ;
					clinix_previousSurgeries.SurgeryHowMany  = data[idx].SurgeryHowMany ;
					clinix_previousSurgeries.SurgeryHowManyUnit = data[idx].SurgeryHowManyUnit ;

					clinix_previousSurgeries.SynchStatus = "222";					

					$ipadrbg.context.clinix_previousSurgeries.add(clinix_previousSurgeries);
				}
				//$ipadrbg.context.clinix_previousSurgeries.saveChanges();

				// notify iPad User
				//alert("Importing Etiology Results from Server was Successful!: " + serverIP);
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL IOH - PREV LABORATORY RESULTS  
	$scope.pullPrevLABS = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_LABS'");
            tx.executeSql("delete from 'clinix_LABS'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_IOH_prevlabs.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_LABS = new $ipadrbg.types.clinix_LABS();
			    	
					clinix_LABS.ClinixRID 			= data[idx].ClinixRID;
					clinix_LABS.PxRID 				= data[idx].PxRID;

					clinix_LABS.labCategory	= data[idx].labCategory;
					clinix_LABS.labDate		= data[idx].labDate;
					clinix_LABS.labSource 	= data[idx].labSource ;
					clinix_LABS.labReport  	= data[idx].labReport ;

					clinix_LABS.SynchStatus = "222";					

					$ipadrbg.context.clinix_LABS.add(clinix_LABS);
				}
				//$ipadrbg.context.clinix_LABS.saveChanges();

				// notify iPad User
				//alert("Importing Etiology Results from Server was Successful!: " + serverIP);
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL IOH - PREV Medical History  
	$scope.pullMedHist = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_MedHist'");
            tx.executeSql("delete from 'clinix_MedHist'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_IOH_medhist.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_MedHist = new $ipadrbg.types.clinix_MedHist();
			    	
					clinix_MedHist.ClinixRID = data[idx].ClinixRID;
					clinix_MedHist.PxRID = data[idx].PxRID;

					clinix_MedHist.MedHist = data[idx].MedHist;
					clinix_MedHist.MedHistYN = data[idx].MedHistYN;
					clinix_MedHist.MedHistDetails = data[idx].MedHistDetails ;

					clinix_MedHist.SynchStatus = "222";					

					$ipadrbg.context.clinix_MedHist.add(clinix_MedHist);
				}
				$ipadrbg.context.clinix_MedHist.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	//
	//
	//
	//
	//
	//
	//
	// PULL PHYSICAL EXAM RESULTS and REPORTS and ORDERS
  	$scope.puller_PEResults = function() {
    	if (confirm('Download PE Results, DIAGNOSIS, Operative Orders and Reports, proceed?')) {

    		// alert(ipaddress);
    		
    		var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_AmbuStatus'");
	            tx.executeSql("delete from 'clinix_AmbuStatus'");

	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_HipMotionRange'");
            	tx.executeSql("delete from 'clinix_HipMotionRange'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_HipStanding'");
            	tx.executeSql("delete from 'clinix_HipStanding'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_HipXRays'");
            	tx.executeSql("delete from 'clinix_HipXRays'");
	        });

    		$scope.pullambustatus(function(){
    			$scope.pullHipMotionRange(function(){
    				$scope.pullHipStanding(function(){
    					$scope.pullHipXray(function(){

    						$ipadrbg.context.saveChanges();
    						
    					});
    				});
    			});
    		});

    		// $scope.pullambustatus()
    		// .after($scope.pullHipMotionRange)
    		// .after($scope.pullHipStanding)
    		// .after

      		// $scope.pullHipXray();

      		// $scope.pullKneeAlignment();
      		// $scope.pullKneeApperance();
      		// NOT USED NOT USED  $scope.pullKneeMeasurements();
      		// $scope.pullKneeMotionRange();      			
      		// $scope.pullKneeXray();      			

      		// $scope.pullDIAGS();
      		// $scope.pullDIAGS_mgmt();
      		// $scope.pullDIAGS_ScheduleForSurgery();
      		
   //    		$scope.pullDIAGS_Medication();
   //    		$scope.pullDIAGS_Disposition();
   //    		$scope.pullDIAGS_Notes();
   //    		$scope.pullDIAGS_Charges();

   //    		$scope.pull_POSTOPHIP();
   //    		$scope.pull_PREOPHIP();

   //    		$scope.pull_OPHIP_3();
   //    		$scope.pull_OPHIP_5();
   //    		$scope.pull_OPHIP_6();
      		
			// $scope.pull_POSTOPKNEE();
   //    		$scope.pull_PREOPKNEE();

 		// 	$scope.pull_OPKNEE_3();
 		// 	$scope.pull_OPKNEE_4();
 		// 	$scope.pull_OPKNEE_5();     

 		// 	$scope.pull_StrucDiagnosis();
 		// 	$scope.pull_StrucDisposition();
 		// 	$scope.pull_StrucHospitalization();
 		// 	$scope.pull_StrucLabs();
 		// 	$scope.pull_StrucManagement();
 			//$scope.pull_StrucMedication();
 			
 			// not used, see diagnosis sur schedule
 			// $scope.pull_StrucSchedSurgery();

      		alert("Importing PE Results, DIAGNOSIS, Operative Orders and Reports from Server was Successful!");
    	}
  	}	


  	// PULL Ambulatory Status
	$scope.pullambustatus = function(callback){
		var serverIP = "192.168.0.99";

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_AmbulatoryStatus.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_AmbuStatus = new $ipadrbg.types.clinix_AmbuStatus();
			    	
					clinix_AmbuStatus.ClinixRID = data[idx].ClinixRID;
					clinix_AmbuStatus.PxRID = data[idx].PxRID;

					clinix_AmbuStatus.PhysicalCondition = data[idx].PhysicalCondition;
					clinix_AmbuStatus.AmbulatoryAid = data[idx].AmbulatoryAid;
					clinix_AmbuStatus.AbleTo = data[idx].AbleTo;

					clinix_AmbuStatus.SynchStatus = "222";					

					$ipadrbg.context.clinix_AmbuStatus.add(clinix_AmbuStatus);
				}
			}

			callback();
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL Hip Measurements
	$scope.pullHipMeasurements = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_HipMeasures'");
            tx.executeSql("delete from 'clinix_HipMeasures'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_HipMeasurements.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_HipMeasures = new $ipadrbg.types.clinix_HipMeasures();
			    	
					clinix_HipMeasures.ClinixRID = data[idx].ClinixRID;
					clinix_HipMeasures.PxRID = data[idx].PxRID;

					clinix_HipMeasures.SupineLength = data[idx].SupineLength;
					clinix_HipMeasures.LR = data[idx].LR;
					clinix_HipMeasures.AbsentNormal = data[idx].AbsentNormal;
					clinix_HipMeasures.Others = data[idx].Others;

					clinix_HipMeasures.SynchStatus = "222";					

					$ipadrbg.context.clinix_HipMeasures.add(clinix_HipMeasures);
				}
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL Hip Motion Range
	$scope.pullHipMotionRange = function(callback){
		var serverIP = "192.168.0.99";

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_HipMotionRange.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_HipMotionRange = new $ipadrbg.types.clinix_HipMotionRange();
			    	
					clinix_HipMotionRange.ClinixRID = data[idx].ClinixRID;
					clinix_HipMotionRange.PxRID = data[idx].PxRID;

					clinix_HipMotionRange.FlexionContra = data[idx].FlexionContra;
					clinix_HipMotionRange.Flexion = data[idx].Flexion;
					clinix_HipMotionRange.Extension = data[idx].Extension;
					clinix_HipMotionRange.IR = data[idx].IR;
					clinix_HipMotionRange.ER = data[idx].ER;
					clinix_HipMotionRange.AbductionSupine = data[idx].AbductionSupine;
					clinix_HipMotionRange.AbductionLateral = data[idx].AbductionLateral;
					clinix_HipMotionRange.Adduction = data[idx].Adduction;

					clinix_HipMotionRange.SLR_Ryn = data[idx].SLR_Ryn;
					clinix_HipMotionRange.SLRValR = data[idx].SLRValR;
					clinix_HipMotionRange.SLR_Lyn = data[idx].SLR_Lyn;
					clinix_HipMotionRange.SLRValL = data[idx].SLRValL;

					clinix_HipMotionRange.Resist_Ryn = data[idx].Resist_Ryn;
					clinix_HipMotionRange.ResistRight = data[idx].ResistRight;
					clinix_HipMotionRange.Resist_Lyn = data[idx].Resist_Lyn;
					clinix_HipMotionRange.ResistLeft = data[idx].ResistLeft;

					clinix_HipMotionRange.SynchStatus = "222";					

					$ipadrbg.context.clinix_HipMotionRange.add(clinix_HipMotionRange);
				}
			}

			callback();
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL HipStanding
	$scope.pullHipStanding = function(callback){
		var serverIP = "192.168.0.99";

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_HipStanding.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_HipStanding = new $ipadrbg.types.clinix_HipStanding();
			    	
					clinix_HipStanding.ClinixRID = data[idx].ClinixRID;
					clinix_HipStanding.PxRID = data[idx].PxRID;

					clinix_HipStanding.PelvisLevel = data[idx].PelvisLevel;
					clinix_HipStanding.Trendelenberg = data[idx].Trendelenberg;

					clinix_HipStanding.SynchStatus = "222";					

					$ipadrbg.context.clinix_HipStanding.add(clinix_HipStanding);
				}
			}

			callback();
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// **********PULL HipXray***********
	$scope.pullHipXray = function(callback){
		var serverIP = "192.168.0.99";

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_HipXray.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_HipXRays = new $ipadrbg.types.clinix_HipXRays();
			    	
					clinix_HipXRays.ClinixRID = data[idx].ClinixRID;
					clinix_HipXRays.PxRID = data[idx].PxRID;

					clinix_HipXRays.APPelvisBothHipsDate = data[idx].APPelvisBothHipsDate;
					clinix_HipXRays.Pelvis = data[idx].Pelvis;
					clinix_HipXRays.PelvisInches = data[idx].PelvisInches;
					clinix_HipXRays.Avascular = data[idx].Avascular;
					clinix_HipXRays.Narrowing = data[idx].Narrowing;
					clinix_HipXRays.Subluxation = data[idx].Subluxation;
					clinix_HipXRays.Osteoporosis = data[idx].Osteoporosis;
					clinix_HipXRays.FracturesNeck = data[idx].FracturesNeck;
					clinix_HipXRays.Intertrouch = data[idx].Intertrouch;
					clinix_HipXRays.Others = data[idx].Others;

					clinix_HipXRays.SynchStatus = "222";					

					$ipadrbg.context.clinix_HipXRays.add(clinix_HipXRays);
				}
			}

			callback();
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	//Pull Knee Alignment
	$scope.pullKneeAlignment = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_KneeAlignment'");
            tx.executeSql("delete from 'clinix_KneeAlignment'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_KneeAlignment.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_KneeAlignment = new $ipadrbg.types.clinix_KneeAlignment();
			    	
					clinix_KneeAlignment.ClinixRID = data[idx].ClinixRID;
					clinix_KneeAlignment.PxRID = data[idx].PxRID;

					clinix_KneeAlignment.Normal = data[idx].Normal;
					clinix_KneeAlignment.Alignment = data[idx].Alignment;
					clinix_KneeAlignment.Varus = data[idx].Varus;
					clinix_KneeAlignment.Valgus = data[idx].Valgus;

					clinix_KneeAlignment.SynchStatus = "222";					

					$ipadrbg.context.clinix_KneeAlignment.add(clinix_KneeAlignment);
				}
				$ipadrbg.context.clinix_KneeAlignment.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	//Pull Knee Apperance
	$scope.pullKneeApperance = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_KneeAppearance'");
            tx.executeSql("delete from 'clinix_KneeAppearance'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_KneeAppearance.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_KneeAppearance = new $ipadrbg.types.clinix_KneeAppearance();
			    	
					clinix_KneeAppearance.ClinixRID = data[idx].ClinixRID;
					clinix_KneeAppearance.PxRID = data[idx].PxRID;

					clinix_KneeAppearance.NormalR = data[idx].NormalR;
					clinix_KneeAppearance.SwellingR = data[idx].SwellingR;
					clinix_KneeAppearance.RedR = data[idx].RedR;
					clinix_KneeAppearance.SynovitisR = data[idx].SynovitisR;
					clinix_KneeAppearance.EffusionR = data[idx].EffusionR;
					clinix_KneeAppearance.PainActiveROMR = data[idx].PainActiveROMR;
					clinix_KneeAppearance.PainPassiveROMR = data[idx].PainPassiveROMR;
					clinix_KneeAppearance.NormalL = data[idx].NormalL;
					clinix_KneeAppearance.SwellingL = data[idx].SwellingL;
					clinix_KneeAppearance.RedL = data[idx].RedL;
					clinix_KneeAppearance.SynovitisL = data[idx].SynovitisL;
					clinix_KneeAppearance.RedL = data[idx].RedL;
					clinix_KneeAppearance.EffusionL = data[idx].EffusionL;
					clinix_KneeAppearance.PainActiveROML = data[idx].PainActiveROML;
					clinix_KneeAppearance.PainPassiveROML = data[idx].PainPassiveROML;

					clinix_KneeAppearance.SynchStatus = "222";					

					$ipadrbg.context.clinix_KneeAppearance.add(clinix_KneeAppearance);
				}
				$ipadrbg.context.clinix_KneeAppearance.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	//pull Knee Measurements
	$scope.pullKneeMeasurements = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_KneeMeasures'");
            tx.executeSql("delete from 'clinix_KneeMeasures'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_KneeMeasurements.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_KneeMeasures = new $ipadrbg.types.clinix_KneeMeasures();
			    	
					clinix_KneeMeasures.ClinixRID = data[idx].ClinixRID;
					clinix_KneeMeasures.PxRID = data[idx].PxRID;

					clinix_KneeMeasures.Supine = data[idx].Supine;
					clinix_KneeMeasures.Left = data[idx].Left;
					clinix_KneeMeasures.Right = data[idx].Right;

					clinix_KneeMeasures.SynchStatus = "222";					

					$ipadrbg.context.clinix_KneeMeasures.add(clinix_KneeMeasures);
				}
				$ipadrbg.context.clinix_KneeMeasures.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	//pull Knee Motion Range
	$scope.pullKneeMotionRange = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_KneeMotionRange'");
            tx.executeSql("delete from 'clinix_KneeMotionRange'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_KneeMotionRange.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_KneeMotionRange = new $ipadrbg.types.clinix_KneeMotionRange();
			    	
					clinix_KneeMotionRange.ClinixRID = data[idx].ClinixRID;
					clinix_KneeMotionRange.PxRID = data[idx].PxRID;

					clinix_KneeMotionRange.FlexionContracture = data[idx].FlexionContracture;
					clinix_KneeMotionRange.Extension = data[idx].Extension;
					clinix_KneeMotionRange.Flexion = data[idx].Flexion;

					clinix_KneeMotionRange.SynchStatus = "222";					

					$ipadrbg.context.clinix_KneeMotionRange.add(clinix_KneeMotionRange);
				}
				$ipadrbg.context.clinix_KneeMotionRange.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	//pull Knee Xray
	$scope.pullKneeXray = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_KneeXRays'");
            tx.executeSql("delete from 'clinix_KneeXRays'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_KneeXrays.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_KneeXRays = new $ipadrbg.types.clinix_KneeXRays();
			    	
					clinix_KneeXRays.ClinixRID = data[idx].ClinixRID;
					clinix_KneeXRays.PxRID = data[idx].PxRID;

					clinix_KneeXRays.APDate = data[idx].APDate;
					clinix_KneeXRays.Normal = data[idx].Normal;
					clinix_KneeXRays.VarusDegrees = data[idx].VarusDegrees;
					clinix_KneeXRays.JointSpaceVarusR = data[idx].JointSpaceVarusR;
					clinix_KneeXRays.JointSpaceVarusL = data[idx].JointSpaceVarusL;
					clinix_KneeXRays.ValgusDegrees = data[idx].ValgusDegrees;
					clinix_KneeXRays.JointSpaceValgusR = data[idx].JointSpaceValgusR;
					clinix_KneeXRays.JointSpaceValgusL = data[idx].JointSpaceValgusL;
					clinix_KneeXRays.BilateralJointSpace = data[idx].BilateralJointSpace;
					clinix_KneeXRays.LaurinPatel_LR = data[idx].LaurinPatel_LR;
					clinix_KneeXRays.LaurinPatel_LRSeverity = data[idx].LaurinPatel_LRSeverity;

					clinix_KneeXRays.SynchStatus = "222";					

					$ipadrbg.context.clinix_KneeXRays.add(clinix_KneeXRays);
				}
				$ipadrbg.context.clinix_KneeXRays.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL DIAGS
	$scope.pullDIAGS = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_Diagnosis'");
            tx.executeSql("delete from 'clinix_Diagnosis'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_Diags.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_Diagnosis = new $ipadrbg.types.clinix_Diagnosis();
			    	
					clinix_Diagnosis.ClinixRID = data[idx].ClinixRID;
					clinix_Diagnosis.PxRID = data[idx].PxRID;

					clinix_Diagnosis.Diagnosis = data[idx].Diagnosis;

					clinix_Diagnosis.SynchStatus = "222";					

					$ipadrbg.context.clinix_Diagnosis.add(clinix_Diagnosis);
				}
				$ipadrbg.context.clinix_Diagnosis.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL DIAGS - Management
	$scope.pullDIAGS_mgmt = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_DiagsManagement'");
            tx.executeSql("delete from 'clinix_DiagsManagement'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_Diags_mgmt.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_DiagsManagement = new $ipadrbg.types.clinix_DiagsManagement();
			    	
					clinix_DiagsManagement.ClinixRID = data[idx].ClinixRID;
					clinix_DiagsManagement.PxRID = data[idx].PxRID;

					clinix_DiagsManagement.PhysicalTherapy = data[idx].PhysicalTherapy;
					clinix_DiagsManagement.ExerProg_FootAnkle = data[idx].ExerProg_FootAnkle;
					clinix_DiagsManagement.ExerProg_QuadsHamstrings = data[idx].ExerProg_QuadsHamstrings;
					clinix_DiagsManagement.ExerProg_SLR = data[idx].ExerProg_SLR;
					clinix_DiagsManagement.AmbuTraining = data[idx].AmbuTraining;

					clinix_DiagsManagement.SynchStatus = "222";					

					$ipadrbg.context.clinix_DiagsManagement.add(clinix_DiagsManagement);
				}
				$ipadrbg.context.clinix_DiagsManagement.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL DIAGS - Schedule for Surgery
	$scope.pullDIAGS_ScheduleForSurgery = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_DiagSchedSurgery'");
            tx.executeSql("delete from 'clinix_DiagSchedSurgery'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_Diags_SchedSurgery.php'}).success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_DiagSchedSurgery = new $ipadrbg.types.clinix_DiagSchedSurgery();
			    	
					clinix_DiagSchedSurgery.ClinixRID = data[idx].ClinixRID;
					clinix_DiagSchedSurgery.PxRID = data[idx].PxRID;

					clinix_DiagSchedSurgery.SurgeryType = data[idx].SurgeryType;
					clinix_DiagSchedSurgery.SurgeryDate = data[idx].SurgeryDate;
					clinix_DiagSchedSurgery.Surgeon = data[idx].Surgeon;
					clinix_DiagSchedSurgery.Assistant = data[idx].Assistant;

					clinix_DiagSchedSurgery.Cardio = data[idx].Cardio;
					clinix_DiagSchedSurgery.Anesthesio = data[idx].Anesthesio;
					clinix_DiagSchedSurgery.AnesthesiaType = data[idx].AnesthesiaType;
					clinix_DiagSchedSurgery.Hospital = data[idx].Hospital;
					clinix_DiagSchedSurgery.Others = data[idx].Others;

					clinix_DiagSchedSurgery.SynchStatus = "222";					

					$ipadrbg.context.clinix_DiagSchedSurgery.add(clinix_DiagSchedSurgery);
				}
				$ipadrbg.context.clinix_DiagSchedSurgery.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL DIAGS - Medication
	$scope.pullDIAGS_Medication= function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_DiagsMedication'");
            tx.executeSql("delete from 'clinix_DiagsMedication'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_Diags_Med.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_DiagsMedication = new $ipadrbg.types.clinix_DiagsMedication();
			    	
					clinix_DiagsMedication.ClinixRID = data[idx].ClinixRID;
					clinix_DiagsMedication.PxRID = data[idx].PxRID;

					clinix_DiagsMedication.GenericName = data[idx].GenericName;
					clinix_DiagsMedication.Brand = data[idx].Brand;
					clinix_DiagsMedication.Qty = data[idx].Qty;
					clinix_DiagsMedication.DropName = data[idx].DropName;

					clinix_DiagsMedication.Dose = data[idx].Dose;
					clinix_DiagsMedication.Duration = data[idx].Duration;

					clinix_DiagsMedication.SynchStatus = "222";					

					$ipadrbg.context.clinix_DiagsMedication.add(clinix_DiagsMedication);
				}
				$ipadrbg.context.clinix_DiagsMedication.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	
	// PULL DIAGS - Disposition
	$scope.pullDIAGS_Disposition= function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_DiagsDisposition'");
            tx.executeSql("delete from 'clinix_DiagsDisposition'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_Diags_Disposition.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_DiagsDisposition = new $ipadrbg.types.clinix_DiagsDisposition();
			    	
					clinix_DiagsDisposition.ClinixRID = data[idx].ClinixRID;
					clinix_DiagsDisposition.PxRID = data[idx].PxRID;

					clinix_DiagsDisposition.DispoCardioClearance = data[idx].DispoCardioClearance;
					clinix_DiagsDisposition.DispoHome = data[idx].DispoHome;
					clinix_DiagsDisposition.DispoHospital = data[idx].DispoHospital;
					clinix_DiagsDisposition.DispoAccompanying = data[idx].DispoAccompanying;

					clinix_DiagsDisposition.SynchStatus = "222";					

					$ipadrbg.context.clinix_DiagsDisposition.add(clinix_DiagsDisposition);

				}
				$ipadrbg.context.clinix_DiagsDisposition.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL DIAGS - Notes
	$scope.pullDIAGS_Notes= function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_DiagsNotes'");
            tx.executeSql("delete from 'clinix_DiagsNotes'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_Diags_Notes.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_DiagsNotes = new $ipadrbg.types.clinix_DiagsNotes();
			    	
					clinix_DiagsNotes.ClinixRID = data[idx].ClinixRID;
					clinix_DiagsNotes.PxRID = data[idx].PxRID;

					clinix_DiagsNotes.NoteItem = data[idx].NoteItem;
					clinix_DiagsNotes.NoteValue = data[idx].NoteValue;

					clinix_DiagsNotes.SynchStatus = "222";					

					$ipadrbg.context.clinix_DiagsNotes.add(clinix_DiagsNotes);

				}
				$ipadrbg.context.clinix_DiagsNotes.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL DIAGS - Charges
	$scope.pullDIAGS_Charges= function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_PEcharges'");
            tx.executeSql("delete from 'clinix_PEcharges'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_Diags_Charges.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_PEcharges = new $ipadrbg.types.clinix_PEcharges();
			    	
					clinix_PEcharges.ClinixRID = data[idx].ClinixRID;
					clinix_PEcharges.PxRID = data[idx].PxRID;

					clinix_PEcharges.ChargeRID = data[idx].ChargeRID;
					clinix_PEcharges.ChargeItem = data[idx].ChargeItem;
					clinix_PEcharges.Tariff = data[idx].Tariff;
					clinix_PEcharges.ChargeAmount = data[idx].ChargeAmount;
					clinix_PEcharges.Discount = data[idx].Discount;
					clinix_PEcharges.NetAmount = data[idx].NetAmount;
					clinix_PEcharges.LinePayment = data[idx].LinePayment;
					clinix_PEcharges.LineBalance = data[idx].LineBalance;

					clinix_PEcharges.SynchStatus = "222";					

					$ipadrbg.context.clinix_PEcharges.add(clinix_PEcharges);

				}
				$ipadrbg.context.clinix_PEcharges.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}	


	//
	//
	//
	//
	//
	//
	//


	//Pull POSTOp_HIP_preform
	$scope.pull_POSTOPHIP= function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_POSTOp_HIP_preform'");
            tx.executeSql("delete from 'clinix_POSTOp_HIP_preform'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_PostOPHipPreform.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_POSTOp_HIP_preform = new $ipadrbg.types.clinix_POSTOp_HIP_preform();
			    	
					clinix_POSTOp_HIP_preform.ClinixRID = data[idx].ClinixRID;
					clinix_POSTOp_HIP_preform.PxRID = data[idx].PxRID;

					clinix_POSTOp_HIP_preform.Post01 = data[idx].Post01;
					clinix_POSTOp_HIP_preform.Post02 = data[idx].Post02;
					clinix_POSTOp_HIP_preform.Post03 = data[idx].Post03;
					clinix_POSTOp_HIP_preform.Post04 = data[idx].Post04;
					clinix_POSTOp_HIP_preform.Post05 = data[idx].Post05;
					clinix_POSTOp_HIP_preform.Post06 = data[idx].Post06;
					clinix_POSTOp_HIP_preform.Post07 = data[idx].Post07;
					clinix_POSTOp_HIP_preform.Post08 = data[idx].Post08;
					clinix_POSTOp_HIP_preform.Post09 = data[idx].Post09;
					clinix_POSTOp_HIP_preform.Post10 = data[idx].Post10;
					clinix_POSTOp_HIP_preform.Post11 = data[idx].Post11;
					clinix_POSTOp_HIP_preform.Post12 = data[idx].Post12;
					clinix_POSTOp_HIP_preform.Post13 = data[idx].Post13;
					clinix_POSTOp_HIP_preform.Post14 = data[idx].Post14;
					clinix_POSTOp_HIP_preform.Post15 = data[idx].Post15;
					clinix_POSTOp_HIP_preform.Post16a = data[idx].Post16a;
					clinix_POSTOp_HIP_preform.Post16b = data[idx].Post16b;
					clinix_POSTOp_HIP_preform.Post16c = data[idx].Post16c;
					clinix_POSTOp_HIP_preform.Post16d = data[idx].Post16d;
					clinix_POSTOp_HIP_preform.Post16e = data[idx].Post16e;
					clinix_POSTOp_HIP_preform.Post17 = data[idx].Post17;
					clinix_POSTOp_HIP_preform.Post18 = data[idx].Post18;
					clinix_POSTOp_HIP_preform.Post19 = data[idx].Post19;
					clinix_POSTOp_HIP_preform.Post20 = data[idx].Post20;
					clinix_POSTOp_HIP_preform.Post21 = data[idx].Post21;

					clinix_POSTOp_HIP_preform.SynchStatus = "222";					

					$ipadrbg.context.clinix_POSTOp_HIP_preform.add(clinix_POSTOp_HIP_preform);
				}
				$ipadrbg.context.clinix_POSTOp_HIP_preform.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}	

	// PULL Pre Op Hip Preform
	$scope.pull_PREOPHIP= function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_PREOp_HIP_preform'");
            tx.executeSql("delete from 'clinix_PREOp_HIP_preform'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_PreOPHipPreform.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_PREOp_HIP_preform = new $ipadrbg.types.clinix_PREOp_HIP_preform();
			    	
					clinix_PREOp_HIP_preform.ClinixRID = data[idx].ClinixRID;
					clinix_PREOp_HIP_preform.PxRID = data[idx].PxRID;

					clinix_PREOp_HIP_preform.Pre01 = data[idx].Pre01;
					clinix_PREOp_HIP_preform.Pre02 = data[idx].Pre02;
					clinix_PREOp_HIP_preform.Pre03 = data[idx].Pre03;
					clinix_PREOp_HIP_preform.Pre04 = data[idx].Pre04;
					clinix_PREOp_HIP_preform.Pre05 = data[idx].Pre05;
					clinix_PREOp_HIP_preform.Pre06 = data[idx].Pre06;
					clinix_PREOp_HIP_preform.Pre07a = data[idx].Pre07a;
					clinix_PREOp_HIP_preform.Pre07b = data[idx].Pre07b;
					clinix_PREOp_HIP_preform.Pre08 = data[idx].Pre08;
					clinix_PREOp_HIP_preform.Pre09 = data[idx].Pre09;
					clinix_PREOp_HIP_preform.Pre10 = data[idx].Pre10;
					clinix_PREOp_HIP_preform.Pre11a = data[idx].Pre11a;
					clinix_PREOp_HIP_preform.Pre11b = data[idx].Pre11b;
					clinix_PREOp_HIP_preform.Pre11c = data[idx].Pre11c;
					clinix_PREOp_HIP_preform.Pre12 = data[idx].Pre12;
					clinix_PREOp_HIP_preform.Pre13a = data[idx].Pre13a;
					clinix_PREOp_HIP_preform.Pre13b = data[idx].Pre13b;
					clinix_PREOp_HIP_preform.Pre13c = data[idx].Pre13c;
					clinix_PREOp_HIP_preform.Pre14 = data[idx].Pre14;
					clinix_PREOp_HIP_preform.Pre15 = data[idx].Pre15;

					clinix_PREOp_HIP_preform.SynchStatus = "222";					

					$ipadrbg.context.clinix_PREOp_HIP_preform.add(clinix_PREOp_HIP_preform);
				}
				$ipadrbg.context.clinix_PREOp_HIP_preform.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}	


	// PULL Post Op knee Preform
	$scope.pull_POSTOPKNEE= function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_POSTOp_KNEE_preform'");
            tx.executeSql("delete from 'clinix_POSTOp_KNEE_preform'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_PostOPKneePreform.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_POSTOp_KNEE_preform = new $ipadrbg.types.clinix_POSTOp_KNEE_preform();
			    	
					clinix_POSTOp_KNEE_preform.ClinixRID = data[idx].ClinixRID;
					clinix_POSTOp_KNEE_preform.PxRID = data[idx].PxRID;

					clinix_POSTOp_KNEE_preform.Post01 = data[idx].Post01;
					clinix_POSTOp_KNEE_preform.Post02 = data[idx].Post02;
					clinix_POSTOp_KNEE_preform.Post03 = data[idx].Post03;
					clinix_POSTOp_KNEE_preform.Post04 = data[idx].Post04;
					clinix_POSTOp_KNEE_preform.Post05 = data[idx].Post05;
					clinix_POSTOp_KNEE_preform.Post06 = data[idx].Post06;
					clinix_POSTOp_KNEE_preform.Post07 = data[idx].Post07;
					clinix_POSTOp_KNEE_preform.Post08 = data[idx].Post08;
					clinix_POSTOp_KNEE_preform.Post09 = data[idx].Post09;
					clinix_POSTOp_KNEE_preform.Post10 = data[idx].Post10;
					clinix_POSTOp_KNEE_preform.Post11 = data[idx].Post11;
					clinix_POSTOp_KNEE_preform.Post12 = data[idx].Post12;
					clinix_POSTOp_KNEE_preform.Post13 = data[idx].Post13;
					clinix_POSTOp_KNEE_preform.Post14 = data[idx].Post14;
					clinix_POSTOp_KNEE_preform.Post15 = data[idx].Post15;
					clinix_POSTOp_KNEE_preform.Post16a = data[idx].Post16a;
					clinix_POSTOp_KNEE_preform.Post16b = data[idx].Post16b;
					clinix_POSTOp_KNEE_preform.Post16c = data[idx].Post16c;
					clinix_POSTOp_KNEE_preform.Post16d = data[idx].Post16d;
					clinix_POSTOp_KNEE_preform.Post16e = data[idx].Post16e;
					clinix_POSTOp_KNEE_preform.Post17 = data[idx].Post17;
					clinix_POSTOp_KNEE_preform.Post18 = data[idx].Post18;
					clinix_POSTOp_KNEE_preform.Post19 = data[idx].Post19;
					clinix_POSTOp_KNEE_preform.Post20 = data[idx].Post20;
					clinix_POSTOp_KNEE_preform.Post21 = data[idx].Post21;

					clinix_POSTOp_KNEE_preform.SynchStatus = "222";					

					$ipadrbg.context.clinix_POSTOp_KNEE_preform.add(clinix_POSTOp_KNEE_preform);
				}
				$ipadrbg.context.clinix_POSTOp_KNEE_preform.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}	

	// PULL PREOPKNEE
	$scope.pull_PREOPKNEE= function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_PREOp_KNEE_preform'");
            tx.executeSql("delete from 'clinix_PREOp_KNEE_preform'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_PreOPKneePreform.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var clinix_PREOp_KNEE_preform = new $ipadrbg.types.clinix_PREOp_KNEE_preform();
			    	
					clinix_PREOp_KNEE_preform.ClinixRID = data[idx].ClinixRID;
					clinix_PREOp_KNEE_preform.PxRID = data[idx].PxRID;

					clinix_PREOp_KNEE_preform.Pre01 = data[idx].Pre01;
					clinix_PREOp_KNEE_preform.Pre02 = data[idx].Pre02;
					clinix_PREOp_KNEE_preform.Pre03 = data[idx].Pre03;
					clinix_PREOp_KNEE_preform.Pre04 = data[idx].Pre04;
					clinix_PREOp_KNEE_preform.Pre05 = data[idx].Pre05;
					clinix_PREOp_KNEE_preform.Pre06 = data[idx].Pre06;
					clinix_PREOp_KNEE_preform.Pre07 = data[idx].Pre07;
					clinix_PREOp_KNEE_preform.Pre08 = data[idx].Pre08;
					clinix_PREOp_KNEE_preform.Pre09 = data[idx].Pre09;
					clinix_PREOp_KNEE_preform.Pre10 = data[idx].Pre10;
					clinix_PREOp_KNEE_preform.Pre11a = data[idx].Pre11a;
					clinix_PREOp_KNEE_preform.Pre11b = data[idx].Pre11b;
					clinix_PREOp_KNEE_preform.Pre11c = data[idx].Pre11c;
					clinix_PREOp_KNEE_preform.Pre11d = data[idx].Pre11d;
					clinix_PREOp_KNEE_preform.Pre12 = data[idx].Pre12;
					clinix_PREOp_KNEE_preform.Pre13a = data[idx].Pre13a;
					clinix_PREOp_KNEE_preform.Pre13b = data[idx].Pre13b;
					clinix_PREOp_KNEE_preform.Pre14 = data[idx].Pre14;
					clinix_PREOp_KNEE_preform.Pre15 = data[idx].Pre15;

					clinix_PREOp_KNEE_preform.SynchStatus = "222";					

					$ipadrbg.context.clinix_PREOp_KNEE_preform.add(clinix_PREOp_KNEE_preform);
				}
				$ipadrbg.context.clinix_PREOp_KNEE_preform.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL OPERATIVES - HIP
	$scope.pull_OPHIP_3 = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPHIP_3'");
            tx.executeSql("delete from 'jdata_OPHIP_3'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_OPHIP_3.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_OPHIP_3 = new $ipadrbg.types.jdata_OPHIP_3();
			    	
					jdata_OPHIP_3.ClinixRID = data[idx].ClinixRID;
					jdata_OPHIP_3.PxRID = data[idx].PxRID;

					jdata_OPHIP_3.TypeOfHIPRep = data[idx].TypeOfHIPRep;
					jdata_OPHIP_3.ImplantUsed = data[idx].ImplantUsed;
					jdata_OPHIP_3.AcetabularComponent = data[idx].AcetabularComponent;
					jdata_OPHIP_3.AcetSize = data[idx].AcetSize;
					jdata_OPHIP_3.AcetScrews = data[idx].AcetScrews;

					jdata_OPHIP_3.SynchStatus = "222";					

					$ipadrbg.context.jdata_OPHIP_3.add(jdata_OPHIP_3);
				}
				$ipadrbg.context.jdata_OPHIP_3.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	//
	//
	//
	//
	//
	//
	//

	// PULL OPERATIVES - HIP
	$scope.pull_OPHIP_5 = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPHIP_5'");
            tx.executeSql("delete from 'jdata_OPHIP_5'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_OPHIP_5.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_OPHIP_5 = new $ipadrbg.types.jdata_OPHIP_5();
			    	
					jdata_OPHIP_5.ClinixRID = data[idx].ClinixRID;
					jdata_OPHIP_5.PxRID = data[idx].PxRID;

					jdata_OPHIP_5.SurgicalApproach = data[idx].SurgicalApproach;
					jdata_OPHIP_5.StabPosterior = data[idx].StabPosterior;
					jdata_OPHIP_5.StabAnterior = data[idx].StabAnterior;
					jdata_OPHIP_5.HemovacUsed = data[idx].HemovacUsed;

					jdata_OPHIP_5.SynchStatus = "222";					

					$ipadrbg.context.jdata_OPHIP_5.add(jdata_OPHIP_5);
				}
				$ipadrbg.context.jdata_OPHIP_5.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL OPERATIVES - HIP
	$scope.pull_OPHIP_6 = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPHIP_6'");
            tx.executeSql("delete from 'jdata_OPHIP_6'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_OPHIP_6.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_OPHIP_6 = new $ipadrbg.types.jdata_OPHIP_6();
			    	
					jdata_OPHIP_6.ClinixRID = data[idx].ClinixRID;
					jdata_OPHIP_6.PxRID = data[idx].PxRID;

					jdata_OPHIP_6.BloodLoss = data[idx].BloodLoss;
					jdata_OPHIP_6.Closure = data[idx].Closure;
					jdata_OPHIP_6.CompressionDressings = data[idx].CompressionDressings;
					jdata_OPHIP_6.OperativeCourse = data[idx].OperativeCourse;
					jdata_OPHIP_6.Findings = data[idx].Findings;
					jdata_OPHIP_6.Diagnosis = data[idx].Diagnosis;
					jdata_OPHIP_6.OpDuration = data[idx].OpDuration;
					jdata_OPHIP_6.TEDS = data[idx].TEDS;
					jdata_OPHIP_6.XRays = data[idx].XRays;
					jdata_OPHIP_6.Others = data[idx].Others;

					jdata_OPHIP_6.SynchStatus = "222";					

					$ipadrbg.context.jdata_OPHIP_6.add(jdata_OPHIP_6);
				}
				$ipadrbg.context.jdata_OPHIP_6.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}



	// PULL OPERATIVES - KNEE
	$scope.pull_OPKNEE_3 = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPKNEE_3'");
            tx.executeSql("delete from 'jdata_OPKNEE_3'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_OPKNEE_3.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_OPKNEE_3 = new $ipadrbg.types.jdata_OPKNEE_3();
			    	
					jdata_OPKNEE_3.ClinixRID = data[idx].ClinixRID;
					jdata_OPKNEE_3.PxRID = data[idx].PxRID;

					jdata_OPKNEE_3.TypeOfKNEERep = data[idx].TypeOfKNEERep;
					jdata_OPKNEE_3.ImplantUsed = data[idx].ImplantUsed;
					jdata_OPKNEE_3.FemoralCompo = data[idx].FemoralCompo;
					jdata_OPKNEE_3.TibiaCompo = data[idx].TibiaCompo;
					jdata_OPKNEE_3.Patella = data[idx].Patella;

					jdata_OPKNEE_3.SynchStatus = "222";					

					$ipadrbg.context.jdata_OPKNEE_3.add(jdata_OPKNEE_3);
				}
				$ipadrbg.context.jdata_OPKNEE_3.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL OPERATIVES - KNEE
	$scope.pull_OPKNEE_4 = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPKNEE_4'");
            tx.executeSql("delete from 'jdata_OPKNEE_4'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_OPKNEE_4.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) { 
		      	// save to websql
			    for(idx in data){
			    	var jdata_OPKNEE_4 = new $ipadrbg.types.jdata_OPKNEE_3();
			    	
					jdata_OPKNEE_4.ClinixRID = data[idx].ClinixRID;
					jdata_OPKNEE_4.PxRID = data[idx].PxRID;

					jdata_OPKNEE_4.Tourniquet = data[idx].Tourniquet;
					jdata_OPKNEE_4.TourniquetNotes = data[idx].TourniquetNotes;
					jdata_OPKNEE_4.ReleaseB4C = data[idx].ReleaseB4C;
					jdata_OPKNEE_4.ReleaseB4Notes = data[idx].ReleaseB4Notes;
					jdata_OPKNEE_4.Approach = data[idx].Approach;
					jdata_OPKNEE_4.Subvastus = data[idx].Subvastus;
					jdata_OPKNEE_4.SubvastusNotes = data[idx].SubvastusNotes;
					jdata_OPKNEE_4.SurgicalIncision = data[idx].SurgicalIncision;
					jdata_OPKNEE_4.SurgicalIncisionNotes = data[idx].SurgicalIncisionNotes;
					jdata_OPKNEE_4.BonePreparation = data[idx].BonePreparation;
					jdata_OPKNEE_4.CementingComponents = data[idx].CementingComponents;
					jdata_OPKNEE_4.LateralRelease = data[idx].LateralRelease;
					jdata_OPKNEE_4.LateralReleaseNotes = data[idx].LateralReleaseNotes;
					jdata_OPKNEE_4.HemovacUsed = data[idx].HemovacUsed;

					jdata_OPKNEE_4.SynchStatus = "222";					

					$ipadrbg.context.jdata_OPKNEE_4.add(jdata_OPKNEE_4);
				}
				$ipadrbg.context.jdata_OPKNEE_4.saveChanges();

			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL OPERATIVES - KNEE
	$scope.pull_OPKNEE_5 = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPKNEE_5'");
            tx.executeSql("delete from 'jdata_OPKNEE_5'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_OPKNEE_5.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) { 
		      	// save to websql
			    for(idx in data){
			    	var jdata_OPKNEE_5 = new $ipadrbg.types.jdata_OPKNEE_5();
			    	
					jdata_OPKNEE_5.ClinixRID = data[idx].ClinixRID;
					jdata_OPKNEE_5.PxRID = data[idx].PxRID;

					jdata_OPKNEE_5.BloodLoss = data[idx].BloodLoss;
					jdata_OPKNEE_5.Closure = data[idx].Closure;
					jdata_OPKNEE_5.CompressionDressings = data[idx].CompressionDressings;
					jdata_OPKNEE_5.OperativeCourse = data[idx].OperativeCourse;
					jdata_OPKNEE_5.Findings = data[idx].Findings;
					jdata_OPKNEE_5.Diagnosis = data[idx].Diagnosis;
					jdata_OPKNEE_5.OpDuration = data[idx].OpDuration;
					jdata_OPKNEE_5.TEDS = data[idx].TEDS;
					jdata_OPKNEE_5.XRays = data[idx].XRays;
					jdata_OPKNEE_5.Others = data[idx].Others;

					jdata_OPKNEE_5.SynchStatus = "222";					

					$ipadrbg.context.jdata_OPKNEE_5.add(jdata_OPKNEE_5);
				}
				$ipadrbg.context.jdata_OPKNEE_5.saveChanges();

			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	//
	//
	//
	//
	//
	//


	// PULL Structured DISCHARGE SUMMARY
	//
	//
	// Structure Dischare - DIAGNOSIS
	$scope.pull_StrucDiagnosis = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredDiagnosis'");
            tx.executeSql("delete from 'clinix_StructuredDiagnosis'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_StrucDiagnosis.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) { 
		      	// save to websql
			    for(idx in data){
			    	var clinix_StructuredDiagnosis = new $ipadrbg.types.clinix_StructuredDiagnosis();
			    	
					clinix_StructuredDiagnosis.ClinixRID = data[idx].ClinixRID;
					clinix_StructuredDiagnosis.PxRID = data[idx].PxRID;

					clinix_StructuredDiagnosis.Diagnosis = data[idx].Diagnosis;

					clinix_StructuredDiagnosis.SynchStatus = "222";					

					$ipadrbg.context.clinix_StructuredDiagnosis.add(clinix_StructuredDiagnosis);
				}
				$ipadrbg.context.clinix_StructuredDiagnosis.saveChanges();

			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL Structured Disposition
	$scope.pull_StrucDisposition = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredDisposition'");
            tx.executeSql("delete from 'clinix_StructuredDisposition'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_StrucDisposition.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) { 
		      	// save to websql
			    for(idx in data){
			    	var clinix_StructuredDisposition = new $ipadrbg.types.clinix_StructuredDisposition();
			    	
					clinix_StructuredDisposition.ClinixRID = data[idx].ClinixRID;
					clinix_StructuredDisposition.PxRID = data[idx].PxRID;

					clinix_StructuredDisposition.Dispo = data[idx].Dispo;
					clinix_StructuredDisposition.DispoDetail = data[idx].DispoDetail;

					clinix_StructuredDisposition.SynchStatus = "222";					

					$ipadrbg.context.clinix_StructuredDisposition.add(clinix_StructuredDisposition);
				}
				$ipadrbg.context.clinix_StructuredDisposition.saveChanges();

			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL Structured Disachrge - Hospitalization
	$scope.pull_StrucHospitalization = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredHospitalization'");
            tx.executeSql("delete from 'clinix_StructuredHospitalization'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_StrucHospitalization.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) { 
		      	// save to websql
			    for(idx in data){
			    	var clinix_StructuredHospitalization = new $ipadrbg.types.clinix_StructuredHospitalization();
			    	
					clinix_StructuredHospitalization.ClinixRID = data[idx].ClinixRID;
					clinix_StructuredHospitalization.PxRID = data[idx].PxRID;

					clinix_StructuredHospitalization.DateAdmitted = data[idx].DateAdmitted;
					clinix_StructuredHospitalization.DateDischarged = data[idx].DateDischarged;
					clinix_StructuredHospitalization.HospitalCourse = data[idx].HospitalCourse;
					clinix_StructuredHospitalization.WoundAppearance = data[idx].WoundAppearance;

					clinix_StructuredHospitalization.SynchStatus = "222";					

					$ipadrbg.context.clinix_StructuredHospitalization.add(clinix_StructuredHospitalization);
				}
				$ipadrbg.context.clinix_StructuredHospitalization.saveChanges();

			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL Structured Discharge - Labs
	$scope.pull_StrucLabs = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredLABS'");
            tx.executeSql("delete from 'clinix_StructuredLABS'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_StrucLabs.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) { 
		      	// save to websql
			    for(idx in data){
			    	var clinix_StructuredLABS = new $ipadrbg.types.clinix_StructuredLABS();
			    	
					clinix_StructuredLABS.ClinixRID = data[idx].ClinixRID;
					clinix_StructuredLABS.PxRID = data[idx].PxRID;

					clinix_StructuredLABS.labDate = data[idx].labDate;
					clinix_StructuredLABS.labSource = data[idx].labSource;
					clinix_StructuredLABS.WBC = data[idx].WBC;
					clinix_StructuredLABS.HgB = data[idx].HgB;
					clinix_StructuredLABS.Hematocrit = data[idx].Hematocrit;

					clinix_StructuredLABS.SynchStatus = "222";					

					$ipadrbg.context.clinix_StructuredLABS.add(clinix_StructuredLABS);
				}
				$ipadrbg.context.clinix_StructuredLABS.saveChanges();

			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL Structured Discharge - Management
	$scope.pull_StrucManagement = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredManagement'");
            tx.executeSql("delete from 'clinix_StructuredManagement'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_StrucManagement.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) { 
		      	// save to websql
			    for(idx in data){
			    	var clinix_StructuredManagement = new $ipadrbg.types.clinix_StructuredManagement();
			    	
					clinix_StructuredManagement.ClinixRID = data[idx].ClinixRID;
					clinix_StructuredManagement.PxRID = data[idx].PxRID;

					clinix_StructuredManagement.PhysicalTherapy = data[idx].PhysicalTherapy;
					clinix_StructuredManagement.ExProg_FootAnkle = data[idx].ExProg_FootAnkle;
					clinix_StructuredManagement.ExProg_QuadsHams = data[idx].ExProg_QuadsHams;
					clinix_StructuredManagement.ExProg_FullWeight = data[idx].ExProg_FullWeight;
					clinix_StructuredManagement.ExProg_SLR = data[idx].ExProg_SLR;
					clinix_StructuredManagement.AmbulatoryAid = data[idx].AmbulatoryAid;
					clinix_StructuredManagement.TEDS = data[idx].TEDS;
					clinix_StructuredManagement.Shower = data[idx].Shower;
					clinix_StructuredManagement.Notes = data[idx].Notes;
					clinix_StructuredManagement.FollowUp = data[idx].FollowUp;

					clinix_StructuredManagement.SynchStatus = "222";					

					$ipadrbg.context.clinix_StructuredManagement.add(clinix_StructuredManagement);
				}
				$ipadrbg.context.clinix_StructuredManagement.saveChanges();
			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL Structured Discharge - Medication
	$scope.pull_StrucMedication = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredMedication'");
            tx.executeSql("delete from 'clinix_StructuredMedication'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_StrucMedication.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) { 
		      	// save to websql
			    for(idx in data){
			    	var clinix_StructuredMedication = new $ipadrbg.types.clinix_StructuredMedication();
			    	
					clinix_StructuredMedication.ClinixRID = data[idx].ClinixRID;
					clinix_StructuredMedication.PxRID = data[idx].PxRID;

					clinix_StructuredMedication.GenericName = data[idx].GenericName;
					clinix_StructuredMedication.Brand = data[idx].Brand;
					clinix_StructuredMedication.Qty = data[idx].Qty;
					clinix_StructuredMedication.DropName = data[idx].DropName;
					clinix_StructuredMedication.Dose = data[idx].Dose;

					clinix_StructuredMedication.SynchStatus = "222";					

					$ipadrbg.context.clinix_StructuredMedication.add(clinix_StructuredMedication);
				}
				$ipadrbg.context.clinix_StructuredMedication.saveChanges();

			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL Structured Discharge - SchedSurgery THIS ROUTINE IS NOT IN USE
	// PULL Structured Discharge - SchedSurgery THIS ROUTINE IS NOT IN USE
	// PULL Structured Discharge - SchedSurgery THIS ROUTINE IS NOT IN USE
	// PULL Structured Discharge - SchedSurgery THIS ROUTINE IS NOT IN USE
	// PULL Structured Discharge - SchedSurgery THIS ROUTINE IS NOT IN USE
	$scope.pull_StrucSchedSurgery = function(){
		var serverIP = "192.168.0.99";

    	// empty first iPad Table
        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
        db.transaction(function (tx) {
            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredSchedSurgery'");
            tx.executeSql("delete from 'clinix_StructuredSchedSurgery'");

            // tx.executeSql("drop table ' put tablename here '");
        });
        //db.close();
        // after truncate

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_StrucSchedSurgery.php'}).
	    success ( function ( data, status, headers, config ) {

			if (data !== null ) { 
		      	// save to websql
			    for(idx in data){
			    	var clinix_StructuredSchedSurgery = new $ipadrbg.types.clinix_StructuredSchedSurgery();
			    	
					clinix_StructuredSchedSurgery.ClinixRID = data[idx].ClinixRID;
					clinix_StructuredSchedSurgery.PxRID = data[idx].PxRID;

					clinix_StructuredSchedSurgery.SurgeryType = data[idx].SurgeryType;
					clinix_StructuredSchedSurgery.SurgeryDate = data[idx].SurgeryDate;
					clinix_StructuredSchedSurgery.Surgeon = data[idx].Surgeon;
					clinix_StructuredSchedSurgery.Assistant = data[idx].Assistant;
					clinix_StructuredSchedSurgery.Cardio = data[idx].Cardio;
					clinix_StructuredSchedSurgery.Anesthesio = data[idx].Anesthesio;
					clinix_StructuredSchedSurgery.Hospital = data[idx].Hospital;
					clinix_StructuredSchedSurgery.Others = data[idx].Others;

					clinix_StructuredSchedSurgery.SynchStatus = "222";					

					$ipadrbg.context.clinix_StructuredSchedSurgery.add(clinix_StructuredSchedSurgery);
				}
				/////// NOT USED NOT USED $ipadrbg.context.clinix_StructuredSchedSurgery.saveChanges();

			}
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


}	