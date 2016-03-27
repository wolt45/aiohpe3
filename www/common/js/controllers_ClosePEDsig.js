IOHPEApp.controller('ClosePEdsig_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ClosePEdsig = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;


   $scope.ClosePEdsigNurseZZz = function(formPin) 
  {
    // alert($scope.ORpin.PIN);
    if(formPin.NursePIN == 0 || formPin.NursePIN < 0 || formPin.NursePIN === null)
    {
      alert('Signature PIN is Not defined. Please try again!');
    }else
    {
      var promise = $ipadrbg.context.jdata_dsig.filter(function (pin) {
      return pin.PIN == this.id },{id: formPin.NursePIN}).toLiveArray();
      promise.then(function(pxresult) {
        $scope.$apply(function () {
        $scope.jdata_ClosePEdsig = pxresult;

          if(angular.isDefined(pxresult[0]['NursePIN']))
          {
              var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
              db.transaction(function (tx) {
              tx.executeSql("update from 'jdata_ClosePEdsig' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND PxRID = " +$scope.clinix.PxRID);
              });
          }
          newrecord = {
              ClinixRID : $scope.clinix.ClinixRID
              ,PxRID    : $scope.clinix.PxRID

              ,NursePIN : pxresult[0]['NursePIN']

            }
            $ipadrbg.context.jdata_ClosePEdsig.add(newrecord);
            $ipadrbg.context.jdata_ClosePEdsig.saveChanges();

            alert("Nurse Digitaly signed Successfully!");

        });
        }, function()
      {
        alert("PIN is not found.");
        //https://docs.angularjs.org/api/ng/service/$http
      });
    }
  }


            

  $scope.ClosePEdsigDoctor= function(formPin) 
  {
    // alert($scope.ORpin.PIN);
    if(formPin.DoctorPIN == 0 || formPin.DoctorPIN < 0 || formPin.DoctorPIN === null)
    {
      alert('Please Enter Signature PIN.');
    }else
    {
      var promise = $ipadrbg.context.jdata_dsig.filter(function (pin) {
      return pin.PIN == this.id },{id: formPin.DoctorPIN}).toLiveArray();
      promise.then(function(pxresult) {
        
        $scope.$apply(function () {
        $scope.jdata_ClosePEdsig = pxresult;

         if(angular.isDefined(pxresult[0]['DoctorPIN']))
          {
              var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
              db.transaction(function (tx) {
              tx.executeSql("delete from 'jdata_ClosePEdsig' WHERE ClinixRID = " + $scope.clinix.ClinixRID + " AND PxRID = " +$scope.clinix.PxRID);
              });
            }

             newrecord = {
              ClinixRID : $scope.clinix.ClinixRID
              ,PxRID    : $scope.clinix.PxRID

              ,DoctorPIN : pxresult[0]['DoctorPIN']
            }
            $ipadrbg.context.jdata_ClosePEdsig.add(newrecord);
            $ipadrbg.context.jdata_ClosePEdsig.saveChanges();

            alert("Doctor Digitaly signed Successfully!");

        });
        }, function()
       {
        alert("PIN is not found.");
        //https://docs.angularjs.org/api/ng/service/$http
      });
    }
  }



});