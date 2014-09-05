function DataController($rootScope,$scope) {

	// request for transactions from the server via REST

	// let say we have this sample transactions
	$scope.px_data = [];

	$scope.ShowData = function(){
		//alert("hey");
		var promise = $ipadrbg.context.px_data.filter(function (px) { return px.PxRID > 0}).toArray();
		
		promise.then(renderResultCallback);

		function renderResultCallback(pxresult) {

			// for(idx in pxresult){
		 //    	var px = new $ipadrbg.types.px_data();

		 //    	px.PxRID = pxresult[idx].PxRID;
			// 	px.pxname = pxresult[idx].pxname;
			// 	px.Address = pxresult[idx].Address;
			// 	px.pxstatus = pxresult[idx].pxstatus;
			// 	px.pxregdate = pxresult[idx].pxregdate;
			// 	px.Foto = pxresult[idx].Foto;
		 //    }
			//    scope.$apply(function() {
			//     $scope.px_data = pxresult;
			// });
			$scope.px_data = pxresult;
			//scope.$digest();
		}
	};
}