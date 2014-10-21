IOHPEApp.controller('TreatmentCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_treatment = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.drugDozage = [
      { id : 0,  dropname : "",       factor:  0, doze : ""}
    , { id : 2,  dropname : "b.i.d.", factor:  2, doze : "2 times a day"}
    , { id : 3,  dropname : "t.i.d.", factor:  3, doze : "3 times a day"}
    , { id : 4,  dropname : "q.i.d.", factor:  4, doze : "4 times a day"}
    , { id : 5,  dropname : "q3h",    factor:  8, doze : "every three hours"}
    , { id : 6,  dropname : "q.4h",   factor:  6, doze : "every four hours"}
    , { id : 7,  dropname : "q.5h",   factor:  5, doze : "every five hours"}
    , { id : 8,  dropname : "q.6h",   factor:  4, doze : "every six hours"}
    , { id : 9,  dropname : "q.8h",   factor:  3, doze : "every 8 hours"}
    , { id : 10, dropname : "q.d.",   factor:  1, doze : "every day"}
    , { id : 11, dropname : "a.c.",   factor:  0, doze : ""}
    , { id : 12, dropname : "p.c.",   factor:  0, doze : ""}
    , { id : 13, dropname : "a.m.",   factor:  5, doze : ""}
    , { id : 14, dropname : "p.m.",   factor:  1, doze : "at bedtime"}
    , { id : 15, dropname : "ante",   factor:  0, doze : ""}
    , { id : 16, dropname : "h",      factor:  0, doze : ""}
    , { id : 17, dropname : "h.s.",   factor:  1, doze : "bedtime"}
    , { id : 18, dropname : "p.r.n.", factor:  1, doze : "as needed"}
    , { id : 34, dropname : "O.D.",   factor:  1, doze : "once a day"}
    , { id : 35, dropname : "O.D. 30", factor: 1, doze : "30 minutes before breakast"}
    , { id : 36, dropname : "6x",     factor:  1, doze : "6 times daily"}
    , { id : 37, dropname : "EOD",    factor:  1, doze : "EVERY OTHER DAY"}
    ];

  $scope.LoadTreatment = function(){
    var promise = $ipadrbg.context.clinix_treatment.filter(function (px) { return px.ClinixRID == this.id },{ id: $scope.ClinixRID }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_treatment = pxresult;
      });
    })
  }

  $scope.LoadTreatment();

  $scope.addTreatment = function (grpTreatment) {
    //var analg = if (grpTreatment.medAnalgesic) () grpTreatment.medAnalgesic} : " ";
    //var analgDoze = if (grpTreatment.drugDozageAnalgesic) {grpTreatment.medAnalgesic + " " +} grpTreatment.drugDozageAnalgesic

    newrecord = {
      ClinixRID               : $scope.clinix.ClinixRID
      , PxRID                  : $scope.clinix.PxRID
      , medAnalgesic           : grpTreatment.medAnalgesic + " " + grpTreatment.drugDozageAnalgesic
      , medAntiInflamatory     : grpTreatment.medAntiInflamatory + " " + grpTreatment.drugDozageAntiInflame
      , medOthers              : grpTreatment.medOthers + " " + grpTreatment.drugDozageOthers
 
      , injSteroidsVolume      : grpTreatment.injSteroidsVolume 
      , injSteroidsWhen        : grpTreatment.injSteroidsWhen 
      , injSteroidsResult      : grpTreatment.injSteroidsResult 
      , injSteroidsDetails     : grpTreatment.injSteroidsDetails

      , injHyaluronicAcid     : grpTreatment.injHyaluronicAcid
      , injHyaluronicResult     : grpTreatment.injHyaluronicResult
      , injHyaluronicDetails     : grpTreatment.injHyaluronicDetails
    }

    $ipadrbg.context.clinix_treatment.add(newrecord);
    $ipadrbg.context.clinix_treatment.saveChanges();

    grpTreatment.medAnalgesic = "";
    grpTreatment.medAntiInflamatory = "";
    grpTreatment.medOthers = "";

    grpTreatment.drugDozageAnalgesic = "";
    grpTreatment.drugDozageAntiInflame = "";
    grpTreatment.drugDozageOthers = "";

    grpTreatment.injSteroidsVolume = "";
    grpTreatment.injSteroidsWhen = "";
    grpTreatment.injSteroidsResult = "";
    grpTreatment.injSteroidsDetails = "";
    
    grpTreatment.injHyaluronicAcid = "";
    grpTreatment.injHyaluronicResult = "";
    grpTreatment.injHyaluronicDetails = "";

    $scope.LoadTreatment();
  }

  $scope.removeTreatment = function (grpTreatment) {
    grpTreatment.remove()
    .then(function() {
      $scope.$apply(function() {
         var comps = $scope.clinix_treatment;
         comps.splice(comps.indexOf(grpTreatment), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});