function PushController($rootScope,$scope,$http) {

	$scope.clinix = [];
	$scope.ClinixPush = [];

	var ShowData = function(){

    	var promise = $ipadrbg.context.clinix.filter(function (px) { return px.ClinixRID > this.id},{id:0}).order('TranStatus', 'AppDateSet', 'ClinixRID').toLiveArray();
    
	    promise.then(function(pxresult) {

	    	// this loop is not part of the context, but to fill ClinixPush, to limit only fields to PushBack to server
		    for(key in pxresult){
		    	row = {
			        ClinixRID   : pxresult[key].ClinixRID,
			        PxRID       : pxresult[key].PxRID,
			        TranStatus  : pxresult[key].TranStatus,
			        AppDateSet  : pxresult[key].AppDateSet
				};
		      	$scope.ClinixPush.push(row); 
		    }

		    // this?
		    $scope.clinix = pxresult;
		    $scope.$apply();
	    });
	};
	ShowData();


	$scope.pushData = function(ClinixPush){

		debugger;


		var clinixJson = JSON.stringify(ClinixPush);

		$http({
			method: 'POST'
			, url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_clinix.php?clinixJson=' + clinixJson
			, contentType : 'application/json'
			, data : clinixJson
			, cache : false
		});
		//$http({method: 'GET', url: 'http://localhost/RBGsrvr_todayset/srvr_clinix.php'}).
	    alert("EXPORT to Server Successful!");
	};





	$scope.pushDataZZZZ = function(clinix){

		var clinixJson = JSON.stringify(clinix);

		// http://www.9lessons.info/2013/02/json-input-string-using-javascript.html

		//function post_data(url,encodedata, success){
		$.ajax({
			type : "POST",
			url : 'http://192.168.0.99/RBGsrvr_todayset/srvr_back_clinix.php',
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
}