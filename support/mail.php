<?php 
if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {
  exit();
}
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
  exit();
}

$recepient = "";
$recepient_2 = "wazzyjim@gmail.com";
$sitename = "BERAUM.COM";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$tel = trim($_POST["tel"]);
$text = trim($_POST["message"]);
$message = "Имя: $name \nE-mail: $email \nТелефон: $tel \nТекст вопроса: $text";

$pagetitle = "Форма поддержки Beraum от\"$email\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $sitename");
mail($recepient_2, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $sitename");
?>