<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use PHPMailer\PHPMailer\PHPMailer;

$app->post("/api/mails/validerVoeuxPartenaires", function (Request $request, Response $response, $args) {
	$to = $request->getParsedBody()["adresseMailVoeu"];

	$mail = new PHPMailer;
	$mail->isSMTP();
	$mail->SMTPDebug = 2;
	$mail->Host = 'smtp.gmail.com';
	$mail->Port = 465;
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = 'ssl';
	$mail->Username = 'PlatefRelationsInternationales';
	$mail->Password = 'PlateformeRelationsInternationales@';
	$mail->setFrom('PlatefRelationsInternationales@gmail.com', 'Platefrorme relations internattionales');
	//$mail->addReplyTo('test@hostinger-tutorials.fr', 'Votre nom');
	$mail->addAddress($to, 'Nom du destinataire');
	$mail->Subject = 'Essai de PHPMailer';
	//$mail->msgHTML(file_get_contents('message.html'), __DIR__);
	$mail->Body = 'Ceci est le contenu du message en texte clair';

	$test = $mail->Send();

	$error = $mail->ErrorInfo;

	$response->getBody()->write("");
	return $response->withHeader("Content-Type", "application/json");
});