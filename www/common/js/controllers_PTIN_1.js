IOHPEApp.controller('PT1_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_PT1 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadPT1 = function(){
    var promise = $ipadrbg.context.jdata_PT1.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_PT1 = pxresult;
      });

          $scope.PT1 = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,ShoulderFlexLeft : pxresult[0]['ShoulderFlexLeft']
          ,ShoulderFlexRight : pxresult[0]['ShoulderFlexRight']
          ,ShoulderFlexStrLeft : pxresult[0]['ShoulderFlexStrLeft']
          ,ShoulderFlexStrRight : pxresult[0]['ShoulderFlexStrRight']

          ,ShoulderExtenLeft : pxresult[0]['ShoulderExtenLeft']
          ,ShoulderExtenRight : pxresult[0]['ShoulderExtenRight']
          ,ShoulderExtenStrLeft : pxresult[0]['ShoulderExtenStrLeft']
          ,ShoulderExtenStrRight : pxresult[0]['ShoulderExtenStrRight']

          ,ShoulderABDADDLeft : pxresult[0]['ShoulderABDADDLeft']
          ,ShoulderABDADDRight : pxresult[0]['ShoulderABDADDRight']
          ,ShoulderABDADDStrLeft : pxresult[0]['ShoulderABDADDStrLeft']
          ,ShoulderABDADDStrRight : pxresult[0]['ShoulderABDADDStrRight']


          ,ShoulderIRLeft : pxresult[0]['ShoulderIRLeft']
          ,ShoulderIRRight : pxresult[0]['ShoulderIRRight']
          ,ShoulderIRStrLeft : pxresult[0]['ShoulderIRStrLeft']
          ,ShoulderIRStrRight : pxresult[0]['ShoulderIRStrRight']

          ,ShoulderERLeft : pxresult[0]['ShoulderERLeft']
          ,ShoulderERRight : pxresult[0]['ShoulderERRight']
          ,ShoulderERStrLeft : pxresult[0]['ShoulderERStrLeft']
          ,ShoulderERStrRight : pxresult[0]['ShoulderERStrRight']

          ,ElbowFlexionLeft : pxresult[0]['ElbowFlexionLeft']
          ,ElbowFlexionRight : pxresult[0]['ElbowFlexionRight']
          ,ElbowFlexionStrLeft : pxresult[0]['ElbowFlexionStrLeft']
          ,ElbowFlexionStrRight : pxresult[0]['ElbowFlexionStrRight']

          ,ElbowExtensionLeft : pxresult[0]['ElbowExtensionLeft']
          ,ElbowExtensionRight : pxresult[0]['ElbowExtensionRight']
          ,ElbowExtensionStrLeft : pxresult[0]['ElbowExtensionStrLeft']
          ,ElbowExtensionStrRight : pxresult[0]['ElbowExtensionStrRight']

          ,ForearmLeft : pxresult[0]['ForearmLeft']
          ,ForearmRight : pxresult[0]['ForearmRight']
          ,ForearmStrLeft : pxresult[0]['ForearmStrLeft']
          ,ForearmStrRight : pxresult[0]['ForearmStrRight']

          ,SupinationLeft : pxresult[0]['SupinationLeft']
          ,SupinationRight : pxresult[0]['SupinationRight']
          ,SupinationStrLeft : pxresult[0]['SupinationStrLeft']
          ,SupinationStrRight : pxresult[0]['SupinationStrRight']

          ,WristFlexionLeft : pxresult[0]['WristFlexionLeft']
          ,WristFlexionRight : pxresult[0]['WristFlexionRight']
          ,WristFlexionStrLeft : pxresult[0]['WristFlexionStrLeft']
          ,WristFlexionStrRight : pxresult[0]['WristFlexionStrRight']

          ,WristExtensionLeft : pxresult[0]['WristExtensionLeft']
          ,WristExtensionRight : pxresult[0]['WristExtensionRight']
          ,WristExtensionStrLeft : pxresult[0]['WristExtensionStrLeft']
          ,WristExtensionStrRight : pxresult[0]['WristExtensionStrRight']

          ,HipFlexionLeft : pxresult[0]['HipFlexionLeft']
          ,HipFlexionRight : pxresult[0]['HipFlexionRight']
          ,HipFlexionStrRight : pxresult[0]['HipFlexionStrRight']
          ,HipFlexionStrLeft : pxresult[0]['HipFlexionStrLeft']

          ,HipExtensionLeft : pxresult[0]['HipExtensionLeft']
          ,HipExtensionRight : pxresult[0]['HipExtensionRight']
          ,HipExtensionStrLeft : pxresult[0]['HipExtensionStrLeft']
          ,HipExtensionStrRight : pxresult[0]['HipExtensionStrRight']

          ,HipABDADDLeft : pxresult[0]['HipABDADDLeft']
          ,HipABDADDRight : pxresult[0]['HipABDADDRight']
          ,HipABDADDStrLeft : pxresult[0]['HipABDADDStrLeft']
          ,HipABDADDStrRight : pxresult[0]['HipABDADDStrRight']

          ,HipIRERLeft : pxresult[0]['HipIRERLeft']
          ,HipIRERRight : pxresult[0]['HipIRERRight']
          ,HipIRERStrLeft : pxresult[0]['HipIRERStrLeft']
          ,HipIRERStrRight : pxresult[0]['HipIRERStrRight']

          ,KneeFlexionLeft : pxresult[0]['KneeFlexionLeft']
          ,KneeFlexionRight : pxresult[0]['KneeFlexionRight']
          ,KneeFlexionStrLeft : pxresult[0]['KneeFlexionStrLeft']
          ,KneeFlexionStrRight : pxresult[0]['KneeFlexionStrRight']
          
          ,KneeExtensionLeft : pxresult[0]['KneeExtensionLeft']
          ,KneeExtensionRight : pxresult[0]['KneeExtensionRight']
          ,KneeExtensionStrLeft : pxresult[0]['KneeExtensionStrLeft']
          ,KneeExtensionStrRight : pxresult[0]['KneeExtensionStrRight']

          ,AnkleDorsiflexionLeft : pxresult[0]['AnkleDorsiflexionLeft']
          ,AnkleDorsiflexionRight : pxresult[0]['AnkleDorsiflexionRight']
          ,AnkleDorsiflexionStrLeft : pxresult[0]['AnkleDorsiflexionStrLeft']
          ,AnkleDorsiflexionStrRight : pxresult[0]['AnkleDorsiflexionStrRight']
          
          ,PlantarflexionLeft : pxresult[0]['PlantarflexionLeft']
          ,PlantarflexionRight : pxresult[0]['PlantarflexionRight']
          ,PlantarflexionStrLeft : pxresult[0]['PlantarflexionStrLeft']
          ,PlantarflexionStrRight : pxresult[0]['PlantarflexionStrRight']

          ,InversionLeft : pxresult[0]['InversionLeft']
          ,InversionRight : pxresult[0]['InversionRight']
          ,InversionStrLeft : pxresult[0]['InversionStrLeft']
          ,InversionStrRight : pxresult[0]['InversionStrRight']

          ,NeckFlexionLeft : pxresult[0]['NeckFlexionLeft']
          ,NeckFlexionRight : pxresult[0]['NeckFlexionRight']
          ,NeckFlexionStrLeft : pxresult[0]['NeckFlexionStrLeft']
          ,NeckFlexionStrRight : pxresult[0]['NeckFlexionStrRight']

          ,NeckExtensionLeft : pxresult[0]['NeckExtensionLeft']
          ,NeckExtensionRight : pxresult[0]['NeckExtensionRight']
          ,NeckExtensionStrLeft : pxresult[0]['NeckExtensionStrLeft']
          ,NeckExtensionStrRight : pxresult[0]['NeckExtensionStrRight']

          ,TrunkFlexionLeft : pxresult[0]['TrunkFlexionLeft']
          ,TrunkFlexionRight : pxresult[0]['TrunkFlexionRight']
          ,TrunkFlexionStrLeft : pxresult[0]['TrunkFlexionStrLeft']
          ,TrunkFlexionStrRight : pxresult[0]['TrunkFlexionStrRight']

          ,TrunkExtensionLeft : pxresult[0]['TrunkExtensionLeft']
          ,TrunkExtensionRight : pxresult[0]['TrunkExtensionRight']
          ,TrunkExtensionStrLeft : pxresult[0]['TrunkExtensionStrLeft']
          ,TrunkExtensionStrRight : pxresult[0]['TrunkExtensionStrRight']

          ,FingerflexionRight : pxresult[0]['FingerflexionRight']
          ,FingerflexionLeft : pxresult[0]['FingerflexionLeft']
          ,FingerflexionStrLeft : pxresult[0]['FingerflexionStrLeft']
          ,FingerflexionStrRight : pxresult[0]['FingerflexionStrRight']

          ,FingerextensionLeft : pxresult[0]['FingerextensionLeft']
          ,FingerextensionRight : pxresult[0]['FingerextensionRight']
          ,FingerextensionStrLeft : pxresult[0]['FingerextensionStrLeft']
          ,FingerextensionStrRight : pxresult[0]['FingerextensionStrRight']

          ,FingerAbductionLeft : pxresult[0]['FingerAbductionLeft']
          ,FingerAbductionRight : pxresult[0]['FingerAbductionRight']
          ,FingerAbductionStrLeft : pxresult[0]['FingerAbductionStrLeft']
          ,FingerAbductionStrRight : pxresult[0]['FingerAbductionStrRight']

          ,FingeradductionLeft : pxresult[0]['FingeradductionLeft']
          ,FingeradductionRight : pxresult[0]['FingeradductionRight']
          ,FingeradductionStrLeft : pxresult[0]['FingeradductionStrLeft']
          ,FingeradductionStrRight : pxresult[0]['FingeradductionStrRight']

          ,ThumbflexionLeft : pxresult[0]['ThumbflexionLeft']
          ,ThumbflexionRight : pxresult[0]['ThumbflexionRight']
          ,ThumbflexionStrLeft : pxresult[0]['ThumbflexionStrLeft']
          ,ThumbflexionStrRight : pxresult[0]['ThumbflexionStrRight']

          ,ThumbextensionLeft : pxresult[0]['ThumbextensionLeft']
          ,ThumbextensionRight : pxresult[0]['ThumbextensionRight']
          ,ThumbextensionStrLeft : pxresult[0]['ThumbextensionStrLeft']
          ,ThumbextensionStrRight : pxresult[0]['ThumbextensionStrRight']

          ,ThumbadductionLeft : pxresult[0]['ThumbadductionLeft']
          ,ThumbadductionRight : pxresult[0]['ThumbadductionRight']
          ,ThumbadductionStrLeft : pxresult[0]['ThumbadductionStrLeft']
          ,ThumbadductionStrRight : pxresult[0]['ThumbadductionStrRight']

          ,ThumbabductionLeft : pxresult[0]['ThumbabductionLeft']
          ,ThumbabductionRight : pxresult[0]['ThumbabductionRight']
          ,ThumbabductionStrLeft : pxresult[0]['ThumbabductionStrLeft']
          ,ThumbabductionStrRight : pxresult[0]['ThumbabductionStrRight']
          
          ,ToeflexionLeft : pxresult[0]['ToeflexionLeft']
          ,ToeflexionRight : pxresult[0]['ToeflexionRight']
          ,ToeflexionStrLeft : pxresult[0]['ToeflexionStrLeft']
          ,ToeflexionStrRight : pxresult[0]['ToeflexionStrRight']
          
          ,ToeextensionLeft : pxresult[0]['ToeextensionLeft']
          ,ToeextensionRight : pxresult[0]['ToeextensionRight']
          ,ToeextensionStrLeft : pxresult[0]['ToeextensionStrLeft']
          ,ToeextensionStrRight : pxresult[0]['ToeextensionStrRight']
        
       }

    });
  }; 

   $scope.LoadPT1();

  $scope.addNew_PT1 = function (frmPT1) {
    
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_PT1' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,ShoulderFlexLeft : frmPT1.ShoulderFlexLeft
      ,ShoulderFlexRight : frmPT1.ShoulderFlexRight
      ,ShoulderFlexStrLeft : frmPT1.ShoulderFlexStrLeft
      ,ShoulderFlexStrRight : frmPT1.ShoulderFlexStrRight

      ,ShoulderExtenLeft : frmPT1.ShoulderExtenLeft
      ,ShoulderExtenRight : frmPT1.ShoulderExtenRight
      ,ShoulderExtenStrLeft : frmPT1.ShoulderExtenStrLeft
      ,ShoulderExtenStrRight : frmPT1.ShoulderExtenStrRight

      ,ShoulderABDADDLeft : frmPT1.ShoulderABDADDLeft
      ,ShoulderABDADDRight : frmPT1.ShoulderABDADDRight
      ,ShoulderABDADDStrLeft : frmPT1.ShoulderABDADDStrLeft
      ,ShoulderABDADDStrRight : frmPT1.ShoulderABDADDStrRight
      
      ,ShoulderIRLeft : frmPT1.ShoulderIRLeft
      ,ShoulderIRRight : frmPT1.ShoulderIRRight
      ,ShoulderIRStrLeft : frmPT1.ShoulderIRStrLeft
      ,ShoulderIRStrRight : frmPT1.ShoulderIRStrRight

      ,ShoulderERLeft : frmPT1.ShoulderERLeft
      ,ShoulderERRight : frmPT1.ShoulderERRight
      ,ShoulderERStrLeft : frmPT1.ShoulderERStrLeft
      ,ShoulderERStrRight : frmPT1.ShoulderERStrRight

      ,ElbowFlexionLeft : frmPT1.ElbowFlexionLeft
      ,ElbowFlexionRight : frmPT1.ElbowFlexionRight
      ,ElbowFlexionStrLeft : frmPT1.ElbowFlexionStrLeft
      ,ElbowFlexionStrRight : frmPT1.ElbowFlexionStrRight

      ,ElbowExtensionLeft : frmPT1.ElbowExtensionLeft
      ,ElbowExtensionRight : frmPT1.ElbowExtensionRight
      ,ElbowExtensionStrLeft : frmPT1.ElbowExtensionStrLeft
      ,ElbowExtensionStrRight : frmPT1.ElbowExtensionStrRight

      ,ForearmLeft : frmPT1.ForearmLeft
      ,ForearmRight : frmPT1.ForearmRight
      ,ForearmStrLeft : frmPT1.ForearmStrLeft
      ,ForearmStrRight : frmPT1.ForearmStrRight

      ,SupinationLeft : frmPT1.SupinationLeft
      ,SupinationRight : frmPT1.SupinationRight
      ,SupinationStrLeft : frmPT1.SupinationStrLeft
      ,SupinationStrRight : frmPT1.SupinationStrRight

      ,WristFlexionLeft : frmPT1.WristFlexionLeft
      ,WristFlexionRight : frmPT1.WristFlexionRight
      ,WristFlexionStrLeft : frmPT1.WristFlexionStrLeft
      ,WristFlexionStrRight : frmPT1.WristFlexionStrRight

      ,WristExtensionLeft : frmPT1.WristExtensionLeft
      ,WristExtensionRight : frmPT1.WristExtensionRight
      ,WristExtensionStrLeft : frmPT1.WristExtensionStrLeft
      ,WristExtensionStrRight : frmPT1.WristExtensionStrRight

      ,HipFlexionLeft : frmPT1.HipFlexionLeft
      ,HipFlexionRight : frmPT1.HipFlexionRight
      ,HipFlexionStrRight : frmPT1.HipFlexionStrRight
      ,HipFlexionStrLeft : frmPT1.HipFlexionStrLeft

      ,HipExtensionLeft : frmPT1.HipExtensionLeft
      ,HipExtensionRight : frmPT1.HipExtensionRight
      ,HipExtensionStrLeft : frmPT1.HipExtensionStrLeft
      ,HipExtensionStrRight : frmPT1.HipExtensionStrRight

      ,HipABDADDLeft : frmPT1.HipABDADDLeft
      ,HipABDADDRight : frmPT1.HipABDADDRight
      ,HipABDADDStrLeft : frmPT1.HipABDADDStrLeft
      ,HipABDADDStrRight : frmPT1.HipABDADDStrRight

      ,HipIRERLeft : frmPT1.HipIRERLeft
      ,HipIRERRight : frmPT1.HipIRERRight
      ,HipIRERStrLeft : frmPT1.HipIRERStrLeft
      ,HipIRERStrRight : frmPT1.HipIRERStrRight

      ,KneeFlexionLeft : frmPT1.KneeFlexionLeft
      ,KneeFlexionRight : frmPT1.KneeFlexionRight
      ,KneeFlexionStrLeft : frmPT1.KneeFlexionStrLeft
      ,KneeFlexionStrRight : frmPT1.KneeFlexionStrRight
      
      ,KneeExtensionLeft : frmPT1.KneeExtensionLeft
      ,KneeExtensionRight : frmPT1.KneeExtensionRight
      ,KneeExtensionStrLeft : frmPT1.KneeExtensionStrLeft
      ,KneeExtensionStrRight : frmPT1.KneeExtensionStrRight

      ,AnkleDorsiflexionLeft : frmPT1.AnkleDorsiflexionLeft
      ,AnkleDorsiflexionRight : frmPT1.AnkleDorsiflexionRight
      ,AnkleDorsiflexionStrLeft : frmPT1.AnkleDorsiflexionStrLeft
      ,AnkleDorsiflexionStrRight : frmPT1.AnkleDorsiflexionStrRight
      
      ,PlantarflexionLeft : frmPT1.PlantarflexionLeft
      ,PlantarflexionRight : frmPT1.PlantarflexionRight
      ,PlantarflexionStrLeft : frmPT1.PlantarflexionStrLeft
      ,PlantarflexionStrRight : frmPT1.PlantarflexionStrRight

      ,InversionLeft : frmPT1.InversionLeft
      ,InversionRight : frmPT1.InversionRight
      ,InversionStrLeft : frmPT1.InversionStrLeft
      ,InversionStrRight : frmPT1.InversionStrRight

      ,NeckFlexionLeft : frmPT1.NeckFlexionLeft
      ,NeckFlexionRight : frmPT1.NeckFlexionRight
      ,NeckFlexionStrLeft : frmPT1.NeckFlexionStrLeft
      ,NeckFlexionStrRight : frmPT1.NeckFlexionStrRight

      ,NeckExtensionLeft : frmPT1.NeckExtensionLeft
      ,NeckExtensionRight : frmPT1.NeckExtensionRight
      ,NeckExtensionStrLeft : frmPT1.NeckExtensionStrLeft
      ,NeckExtensionStrRight : frmPT1.NeckExtensionStrRight

      ,TrunkFlexionLeft : frmPT1.TrunkFlexionLeft
      ,TrunkFlexionRight : frmPT1.TrunkFlexionRight
      ,TrunkFlexionStrLeft : frmPT1.TrunkFlexionStrLeft
      ,TrunkFlexionStrRight : frmPT1.TrunkFlexionStrRight

      ,TrunkExtensionLeft : frmPT1.TrunkExtensionLeft
      ,TrunkExtensionRight : frmPT1.TrunkExtensionRight
      ,TrunkExtensionStrLeft : frmPT1.TrunkExtensionStrLeft
      ,TrunkExtensionStrRight : frmPT1.TrunkExtensionStrRight

      ,FingerflexionRight : frmPT1.FingerflexionRight
      ,FingerflexionLeft : frmPT1.FingerflexionLeft
      ,FingerflexionStrLeft : frmPT1.FingerflexionStrLeft
      ,FingerflexionStrRight : frmPT1.FingerflexionStrRight

      ,FingerextensionLeft : frmPT1.FingerextensionLeft
      ,FingerextensionRight : frmPT1.FingerextensionRight
      ,FingerextensionStrLeft : frmPT1.FingerextensionStrLeft
      ,FingerextensionStrRight : frmPT1.FingerextensionStrRight

      ,FingerAbductionLeft : frmPT1.FingerAbductionLeft
      ,FingerAbductionRight : frmPT1.FingerAbductionRight
      ,FingerAbductionStrLeft : frmPT1.FingerAbductionStrLeft
      ,FingerAbductionStrRight : frmPT1.FingerAbductionStrRight

      ,FingeradductionLeft : frmPT1.FingeradductionLeft
      ,FingeradductionRight : frmPT1.FingeradductionRight
      ,FingeradductionStrLeft : frmPT1.FingeradductionStrLeft
      ,FingeradductionStrRight : frmPT1.FingeradductionStrRight

      ,ThumbflexionLeft : frmPT1.ThumbflexionLeft
      ,ThumbflexionRight : frmPT1.ThumbflexionRight
      ,ThumbflexionStrLeft : frmPT1.ThumbflexionStrLeft
      ,ThumbflexionStrRight : frmPT1.ThumbflexionStrRight

      ,ThumbextensionLeft : frmPT1.ThumbextensionLeft
      ,ThumbextensionRight : frmPT1.ThumbextensionRight
      ,ThumbextensionStrLeft : frmPT1.ThumbextensionStrLeft
      ,ThumbextensionStrRight : frmPT1.ThumbextensionStrRight

      ,ThumbadductionLeft : frmPT1.ThumbadductionLeft
      ,ThumbadductionRight : frmPT1.ThumbadductionRight
      ,ThumbadductionStrLeft : frmPT1.ThumbadductionStrLeft
      ,ThumbadductionStrRight : frmPT1.ThumbadductionStrRight

      ,ThumbabductionLeft : frmPT1.ThumbabductionLeft
      ,ThumbabductionRight : frmPT1.ThumbabductionRight
      ,ThumbabductionStrLeft : frmPT1.ThumbabductionStrLeft
      ,ThumbabductionStrRight : frmPT1.ThumbabductionStrRight
      
      ,ToeflexionLeft : frmPT1.ToeflexionLeft
      ,ToeflexionRight : frmPT1.ToeflexionRight
      ,ToeflexionStrLeft : frmPT1.ToeflexionStrLeft
      ,ToeflexionStrRight : frmPT1.ToeflexionStrRight

      ,ToeextensionLeft : frmPT1.ToeextensionLeft
      ,ToeextensionRight : frmPT1.ToeextensionRight
      ,ToeextensionStrLeft : frmPT1.ToeextensionStrLeft
      ,ToeextensionStrRight : frmPT1.ToeextensionStrRight

    }
    $ipadrbg.context.jdata_PT1.add(newrecord);
    $ipadrbg.context.jdata_PT1.saveChanges();

    alert("PT Initial Interview Data Saved!");

    $scope.LoadPT1();      
  }

  $scope.removePT1 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_PT1' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.PT1 = [];
    }
  }

});