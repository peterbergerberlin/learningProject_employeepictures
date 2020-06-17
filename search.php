<?php
include_once("config/config.php");

// Hier werden die Informationen, passend zum eingegebenen Mitarbeiternamen im Suchformular, aus der Datenbank geholt
// und über echo $msg als responsetext weitergegeben

$dbuser   = "root";
$dbpass   = "";
$dbtable  = "mitarbeiterbilder";
$firstname = "";
$surname = "";

$searchname = $_POST['search'];

$namearray = explode(" ", $searchname);

$firstname = $namearray[0];
if(count($namearray) > 1) {
	$surname = $namearray[1];
}

try {
	$dbh = new PDO("mysql:host=" . $dbhost . ";dbname=" . $dbname, $dbuser, $dbpass);
}
catch (PDOException $e) {
    die('Die Verbindung zur Datenbank ist fehlgeschlagen: ' . $e->getMessage());
}

$dbh -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$msg = $dbh->query("SELECT * FROM $dbtable WHERE vorname='$firstname' AND nachname='$surname'")->fetchAll(PDO::FETCH_ASSOC);

$msg = json_encode($msg);
echo $msg;