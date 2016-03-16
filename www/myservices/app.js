// 127.0.0. 1    10.0.1. 99
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
    	if (confirm('Download ALL TRANSACTIONS from SERVER, proceed? ' + serverIP)) {
		    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
		      db.transaction(function (tx) {
		          tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix'");
		          tx.executeSql("delete from 'clinix'");
		      });


		    $scope.clinix = [];

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
							, url : 'http://' + serverIP + '/RBGsrvr_todayset/srvr_clinix_pulled.php' // ?clinixJson=' + ClinixPulled
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
  		// 

    	if (confirm(serverIP + ': Download INITIAL INTERVIEW Results, proceed?')) {

	        var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	        	tx.executeSql("update sqlite_sequence set seq = 0 where name ='zclinix'");
	            tx.executeSql("delete from 'zclinix'");

	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_chiefcomp'");
	            tx.executeSql("delete from 'clinix_chiefcomp'");

	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_etiology'");
	            tx.executeSql("delete from 'clinix_etiology'");

	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_treatment'");
            	tx.executeSql("delete from 'clinix_treatment'");
	            
	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_previousSurgeries'");
	            tx.executeSql("delete from 'clinix_previousSurgeries'");

				tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_LABS'");
         		tx.executeSql("delete from 'clinix_LABS'");

           		tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_MedHist'");
            	tx.executeSql("delete from 'clinix_MedHist'");

	        });
        	//db.close();
        	// after truncate

      		$scope.pullZClinix(function(){
	      		$scope.pullChiefComplaint(function(){
	      			$scope.pullEtiology(function(){
	      				$scope.pullPastTreats(function(){
	      					$scope.pullPrevSurg(function(){
	      						$scope.pullPrevLABS(function(){
	      							$scope.pullMedHist(function(){

	      								$ipadrbg.context.saveChanges();

			    					});
			    				});
			    			});
			    		});
			    	});
			    });
			});

      		alert("Importing INITIAL INTERVIEW Results from Server was Successful!");
    	}
  	}	

	// PULL IOH - CHIEF COMPLAINT
	$scope.pullZClinix = function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_ZClinix.php'}).
		success ( function ( data, status, headers, config ) {

			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var zclinix = new $ipadrbg.types.zclinix();

					zclinix.ClinixRID 		= data[idx].ClinixRID;

					zclinix.HIP 		= data[idx].HIP;
					zclinix.KNEE		= data[idx].KNEE;

					zclinix.GENORTHO	= data[idx].GENORTHO;
					zclinix.SKELTRAUMA	= data[idx].SKELTRAUMA;

					zclinix.ANKLEFOOT	= data[idx].ANKLEFOOT;
					zclinix.KNEESPORTS	= data[idx].KNEESPORTS;
					zclinix.SHOULDERARM	= data[idx].SHOULDERARM;

					zclinix.ELBOW		= data[idx].ELBOW;
					zclinix.WRISTHAND	= data[idx].WRISTHAND;
					zclinix.THIGH		= data[idx].THIGH;
					zclinix.SPINE		= data[idx].SPINE;

					zclinix.SynchStatus	= "222";					
					$ipadrbg.context.zclinix.add(zclinix);
				}
			}
			callback();
			//else
				//alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL IOH - CHIEF COMPLAINT
	$scope.pullChiefComplaint = function(callback){

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
			}
			callback();
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
	$scope.pullEtiology = function(callback){

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

			callback();
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL IOH - PAST TREATMENTs 
	$scope.pullPastTreats = function(callback){

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

			callback();
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL IOH - PREV SURGERY  
	$scope.pullPrevSurg = function(callback){

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

			callback();
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// PULL IOH - PREV LABORATORY RESULTS  

	$scope.pullPrevLABS = function(callback){

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

			callback();
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	// PULL IOH - PREV Medical History  
	$scope.pullMedHist = function(callback){

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
				// $ipadrbg.context.clinix_MedHist.saveChanges();
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


	//
	//
	//
	//
	//
	//
	//
	// PULL PHYSICAL EXAM RESULTS
  	$scope.puller_PEResults = function() {
    	if (confirm(serverIP + ': Download PE Results, DIAGNOSIS, proceed? ')) {
    		
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


            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_KneeAlignment'");
            	tx.executeSql("delete from 'clinix_KneeAlignment'");

             	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_KneeAppearance'");
            	tx.executeSql("delete from 'clinix_KneeAppearance'");

              	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_KneeMotionRange'");
            	tx.executeSql("delete from 'clinix_KneeMotionRange'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_KneeXRays'");
            	tx.executeSql("delete from 'clinix_KneeXRays'");


            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_Diagnosis'");
            	tx.executeSql("delete from 'clinix_Diagnosis'");

 				tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_DiagsManagement'");
            	tx.executeSql("delete from 'clinix_DiagsManagement'");

				tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_DiagSchedSurgery'");
            	tx.executeSql("delete from 'clinix_DiagSchedSurgery'");

				tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_DiagsDisposition'");
            	tx.executeSql("delete from 'clinix_DiagsDisposition'");

				tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_DiagsMedication'");
            	tx.executeSql("delete from 'clinix_DiagsMedication'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_DiagsNotes'");
            	tx.executeSql("delete from 'clinix_DiagsNotes'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_PEcharges'");
            	tx.executeSql("delete from 'clinix_PEcharges'");
	        });

    		$scope.pullambustatus(function(){
    			$scope.pullHipMotionRange(function(){
    				$scope.pullHipStanding(function(){
    					$scope.pullHipXray(function(){

    						$scope.pullKneeAlignment(function(){
	    						$scope.pullKneeApperance(function(){
		    						$scope.pullKneeMotionRange(function(){
		    							$scope.pullKneeXray(function(){

			    							$scope.pullDIAGS(function(){
				    							$scope.pullDIAGS_mgmt(function(){
					    							$scope.pullDIAGS_ScheduleForSurgery(function(){
						    							$scope.pullDIAGS_Medication(function(){
							    							$scope.pullDIAGS_Disposition(function(){
								    							$scope.pullDIAGS_Notes(function(){
								    								$scope.pullDIAGS_Charges(function(){

    																	$ipadrbg.context.saveChanges();

    																});
    															});
    														});
    													});
    												});
    											});
    										});
    									});
    								});
    							});
    						});
    					});
    				});
    			});
    		});

    		// *************************
    		// retain for reference only
    		// $scope.pullambustatus()
    		// .after($scope.pullHipMotionRange)
    		// .after($scope.pullHipStanding)
    		// .after
    		// *************************

      		alert("Importing PE Results, DIAGNOSIS from Server was Successful!");
    	}
  	}



	// PULL REPORTS and ORDERS
  	$scope.puller_OrdersReorts = function() {
    	if (confirm(serverIP + ': Operative Orders, Discharge Summary and REPORTS, proceed? ')) {

    		var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_PREOp_HIP_preform'");
            	tx.executeSql("delete from 'clinix_PREOp_HIP_preform'");

	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_POSTOp_HIP_preform'");
	            tx.executeSql("delete from 'clinix_POSTOp_HIP_preform'");

	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPHIP_3'");
	            tx.executeSql("delete from 'jdata_OPHIP_3'");
           
            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPHIP_5'");
            	tx.executeSql("delete from 'jdata_OPHIP_5'");
            
            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPHIP_6'");
            	tx.executeSql("delete from 'jdata_OPHIP_6'");
     
	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_PREOp_KNEE_preform'");
    	        tx.executeSql("delete from 'clinix_PREOp_KNEE_preform'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_POSTOp_KNEE_preform'");
            	tx.executeSql("delete from 'clinix_POSTOp_KNEE_preform'");

	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPKNEE_3'");
    	        tx.executeSql("delete from 'jdata_OPKNEE_3'");
           		
           		tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPKNEE_4'");
            	tx.executeSql("delete from 'jdata_OPKNEE_4'");

        		tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_OPKNEE_5'");
            	tx.executeSql("delete from 'jdata_OPKNEE_5'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredDiagnosis'");
            	tx.executeSql("delete from 'clinix_StructuredDiagnosis'");

	            tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredDisposition'");
	            tx.executeSql("delete from 'clinix_StructuredDisposition'");
        
        	    tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredHospitalization'");
            	tx.executeSql("delete from 'clinix_StructuredHospitalization'");
          
          		tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredLABS'");
            	tx.executeSql("delete from 'clinix_StructuredLABS'");
            	
            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredManagement'");
            	tx.executeSql("delete from 'clinix_StructuredManagement'");
            	
            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='clinix_StructuredMedication'");
            	tx.executeSql("delete from 'clinix_StructuredMedication'");
	        });

	        $scope.pull_PREOPHIP(function(){
		        $scope.pull_POSTOPHIP(function(){
			        $scope.pull_OPHIP_3(function(){
				        $scope.pull_OPHIP_5(function(){
				        	$scope.pull_OPHIP_6(function(){

						        $scope.pull_POSTOPKNEE(function(){
							        $scope.pull_PREOPKNEE(function(){
								        $scope.pull_OPKNEE_3(function(){
									        $scope.pull_OPKNEE_4(function(){
									        	$scope.pull_OPKNEE_5(function(){

											        $scope.pull_StrucDiagnosis(function(){
												        $scope.pull_StrucDisposition(function(){
													        $scope.pull_StrucHospitalization(function(){
														        $scope.pull_StrucLabs(function(){
															        $scope.pull_StrucManagement(function(){
																        $scope.pull_StrucMedication(function(){

															 				$ipadrbg.context.saveChanges();

    																	});
    																});
    															});
    														});
    													});
    												});
    											});
    										});
    									});
    								});
    							});
    						});
    					});
    				});
    			});
    		});
 			// not used, see diagnosis sur schedule
 			// $scope.pull_StrucSchedSurgery();

			alert("Importing ORDERS, Discharge Summary and REPORTS from Server was Successful!");
    	}
	}


  	// PULL Ambulatory Status
	$scope.pullambustatus = function(callback){

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
			callback();
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
	$scope.pullKneeAlignment = function(callback){

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
				// $ipadrbg.context.clinix_KneeAlignment.saveChanges();
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

	//Pull Knee Apperance
	$scope.pullKneeApperance = function(callback){

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
				// $ipadrbg.context.clinix_KneeAppearance.saveChanges();
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

	//pull Knee Measurements
	$scope.pullKneeMeasurements = function(callback){

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
				// $ipadrbg.context.clinix_KneeMeasures.saveChanges();
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


	//pull Knee Motion Range
	$scope.pullKneeMotionRange = function(callback){

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
				// $ipadrbg.context.clinix_KneeMotionRange.saveChanges();
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


	//pull Knee Xray
	$scope.pullKneeXray = function(callback){

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
				// $ipadrbg.context.clinix_KneeXRays.saveChanges();
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

	///////////////// PULL DIAGS

	$scope.pullDIAGS = function(callback){

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
				// $ipadrbg.context.clinix_Diagnosis.saveChanges();
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


	// PULL DIAGS - Management
	$scope.pullDIAGS_mgmt = function(callback){

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
					
					clinix_DiagsManagement.HyaluronicAcid = data[idx].HyaluronicAcid;
					clinix_DiagsManagement.ManageOthers = data[idx].ManageOthers;

					clinix_DiagsManagement.SynchStatus = "222";					

					$ipadrbg.context.clinix_DiagsManagement.add(clinix_DiagsManagement);
				}
				// $ipadrbg.context.clinix_DiagsManagement.saveChanges();
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


	// PULL DIAGS - Schedule for Surgery
	$scope.pullDIAGS_ScheduleForSurgery = function(callback){

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_Diags_SchedSurgery.php'}).
		success ( function ( data, status, headers, config ) {

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
				// $ipadrbg.context.clinix_DiagSchedSurgery.saveChanges();
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

	// PULL DIAGS - Medication
	$scope.pullDIAGS_Medication= function(callback){

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_Diags_Med.php'}).
		success ( function ( data, status, headers, config ) {
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
				// $ipadrbg.context.clinix_DiagsMedication.saveChanges();
			}
			callback();
			// else
			// alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}


	
	// PULL DIAGS - Disposition
	$scope.pullDIAGS_Disposition= function(callback){

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_Diags_Disposition.php'}).
		success ( function ( data, status, headers, config ) {
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
				// $ipadrbg.context.clinix_DiagsDisposition.saveChanges();
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


	// PULL DIAGS - Notes
	$scope.pullDIAGS_Notes= function(callback){

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
				// $ipadrbg.context.clinix_DiagsNotes.saveChanges();
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


	// PULL DIAGS - Charges
	$scope.pullDIAGS_Charges= function(callback){

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
				// $ipadrbg.context.clinix_PEcharges.saveChanges();
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


	//
	//
	//
	//
	//
	//
	//


	//Pull POSTOp_HIP_preform
	$scope.pull_POSTOPHIP= function(callback){

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
				// $ipadrbg.context.clinix_POSTOp_HIP_preform.saveChanges();
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

	// PULL Pre Op Hip Preform
	$scope.pull_PREOPHIP= function(callback){

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
				// $ipadrbg.context.clinix_PREOp_HIP_preform.saveChanges();
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


	// PULL Post Op knee Preform
	$scope.pull_POSTOPKNEE= function(callback){

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
				// $ipadrbg.context.clinix_POSTOp_KNEE_preform.saveChanges();
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

	// PULL PREOPKNEE
	$scope.pull_PREOPKNEE= function(callback){

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
				// $ipadrbg.context.clinix_PREOp_KNEE_preform.saveChanges();
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


	// PULL OPERATIVES - HIP
	$scope.pull_OPHIP_3 = function(callback){

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
				// $ipadrbg.context.jdata_OPHIP_3.saveChanges();
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

	//
	//
	//
	//
	//
	//
	//

	// PULL OPERATIVES - HIP
	$scope.pull_OPHIP_5 = function(callback){

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
				// $ipadrbg.context.jdata_OPHIP_5.saveChanges();
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


	// PULL OPERATIVES - HIP
	$scope.pull_OPHIP_6 = function(callback){

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
				// $ipadrbg.context.jdata_OPHIP_6.saveChanges();
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



	// PULL OPERATIVES - KNEE
	$scope.pull_OPKNEE_3 = function(callback){

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
				// $ipadrbg.context.jdata_OPKNEE_3.saveChanges();
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

	// PULL OPERATIVES - KNEE
	$scope.pull_OPKNEE_4 = function(callback){

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
				// $ipadrbg.context.jdata_OPKNEE_4.saveChanges();

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


	// PULL OPERATIVES - KNEE
	$scope.pull_OPKNEE_5 = function(callback){

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
				// $ipadrbg.context.jdata_OPKNEE_5.saveChanges();

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
	$scope.pull_StrucDiagnosis = function(callback){

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
				// $ipadrbg.context.clinix_StructuredDiagnosis.saveChanges();

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

	// PULL Structured Disposition
	$scope.pull_StrucDisposition = function(callback){

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

					clinix_StructuredDisposition.Disposition = data[idx].Disposition;
					clinix_StructuredDisposition.DispoValue = data[idx].DispoValue;

					clinix_StructuredDisposition.SynchStatus = "222";					

					$ipadrbg.context.clinix_StructuredDisposition.add(clinix_StructuredDisposition);
				}
				// $ipadrbg.context.clinix_StructuredDisposition.saveChanges();
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


	// PULL Structured Disachrge - Hospitalization
	$scope.pull_StrucHospitalization = function(callback){
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
				// $ipadrbg.context.clinix_StructuredHospitalization.saveChanges();

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


	// PULL Structured Discharge - Labs
	$scope.pull_StrucLabs = function(callback){

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
				// $ipadrbg.context.clinix_StructuredLABS.saveChanges();

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


	// PULL Structured Discharge - Management
	$scope.pull_StrucManagement = function(callback){

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
				// $ipadrbg.context.clinix_StructuredManagement.saveChanges();
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


	// PULL Structured Discharge - Medication
	$scope.pull_StrucMedication = function(callback){
		

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
				// $ipadrbg.context.clinix_StructuredMedication.saveChanges();

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

	// PULL Structured Discharge - SchedSurgery THIS ROUTINE IS NOT IN USE
	// PULL Structured Discharge - SchedSurgery THIS ROUTINE IS NOT IN USE
	// PULL Structured Discharge - SchedSurgery THIS ROUTINE IS NOT IN USE
	// PULL Structured Discharge - SchedSurgery THIS ROUTINE IS NOT IN USE
	// PULL Structured Discharge - SchedSurgery THIS ROUTINE IS NOT IN USE
	$scope.pull_StrucSchedSurgery = function(callback){
		

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
			callback();
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	// MERGE LINES FROM UTZ

	// PULL GEN ORTHO
	// PULL GEN ORTHO
	// PULL GEN ORTHO
	$scope.pullgenortho = function() {
    	if (confirm(serverIP + ': Pull all General Orthopedics Data, proceed? ')) {

    		var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_genotho_1'");
            	tx.executeSql("delete from 'jdata_genotho_1'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_genotho_2'");
            	tx.executeSql("delete from 'jdata_genotho_2'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_genotho_3'");
            	tx.executeSql("delete from 'jdata_genotho_3'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_genotho_4'");
            	tx.executeSql("delete from 'jdata_genotho_4'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_genotho_5'");
            	tx.executeSql("delete from 'jdata_genotho_5'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_genotho_6'");
            	tx.executeSql("delete from 'jdata_genotho_6'");
	        });

	        $scope.pull_genortho1(function(){
	        	$scope.pull_genortho2(function(){
	        		$scope.pull_genortho3(function(){
	        			$scope.pull_genortho4(function(){
	        				$scope.pull_genortho5(function(){
	        					$scope.pull_genortho6(function(){

									$ipadrbg.context.saveChanges();

								});
							});					
						});
					});			
    			});
    		});
 			// not used, see diagnosis sur schedule
 			// $scope.pull_StrucSchedSurgery();

			alert("Importing ORDERS, Discharge Summary and REPORTS from Server was Successful!");
    	}
	}


	$scope.pull_genortho1= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_genortho1.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_genotho_1 = new $ipadrbg.types.jdata_genotho_1();
			    	
					jdata_genotho_1.ClinixRID = data[idx].ClinixRID;
					jdata_genotho_1.PxRID = data[idx].PxRID;

					jdata_genotho_1.Appearance = data[idx].Appearance;
					jdata_genotho_1.Deformity = data[idx].Deformity;
					jdata_genotho_1.SkinCloOp = data[idx].SkinCloOp;
					jdata_genotho_1.ActiveMotion = data[idx].ActiveMotion;
					jdata_genotho_1.PassiveMotion = data[idx].PassiveMotion;
					jdata_genotho_1.Neurologic = data[idx].Neurologic;
					jdata_genotho_1.Vascular = data[idx].Vascular;
					jdata_genotho_1.PoorDetails = data[idx].PoorDetails;

					jdata_genotho_1.SynchStatus = "111";					

					$ipadrbg.context.jdata_genotho_1.add(jdata_genotho_1);
				}
				// $ipadrbg.context.jdata_genotho_1.saveChanges();
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


	$scope.pull_genortho2= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_genortho2.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_genotho_2 = new $ipadrbg.types.jdata_genotho_2();
			    	
					jdata_genotho_2.ClinixRID = data[idx].ClinixRID;
					jdata_genotho_2.PxRID = data[idx].PxRID;

					jdata_genotho_2.Hip = data[idx].Hip;
					jdata_genotho_2.Knee = data[idx].Knee;
					jdata_genotho_2.LeftHand = data[idx].LeftHand;
					jdata_genotho_2.RightHand = data[idx].RightHand;
					jdata_genotho_2.ShoulLeft = data[idx].ShoulLeft;
					jdata_genotho_2.ShoulRight = data[idx].ShoulRight;
					jdata_genotho_2.ElbowLeft = data[idx].ElbowLeft;
					jdata_genotho_2.ElbowRight = data[idx].ElbowRight;
					jdata_genotho_2.AnkleLeft = data[idx].AnkleLeft;
					jdata_genotho_2.AnkleRight = data[idx].AnkleRight;
					jdata_genotho_2.WristLeft = data[idx].WristLeft;
					jdata_genotho_2.WristRight = data[idx].WristRight;
					jdata_genotho_2.FootLeft = data[idx].FootLeft;
					jdata_genotho_2.FootRight = data[idx].FootRight;
					jdata_genotho_2.Spine = data[idx].Spine;
					jdata_genotho_2.Pelvis = data[idx].Pelvis;
					jdata_genotho_2.Humerus = data[idx].Humerus;
					jdata_genotho_2.RadiusUlna = data[idx].RadiusUlna;
					jdata_genotho_2.Tibia = data[idx].Tibia;
					jdata_genotho_2.Ferum = data[idx].Ferum;

					jdata_genotho_2.SynchStatus = "111";					

					$ipadrbg.context.jdata_genotho_2.add(jdata_genotho_2);
				}
				// $ipadrbg.context.jdata_genotho_1.saveChanges();
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

	$scope.pull_genortho3= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_genortho3.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_genotho_3 = new $ipadrbg.types.jdata_genotho_3();
			    	
					jdata_genotho_3.ClinixRID = data[idx].ClinixRID;
					jdata_genotho_3.PxRID = data[idx].PxRID;

					jdata_genotho_3.xfindings = data[idx].xfindings;
					jdata_genotho_3.AbnormalDes = data[idx].AbnormalDes;

					jdata_genotho_3.SynchStatus = "111";					

					$ipadrbg.context.jdata_genotho_3.add(jdata_genotho_3);
				}
				// $ipadrbg.context.jdata_genotho_1.saveChanges();
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


	$scope.pull_genortho4= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_genortho4.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_genotho_4 = new $ipadrbg.types.jdata_genotho_4();
			    	
					jdata_genotho_4.ClinixRID = data[idx].ClinixRID;
					jdata_genotho_4.PxRID = data[idx].PxRID;

					jdata_genotho_4.Medications = data[idx].Medications;
					jdata_genotho_4.Injections = data[idx].Injections;
					jdata_genotho_4.PhysicalTherapy = data[idx].PhysicalTherapy;
					jdata_genotho_4.Others = data[idx].Others;
					jdata_genotho_4.Disposition = data[idx].Disposition;

					jdata_genotho_4.SynchStatus = "111";					

					$ipadrbg.context.jdata_genotho_4.add(jdata_genotho_4);
				}
				// $ipadrbg.context.jdata_genotho_1.saveChanges();
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


	$scope.pull_genortho5= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_genortho5.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_genotho_5 = new $ipadrbg.types.jdata_genotho_5();
			    	
					jdata_genotho_5.ClinixRID = data[idx].ClinixRID;
					jdata_genotho_5.PxRID = data[idx].PxRID;

					jdata_genotho_5.XrayDate = data[idx].XrayDate;
					jdata_genotho_5.XrayReport = data[idx].XrayReport;
					jdata_genotho_5.MRIDate = data[idx].MRIDate;
					jdata_genotho_5.CTSCANDate = data[idx].CTSCANDate;
					jdata_genotho_5.CTSCANReport = data[idx].CTSCANReport;
					jdata_genotho_5.BloodExams = data[idx].BloodExams;
					jdata_genotho_5.BloodExamsWhere = data[idx].BloodExamsWhere;
					jdata_genotho_5.BloodReports = data[idx].BloodReports;

					jdata_genotho_5.SynchStatus = "111";					

					$ipadrbg.context.jdata_genotho_5.add(jdata_genotho_5);
				}
				// $ipadrbg.context.jdata_genotho_1.saveChanges();
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
	    

	$scope.pull_genortho6= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_genortho6.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_genotho_6 = new $ipadrbg.types.jdata_genotho_6();
			    	
					jdata_genotho_6.ClinixRID = data[idx].ClinixRID;
					jdata_genotho_6.PxRID = data[idx].PxRID;

					jdata_genotho_6.PreviousSurgery = data[idx].PreviousSurgery;

					jdata_genotho_6.SynchStatus = "111";					

					$ipadrbg.context.jdata_genotho_6.add(jdata_genotho_6);
				}
				// $ipadrbg.context.jdata_genotho_1.saveChanges();
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


	$scope.pullskeltrauma = function() {
    	if (confirm(serverIP + ': Pull all Skeletal Trauma Data, proceed? ')) {

    		var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_SkelTrauma_1'");
            	tx.executeSql("delete from 'jdata_SkelTrauma_1'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_SkelTrauma_2'");
            	tx.executeSql("delete from 'jdata_SkelTrauma_2'");
	        });

	        $scope.pull_skeletaltrauma1(function(){
	        	$scope.pull_skeletaltrauma2(function(){

				$ipadrbg.context.saveChanges();
								
    			});
    		});
 			// not used, see diagnosis sur schedule
 			// $scope.pull_StrucSchedSurgery();

			alert("Importing ORDERS, Discharge Summary and REPORTS from Server was Successful!");
    	}
	}

	 $scope.pull_skeletaltrauma1= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_skeltrauma1.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_SkelTrauma_1 = new $ipadrbg.types.jdata_SkelTrauma_1();
			    	
					jdata_SkelTrauma_1.ClinixRID = data[idx].ClinixRID;
					jdata_SkelTrauma_1.PxRID = data[idx].PxRID;

					jdata_SkelTrauma_1.AppearanceNormal = data[idx].AppearanceNormal;
					jdata_SkelTrauma_1.Deformity = data[idx].Deformity;
					jdata_SkelTrauma_1.Skin = data[idx].Skin;
					jdata_SkelTrauma_1.PainActiveMotion = data[idx].PainActiveMotion;
					jdata_SkelTrauma_1.PainPassiveMotion = data[idx].PainPassiveMotion;
					jdata_SkelTrauma_1.NeurologicStatus = data[idx].NeurologicStatus;
					jdata_SkelTrauma_1.VascularStatus = data[idx].VascularStatus;
					jdata_SkelTrauma_1.NeurologicVascularDes = data[idx].NeurologicVascularDes;
					jdata_SkelTrauma_1.Deleted = data[idx].Deleted;

					jdata_SkelTrauma_1.SynchStatus = "111";					

					$ipadrbg.context.jdata_SkelTrauma_1.add(jdata_SkelTrauma_1);
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

	$scope.pull_skeletaltrauma2= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_skeltrauma2.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_SkelTrauma_2 = new $ipadrbg.types.jdata_SkelTrauma_2();
			    	
					jdata_SkelTrauma_2.ClinixRID = data[idx].ClinixRID;
					jdata_SkelTrauma_2.PxRID = data[idx].PxRID;

					jdata_SkelTrauma_2.ApproXraysOrderedSpine = data[idx].ApproXraysOrderedSpine;
					jdata_SkelTrauma_2.ApproXraysOrderedHumerus = data[idx].ApproXraysOrderedHumerus;
					jdata_SkelTrauma_2.ApproXraysOrderedRadiusUlna = data[idx].ApproXraysOrderedRadiusUlna;
					jdata_SkelTrauma_2.ApproXraysOrderedShoulder = data[idx].ApproXraysOrderedShoulder;
					jdata_SkelTrauma_2.ApproXraysOrderedElbows = data[idx].ApproXraysOrderedElbows;
					jdata_SkelTrauma_2.ApproXraysOrderedWrist = data[idx].ApproXraysOrderedWrist;
					jdata_SkelTrauma_2.ApproXraysOrderedHand = data[idx].ApproXraysOrderedHand;
					jdata_SkelTrauma_2.ApproXraysOrderedPelvis = data[idx].ApproXraysOrderedPelvis;
					jdata_SkelTrauma_2.ApproXraysOrderedHip = data[idx].ApproXraysOrderedHip;
					jdata_SkelTrauma_2.ApproXraysOrderedKnee = data[idx].ApproXraysOrderedKnee;
					jdata_SkelTrauma_2.ApproXraysOrderedTibia = data[idx].ApproXraysOrderedTibia;
					jdata_SkelTrauma_2.ApproXraysOrderedAnkle = data[idx].ApproXraysOrderedAnkle;
					jdata_SkelTrauma_2.ApproXraysOrderedFoot = data[idx].ApproXraysOrderedFoot;
					jdata_SkelTrauma_2.XrayFindDate = data[idx].XrayFindDate;
					jdata_SkelTrauma_2.NormalAbnormal = data[idx].NormalAbnormal;
					jdata_SkelTrauma_2.Fracture = data[idx].Fracture;
					jdata_SkelTrauma_2.SiteShaft = data[idx].SiteShaft;
					jdata_SkelTrauma_2.Dislocation = data[idx].Dislocation;
					

					jdata_SkelTrauma_2.SynchStatus = "111";					

					$ipadrbg.context.jdata_SkelTrauma_2.add(jdata_SkelTrauma_2);
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


	$scope.pullspine = function() {
    	if (confirm(serverIP + ': Pull all Skeletal Trauma Data, proceed? ')) {

    		var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_spine_1'");
            	tx.executeSql("delete from 'jdata_spine_1'");

	        }); 

	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_spine_2'");
            	tx.executeSql("delete from 'jdata_spine_2'");

	        });
	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_spine_3'");
            	tx.executeSql("delete from 'jdata_spine_3'");

	        });
	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_spine_3'");
            	tx.executeSql("delete from 'jdata_spine_4'");

	        });

	        $scope.pull_spine1(function(){
	        	$scope.pull_spine2(function(){
	        		$scope.pull_spine3(function(){
	        			$scope.pull_spine4(function(){

						$ipadrbg.context.saveChanges();
								
    					});
    				});
    			});
    		});
 			// not used, see diagnosis sur schedule
 			// $scope.pull_StrucSchedSurgery();

			alert("Importing ORDERS, Discharge Summary and REPORTS from Server was Successful!");
    	}
	}


	$scope.pull_spine1= function(callback){

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_spine1.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_spine_1 = new $ipadrbg.types.jdata_spine_1();
			    	
					jdata_spine_1.ClinixRID = data[idx].ClinixRID;
					jdata_spine_1.PxRID = data[idx].PxRID;

					jdata_spine_1.DominantHand = data[idx].DominantHand;
					jdata_spine_1.CC = data[idx].CC;
					jdata_spine_1.problemsymptoms = data[idx].problemsymptoms;
					jdata_spine_1.symptoms = data[idx].symptoms;
					jdata_spine_1.priorepisodes = data[idx].priorepisodes;
					jdata_spine_1.JobInjury = data[idx].JobInjury;
					jdata_spine_1.injurydate = data[idx].injurydate;

					jdata_spine_1.SynchStatus = "111";					

					$ipadrbg.context.jdata_spine_1.add(jdata_spine_1);
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
	

	$scope.pull_spine2= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_spine2.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_spine_2 = new $ipadrbg.types.jdata_spine_2();
			    	
					jdata_spine_2.ClinixRID = data[idx].ClinixRID;
					jdata_spine_2.PxRID = data[idx].PxRID;

					jdata_spine_2.backneckpain = data[idx].backneckpain;
					jdata_spine_2.legarmpain = data[idx].legarmpain;

					jdata_spine_2.SynchStatus = "111";					

					$ipadrbg.context.jdata_spine_2.add(jdata_spine_2);
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
	

	$scope.pull_spine3= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_spine3.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_spine_3 = new $ipadrbg.types.jdata_spine_3();
			    	
					jdata_spine_3.ClinixRID = data[idx].ClinixRID;
					jdata_spine_3.PxRID = data[idx].PxRID;

					jdata_spine_3.sittingnochange = data[idx].sittingnochange;
					jdata_spine_3.sittingrelievespain = data[idx].sittingrelievespain;
					jdata_spine_3.sittingincreasepain = data[idx].sittingincreasepain;
					jdata_spine_3.sittingafterhowlong = data[idx].sittingafterhowlong;
					jdata_spine_3.walkingnochange = data[idx].walkingnochange;
					jdata_spine_3.walkingrelievespain = data[idx].walkingrelievespain;
					jdata_spine_3.walkingincreasepain = data[idx].walkingincreasepain;
					jdata_spine_3.walkingafterhowlong = data[idx].walkingafterhowlong;
					jdata_spine_3.standingnochange = data[idx].standingnochange;
					jdata_spine_3.standingrelievespain = data[idx].standingrelievespain;
					jdata_spine_3.standingincreasepain = data[idx].standingincreasepain;
					jdata_spine_3.standingafterhowlong = data[idx].standingafterhowlong;
					jdata_spine_3.lyingdownnochange = data[idx].lyingdownnochange;
					jdata_spine_3.lyingdownrelievespain = data[idx].lyingdownrelievespain;
					jdata_spine_3.lyingdownincreasepain = data[idx].lyingdownincreasepain;
					jdata_spine_3.lyingdownafterhowlong = data[idx].lyingdownafterhowlong;
					jdata_spine_3.bendingforwardnochange = data[idx].bendingforwardnochange;
					jdata_spine_3.bendingforwardrelievespain = data[idx].bendingforwardrelievespain;
					jdata_spine_3.bendingforwardincreasepain = data[idx].bendingforwardincreasepain;
					jdata_spine_3.bendingforwardafterhowlong = data[idx].bendingforwardafterhowlong;
					jdata_spine_3.bendingbackwardnochange = data[idx].bendingbackwardnochange;
					jdata_spine_3.bendingbackwardrelievespain = data[idx].bendingbackwardrelievespain;
					jdata_spine_3.bendingbackwardincreasepain = data[idx].bendingbackwardincreasepain;
					jdata_spine_3.bendingbackwardafterhowlong = data[idx].bendingbackwardafterhowlong;
					jdata_spine_3.liftingnochange = data[idx].liftingnochange;
					jdata_spine_3.liftingrelievespain = data[idx].liftingrelievespain;
					jdata_spine_3.liftingincreasepain = data[idx].liftingincreasepain;
					jdata_spine_3.liftingafterhowlong = data[idx].liftingafterhowlong;
					jdata_spine_3.coughingsneezingnochange = data[idx].coughingsneezingnochange;
					jdata_spine_3.coughingsneezingrelievespain = data[idx].coughingsneezingrelievespain;
					jdata_spine_3.coughingsneezingincreasepain = data[idx].coughingsneezingincreasepain;
					jdata_spine_3.coughingsneezingafterhowlong = data[idx].coughingsneezingafterhowlong;
					jdata_spine_3.changingpositionnochange = data[idx].changingpositionnochange;
					jdata_spine_3.changingpositionrelievespain = data[idx].changingpositionrelievespain;
					jdata_spine_3.changingpositionincreasepain = data[idx].changingpositionincreasepain;
					jdata_spine_3.changingpositionafterhowlong = data[idx].changingpositionafterhowlong;
					jdata_spine_3.activitiesmotionposition = data[idx].activitiesmotionposition;
					jdata_spine_3.relievepain = data[idx].relievepain;

					jdata_spine_3.SynchStatus = "111";					

					$ipadrbg.context.jdata_spine_3.add(jdata_spine_3);
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


	$scope.pull_spine4= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_spine4.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_spine_4 = new $ipadrbg.types.jdata_spine_4();
			    	
					jdata_spine_4.ClinixRID = data[idx].ClinixRID;
					jdata_spine_4.PxRID = data[idx].PxRID;

					jdata_spine_4.BladderFunction = data[idx].BladderFunction;
					jdata_spine_4.BowelFunction = data[idx].BowelFunction;
					jdata_spine_4.sexualfunction = data[idx].sexualfunction;
					jdata_spine_4.legfoot = data[idx].legfoot;
					jdata_spine_4.legfootRightLeft = data[idx].legfootRightLeft;
					jdata_spine_4.armhand = data[idx].armhand;
					jdata_spine_4.armhandRightLeft = data[idx].armhandRightLeft;
					jdata_spine_4.nightawaken = data[idx].nightawaken;
					jdata_spine_4.inference = data[idx].inference;

					jdata_spine_4.SynchStatus = "111";					

					$ipadrbg.context.jdata_spine_4.add(jdata_spine_4);
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


	$scope.pullsportsfootankle = function() {
    	if (confirm(serverIP + ': Pull all Sports Foot and Ankle Data, proceed? ')) {

    		var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_FootAnkle_1'");
            	tx.executeSql("delete from 'jdata_FootAnkle_1'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_FootAnkle_2'");
            	tx.executeSql("delete from 'jdata_FootAnkle_2'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_FootAnkle_3'");
            	tx.executeSql("delete from 'jdata_FootAnkle_3'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_FootAnkle_4'");
            	tx.executeSql("delete from 'jdata_FootAnkle_4'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_FootAnkle_5'");
            	tx.executeSql("delete from 'jdata_FootAnkle_5'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_FootAnkle_6'");
            	tx.executeSql("delete from 'jdata_FootAnkle_6'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_FootAnkle_7'");
            	tx.executeSql("delete from 'jdata_FootAnkle_7'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_FootAnkle_8'");
            	tx.executeSql("delete from 'jdata_FootAnkle_8'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_FootAnkle_9'");
            	tx.executeSql("delete from 'jdata_FootAnkle_9'");


	        });

	        $scope.pull_footankle1(function(){
	        	$scope.pull_footankle2(function(){
	        		$scope.pull_footankle3(function(){
	        			$scope.pull_footankle4(function(){
	        				$scope.pull_footankle5(function(){
		        				$scope.pull_footankle6(function(){
		        					$scope.pull_footankle7(function(){
		        						$scope.pull_footankle8(function(){
		        							$scope.pull_footankle9(function(){

												$ipadrbg.context.saveChanges();
											});
										});
    								});
	        					});
	        				});
	        			});
    				});
    			});
    		});

			alert("Importing ORDERS, Discharge Summary and REPORTS from Server was Successful!");
    	}
	}


	$scope.pull_footankle1= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_footankle1.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_FootAnkle_1 = new $ipadrbg.types.jdata_FootAnkle_1();
			    	
					jdata_FootAnkle_1.ClinixRID = data[idx].ClinixRID;
					jdata_FootAnkle_1.PxRID = data[idx].PxRID;

					jdata_FootAnkle_1.DOI = data[idx].DOI;
					jdata_FootAnkle_1.TOI = data[idx].TOI;
					jdata_FootAnkle_1.MOI = data[idx].MOI;
					jdata_FootAnkle_1.POI = data[idx].POI;
					jdata_FootAnkle_1.HistoryOfIllness = data[idx].HistoryOfIllness;
					jdata_FootAnkle_1.MedHistHypertension = data[idx].MedHistHypertension;
					jdata_FootAnkle_1.MedHistCardiac = data[idx].MedHistCardiac;
					jdata_FootAnkle_1.MedHistGenital = data[idx].MedHistGenital;
					jdata_FootAnkle_1.MedHistDiabetes = data[idx].MedHistDiabetes;
					jdata_FootAnkle_1.MedHistPulmo = data[idx].MedHistPulmo;
					jdata_FootAnkle_1.MedHistHepatitis = data[idx].MedHistHepatitis;
					jdata_FootAnkle_1.MedHistAsthma = data[idx].MedHistAsthma;
					jdata_FootAnkle_1.MedHistKidney = data[idx].MedHistKidney;
					jdata_FootAnkle_1.MedHistBleeding = data[idx].MedHistBleeding;
					jdata_FootAnkle_1.MedHistThyroid = data[idx].MedHistThyroid;
					jdata_FootAnkle_1.MedHistGI = data[idx].MedHistGI;
					jdata_FootAnkle_1.MedHistOthers = data[idx].MedHistOthers;
					jdata_FootAnkle_1.MedHistAllergies = data[idx].MedHistAllergies;
					jdata_FootAnkle_1.MedHistPrevOp = data[idx].MedHistPrevOp;
					jdata_FootAnkle_1.MedHistCurrentMedication = data[idx].MedHistCurrentMedication;
					jdata_FootAnkle_1.ReviewSystemFever = data[idx].ReviewSystemFever;
					jdata_FootAnkle_1.ReviewSystemAbdominalPain = data[idx].ReviewSystemAbdominalPain;
					jdata_FootAnkle_1.ReviewSystemVomiting = data[idx].ReviewSystemVomiting;
					jdata_FootAnkle_1.ReviewSystemDysuria = data[idx].ReviewSystemDysuria;
					jdata_FootAnkle_1.ReviewSystemCough = data[idx].ReviewSystemCough;
					jdata_FootAnkle_1.ReviewSystemDOB = data[idx].ReviewSystemDOB;
					jdata_FootAnkle_1.ReviewSystemDiarrhea = data[idx].ReviewSystemDiarrhea;
					jdata_FootAnkle_1.ReviewSystemlowbackpain = data[idx].ReviewSystemlowbackpain;

					jdata_FootAnkle_1.SynchStatus = "111";					

					$ipadrbg.context.jdata_FootAnkle_1.add(jdata_FootAnkle_1);
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


	$scope.pull_footankle2= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_footankle2.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_FootAnkle_2 = new $ipadrbg.types.jdata_FootAnkle_2();
			    	
					jdata_FootAnkle_2.ClinixRID = data[idx].ClinixRID;
					jdata_FootAnkle_2.PxRID = data[idx].PxRID;

					jdata_FootAnkle_2.Ambulation = data[idx].Ambulation;

					jdata_FootAnkle_2.Ambulation= data[idx].Ambulation;
			        jdata_FootAnkle_2.Sensorium= data[idx].Sensorium;
			        jdata_FootAnkle_2.Conjunctivae= data[idx].Conjunctivae;
			        jdata_FootAnkle_2.ChestExpansion = data[idx].ChestExpansion;
			        jdata_FootAnkle_2.Cardiac= data[idx].Cardiac;
			        jdata_FootAnkle_2.Abdomen= data[idx].Abdomen;
			        
					jdata_FootAnkle_2.SynchStatus = "111";					

					$ipadrbg.context.jdata_FootAnkle_2.add(jdata_FootAnkle_2);
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


	$scope.pull_footankle3= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_footankle3.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_FootAnkle_3 = new $ipadrbg.types.jdata_FootAnkle_3();
			    	
					jdata_FootAnkle_3.ClinixRID = data[idx].ClinixRID;
					jdata_FootAnkle_3.PxRID = data[idx].PxRID;

					jdata_FootAnkle_3.Inspection= data[idx].Inspection;
			        jdata_FootAnkle_3.RangeMotion= data[idx].RangeMotion;
			        jdata_FootAnkle_3.RangeMotionDescript= data[idx].RangeMotionDescript;
			        jdata_FootAnkle_3.MMT = data[idx].MMT;
			        jdata_FootAnkle_3.MMTDescript= data[idx].MMTDescript;
			        jdata_FootAnkle_3.Sensory= data[idx].Sensory;
			        jdata_FootAnkle_3.SensoryDescript= data[idx].SensoryDescript;
			        jdata_FootAnkle_3.Vascular= data[idx].Vascular;
			        jdata_FootAnkle_3.VascularDescript= data[idx].VascularDescript;
			        jdata_FootAnkle_3.AbsentPulseDescript= data[idx].AbsentPulseDescript;
			        jdata_FootAnkle_3.VascularCapil= data[idx].VascularCapil;
					

					jdata_FootAnkle_3.SynchStatus = "111";					

					$ipadrbg.context.jdata_FootAnkle_3.add(jdata_FootAnkle_3);
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


	$scope.pull_footankle4= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_footankle4.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_FootAnkle_4 = new $ipadrbg.types.jdata_FootAnkle_4();
			    	
					jdata_FootAnkle_4.ClinixRID = data[idx].ClinixRID;
					jdata_FootAnkle_4.PxRID = data[idx].PxRID;

					jdata_FootAnkle_4.FootAnkle = data[idx].FootAnkle;
			        jdata_FootAnkle_4.LeftRight = data[idx].LeftRight;
			        jdata_FootAnkle_4.Deformity = data[idx].Deformity;
			        jdata_FootAnkle_4.DeforDetails = data[idx].DeforDetails;
			        jdata_FootAnkle_4.Erythema = data[idx].Erythema;
			        jdata_FootAnkle_4.ErythemaDetails = data[idx].ErythemaDetails;
			        jdata_FootAnkle_4.OpenWound = data[idx].OpenWound;
			        jdata_FootAnkle_4.OpenWoundDetails  = data[idx].OpenWoundDetails;
			        jdata_FootAnkle_4.Swelling = data[idx].Swelling;
			        jdata_FootAnkle_4.SwellingDetails = data[idx].SwellingDetails;
			        jdata_FootAnkle_4.Hematoma = data[idx].Hematoma;
			        jdata_FootAnkle_4.HematomaDetails = data[idx].HematomaDetails;
			        jdata_FootAnkle_4.MuscleAtrophy = data[idx].MuscleAtrophy;
			        jdata_FootAnkle_4.MuscleAtrophyDetails = data[idx].MuscleAtrophyDetails;
			        jdata_FootAnkle_4.Mass = data[idx].Mass;
			        jdata_FootAnkle_4.MassTender = data[idx].MassTender;
			        jdata_FootAnkle_4.MassNontender = data[idx].MassNontender;
			        jdata_FootAnkle_4.MassMoveable = data[idx].MassMoveable;
			        jdata_FootAnkle_4.MassFixed = data[idx].MassFixed;
			        jdata_FootAnkle_4.MassRegular = data[idx].MassRegular;
			        jdata_FootAnkle_4.MassIrregular = data[idx].MassIrregular;
			        jdata_FootAnkle_4.Masslymphadenopathy = data[idx].Masslymphadenopathy;
			        jdata_FootAnkle_4.MassSize = data[idx].MassSize;
			        jdata_FootAnkle_4.MassLocation = data[idx].MassLocation;
			        jdata_FootAnkle_4.MassConsistency = data[idx].MassConsistency;
			        jdata_FootAnkle_4.Arch = data[idx].Arch;
			        jdata_FootAnkle_4.Deformities = data[idx].Deformities;
			        jdata_FootAnkle_4.Palpitation = data[idx].Palpitation;
			        jdata_FootAnkle_4.PalpitationDescrip = data[idx].PalpitationDescrip;
			        jdata_FootAnkle_4.SensoryNormal = data[idx].SensoryNormal;
			        jdata_FootAnkle_4.L4 = data[idx].L4;
			        jdata_FootAnkle_4.L5 = data[idx].L5;
			        jdata_FootAnkle_4.S1 = data[idx].S1;
			        jdata_FootAnkle_4.Lateralplantarnerve = data[idx].Lateralplantarnerve;
			        jdata_FootAnkle_4.LateralplantarnerveDetails = data[idx].LateralplantarnerveDetails;
			        jdata_FootAnkle_4.Medialplantarnerve = data[idx].Medialplantarnerve;
			        jdata_FootAnkle_4.MedialplantarnerveDetails = data[idx].MedialplantarnerveDetails;
			        jdata_FootAnkle_4.Peronealnerve = data[idx].Peronealnerve;
			        jdata_FootAnkle_4.PeronealnerveDetails = data[idx].PeronealnerveDetails;
			        jdata_FootAnkle_4.Tibialnerve = data[idx].Tibialnerve;
			        jdata_FootAnkle_4.TibialnerveDetails = data[idx].TibialnerveDetails;

					jdata_FootAnkle_4.SynchStatus = "111";					

					$ipadrbg.context.jdata_FootAnkle_4.add(jdata_FootAnkle_4);
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


	$scope.pull_footankle5= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_footankle5.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_FootAnkle_5 = new $ipadrbg.types.jdata_FootAnkle_5();
			    	
					jdata_FootAnkle_5.ClinixRID = data[idx].ClinixRID;
					jdata_FootAnkle_5.PxRID = data[idx].PxRID;

					jdata_FootAnkle_5.FootAnkle = data[idx].FootAnkle;
			        jdata_FootAnkle_5.DorsiflexionMotion = data[idx].DorsiflexionMotion;
			        jdata_FootAnkle_5.DorsiflexionPassive = data[idx].DorsiflexionPassive;
			        jdata_FootAnkle_5.DorsiflexionPain = data[idx].DorsiflexionPain;
			        jdata_FootAnkle_5.DorsiflexionCrepitation = data[idx].DorsiflexionCrepitation;
			        jdata_FootAnkle_5.DorsiflexionMMT = data[idx].DorsiflexionMMT;
			        jdata_FootAnkle_5.PlantarflexionMotion = data[idx].PlantarflexionMotion;
			        jdata_FootAnkle_5.PlantarflexionPassive = data[idx].PlantarflexionPassive;
			        jdata_FootAnkle_5.PlantarflexionPain = data[idx].PlantarflexionPain;
			        jdata_FootAnkle_5.PlantarflexionCrepitation = data[idx].PlantarflexionCrepitation;
			        jdata_FootAnkle_5.PlantarflexionMMT = data[idx].PlantarflexionMMT;
			        jdata_FootAnkle_5.InversionMotion = data[idx].InversionMotion;
			        jdata_FootAnkle_5.InversionPassive = data[idx].InversionPassive;
			        jdata_FootAnkle_5.InversionPain = data[idx].InversionPain;
			        jdata_FootAnkle_5.InversionCrepitation = data[idx].InversionCrepitation;
			        jdata_FootAnkle_5.InversionMMT = data[idx].InversionMMT;
			        jdata_FootAnkle_5.EversionMotion = data[idx].EversionMotion;
			        jdata_FootAnkle_5.EversionPassive = data[idx].EversionPassive;
			        jdata_FootAnkle_5.EversionPain = data[idx].EversionPain;
			        jdata_FootAnkle_5.EversionCrepitation = data[idx].EversionCrepitation;
			        jdata_FootAnkle_5.EversionMMT = data[idx].EversionMMT;
			        jdata_FootAnkle_5.ToeFlexionMotion = data[idx].ToeFlexionMotion;
			        jdata_FootAnkle_5.ToeFlexionPassive = data[idx].ToeFlexionPassive;
			        jdata_FootAnkle_5.ToeFlexionPain = data[idx].ToeFlexionPain;
			        jdata_FootAnkle_5.ToeFlexionCrepitation = data[idx].ToeFlexionCrepitation;
			        jdata_FootAnkle_5.ToeFlexionMMT = data[idx].ToeFlexionMMT;
			        jdata_FootAnkle_5.ToeExtensionMotion = data[idx].ToeExtensionMotion;
			        jdata_FootAnkle_5.ToeExtensionPassive = data[idx].ToeExtensionPassive;
			        jdata_FootAnkle_5.ToeExtensionPain = data[idx].ToeExtensionPain;
			        jdata_FootAnkle_5.ToeExtensionCrepitation = data[idx].ToeExtensionCrepitation;
			        jdata_FootAnkle_5.ToeExtensionMMT = data[idx].ToeExtensionMMT;

					jdata_FootAnkle_5.SynchStatus = "111";					

					$ipadrbg.context.jdata_FootAnkle_5.add(jdata_FootAnkle_5);
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


	$scope.pull_footankle6= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_footankle6.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_FootAnkle_6 = new $ipadrbg.types.jdata_FootAnkle_6();
			    	
					jdata_FootAnkle_6.ClinixRID = data[idx].ClinixRID;
					jdata_FootAnkle_6.PxRID = data[idx].PxRID;

					jdata_FootAnkle_6.DorsalisPedisArtery = data[idx].DorsalisPedisArtery;
			        jdata_FootAnkle_6.DorsalisPedisArteryDescrip = data[idx].DorsalisPedisArteryDescrip;
			        jdata_FootAnkle_6.PosteriorPedisArtery = data[idx].PosteriorPedisArtery;
			        jdata_FootAnkle_6.PosteriorPedisArteryDescrip = data[idx].PosteriorPedisArteryDescrip;
			        jdata_FootAnkle_6.Color = data[idx].Color;
			        jdata_FootAnkle_6.SpecialTest = data[idx].SpecialTest;
			        jdata_FootAnkle_6.Tinel = data[idx].Tinel;
			        jdata_FootAnkle_6.TinelDescrip = data[idx].TinelDescrip;
			        jdata_FootAnkle_6.AnteriorDrawer = data[idx].AnteriorDrawer;
			        jdata_FootAnkle_6.AnteriorDrawerDescript = data[idx].AnteriorDrawerDescript;
			        jdata_FootAnkle_6.InversionStress = data[idx].InversionStress;
			        jdata_FootAnkle_6.InversionStressDescrip = data[idx].InversionStressDescrip;
			        jdata_FootAnkle_6.ERS = data[idx].ERS;
			        jdata_FootAnkle_6.ERSDescript = data[idx].ERSDescript;
			        jdata_FootAnkle_6.Thompson = data[idx].Thompson;
			        jdata_FootAnkle_6.ThompsonDescrip = data[idx].ThompsonDescrip;
			        jdata_FootAnkle_6.Homan = data[idx].Homan;
			        jdata_FootAnkle_6.HomanDescrip = data[idx].HomanDescrip;
			        jdata_FootAnkle_6.Squeeze = data[idx].Squeeze;
			        jdata_FootAnkle_6.SqueezeDescrip = data[idx].SqueezeDescrip;
			        jdata_FootAnkle_6.ToeLegStance = data[idx].ToeLegStance;
			        jdata_FootAnkle_6.ToeLegStanceDescrip = data[idx].ToeLegStanceDescrip;
			        jdata_FootAnkle_6.STLStance = data[idx].STLStance;
			        jdata_FootAnkle_6.STLStanceDescrip = data[idx].STLStanceDescrip;
			        jdata_FootAnkle_6.SpecialTestOthersDescrip = data[idx].SpecialTestOthersDescrip;

					jdata_FootAnkle_6.SynchStatus = "111";					

					$ipadrbg.context.jdata_FootAnkle_6.add(jdata_FootAnkle_6);
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


	$scope.pull_footankle7= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_footankle7.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_FootAnkle_7 = new $ipadrbg.types.jdata_FootAnkle_7();
			    	
					jdata_FootAnkle_7.ClinixRID = data[idx].ClinixRID;
					jdata_FootAnkle_7.PxRID = data[idx].PxRID;

					jdata_FootAnkle_7.GrossPicture = data[idx].GrossPicture;
			        jdata_FootAnkle_7.CompartmentNarrowing = data[idx].CompartmentNarrowing;
			        jdata_FootAnkle_7.Medial = data[idx].Medial;
			        jdata_FootAnkle_7.MedialDescrip = data[idx].MedialDescrip;
			        jdata_FootAnkle_7.Lateral = data[idx].Lateral;
			        jdata_FootAnkle_7.LateralDescrip = data[idx].LateralDescrip;
			        jdata_FootAnkle_7.Talartilt = data[idx].Talartilt;
			        jdata_FootAnkle_7.TalartiltDescrip = data[idx].TalartiltDescrip;
			        jdata_FootAnkle_7.TalocruralAngleDescrip = data[idx].TalocruralAngleDescrip;
			        jdata_FootAnkle_7.Osteophytes = data[idx].Osteophytes;
			        jdata_FootAnkle_7.OsteophytesDescrip = data[idx].OsteophytesDescrip;
			        jdata_FootAnkle_7.LateralTalarTilt = data[idx].LateralTalarTilt;
			        jdata_FootAnkle_7.LateralTalarTiltAngle = data[idx].LateralTalarTiltAngle;
			        jdata_FootAnkle_7.AnteriorTibialSpur = data[idx].AnteriorTibialSpur;
			        jdata_FootAnkle_7.AnteriorTibialSpurGrade = data[idx].AnteriorTibialSpurGrade;
			        jdata_FootAnkle_7.SyndesmoticWidening = data[idx].SyndesmoticWidening;
			        jdata_FootAnkle_7.SyndesmoticWideningDescrip = data[idx].SyndesmoticWideningDescrip;
			        jdata_FootAnkle_7.TibiotalarArthritis = data[idx].TibiotalarArthritis;
			        jdata_FootAnkle_7.SubtalarArthritis = data[idx].SubtalarArthritis;
			        jdata_FootAnkle_7.TalonavicularArthritis = data[idx].TalonavicularArthritis;
			        jdata_FootAnkle_7.CalcaneocuboidArthritis = data[idx].CalcaneocuboidArthritis;
			        jdata_FootAnkle_7.MidfootArthritis = data[idx].MidfootArthritis;
			        jdata_FootAnkle_7.ForefootArthritis = data[idx].ForefootArthritis;
			        jdata_FootAnkle_7.OsTrigonum = data[idx].OsTrigonum;
			        jdata_FootAnkle_7.OtherOS = data[idx].OtherOS;
			        jdata_FootAnkle_7.OsTrigonumType = data[idx].OsTrigonumType;
			        jdata_FootAnkle_7.Hanglund = data[idx].Hanglund;
			        jdata_FootAnkle_7.CalcanealOssicle = data[idx].CalcanealOssicle;
			        jdata_FootAnkle_7.PosteriorCalcanealSpur = data[idx].PosteriorCalcanealSpur;
			        jdata_FootAnkle_7.OsteochondralDefects = data[idx].OsteochondralDefects;
			        jdata_FootAnkle_7.OsteochondralDefectsDescrip = data[idx].OsteochondralDefectsDescrip;
			        jdata_FootAnkle_7.OthersXray = data[idx].OthersXray;

					jdata_FootAnkle_7.SynchStatus = "111";					

					$ipadrbg.context.jdata_FootAnkle_7.add(jdata_FootAnkle_7);
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


	$scope.pull_footankle8= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_footankle8.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_FootAnkle_8 = new $ipadrbg.types.jdata_FootAnkle_8();
			    	
					jdata_FootAnkle_8.ClinixRID = data[idx].ClinixRID;
					jdata_FootAnkle_8.PxRID = data[idx].PxRID;

					jdata_FootAnkle_8.Effusion= data[idx].Effusion;
			        jdata_FootAnkle_8.SynovialInflammation= data[idx].SynovialInflammation;
			        jdata_FootAnkle_8.MedialLigamentComplexSprain= data[idx].MedialLigamentComplexSprain;
			        jdata_FootAnkle_8.MedialLigamentComplexSprainGrade= data[idx].MedialLigamentComplexSprainGrade;
			        jdata_FootAnkle_8.SpecificLigamentsDescrip= data[idx].SpecificLigamentsDescrip;
			        jdata_FootAnkle_8.LateralLigamentComplexSprain= data[idx].LateralLigamentComplexSprain;
			        jdata_FootAnkle_8.LateralLigamentComplexSprainGrade= data[idx].LateralLigamentComplexSprainGrade;
			        jdata_FootAnkle_8.SyndesmoticSprain= data[idx].SyndesmoticSprain;
			        jdata_FootAnkle_8.SyndesmoticSprainGrade= data[idx].SyndesmoticSprainGrade;
			        jdata_FootAnkle_8.PeronialTendonPathology= data[idx].PeronialTendonPathology;
			        jdata_FootAnkle_8.PeronialTendonPathologyInflamed= data[idx].PeronialTendonPathologyInflamed;
			        jdata_FootAnkle_8.PeronialTendonPathologyPartial= data[idx].PeronialTendonPathologyPartial;
			        jdata_FootAnkle_8.PeronialTendonPathologyComplete= data[idx].PeronialTendonPathologyComplete;
			        jdata_FootAnkle_8.Posteriortibialtendonpathology= data[idx].Posteriortibialtendonpathology;
			        jdata_FootAnkle_8.PosteriortibialtendonpathologyInflamed= data[idx].PosteriortibialtendonpathologyInflamed;
			        jdata_FootAnkle_8.PosteriortibialtendonpathologyPartial= data[idx].PosteriortibialtendonpathologyPartial;
			        jdata_FootAnkle_8.PosteriortibialtendonpathologyComplete= data[idx].PosteriortibialtendonpathologyComplete;
			        jdata_FootAnkle_8.AnteriorTibialTendonPathology= data[idx].AnteriorTibialTendonPathology;
			        jdata_FootAnkle_8.AnteriorTibialTendonPathologyInflamed= data[idx].AnteriorTibialTendonPathologyInflamed;
			        jdata_FootAnkle_8.AnteriorTibialTendonPathologyPartial= data[idx].AnteriorTibialTendonPathologyPartial;
			        jdata_FootAnkle_8.AnteriorTibialTendonPathologyComplete= data[idx].AnteriorTibialTendonPathologyComplete;
			        jdata_FootAnkle_8.AnteriorBonySpur= data[idx].AnteriorBonySpur;
			        jdata_FootAnkle_8.PosteriorSoftTissueImpingement= data[idx].PosteriorSoftTissueImpingement;
			        jdata_FootAnkle_8.HalundPathology= data[idx].HalundPathology;
			        jdata_FootAnkle_8.RetrocalcanealBursalInflammation= data[idx].RetrocalcanealBursalInflammation;
			        jdata_FootAnkle_8.RetrotendocalcanealBursalInflammation= data[idx].RetrotendocalcanealBursalInflammation;
			        jdata_FootAnkle_8.OsteochodralLesion= data[idx].OsteochodralLesion;
			        jdata_FootAnkle_8.OsteochodralLesionDecrip= data[idx].OsteochodralLesionDecrip;
			        jdata_FootAnkle_8.OtherMRI= data[idx].OtherMRI;

					jdata_FootAnkle_8.SynchStatus = "111";					

					$ipadrbg.context.jdata_FootAnkle_8.add(jdata_FootAnkle_8);
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


	$scope.pull_footankle9= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_footankle9.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_FootAnkle_9 = new $ipadrbg.types.jdata_FootAnkle_9();
			    	
					jdata_FootAnkle_9.ClinixRID = data[idx].ClinixRID;
					jdata_FootAnkle_9.PxRID = data[idx].PxRID;

					jdata_FootAnkle_9.Assessment = data[idx].Assessment;
			        jdata_FootAnkle_9.Management = data[idx].Management;
			        jdata_FootAnkle_9.Disposition = data[idx].Disposition;

					jdata_FootAnkle_9.SynchStatus = "111";					

					$ipadrbg.context.jdata_FootAnkle_9.add(jdata_FootAnkle_9);
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


	$scope.pullSportsknee = function() {
    	if (confirm(serverIP + ': Pull all knee Data, proceed? ')) {

    		var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_Knee_1'");
            	tx.executeSql("delete from 'jdata_Knee_1'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_Knee_2'");
            	tx.executeSql("delete from 'jdata_Knee_2'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_Knee_3'");
            	tx.executeSql("delete from 'jdata_Knee_3'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_Knee_4'");
            	tx.executeSql("delete from 'jdata_Knee_4'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_Knee_5'");
            	tx.executeSql("delete from 'jdata_Knee_5'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_Knee_6'");
            	tx.executeSql("delete from 'jdata_Knee_6'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_Knee_7'");
            	tx.executeSql("delete from 'jdata_Knee_7'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_Knee_8'");
            	tx.executeSql("delete from 'jdata_Knee_8'");

	        });

	        $scope.pull_knee1(function(){
	        	$scope.pull_knee2(function(){
	        		$scope.pull_knee3(function(){
	        			$scope.pull_knee4(function(){
	        				$scope.pull_knee5(function(){
	        					$scope.pull_knee6(function(){
	        						$scope.pull_knee7(function(){
	        							$scope.pull_knee8(function(){
	        		
	        							$ipadrbg.context.saveChanges();
											
    									});
    								});
    							});
    						});
    					});
    				});
    			});
    		});

			alert("Importing ORDERS, Discharge Summary and REPORTS from Server was Successful!");
    	}
    }


    $scope.pull_knee1= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportknee1.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_Knee_1 = new $ipadrbg.types.jdata_Knee_1();
			    	
					jdata_Knee_1.ClinixRID = data[idx].ClinixRID;
					jdata_Knee_1.PxRID = data[idx].PxRID;

					jdata_Knee_1.Ambulation = data[idx].Ambulation;
			        jdata_Knee_1.Sensorium = data[idx].Sensorium;
			        jdata_Knee_1.Conjunctivae = data[idx].Conjunctivae;
			        jdata_Knee_1.ChestExpansion = data[idx].ChestExpansion;
			        jdata_Knee_1.Cardiac = data[idx].Cardiac;
			        jdata_Knee_1.Abdomen = data[idx].Abdomen;

					jdata_Knee_1.SynchStatus = "111";					

					$ipadrbg.context.jdata_Knee_1.add(jdata_Knee_1);
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


	$scope.pull_knee2= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportknee2.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_Knee_2 = new $ipadrbg.types.jdata_Knee_2();
			    	
					jdata_Knee_2.ClinixRID = data[idx].ClinixRID;
					jdata_Knee_2.PxRID = data[idx].PxRID;

					jdata_Knee_2.Inspection = data[idx].Inspection;
			        jdata_Knee_2.RangeofMotion = data[idx].RangeofMotion;
			        jdata_Knee_2.RangeofMotionDescrip = data[idx].RangeofMotionDescrip;
			        jdata_Knee_2.MMT = data[idx].MMT;
			        jdata_Knee_2.MMTDescrip = data[idx].MMTDescrip;
			        jdata_Knee_2.Sensory = data[idx].Sensory;
			        jdata_Knee_2.SensoryDescrip = data[idx].SensoryDescrip;
			        jdata_Knee_2.Vascular = data[idx].Vascular;
			        jdata_Knee_2.VascularWeakDescrip = data[idx].VascularWeakDescrip;
			        jdata_Knee_2.VascularAbsentDescrip = data[idx].VascularAbsentDescrip;
			        jdata_Knee_2.VascularGoodPoor = data[idx].VascularGoodPoor;

					jdata_Knee_2.SynchStatus = "111";					

					$ipadrbg.context.jdata_Knee_2.add(jdata_Knee_2);
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


	$scope.pull_knee3= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportknee3.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_Knee_3 = new $ipadrbg.types.jdata_Knee_3();
			    	
					jdata_Knee_3.ClinixRID = data[idx].ClinixRID;
					jdata_Knee_3.PxRID = data[idx].PxRID;

					jdata_Knee_3.SensoryLeftRight = data[idx].SensoryLeftRight;
			        jdata_Knee_3.Deformity = data[idx].Deformity;
			        jdata_Knee_3.DeformitySel = data[idx].DeformitySel;
			        jdata_Knee_3.DeformityDefinition = data[idx].DeformityDefinition;
			        jdata_Knee_3.Erythema = data[idx].Erythema;
			        jdata_Knee_3.ErythemaSel = data[idx].ErythemaSel;
			        jdata_Knee_3.ErythemaDescrip = data[idx].ErythemaDescrip;
			        jdata_Knee_3.OpenWound = data[idx].OpenWound;
			        jdata_Knee_3.OpenWoundSel = data[idx].OpenWoundSel;
			        jdata_Knee_3.OpenWoundDescrip = data[idx].OpenWoundDescrip;
			        jdata_Knee_3.Swelling = data[idx].Swelling;
			        jdata_Knee_3.SwellingSel = data[idx].SwellingSel;
			        jdata_Knee_3.SwellingDescrip = data[idx].SwellingDescrip;
			        jdata_Knee_3.Hematoma = data[idx].Hematoma;
			        jdata_Knee_3.HematomaSel = data[idx].HematomaSel;
			        jdata_Knee_3.HematomaDescrip = data[idx].HematomaDescrip;
			        jdata_Knee_3.MuscleAtropy = data[idx].MuscleAtropy;
			        jdata_Knee_3.MuscleAtropySel = data[idx].MuscleAtropySel;
			        jdata_Knee_3.MuscleAtropyDescrip = data[idx].MuscleAtropyDescrip;
			        jdata_Knee_3.Mass = data[idx].Mass;
			        jdata_Knee_3.MassSel = data[idx].MassSel;
			        jdata_Knee_3.Masstender = data[idx].Masstender;
			        jdata_Knee_3.Massnontender = data[idx].Massnontender;
			        jdata_Knee_3.Massmoveable = data[idx].Massmoveable;
			        jdata_Knee_3.Massfixed = data[idx].Massfixed;
			        jdata_Knee_3.Massregular = data[idx].Massregular;
			        jdata_Knee_3.Massirregular = data[idx].Massirregular;
			        jdata_Knee_3.Masslymphadenopathy = data[idx].Masslymphadenopathy;
			        jdata_Knee_3.MassSize = data[idx].MassSize;
			        jdata_Knee_3.MassLocation = data[idx].MassLocation;
			        jdata_Knee_3.MassConsistency = data[idx].MassConsistency;
			        jdata_Knee_3.Deformities = data[idx].Deformities;
			        jdata_Knee_3.Palpitation = data[idx].Palpitation;
			        jdata_Knee_3.SensoryNormal = data[idx].SensoryNormal;
			        jdata_Knee_3.L3 = data[idx].L3;
			        jdata_Knee_3.L4 = data[idx].L4;
			        jdata_Knee_3.L5 = data[idx].L5;
			        jdata_Knee_3.S1 = data[idx].S1;
			        jdata_Knee_3.Superficialperoncaln = data[idx].Superficialperoncaln;
			        jdata_Knee_3.SuperficialperoncalnDescrip = data[idx].SuperficialperoncalnDescrip;
			        jdata_Knee_3.Deepperonealn = data[idx].Deepperonealn;
			        jdata_Knee_3.DeepperonealnDescrip = data[idx].DeepperonealnDescrip;
			        jdata_Knee_3.Tibialnerve = data[idx].Tibialnerve;
			        jdata_Knee_3.TibialnerveDescrip = data[idx].TibialnerveDescrip;

					jdata_Knee_3.SynchStatus = "111";					

					$ipadrbg.context.jdata_Knee_3.add(jdata_Knee_3);
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


	$scope.pull_knee4= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportknee4.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_Knee_4 = new $ipadrbg.types.jdata_Knee_4();
			    	
					jdata_Knee_4.ClinixRID = data[idx].ClinixRID;
					jdata_Knee_4.PxRID = data[idx].PxRID;

					jdata_Knee_4.KneeandLeg = data[idx].KneeandLeg;
			        jdata_Knee_4.FlexionActive = data[idx].FlexionActive;
			        jdata_Knee_4.FlexionPassive = data[idx].FlexionPassive;
			        jdata_Knee_4.FlexionWithPain = data[idx].FlexionWithPain;
			        jdata_Knee_4.FlexionCrepitation = data[idx].FlexionCrepitation;
			        jdata_Knee_4.FlexionMMT = data[idx].FlexionMMT;
			        jdata_Knee_4.ExtensionPassive = data[idx].ExtensionPassive;
			        jdata_Knee_4.ExtensionActive = data[idx].ExtensionActive;
			        jdata_Knee_4.ExtensionWithPain = data[idx].ExtensionWithPain;
			        jdata_Knee_4.ExtensionCrepitation = data[idx].ExtensionCrepitation;
			        jdata_Knee_4.ExtensionMMT = data[idx].ExtensionMMT;
			        jdata_Knee_4.GaitNormalAbnormal = data[idx].GaitNormalAbnormal;
			        jdata_Knee_4.GaitType = data[idx].GaitType;

					jdata_Knee_4.SynchStatus = "111";					

					$ipadrbg.context.jdata_Knee_4.add(jdata_Knee_4);
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


	$scope.pull_knee5= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportknee5.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_Knee_5 = new $ipadrbg.types.jdata_Knee_5();
			    	
					jdata_Knee_5.ClinixRID = data[idx].ClinixRID;
					jdata_Knee_5.PxRID = data[idx].PxRID;

					jdata_Knee_5.PopliteralArtery = data[idx].PopliteralArtery;
			        jdata_Knee_5.PopliteralArteryDescrip = data[idx].PopliteralArteryDescrip;
			        jdata_Knee_5.Color = data[idx].Color;

					jdata_Knee_5.SynchStatus = "111";					

					$ipadrbg.context.jdata_Knee_5.add(jdata_Knee_5);
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


	$scope.pull_knee6= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportknee6.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_Knee_6 = new $ipadrbg.types.jdata_Knee_6();
			    	
					jdata_Knee_6.ClinixRID = data[idx].ClinixRID;
					jdata_Knee_6.PxRID = data[idx].PxRID;

					jdata_Knee_6.SpecialTestNormal = data[idx].SpecialTestNormal;
			        jdata_Knee_6.Lachmans = data[idx].Lachmans;
			        jdata_Knee_6.LachmansGrade = data[idx].LachmansGrade;
			        jdata_Knee_6.PivotShift = data[idx].PivotShift;
			        jdata_Knee_6.PivotShiftGrade = data[idx].PivotShiftGrade;
			        jdata_Knee_6.Anteriordrawers = data[idx].Anteriordrawers;
			        jdata_Knee_6.AnteriordrawersGrade = data[idx].AnteriordrawersGrade;
			        jdata_Knee_6.BrachialArtery = data[idx].BrachialArtery;
			        jdata_Knee_6.McMurray = data[idx].McMurray;
			        jdata_Knee_6.McMurrayPain = data[idx].McMurrayPain;
			        jdata_Knee_6.McMurrayClick = data[idx].McMurrayClick;
			        jdata_Knee_6.Apley = data[idx].Apley;
			        jdata_Knee_6.ApleyPain = data[idx].ApleyPain;
			        jdata_Knee_6.ApleyClick = data[idx].ApleyClick;
			        jdata_Knee_6.ReverseMcMurray = data[idx].ReverseMcMurray;
			        jdata_Knee_6.ReverseMcMurrayPain = data[idx].ReverseMcMurrayPain;
			        jdata_Knee_6.Apprehension = data[idx].Apprehension;
			        jdata_Knee_6.ApprehensionGrade = data[idx].ApprehensionGrade;
			        jdata_Knee_6.Patellartilt = data[idx].Patellartilt;
			        jdata_Knee_6.Patellargrind = data[idx].Patellargrind;
			        jdata_Knee_6.Patellarcomprehension = data[idx].Patellarcomprehension;
			        jdata_Knee_6.Ballotement = data[idx].Ballotement;
			        jdata_Knee_6.Varusinstability = data[idx].Varusinstability;
			        jdata_Knee_6.VarusinstabilityPain = data[idx].VarusinstabilityPain;
			        jdata_Knee_6.Valgusinstability = data[idx].Valgusinstability;
			        jdata_Knee_6.ValgusinstabilityPain = data[idx].ValgusinstabilityPain;
			        jdata_Knee_6.Dialtest = data[idx].Dialtest;
			        jdata_Knee_6.Externalrotationstresstest = data[idx].Externalrotationstresstest;
			        jdata_Knee_6.Thessaly = data[idx].Thessaly;
			        jdata_Knee_6.Ege = data[idx].Ege;
			        jdata_Knee_6.SpecialtestOthers = data[idx].SpecialtestOthers;

					jdata_Knee_6.SynchStatus = "111";					

					$ipadrbg.context.jdata_Knee_6.add(jdata_Knee_6);
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


	$scope.pull_knee7= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportknee7.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_Knee_7 = new $ipadrbg.types.jdata_Knee_7();
			    	
					jdata_Knee_7.ClinixRID = data[idx].ClinixRID;
					jdata_Knee_7.PxRID = data[idx].PxRID;

					jdata_Knee_7.GrossPictures = data[idx].GrossPictures;
			        jdata_Knee_7.CompartmentNarrowing = data[idx].CompartmentNarrowing;
			        jdata_Knee_7.MedialLocation = data[idx].MedialLocation;
			        jdata_Knee_7.MedialLocationDescrip = data[idx].MedialLocationDescrip;
			        jdata_Knee_7.LateralLocation = data[idx].LateralLocation;
			        jdata_Knee_7.LateralLocationDescrip = data[idx].LateralLocationDescrip;
			        jdata_Knee_7.Patellartilt = data[idx].Patellartilt;
			        jdata_Knee_7.Congruenceangle = data[idx].Congruenceangle;
			        jdata_Knee_7.Osteophytes = data[idx].Osteophytes;
			        jdata_Knee_7.OsteophytesLocation = data[idx].OsteophytesLocation;
			        jdata_Knee_7.Pastellaalta = data[idx].Pastellaalta;
			        jdata_Knee_7.PastellaaltaInsallRatio = data[idx].PastellaaltaInsallRatio;
			        jdata_Knee_7.Patellabaja = data[idx].Patellabaja;
			        jdata_Knee_7.PatellabajaInsallRatio = data[idx].PatellabajaInsallRatio;
			        jdata_Knee_7.Shallowtrochleargroove = data[idx].Shallowtrochleargroove;
			        jdata_Knee_7.Osteochondraldefects = data[idx].Osteochondraldefects;
			        jdata_Knee_7.OsteochondraldefectsLocation = data[idx].OsteochondraldefectsLocation;
			        jdata_Knee_7.OsteochondraldefectsOthers = data[idx].OsteochondraldefectsOthers;
			        jdata_Knee_7.MRIEffusion = data[idx].MRIEffusion;
			        jdata_Knee_7.MRISynovialInflamation = data[idx].MRISynovialInflamation;
			        jdata_Knee_7.MedialMeniscalTear = data[idx].MedialMeniscalTear;
			        jdata_Knee_7.MedialMeniscalLocation = data[idx].MedialMeniscalLocation;
			        jdata_Knee_7.MedialMeniscalGrade = data[idx].MedialMeniscalGrade;
			        jdata_Knee_7.LateralMeniscalTear = data[idx].LateralMeniscalTear;
			        jdata_Knee_7.LateralMeniscalTearLocation = data[idx].LateralMeniscalTearLocation;
			        jdata_Knee_7.LateralMeniscalTearGrade = data[idx].LateralMeniscalTearGrade;
			        jdata_Knee_7.Anteriorcruciateligamenttear = data[idx].Anteriorcruciateligamenttear;
			        jdata_Knee_7.AnteriorcruciateligamenttearPartial = data[idx].AnteriorcruciateligamenttearPartial;
			        jdata_Knee_7.AnteriorcruciateligamenttearComplete = data[idx].AnteriorcruciateligamenttearComplete;
			        jdata_Knee_7.Posteriorcruciateligamenttear = data[idx].Posteriorcruciateligamenttear;
			        jdata_Knee_7.PosteriorcruciateligamenttearPartial = data[idx].PosteriorcruciateligamenttearPartial;
			        jdata_Knee_7.PosteriorcruciateligamenttearComplete = data[idx].PosteriorcruciateligamenttearComplete;
			        jdata_Knee_7.Medialcollateralligamentpathology = data[idx].Medialcollateralligamentpathology;
			        jdata_Knee_7.MedialcollateralligamentpathologyI = data[idx].MedialcollateralligamentpathologyI;
			        jdata_Knee_7.MedialcollateralligamentpathologyII = data[idx].MedialcollateralligamentpathologyII;
			        jdata_Knee_7.MedialcollateralligamentpathologyIII = data[idx].MedialcollateralligamentpathologyIII;
			        jdata_Knee_7.Medialcollateralligamenttear = data[idx].Medialcollateralligamenttear;
			        jdata_Knee_7.MedialcollateralligamenttearI = data[idx].MedialcollateralligamenttearI;
			        jdata_Knee_7.MedialcollateralligamenttearII = data[idx].MedialcollateralligamenttearII;
			        jdata_Knee_7.MedialcollateralligamenttearIII = data[idx].MedialcollateralligamenttearIII;
			        jdata_Knee_7.Posterolateralcornerinflammation = data[idx].Posterolateralcornerinflammation;
			        jdata_Knee_7.Osteochondrallession = data[idx].Osteochondrallession;
			        jdata_Knee_7.OsteochondrallessionLocation = data[idx].OsteochondrallessionLocation;
			        jdata_Knee_7.OsteochondrallessionOthersDescrip = data[idx].OsteochondrallessionOthersDescrip;

					jdata_Knee_7.SynchStatus = "111";					

					$ipadrbg.context.jdata_Knee_7.add(jdata_Knee_7);
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


	$scope.pull_knee8= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportknee8.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_Knee_8 = new $ipadrbg.types.jdata_Knee_8();
			    	
					jdata_Knee_8.ClinixRID = data[idx].ClinixRID;
					jdata_Knee_8.PxRID = data[idx].PxRID;

					jdata_Knee_8.Assessment = data[idx].Assessment;
			        jdata_Knee_8.Management = data[idx].Management;
			        jdata_Knee_8.Disposition = data[idx].Disposition;

					jdata_Knee_8.SynchStatus = "111";					

					$ipadrbg.context.jdata_Knee_8.add(jdata_Knee_8);
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


	$scope.pullsportshoulder = function() {
    	if (confirm(serverIP + ': Pull all Shoulder Data, proceed? ')) {

    		var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_shoulder_1'");
            	tx.executeSql("delete from 'jdata_shoulder_1'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_shoulder_2'");
            	tx.executeSql("delete from 'jdata_shoulder_2'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_shoulder_3'");
            	tx.executeSql("delete from 'jdata_shoulder_3'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_shoulder_4'");
            	tx.executeSql("delete from 'jdata_shoulder_4'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_shoulder_5'");
            	tx.executeSql("delete from 'jdata_shoulder_5'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_shoulder_6'");
            	tx.executeSql("delete from 'jdata_shoulder_6'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_shoulder_7'");
            	tx.executeSql("delete from 'jdata_shoulder_7'");

            	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_shoulder_8'");
            	tx.executeSql("delete from 'jdata_shoulder_8'");

	        }); 

	        $scope.pull_sportshoulder1(function(){
	        	$scope.pull_sportshoulder2(function(){
	        		$scope.pull_sportshoulder3(function(){
	        			$scope.pull_sportshoulder4(function(){
	        				$scope.pull_sportshoulder5(function(){
	        					$scope.pull_sportshoulder6(function(){
		        					$scope.pull_sportshoulder7(function(){
		        						$scope.pull_sportshoulder8(function(){
	        					
											$ipadrbg.context.saveChanges();

    									});
    								});
    							});
    						});
    					});
    				});
    			});
    		});
 			// not used, see diagnosis sur schedule
 			// $scope.pull_StrucSchedSurgery();

			alert("Importing ORDERS, Discharge Summary and REPORTS from Server was Successful!");
    	}
	}


	$scope.pull_sportshoulder1= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportshoulder1.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_shoulder_1 = new $ipadrbg.types.jdata_shoulder_1();
			    	
					jdata_shoulder_1.ClinixRID = data[idx].ClinixRID;
					jdata_shoulder_1.PxRID = data[idx].PxRID;

					jdata_shoulder_1.DOI = data[idx].DOI;
			        jdata_shoulder_1.TOI = data[idx].TOI;
			        jdata_shoulder_1.MOI = data[idx].MOI;
			        jdata_shoulder_1.POI = data[idx].POI;
			        jdata_shoulder_1.HistoryOfPresentIllnessDescrip = data[idx].HistoryOfPresentIllnessDescrip;
			        jdata_shoulder_1.Hypertension = data[idx].Hypertension;
			        jdata_shoulder_1.Cardiac = data[idx].Cardiac;
			        jdata_shoulder_1.Genital = data[idx].Genital;
			        jdata_shoulder_1.Diabetes = data[idx].Diabetes;
			        jdata_shoulder_1.Pulmo = data[idx].Pulmo;
			        jdata_shoulder_1.Hepatitis = data[idx].Hepatitis;
			        jdata_shoulder_1.Asthma = data[idx].Asthma;
			        jdata_shoulder_1.Kidney = data[idx].Kidney;
			        jdata_shoulder_1.Bleeding = data[idx].Bleeding;
			        jdata_shoulder_1.Thyroid = data[idx].Thyroid;
			        jdata_shoulder_1.GI = data[idx].GI;
			        jdata_shoulder_1.Others = data[idx].Others;
			        jdata_shoulder_1.Allergies = data[idx].Allergies;
			        jdata_shoulder_1.AllergiesDescrip = data[idx].AllergiesDescrip;
			        jdata_shoulder_1.PreviousOperation = data[idx].PreviousOperation;
			        jdata_shoulder_1.PreviousOperationDescrip = data[idx].PreviousOperationDescrip;
			        jdata_shoulder_1.Currentmedication = data[idx].Currentmedication;
			        jdata_shoulder_1.CurrentmedicationDescrip = data[idx].CurrentmedicationDescrip;
			        jdata_shoulder_1.ReviewOfSystemsFever = data[idx].ReviewOfSystemsFever;
			        jdata_shoulder_1.ReviewOfSystemsAbdominalPain = data[idx].ReviewOfSystemsAbdominalPain;
			        jdata_shoulder_1.ReviewOfSystemsVomiting = data[idx].ReviewOfSystemsVomiting;
			        jdata_shoulder_1.ReviewOfSystemsDysuria = data[idx].ReviewOfSystemsDysuria;
			        jdata_shoulder_1.ReviewOfSystemsCough = data[idx].ReviewOfSystemsCough;
			        jdata_shoulder_1.ReviewOfSystemsDOB = data[idx].ReviewOfSystemsDOB;
			        jdata_shoulder_1.ReviewOfSystemsDiarrhea = data[idx].ReviewOfSystemsDiarrhea;
			        jdata_shoulder_1.ReviewOfSystemslowback = data[idx].ReviewOfSystemslowback;

					jdata_shoulder_1.SynchStatus = "111";					

					$ipadrbg.context.jdata_shoulder_1.add(jdata_shoulder_1);
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


	$scope.pull_sportshoulder2= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportshoulder2.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_shoulder_2 = new $ipadrbg.types.jdata_shoulder_2();
			    	
					jdata_shoulder_2.ClinixRID = data[idx].ClinixRID;
					jdata_shoulder_2.PxRID = data[idx].PxRID;

					jdata_shoulder_2.Ambulation = data[idx].Ambulation;
			        jdata_shoulder_2.Sensorium = data[idx].Sensorium;
			        jdata_shoulder_2.Conjunctivae = data[idx].Conjunctivae;
			        jdata_shoulder_2.Cardiac = data[idx].Cardiac;
			        jdata_shoulder_2.ChestExpansion = data[idx].ChestExpansion;
			        jdata_shoulder_2.Abdomen = data[idx].Abdomen;

					jdata_shoulder_2.SynchStatus = "111";					

					$ipadrbg.context.jdata_shoulder_2.add(jdata_shoulder_2);
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


	$scope.pull_sportshoulder3= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportshoulder3.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_shoulder_3 = new $ipadrbg.types.jdata_shoulder_3();
			    	
					jdata_shoulder_3.ClinixRID = data[idx].ClinixRID;
					jdata_shoulder_3.PxRID = data[idx].PxRID;

					jdata_shoulder_3.Inspection = data[idx].Inspection;
			        jdata_shoulder_3.RangeofMotion = data[idx].RangeofMotion;
			        jdata_shoulder_3.RangeofMotionDescrip = data[idx].RangeofMotionDescrip;
			        jdata_shoulder_3.MMT = data[idx].MMT;
			        jdata_shoulder_3.MMTDescrip = data[idx].MMTDescrip;
			        jdata_shoulder_3.Sensory = data[idx].Sensory;
			        jdata_shoulder_3.SensoryDescrip = data[idx].SensoryDescrip;
			        jdata_shoulder_3.Vascular = data[idx].Vascular;
			        jdata_shoulder_3.VascularWeakPulseDescrip = data[idx].VascularWeakPulseDescrip;
			        jdata_shoulder_3.VascularAbsentPulseDescrip = data[idx].VascularAbsentPulseDescrip;
			        jdata_shoulder_3.VascularGoodPoor = data[idx].VascularGoodPoor;

					jdata_shoulder_3.SynchStatus = "111";					

					$ipadrbg.context.jdata_shoulder_3.add(jdata_shoulder_3);
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


	$scope.pull_sportshoulder4= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportshoulder4.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_shoulder_4 = new $ipadrbg.types.jdata_shoulder_4();
			    	
					jdata_shoulder_4.ClinixRID = data[idx].ClinixRID;
					jdata_shoulder_4.PxRID = data[idx].PxRID;

					jdata_shoulder_4.SensoryRightLeft = data[idx].SensoryRightLeft;
			        jdata_shoulder_4.Deformity = data[idx].Deformity;
			        jdata_shoulder_4.DeformityValue = data[idx].DeformityValue;
			        jdata_shoulder_4.DeformityDescrip = data[idx].DeformityDescrip;
			        jdata_shoulder_4.Erythema = data[idx].Erythema;
			        jdata_shoulder_4.ErythemaValue = data[idx].ErythemaValue;
			        jdata_shoulder_4.ErythemaValueDescrip = data[idx].ErythemaValueDescrip;
			        jdata_shoulder_4.OpenWound = data[idx].OpenWound;
			        jdata_shoulder_4.OpenWoundValue = data[idx].OpenWoundValue;
			        jdata_shoulder_4.OpenWoundDescrip = data[idx].OpenWoundDescrip;
			        jdata_shoulder_4.Swelling = data[idx].Swelling;
			        jdata_shoulder_4.SwellingValue = data[idx].SwellingValue;
			        jdata_shoulder_4.SwellingDescrip = data[idx].SwellingDescrip;
			        jdata_shoulder_4.Hematoma = data[idx].Hematoma;
			        jdata_shoulder_4.HematomaValue = data[idx].HematomaValue;
			        jdata_shoulder_4.HematomaDescrip = data[idx].HematomaDescrip;
			        jdata_shoulder_4.Muscleatropy = data[idx].Muscleatropy;
			        jdata_shoulder_4.MuscleatropyValue = data[idx].MuscleatropyValue;
			        jdata_shoulder_4.MuscleatropyDescrip = data[idx].MuscleatropyDescrip;
			        jdata_shoulder_4.Mass = data[idx].Mass;
			        jdata_shoulder_4.MassValue = data[idx].MassValue;
			        jdata_shoulder_4.Masstender = data[idx].Masstender;
			        jdata_shoulder_4.Massnontender = data[idx].Massnontender;
			        jdata_shoulder_4.Massmoveable = data[idx].Massmoveable;
			        jdata_shoulder_4.Massfixed = data[idx].Massfixed;
			        jdata_shoulder_4.Massregular = data[idx].Massregular;
			        jdata_shoulder_4.Massirregular = data[idx].Massirregular;
			        jdata_shoulder_4.Masslymphadenopathy = data[idx].Masslymphadenopathy;
			        jdata_shoulder_4.MassSize = data[idx].MassSize;
			        jdata_shoulder_4.MassLocation = data[idx].MassLocation;
			        jdata_shoulder_4.MassConsistency = data[idx].MassConsistency;
			        jdata_shoulder_4.Palpitation = data[idx].Palpitation;
			        jdata_shoulder_4.SensoryNormal = data[idx].SensoryNormal;
			        jdata_shoulder_4.C5 = data[idx].C5;
			        jdata_shoulder_4.C6 = data[idx].C6;
			        jdata_shoulder_4.C7 = data[idx].C7;
			        jdata_shoulder_4.C8 = data[idx].C8;
			        jdata_shoulder_4.T1 = data[idx].T1;
			        jdata_shoulder_4.Ulnarnervevalue = data[idx].Ulnarnervevalue;
			        jdata_shoulder_4.UlnarnervevalueDescrip = data[idx].UlnarnervevalueDescrip;
			        jdata_shoulder_4.MedialnerveValue = data[idx].MedialnerveValue;
			        jdata_shoulder_4.MedialnerveDescrip = data[idx].MedialnerveDescrip;
			        jdata_shoulder_4.RadialnerveValue = data[idx].RadialnerveValue;
			        jdata_shoulder_4.RadialnerveDescrip = data[idx].RadialnerveDescrip;
			        jdata_shoulder_4.MusculocutaneousnValue = data[idx].MusculocutaneousnValue;
			        jdata_shoulder_4.MusculocutaneousDescrip = data[idx].MusculocutaneousDescrip;
			        jdata_shoulder_4.AxillaryNerveValue = data[idx].AxillaryNerveValue;
			        jdata_shoulder_4.AxillaryNerveDescrip = data[idx].AxillaryNerveDescrip;
			        jdata_shoulder_4.SubscapularNerveValue = data[idx].SubscapularNerveValue;
			        jdata_shoulder_4.SubscapularDescrip = data[idx].SubscapularDescrip;
			        jdata_shoulder_4.SupraspinousNerveValue = data[idx].SupraspinousNerveValue;
			        jdata_shoulder_4.SupraspinousNerveDescrip = data[idx].SupraspinousNerveDescrip;

					jdata_shoulder_4.SynchStatus = "111";					

					$ipadrbg.context.jdata_shoulder_4.add(jdata_shoulder_4);
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

	$scope.pull_sportshoulder5= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportshoulder5.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_shoulder_5 = new $ipadrbg.types.jdata_shoulder_5();
			    	
					jdata_shoulder_5.ClinixRID = data[idx].ClinixRID;
					jdata_shoulder_5.PxRID = data[idx].PxRID;

					jdata_shoulder_5.ShoulderFullLimited = data[idx].ShoulderFullLimited;
			        jdata_shoulder_5.DorsiflexionPass = data[idx].DorsiflexionPass;
			        jdata_shoulder_5.DorsiflexionActiv = data[idx].DorsiflexionActiv;
			        jdata_shoulder_5.DorsiflexionWidthPain = data[idx].DorsiflexionWidthPain;
			        jdata_shoulder_5.DorsiflexionCrepitation = data[idx].DorsiflexionCrepitation;
			        jdata_shoulder_5.DorsiflexionMMT = data[idx].DorsiflexionMMT;
			        jdata_shoulder_5.FlexionPassive = data[idx].FlexionPassive;
			        jdata_shoulder_5.FlexionActive = data[idx].FlexionActive;
			        jdata_shoulder_5.FlexionWithPain = data[idx].FlexionWithPain;
			        jdata_shoulder_5.FlexionCrepitation = data[idx].FlexionCrepitation;
			        jdata_shoulder_5.FlexionMMT = data[idx].FlexionMMT;
			        jdata_shoulder_5.ExtensionPassive = data[idx].ExtensionPassive;
			        jdata_shoulder_5.ExtensionActive = data[idx].ExtensionActive;
			        jdata_shoulder_5.ExtensionWithPain = data[idx].ExtensionWithPain;
			        jdata_shoulder_5.ExtensionCrepitation = data[idx].ExtensionCrepitation;
			        jdata_shoulder_5.ExtensionMMT = data[idx].ExtensionMMT;
			        jdata_shoulder_5.AbductionPassive = data[idx].AbductionPassive;
			        jdata_shoulder_5.AbductionActive = data[idx].AbductionActive;
			        jdata_shoulder_5.AbductionWithPain = data[idx].AbductionWithPain;
			        jdata_shoulder_5.AbductionCrepitation = data[idx].AbductionCrepitation;
			        jdata_shoulder_5.AbductionMMT = data[idx].AbductionMMT;
			        jdata_shoulder_5.AdductionPassive = data[idx].AdductionPassive;
			        jdata_shoulder_5.AdductionActive = data[idx].AdductionActive;
			        jdata_shoulder_5.AdductionWithPain = data[idx].AdductionWithPain;
			        jdata_shoulder_5.AdductionCrepitation = data[idx].AdductionCrepitation;
			        jdata_shoulder_5.AdductionMMT = data[idx].AdductionMMT;
			        jdata_shoulder_5.IRPassive = data[idx].IRPassive;
			        jdata_shoulder_5.IRActive = data[idx].IRActive;
			        jdata_shoulder_5.IRWithPain = data[idx].IRWithPain;
			        jdata_shoulder_5.IRCrepitation = data[idx].IRCrepitation;
			        jdata_shoulder_5.IRMMT = data[idx].IRMMT;
			        jdata_shoulder_5.ERPassive = data[idx].ERPassive;
			        jdata_shoulder_5.ERActive = data[idx].ERActive;
			        jdata_shoulder_5.ERWithPain = data[idx].ERWithPain;
			        jdata_shoulder_5.ERCrepitation = data[idx].ERCrepitation;
			        jdata_shoulder_5.ERMMT = data[idx].ERMMT;

					jdata_shoulder_5.SynchStatus = "111";					

					$ipadrbg.context.jdata_shoulder_5.add(jdata_shoulder_5);
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

	$scope.pull_sportshoulder6= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportshoulder6.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_shoulder_6 = new $ipadrbg.types.jdata_shoulder_6();
			    	
					jdata_shoulder_6.ClinixRID = data[idx].ClinixRID;
					jdata_shoulder_6.PxRID = data[idx].PxRID;

					jdata_shoulder_6.BrachialArtery = data[idx].BrachialArtery;
       				jdata_shoulder_6.BrachialArteryDescrip = data[idx].BrachialArteryDescrip;
       				jdata_shoulder_6.Color = data[idx].Color;

					jdata_shoulder_6.SynchStatus = "111";					

					$ipadrbg.context.jdata_shoulder_6.add(jdata_shoulder_6);
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



	$scope.pull_sportshoulder7= function(callback){

		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportshoulder7.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_shoulder_7 = new $ipadrbg.types.jdata_shoulder_7();
			    	
					jdata_shoulder_7.ClinixRID = data[idx].ClinixRID;
					jdata_shoulder_7.PxRID = data[idx].PxRID;

					jdata_shoulder_7.SpecialTestNormal = data[idx].SpecialTestNormal;
			        jdata_shoulder_7.JobesValue = data[idx].JobesValue;
			        jdata_shoulder_7.JobesDescrip = data[idx].JobesDescrip;
			        jdata_shoulder_7.HawkinValue = data[idx].HawkinValue;
			        jdata_shoulder_7.HawkinDescrip = data[idx].HawkinDescrip;
			        jdata_shoulder_7.OBrienssValue = data[idx].OBrienssValue;
			        jdata_shoulder_7.OBrienssDescrip = data[idx].OBrienssDescrip;
			        jdata_shoulder_7.Sulcussign = data[idx].Sulcussign;
			        jdata_shoulder_7.SulcussignDescrip = data[idx].SulcussignDescrip;
			        jdata_shoulder_7.ApprehensionValue = data[idx].ApprehensionValue;
			        jdata_shoulder_7.ApprehensionDescrip = data[idx].ApprehensionDescrip;
			        jdata_shoulder_7.DropArmValue = data[idx].DropArmValue;
			        jdata_shoulder_7.DropArmDescrip = data[idx].DropArmDescrip;
			        jdata_shoulder_7.SpeedsValue = data[idx].SpeedsValue;
			        jdata_shoulder_7.SpeedsDescrip = data[idx].SpeedsDescrip;
			        jdata_shoulder_7.YergansonValue = data[idx].YergansonValue;
			        jdata_shoulder_7.YergansonDescrip = data[idx].YergansonDescrip;
			        jdata_shoulder_7.NeerValue = data[idx].NeerValue;
			        jdata_shoulder_7.NeerDescrip = data[idx].NeerDescrip;
			        jdata_shoulder_7.Otherspecialtest = data[idx].Otherspecialtest;

					jdata_shoulder_7.SynchStatus = "111";					

					$ipadrbg.context.jdata_shoulder_7.add(jdata_shoulder_7);
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

	$scope.pull_sportshoulder8= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_sportshoulder8.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_shoulder_8 = new $ipadrbg.types.jdata_shoulder_8();
			    	
					jdata_shoulder_8.ClinixRID = data[idx].ClinixRID;
					jdata_shoulder_8.PxRID = data[idx].PxRID;

					jdata_shoulder_8.GrossPictures = data[idx].GrossPictures;
			        jdata_shoulder_8.Acronialspur = data[idx].Acronialspur;
			        jdata_shoulder_8.BiglianiType = data[idx].BiglianiType;
			        jdata_shoulder_8.ACjointarthritis = data[idx].ACjointarthritis;
			        jdata_shoulder_8.Calcifications = data[idx].Calcifications;
			        jdata_shoulder_8.CalcificationsDescrip = data[idx].CalcificationsDescrip;
			        jdata_shoulder_8.Osacromiale = data[idx].Osacromiale;
			        jdata_shoulder_8.Glenohumeralarthritis = data[idx].Glenohumeralarthritis;
			        jdata_shoulder_8.Inflammedbursa = data[idx].Inflammedbursa;
			        jdata_shoulder_8.MRIACjointarthritis = data[idx].MRIACjointarthritis;
			        jdata_shoulder_8.MRICalcification = data[idx].MRICalcification;
			        jdata_shoulder_8.MRICalcificationDescrip = data[idx].MRICalcificationDescrip;
			        jdata_shoulder_8.MRIOsacromiale = data[idx].MRIOsacromiale;
			        jdata_shoulder_8.Bicepstendonpathology = data[idx].Bicepstendonpathology;
			        jdata_shoulder_8.BicepstendonpathologyInflammed = data[idx].BicepstendonpathologyInflammed;
			        jdata_shoulder_8.BicepstendonpathologyFlattered = data[idx].BicepstendonpathologyFlattered;
			        jdata_shoulder_8.BicepstendonpathologyTear = data[idx].BicepstendonpathologyTear;
			        jdata_shoulder_8.Rotatorcufftendonpathology = data[idx].Rotatorcufftendonpathology;
			        jdata_shoulder_8.RotatorcufftendonpathologyInflammed = data[idx].RotatorcufftendonpathologyInflammed;
			        jdata_shoulder_8.RotatorcufftendonpathologyFlattered = data[idx].RotatorcufftendonpathologyFlattered;
			        jdata_shoulder_8.RotatorcufftendonpathologyTear = data[idx].RotatorcufftendonpathologyTear;
        			jdata_shoulder_8.MRIOthers = data[idx].MRIOthers;

					jdata_shoulder_8.SynchStatus = "111";					

					$ipadrbg.context.jdata_shoulder_8.add(jdata_shoulder_8);
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


	$scope.pull_ICD10 = function() {
    	if (confirm(serverIP + ': Pull all ICD10, proceed? ')) {

    		var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_ICD10'");
            	tx.executeSql("delete from 'jdata_ICD10'");
	        }); 



	        $scope.pull_ICD101(function(){
				$ipadrbg.context.saveChanges();

			  	$scope.LkUpICDCodes= [];


    		});
 			// not used, see diagnosis sur schedule
 			// $scope.pull_StrucSchedSurgery();
			alert("Importing ICD 10 Codes from Server was Successful!");
    	}
	}


	$scope.pull_ICD101= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_ICD10.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_ICD10 = new $ipadrbg.types.jdata_ICD10();
			    	
					jdata_ICD10.lkup_ICDRID = data[idx].lkup_ICDRID;
					jdata_ICD10.icd_code = data[idx].icd_code;
					jdata_ICD10.icd_description = data[idx].icd_description;
						
					$ipadrbg.context.jdata_ICD10.add(jdata_ICD10);
				}
			}

			$scope.LkUpICDCodes= [];

			callback();
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}

	$scope.pull_rvs = function() {
    	if (confirm(serverIP + ': Pull all RVS, proceed? ')) {

    		var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
	        db.transaction(function (tx) {
	           	tx.executeSql("update sqlite_sequence set seq = 0 where name ='jdata_RVS'");
            	tx.executeSql("delete from 'jdata_RVS'");
	        }); 



	        $scope.pull_RVS1(function(){
				$ipadrbg.context.saveChanges();

			  	$scope.LkUpRVSCodes= [];


    		});
 			// not used, see diagnosis sur schedule
 			// $scope.pull_StrucSchedSurgery();
			alert("Importing RVS Codes from Server was Successful!");
    	}
	}


	$scope.pull_RVS1= function(callback){
		$http({method: 'GET', url: 'http://' + serverIP + '/RBGsrvr_todayset/pull_RVS.php'}).success ( function ( data, status, headers, config ) {
			if (data !== null ) {
		      	// save to websql
			    for(idx in data){
			    	var jdata_RVS = new $ipadrbg.types.jdata_RVS();
			    	
					jdata_RVS.lkup_RVSRID = data[idx].lkup_RVSRID;
					jdata_RVS.rvs_code = data[idx].rvs_code;
					jdata_RVS.rvs_description = data[idx].rvs_description;
					jdata_RVS.rvs_unit = data[idx].rvs_unit;
						
					$ipadrbg.context.jdata_RVS.add(jdata_RVS);
				}
			}

			$scope.LkUpRVSCodes= [];

			callback();
			// else
			// 	alert("Nothing to Import from Server!");
	    }).
	    error(function(data, status, headers, config) {
	      	// called asynchronously if an error occurs
	      	// or server returns response with an error status.
	    });
	}
}