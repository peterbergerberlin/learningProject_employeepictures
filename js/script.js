window.addEventListener("DOMContentLoaded", function () {
	var searchForm = document.getElementById("searchForm");
	searchForm.addEventListener( "submit", function ( event ) {
		event.preventDefault();
		formSubmit(searchForm, 1);
	});
	
	var addpictureForm = document.getElementById("addpictureForm");
	addpictureForm.addEventListener( "submit", function ( event ) {
		event.preventDefault();
		formSubmit(addpictureForm, 2);
	});
	
	// neben dem drop-event müssen auch "dragenter" und "dragover" mit dem Eventlistener behandelt werden,
	// da sonst das hochzuladene Bild im Browser angezeigt werden würde ohne es hochzuladen
	document.getElementById('uploadzone').addEventListener('drop', handleDropEvent, false);
	document.getElementById('uploadzone').addEventListener('dragenter', handleDropEvent, false); 
	document.getElementById('uploadzone').addEventListener('dragover', handleDropEvent, false);
});
 
function formSubmit(f, showMessageVersion) {
	
	//console.log(f);

	var xhr = new XMLHttpRequest(); // Beginn AJAX
	var employeeinfoobject;
	var msg;
	var formData = new FormData(f); // new FormData() erwartet ein html-form und erzeugt ein neues Objekt

	xhr.onreadystatechange = function() { //onreadystatechange ist eine Eigenschaft des Objektes xhr welche die darauf folgende Funktion zugewiesen bekommt
	  if (this.readyState == 4 && this.status == 200) {
		if(this.responseText == "[]") {
			showMessageFailSearch();
		} else {	
			employeeinfoobject = JSON.parse(this.responseText); // "this" ist das Objekt xhr
																// "responseText" ist eine Eigenschaft von xhr, welches ein JSON in form von Text ist und das Ergebnis der register.php (echo $msg;) enthält
																// JSON.parse macht aus dem this.responseText wieder ein Array welches dann in employeeinfoobject gespeichert wird
			clearFailMessage();
			if (showMessageVersion == 1){
				showMessageSearchForm(employeeinfoobject);
				document.getElementById('griditem2').className="griddesign show animatezoom";
				document.getElementById('griditem3').className="griddesign show animatezoom";
			} else {						       
			showMessageAddpictureForm(employeeinfoobject);
			document.getElementById("pictureadderbutton").className = "disabledbutton";
			}			
		}									   
											   
	  }
	};

	xhr.open(f.getAttribute("method"), f.getAttribute("action")); // Öffnet einen Kanal zum PHP-Server bzw. hier zur register.php
																  // alternativ: xhr.open("POST", "register.php")
																  // hier wird das javascript, das html und das php verbunden
																  // Allg. Aufbau: xhr.open(string <Art der Übertragung>, string <Ziel der Anfrage>[, bool <Anfrage Asynchron?>])
	// Sendet die Anfrage über den Vorher geöffneten Kanal
	xhr.send(formData);
}


// die Funktion showMessageSearchForm(msg) nimmt ein Objekt (Array) entgegen und platziert den Inhalt in die dafür vorgesehenen Stellen im HTML
function showMessageSearchForm(msg) {
	document.getElementById("employeeid_output").innerText = msg[0].userid;
	document.getElementById("employeename_output").innerText = msg[0].vorname + " " + msg[0].nachname;
	document.getElementById("employeeposition_output").innerText = msg[0].position;
	document.getElementById("workplace_output").innerText = msg[0].gebaeude + ", " + msg[0].raum;
	document.getElementById("employeepicture").setAttribute("src","img/"+msg[0].bilddateiname);
}

// die Funktion showMessageAddpictureForm() disabled den "Bild hinzufügen" Button und platziert ein Text bei erfolgreich hochgeladenem Bild
function showMessageAddpictureForm() {
	document.getElementById("pictureadderbutton").disabled = true;
	document.getElementById("uploadmessage").innerText="Bild erfolgreich hochgeladen";
}

// die Funktion showMessageFailSearch() platziert einen Text für den Fall, dass der eingegebene Mitarbeiter nicht existiert
function showMessageFailSearch() {
	document.getElementById("searchfailmessage").innerText="Dieser Mitarbeiter existiert nicht.";
}

// die Funktion clearFailMessage() leert den Ausgegebenen Text aus der Funktion showMessageFailSearch()
function clearFailMessage(){
	document.getElementById("searchfailmessage").innerText="";
}

// die Funktion showFileTypeFail() platziert einen Text für den Fall, dass ein unerlaubtes Dateiformt hochgeladen werden soll
function showFileTypeFail() {
	document.getElementById("filetypefailtext").innerText="Es dürfen nur Dateien vom Format  jpg, jpeg, png oder bmp hochgeladen werden.";
	
}

// die Funktion showFileSizeFail() platziert einen Text für den Fall, dass eine Datei größer als 20 MB hochgeladen werden soll
function showFileSizeFail() {
	document.getElementById("filetypefailtext").innerText="Es dürfen nur Dateien bis maximal 15 MB hochgeladen werden";	
}

// die Funktion clearTypeFailMessage() leert den Ausgegebenen Text aus den Funktionen showFileTypeFail() und showFileSizeFail()
function clearTypeFailMessage(){
	document.getElementById("filetypefailtext").innerText="";
}

// Tutorial zum Thema Drag&Drop (nicht fehlerfrei, hier im Code aber richtig umgesetzt)
// https://www.ab-heute-programmieren.de/drag-and-drop-upload-mit-html5/ 

var totalSize = 0; // Enthält die Gesamtgröße aller hochzuladenden Dateien
var totalProgress = 0; // Enthält den aktuellen Gesamtfortschritt
var currentUpload = null; // Enthält die Datei, die aktuell hochgeladen wird

// die Funktion handleDropEvent(event) wird aufgerufen sobald ein drop-, dragenter- oder dragover-Event in der Uploadzone registriert wird
// sie prüft das Dateiformat und läd das Bild bei Übereinstimmung hochgeladen
// stimmt das Dateiformat nicht, wird eine Fehlermeldung ausgegeben und der "Bild hinzufügen" Button wird disabled
function handleDropEvent(event)
{
    event.stopPropagation();
    event.preventDefault();
	const regex = /([^.]*$)/gm;	
		
	if(event.dataTransfer.files.length > 0) {
		console.log(event.dataTransfer.files[0]);
		var filetype = regex.exec(event.dataTransfer.files[0].name)[0].toLowerCase();
		var filesize = event.dataTransfer.files[0].size;
		if(filesize <= 15728640){
			if(filetype == "jpg" || filetype == "jpeg" || filetype == "png" || filetype== "bmp"){
				totalSize += event.dataTransfer.files[0].size; // Hinzufügen der Dateigröße zur Gesamtgröße
				clearTypeFailMessage();
				currentUpload = event.dataTransfer.files[0];
				uploadFile(event.dataTransfer.files[0]);
			} else {
				showFileTypeFail();
				document.getElementById("pictureadderbutton").disabled = true;
				document.getElementById("pictureadderbutton").className="disabledbutton";			
			}
		} else {
			showFileSizeFail();
			document.getElementById("pictureadderbutton").disabled = true;
			document.getElementById("pictureadderbutton").className="disabledbutton";			
		}
	}	
}

// die Funktion uploadFile(file) nimmt eine Datei entgegen und läd sie hoch
function uploadFile(file)
{
    var xhr = new XMLHttpRequest();    // den AJAX Request anlegen
    xhr.open('POST', 'addpicture.php');    // Angeben der URL und des Requesttyps

	xhr.upload.addEventListener("progress", handleProgress);
	xhr.addEventListener("load", handleComplete);
	xhr.addEventListener("error", handleError);
	
    var formdata = new FormData();  // Anlegen eines FormData Objekts zum Versenden unserer Datei
    formdata.append('uploadfile', file);  // Anhängen der Datei an das Objekt
    xhr.send(formdata);  // Absenden des Requests
}

function handleComplete(event)
{
    totalProgress += currentUpload.size;  // Füge die Größe dem Gesamtfortschritt hinzu
	document.getElementById('progress').innerHTML = 'Aktueller Fortschritt: ' + (totalProgress / totalSize)*100 + '%';
	document.getElementById("pictureadderbutton").disabled = false; // der Submitbutton wird erst enabled, sobald ein Bild erfolgreich hochgeladen wurde
	document.getElementById("pictureadderbutton").className = "button";
}
 
function handleError(event)
{
    document.getElementById("uploadmessage").innerText="Fehler beim Hochladen";
    totalProgress += currentUpload.size;  // Die Datei wird dem Progress trotzdem hinzugefügt, damit die Prozentzahl stimmt
}
 
function handleProgress(event)
{
    var progress = totalProgress + event.loaded;  // Füge den Fortschritt des aktuellen Uploads temporär dem gesamten hinzu
	//console.log(progress + "handleProgress");
    document.getElementById('progress').innerHTML = 'Aktueller Fortschritt: ' + (progress / totalSize)*100 + '%';
}
