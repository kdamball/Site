<?php
	$log = 0;
	//receiving the form inputs in an array
	$fields = array(
		"Posting Type: " => htmlentities($_POST['type'], ENT_QUOTES),
		"Submitter's Name: " => htmlentities($_POST['subname'], ENT_QUOTES),
		"ASALHID: " => htmlentities($_POST['asalhid'], ENT_QUOTES),
		"Email: " => htmlentities($_POST['subemail'], ENT_QUOTES),
		"Phone: " => htmlentities($_POST['phone'], ENT_QUOTES),
		"Title: " => htmlentities($_POST['title'], ENT_QUOTES),
		"Sponsor: " => htmlentities($_POST['sponsor'], ENT_QUOTES),
		"Job Title: " => htmlentities($_POST['jobTitle'], ENT_QUOTES),
		"Job Type: " => htmlentities($_POST['jobType'], ENT_QUOTES),
		"Author: " => htmlentities($_POST['author'], ENT_QUOTES),
		"Book: " => htmlentities($_POST['book'], ENT_QUOTES),
		"Department: " => htmlentities($_POST['department'], ENT_QUOTES),
		"Date: " => htmlentities($_POST['date'], ENT_QUOTES),
		"Time: " => htmlentities($_POST['time'], ENT_QUOTES),
		"Location: " => htmlentities($_POST['location'], ENT_QUOTES),
		"Address: " => htmlentities($_POST['address'], ENT_QUOTES),
		"City: " => htmlentities($_POST['city'], ENT_QUOTES),
		"State: " => htmlentities($_POST['state'], ENT_QUOTES),
		"Budget: " => htmlentities($_POST['budget'], ENT_QUOTES),
		"Flexible: " => htmlentities($_POST['flexible'], ENT_QUOTES),
		"Previous Speak: " => nl2br(htmlentities($_POST['previousSpeaking'], ENT_QUOTES)),
		"Other Topic: " => nl2br(htmlentities($_POST['otherTopics'], ENT_QUOTES)),
		"Description: " => nl2br(htmlentities($_POST['description'], ENT_QUOTES)),
		"Posting Link: " => htmlentities($_POST['link'], ENT_QUOTES)
	);
	 echo $log+=1;
	
	//message body for the email with form inputs
	$messageDetail = "
		<html>
			<body style='background-color:#43E0CE;border-radius:5px;padding:10px;'>
				<h2>Community Board Posting</h2>";
				
	//taking only non-empty fields and attaching them to the message body
	foreach ($fields as $x=>$y){
		if(!empty($y)){
			$messageDetail .= "<strong>". $x ."</strong>". $y . "<br>";
		}
	}
	echo $log+=1;
	
	 //closing the html email			
	$messageDetail .= "			
			</body>
		</html>
	";
	
	echo $log+=1;
	
	//swiftMailer loading
	require_once '/lib/swift_required.php';
	
	echo $log+=1;
	
	// Mail
	$transport = Swift_MailTransport::newInstance();

	// Create the Mailer using your created Transport
	$mailer = Swift_Mailer::newInstance($transport);
	
	echo $log+=1;
	
	// Creating a message
	$message = Swift_Message::newInstance($fields["Posting Type: "] . ' posting')
	  ->setFrom(array('kado@kdamball.com' => 'Kado Damball'))
	  ->setTo(array(
		'kadodamball@gmail.com' => 'Kado',
		$fields["Email: "] => $fields["Submitter's Name: "]
	  ))
	  ->setBody($messageDetail, 'text/html')
	  ;
	
	echo $log+=1;
	
	//if there's a file, attach it
	if($_FILES['file']['tmp_name']){
	
		if(($_FILES["file"]["size"]/(1024*1024)) > 11){
		
			//Page redirect for files above the size limit
			$bigFileRedirect = 'http://asalh.net/web_submission_form.html#bigFile'; 
			header("Location: $bigFileRedirect");
			
			//stop executing the script
			exit;
			
		}else{
			
			//attaching the file
			$message->attach(Swift_Attachment::fromPath($_FILES['file']['tmp_name'])->setFilename($_FILES['file']['name']));

		}
	}
	
	echo $log+=1;
	
	// Send the message
	$result = $mailer->send($message);
	
	echo $log+=1;
	
	//successful landing page
	$thankYouUrl = 'http://asalh.net/web_submission_form_sucess.html';
	header("Location: $thankYouUrl");
	
	exit;
	
?>