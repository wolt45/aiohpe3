IOHPEApp.controller('knee_7_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_Knee_7 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKnee7 = function(){
    var promise = $ipadrbg.context.jdata_Knee_7.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_Knee_7 = pxresult;
      });

    $scope.SportsKnee7= {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,GrossPictures : pxresult[0]['GrossPictures']
    ,CompartmentNarrowing : pxresult[0]['CompartmentNarrowing']
    ,MedialLocation : pxresult[0]['MedialLocation']
    ,MedialLocationDescrip : pxresult[0]['MedialLocationDescrip']
    ,LateralLocation : pxresult[0]['LateralLocation']
    ,LateralLocationDescrip : pxresult[0]['LateralLocationDescrip']
    ,Patellartilt : pxresult[0]['Patellartilt']
    ,LateralLocation : pxresult[0]['LateralLocation']
    ,LateralLocationDescrip : pxresult[0]['LateralLocationDescrip']
    ,Patellartilt : pxresult[0]['Patellartilt']
    ,Congruenceangle : pxresult[0]['Congruenceangle']
    ,Osteophytes : pxresult[0]['Osteophytes']
    ,OsteophytesLocation : pxresult[0]['OsteophytesLocation']
    ,Pastellaalta : pxresult[0]['Pastellaalta']
    ,PastellaaltaInsallRatio : pxresult[0]['PastellaaltaInsallRatio']
    ,Patellabaja : pxresult[0]['Patellabaja']
    ,PatellabajaInsallRatio : pxresult[0]['PatellabajaInsallRatio']
    ,Shallowtrochleargroove : pxresult[0]['Shallowtrochleargroove']
    ,Osteochondraldefects : pxresult[0]['Osteochondraldefects']
    ,OsteochondraldefectsLocation : pxresult[0]['OsteochondraldefectsLocation']
    ,OsteochondraldefectsOthers : pxresult[0]['OsteochondraldefectsOthers']
    ,MRIEffusion : pxresult[0]['MRIEffusion']
    ,MRISynovialInflamation : pxresult[0]['MRISynovialInflamation']
    ,MedialMeniscalTear : pxresult[0]['MedialMeniscalTear']
    ,MedialMeniscalLocation : pxresult[0]['MedialMeniscalLocation']
    ,MedialMeniscalGrade : pxresult[0]['MedialMeniscalGrade']
    ,LateralMeniscalTear : pxresult[0]['LateralMeniscalTear']
    ,LateralMeniscalTearLocation : pxresult[0]['LateralMeniscalTearLocation']
    ,LateralMeniscalTearGrade : pxresult[0]['LateralMeniscalTearGrade']
    ,Anteriorcruciateligamenttear : pxresult[0]['Anteriorcruciateligamenttear']
    ,AnteriorcruciateligamenttearPartial : pxresult[0]['AnteriorcruciateligamenttearPartial']
    ,AnteriorcruciateligamenttearComplete : pxresult[0]['AnteriorcruciateligamenttearComplete']
    ,Posteriorcruciateligamenttear : pxresult[0]['Posteriorcruciateligamenttear']
    ,PosteriorcruciateligamenttearPartial : pxresult[0]['PosteriorcruciateligamenttearPartial']
    ,PosteriorcruciateligamenttearComplete : pxresult[0]['PosteriorcruciateligamenttearComplete']
    ,Medialcollateralligamentpathology : pxresult[0]['Medialcollateralligamentpathology']
    ,MedialcollateralligamentpathologyI : pxresult[0]['MedialcollateralligamentpathologyI']
    ,MedialcollateralligamentpathologyII : pxresult[0]['MedialcollateralligamentpathologyII']
    ,MedialcollateralligamentpathologyIII : pxresult[0]['MedialcollateralligamentpathologyIII']
    ,Medialcollateralligamenttear : pxresult[0]['Medialcollateralligamenttear']
    ,MedialcollateralligamenttearI : pxresult[0]['MedialcollateralligamenttearI']
    ,MedialcollateralligamenttearII : pxresult[0]['MedialcollateralligamenttearII']
    ,MedialcollateralligamenttearIII : pxresult[0]['MedialcollateralligamenttearIII']
    ,Posterolateralcornerinflammation : pxresult[0]['Posterolateralcornerinflammation']
    ,Osteochondrallession : pxresult[0]['Osteochondrallession']
    ,OsteochondrallessionLocation : pxresult[0]['OsteochondrallessionLocation']
    ,OsteochondrallessionOthersDescrip : pxresult[0]['OsteochondrallessionOthersDescrip']


    }

    });
  }; 

   $scope.LoadKnee7();

  $scope.addNew_Knee7 = function (frmknee7) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_Knee_7' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,GrossPictures : frmknee7.GrossPictures
      ,CompartmentNarrowing : frmknee7.CompartmentNarrowing
      ,MedialLocation : frmknee7.MedialLocation
      ,MedialLocationDescrip : frmknee7.MedialLocationDescrip
      ,LateralLocation : frmknee7.LateralLocation
      ,LateralLocationDescrip : frmknee7.LateralLocationDescrip
      ,Patellartilt : frmknee7.Patellartilt
      ,LateralLocation : frmknee7.LateralLocation
      ,LateralLocationDescrip : frmknee7.LateralLocationDescrip
      ,Patellartilt : frmknee7.Patellartilt
      ,Congruenceangle : frmknee7.Congruenceangle
      ,Osteophytes : frmknee7.Osteophytes
      ,OsteophytesLocation : frmknee7.OsteophytesLocation
      ,Pastellaalta : frmknee7.Pastellaalta
      ,PastellaaltaInsallRatio : frmknee7.PastellaaltaInsallRatio
      ,Patellabaja : frmknee7.Patellabaja
      ,PatellabajaInsallRatio : frmknee7.PatellabajaInsallRatio
      ,Shallowtrochleargroove : frmknee7.Shallowtrochleargroove
      ,Osteochondraldefects : frmknee7.Osteochondraldefects
      ,OsteochondraldefectsLocation : frmknee7.OsteochondraldefectsLocation
      ,OsteochondraldefectsOthers : frmknee7.OsteochondraldefectsOthers
      ,MRIEffusion : frmknee7.MRIEffusion
      ,MRISynovialInflamation : frmknee7.MRISynovialInflamation
      ,MedialMeniscalTear : frmknee7.MedialMeniscalTear
      ,MedialMeniscalLocation : frmknee7.MedialMeniscalLocation
      ,MedialMeniscalGrade : frmknee7.MedialMeniscalGrade
      ,LateralMeniscalTear : frmknee7.LateralMeniscalTear
      ,LateralMeniscalTearLocation : frmknee7.LateralMeniscalTearLocation
      ,LateralMeniscalTearGrade : frmknee7.LateralMeniscalTearGrade
      ,Anteriorcruciateligamenttear : frmknee7.Anteriorcruciateligamenttear
      ,AnteriorcruciateligamenttearPartial : frmknee7.AnteriorcruciateligamenttearPartial
      ,AnteriorcruciateligamenttearComplete : frmknee7.AnteriorcruciateligamenttearComplete
      ,Posteriorcruciateligamenttear : frmknee7.Posteriorcruciateligamenttear
      ,PosteriorcruciateligamenttearPartial : frmknee7.PosteriorcruciateligamenttearPartial
      ,PosteriorcruciateligamenttearComplete : frmknee7.PosteriorcruciateligamenttearComplete
      ,Medialcollateralligamentpathology : frmknee7.Medialcollateralligamentpathology
      ,MedialcollateralligamentpathologyI : frmknee7.MedialcollateralligamentpathologyI
      ,MedialcollateralligamentpathologyII : frmknee7.MedialcollateralligamentpathologyII
      ,MedialcollateralligamentpathologyIII : frmknee7.MedialcollateralligamentpathologyIII
      ,Medialcollateralligamenttear : frmknee7.Medialcollateralligamenttear
      ,MedialcollateralligamenttearI : frmknee7.MedialcollateralligamenttearI
      ,MedialcollateralligamenttearII : frmknee7.MedialcollateralligamenttearII
      ,MedialcollateralligamenttearIII : frmknee7.MedialcollateralligamenttearIII
      ,Posterolateralcornerinflammation : frmknee7.Posterolateralcornerinflammation
      ,Osteochondrallession : frmknee7.Osteochondrallession
      ,OsteochondrallessionLocation : frmknee7.OsteochondrallessionLocation
      ,OsteochondrallessionOthersDescrip : frmknee7.OsteochondrallessionOthersDescrip

    }
    $ipadrbg.context.jdata_Knee_7.add(newrecord);
    $ipadrbg.context.jdata_Knee_7.saveChanges();

    alert("Knee Data Saved!");

    $scope.LoadKnee7();    
  }

  $scope.removeKnee7 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_Knee_7' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.SportsKnee7 = [];
    }
  }

});