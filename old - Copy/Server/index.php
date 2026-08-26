<?php 
$t = date("l jS \of F Y h:i:s A") . "<br>";
$q = $_REQUEST["q"];
echo $q === "load" ? "text" : "No Text";
?>