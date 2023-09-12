<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  <?php
  $receiving_email_address = 'akhilbinuroom@gmail.com';
  
  // Check if the PHP Email Form library file exists
  if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
      include($php_email_form);
  } else {
      die('Unable to load the "PHP Email Form" Library!');
  }
  
  // Create a new instance of PHP_Email_Form class
  $contact = new PHP_Email_Form();
  
  // Enable AJAX support
  $contact->ajax = true;
  
  // Set the recipient's email address
  $contact->to = $receiving_email_address;
  
  // Retrieve form data from POST variables
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];
  
  // Uncomment below code if you want to use SMTP to send emails. Enter your SMTP credentials.
  /*
  $contact->smtp = array(
      'host' => 'example.com',
      'username' => 'example',
      'password' => 'pass',
      'port' => '587'
  );
  */
  
  // Add messages to the email body
  $contact->add_message('Name: ' . $_POST['name'], 'From');
  $contact->add_message('Email: ' . $_POST['email'], 'Email');
  $contact->add_message('Message: ' . $_POST['message'], 'Message', 10);
  
  // Send the email and echo the result
  echo $contact->send();
  ?>
  