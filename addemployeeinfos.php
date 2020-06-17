<?php
include_once("config/config.php");

$dbuser   = "root";
$dbpass   = "";
$dbtable  = "mitarbeiterbilder";

// Hier werden die Formulardaten der Mitarbeiterinfos sowie der Dateiname des Bildes und die userid an die Datenbank geschickt

try {
	$dbh = new PDO("mysql:host=" . $dbhost . ";dbname=" . $dbname, $dbuser, $dbpass);
}
catch (PDOException $e) {
    die('Die Verbindung zur Datenbank ist fehlgeschlagen: ' . $e->getMessage());
}

$firstname = !empty($_POST["employeefirstname_input"]) ? ($_POST["employeefirstname_input"]) : FALSE;
$surname = !empty($_POST["employeesurname_input"]) ? ($_POST["employeesurname_input"]) : FALSE;
$position = !empty($_POST["employeeposition_input"]) ? ($_POST["employeeposition_input"]) : FALSE;
$workplace = !empty($_POST["workplace_input"]) ? ($_POST["workplace_input"]) : FALSE;
$highestUserID = $dbh->query("SELECT userid FROM $dbtable ORDER BY userid DESC LIMIT 1")->fetch();
$userid = $highestUserID['userid'] + 1;
$filename = $_COOKIE["filenameCookie"]; //dieser Cookie wird in der addpicture.php gesetzt und enthält den Dateinamen des hochgeladenen Bildes

$stmt = $dbh->prepare("INSERT INTO $dbtable (userid, vorname, nachname, position, arbeitsplatz, bilddateiname) VALUES (?, ?, ?, ?, ?, ?)");

$stmt->execute(array($userid, $firstname, $surname, $position,$workplace ,$filename));

$msg = "Bild erfolgreich hochgeladen";
$msg = json_encode($msg);
echo $msg;
