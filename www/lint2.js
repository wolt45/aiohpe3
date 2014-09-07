var app = angular.module('demo',[]);
app.controller("MainController", function($scope){
    // gets the tasks from the DB as json object
    db.transaction(function(tx){           
        tx.executeSql("SELECT task,task_detail,task_date FROM task", [],    
        function(tx, rs){    
            var rows = rs.rows;
            if (rows.length>0) {
                var json_arr =  [];  
                for(var i = 0; i < rows.length; i++) {
                    var row = rows.item(i);
                    var obj = {task: row.task,detail:row.task_detail,datum:row.task_date};
                    json_arr.push(obj);
                }                         
            }    
            var json_str = JSON.stringify(json_arr);
            alert("json_str: "+ json_str);  // WORKING !
            sessionStorage.tasks = json_arr; // to get result out of db.transaction...
            })  
        });  // end db.transaction
        $scope.tasks = sessionStorage.tasks;