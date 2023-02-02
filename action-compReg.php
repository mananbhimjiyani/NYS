		<?php

		// servername => localhost
		// username => root
		// password => empty
		// database name => staff
		$conn = mysqli_connect("localhost", "root", "", "comp");

		// Check connection
		if($conn === false){
			die("ERROR: Could not connect. "
				. mysqli_connect_error());
		}

		// Taking all 5 values from the form data(input)
        $comName=$_REQUEST['compName'];
		$email = $_REQUEST['email'];
		$psw = $_REQUEST['psw'];

		// Performing insert query execution
		// here our table name is college
        $result = mysql_query("SELECT * FROM table WHERE key_id='$key_id'");
        $num_rows = mysql_num_rows($result);

        if ($num_rows) {
            trigger_error('It exists.', E_USER_WARNING);
        }

		$sql = "INSERT INTO company VALUES ('$email', '$psw',$comName)";

		if(mysqli_query($conn, $sql)){
			echo "<h3>data stored in a database successfully."
				. " Please browse your localhost php my admin"
				. " to view the updated data</h3>";

			echo nl2br("\n$comName\n $email\n "
				. "$psw\n");
		} else{
			echo "ERROR: Hush! Sorry $sql. "
				. mysqli_error($conn);
		}

		// Close connection
		mysqli_close($conn);
