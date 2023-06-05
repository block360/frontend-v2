<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require './vendor/autoload.php';


$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->isSMTP();                                      // Set mailer to use SMTP
    //$mail->SMTPDebug = 1;                                 // Enable verbose debug output
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Host = "smtp.webhosting.dk";                       // Specify main and backup SMTP servers
    $mail->Port = 465;                                    // TCP port to connect to
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Username = 'no-reply@gsuexchange.com';                 // SMTP username
    $mail->Password = 'Rf5dUbSu';                           // SMTP password
    $mail->Subject = 'DEX - Customer Support';

    //Recipients
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    $mail->setFrom('no-reply@gsuexchange.com', 'DEX - Customer Support');
    $mail->addAddress('hello@swap.global', 'Swap Global');     // Add a recipient
    // $mail->addAddress('imdanishsaber@gmail.com', 'Danish');     // Add a recipient

    //Content
    $mail->Body    = "
    <h3>DEX - SWAP Global</h3>
    <b>Email Address:</b> 
    <p>$email</p>
    <b>Subject:</b> 
    <p>$subject</p>
    <b>Message:</b> 
    <p>$message</p>
    <p>Contact with the user as soon as possible, as acknowledgement him/her about receiving this email.</p>
    <b>Regards</b> 
    <p>DEX-SWAP Global (http://swap.global/)</p>
    ";
    $mail->send();
    // echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
