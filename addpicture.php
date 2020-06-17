<?php
// Upload des Bildes
$file = $_FILES['uploadfile'];
$filename = $file['name'];

// check filetype: https://www.php.net/manual/de/features.file-upload.php

if (!empty($file['name']))
{
    move_uploaded_file($file['tmp_name'], "img/".$filename);
}
$cookie = setcookie("filenameCookie", $filename, time()+3600);  // Der Cookie wird verwendet, damit der Dateiname des Bildes
																// an die addemployeeinfos.php übergeben werden kann.
																// Die superglobale Variable $_FILES, inder der filename gespeichert ist,
																// ist zum Zeitpunkt des Aufrufens der addemployeeinfos.php
																// (beim Klick auf den Submitbutton) wieder leer.
