IOHPEApp.controller('PreOpHipPin_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_PreOpHipdsig = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;


   $scope.PreOpHipPinchecking = function(formPin) 
  {
    // alert($scope.ORpin.PIN);
    if(angular.isUndefined(formPin))
    {
      alert('Please Enter Signature PIN.');
    }else
    {
      

      var promise = $ipadrbg.context.jdata_dsig.filter(function (pin) {
      return pin.PIN == this.id},{id: formPin.PIN}).toLiveArray();
      promise.then(function(pxresult) {
        $scope.$apply(function () {
        $scope.jdata_PreOpHipdsig = pxresult;

           if(angular.isDefined(pxresult[0]['PIN']))
          {
              var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
              db.transaction(function (tx) {
              tx.executeSql("delete from 'jdata_PreOpHipdsig' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND PxRID = " +$scope.clinix.PxRID);
              });
          }

           newrecord = {
              ClinixRID : $scope.clinix.ClinixRID
              ,PxRID    : $scope.clinix.PxRID

              ,PIN : pxresult[0]['PIN']

            }
            $ipadrbg.context.jdata_PreOpHipdsig.add(newrecord);
            $ipadrbg.context.jdata_PreOpHipdsig.saveChanges();

            alert("Document Digitaly signed Successfully!");

        });
       }, function()
      {
        alert("PIN is not found.");
        //https://docs.angularjs.org/api/ng/service/$http
      });
    }
  }



});