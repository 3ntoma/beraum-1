<?php 
$recepient = "service.369@yandex.ru";
$recepient_2 = "corp@beraum.com";
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