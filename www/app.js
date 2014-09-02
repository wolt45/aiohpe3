function DataController($rootScope,$scope,$http) {

	// request for transactions from the server via REST

	// let say we have this sample transactions
    $scope.px_data = [];

    $scope.pullData = function(){
    	// detect for internet connection
    	// if internet is available
    	// check for data version
    	// if local data is outdated then pull data from server
    	// if local data is latest then push to server 
		$http({method: 'GET', url: 'http://192.168.0.100/RBGsrvr_todayset/srvr_px_data.php'}).
		    success(function(data, status, headers, config) {
		      	// this callback will be called asynchronously
		      	// when the response is available

		      	// console.log(data);

		      	// save to websql
			    for(idx in data){
			    	var px = new $ipadrbg.types.px_data();
			    	px.PxRID = data[idx].PxRID;
					px.pxname = data[idx].pxname;
					px.Address = data[idx].Address;
					px.pxstatus = data[idx].pxstatus;
					px.pxregdate = data[idx].pxregdate;
					px.Foto = data[idx].Foto;
					$ipadrbg.context.px_data.add(px);
			    }
				$ipadrbg.context.saveChanges();

				// bind data to scope
				$scope.px_data = data;

		    }).
		    error(function(data, status, headers, config) {
		      	// called asynchronously if an error occurs
		      	// or server returns response with an error status.
		    });

    	
    }

}