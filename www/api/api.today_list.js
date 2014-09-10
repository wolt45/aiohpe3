<!DOCTYPE html>
<head lang="en">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>The LOCALDB-SQLiteDB App</title>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    
    <link rel="stylesheet" type="text/css" href="lib/jquery.mobile-1.4.3.min.css"/>
    
    <script src="lib/jquery-1.7.1.min.js"></script>
    <script src="lib/bootstrap.min.js"></script>
    <script src="lib/jquery.min.js" type="text/javascript"></script>
    <script src="lib/jquery.main.js" type="text/javascript"></script>
	<script src="lib/jquery.mobile-1.4.3.js" type="text/javascript"></script>

	<script type="text/javascript">
		$(document).ready(function() {
		    // are we running in native app or in a browser?
		    window.isphone = false;
		    if(document.URL.indexOf("http://") === -1 
		        && document.URL.indexOf("https://") === -1) {
		        window.isphone = true;
		    }

		    if( window.isphone ) {
		        document.addEventListener("deviceready", onDeviceReady, false);
		    } else {
		        onDeviceReady();
		    }
		});

		//document.addEventListener("deviceready", onDeviceReady, false);

		var db;

		function onDeviceReady() {
			db = window.openDatabase("WFS_WebSQL", "1.0", "iPadMR", 2*1024*1024);
			
			db.transaction(function (tx) {
  				// here be the transaction
  				// do SQL magic here using the tx object

  				tx.executeSql('SELECT * FROM px_data', [], renderList, errorCB);
			});
		};	

		function renderList(tx, results) {
			var htmlstring = '';
			var len = results.rows.length;

			htmlstring += "	<table border='1' id='products'><tr><th>No.</th><th>Foto</th><th>PxRID</th><th>Name</th><th>Address</th><th>Status</th></tr>";
			$x = 1;
			for (var i=0; i<len; i++) {
				htmlstring += '<tr><td>'+ $x++ +'</td><td><img src="images/'+ results.rows.item(i).Foto + '" width="120px" /> </td><td>' + results.rows.item(i).PxRID + '</td><td>' + results.rows.item(i).pxname + '</td><td> ' + results.rows.item(i).Address + '</td><td>' + results.rows.item(i).pxstatus  +  '</td></tr>';
			}

			$('#resultList').html(htmlstring);
			$('#resultList').listview('refresh');
        };

		function errorCB(err) {
            alert("REST EXTRACT Error!" + err.code);
        }
	</script>
</head>
<body>
	<div id="resultList" data-role='listview'>


   	</div>
</body>
</html>