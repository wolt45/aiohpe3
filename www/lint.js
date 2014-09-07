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



        +++++++++++++++++++ lain naman ni ya
http://stackoverflow.com/questions/25676162/how-to-insert-just-one-sqlite-table-in-my-android-application

public class DatabaseHandler extends SQLiteOpenHelper {

// Database Version
private static final int DATABASE_VERSION = 1;
// Database Name
private static final String DATABASE_NAME = "your_db_name.db";

//constructor for this class
public DatabaseHandler(Context context) {
    super(context, DATABASE_NAME, null, DATABASE_VERSION);
}

// Creating the Table when the class is executed    
@Override
public void onCreate(SQLiteDatabase db) {
    String CREATE_TABLE = "CREATE TABLE " + "YourTableName" + "("
            + "yourfield1" + " TEXT,"
            + "yourfield2" + " TEXT," + "yourfield3" + " TEXT" + ")";
    db.execSQL(CREATE_TABLE);//executing the create table query
}

//for inserting data into this table write the following method
  public void addData(String field1, String field2, String field3) {
    SQLiteDatabase db = this.getWritableDatabase();

    ContentValues values = new ContentValues();
    values.put("yourfield1", field1); 
    values.put("yourfield2", field2); 
    values.put("yourfield3", field3); 


    // Inserting Row
    db.insert("YourTableName", null, values);
    db.close(); // Closing database connection
}

}