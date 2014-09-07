function DataController($rootScope,$scope) {

	// request for transactions from the server via REST

	// let say we have this sample transactions
	$scope.px_data = [];

	// $scope.ShowData = function(){
		// alert("hey");
		var promise = $ipadrbg.context.px_data.filter(function (px) { return px.ClinixRID > 0}).toArray();
		
		promise.then(renderResultCallback);

		function renderResultCallback(pxresult) {
			$scope.px_data = pxresult;
			$scope.$digest();
		}
	// };
}