<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php


    $list = [10, 5, 8, 11, "Hello", 5];

    foreach ($list as $item) {
        if (is_numeric($item)) {
            echo $item . "<br>";
        }
    }

    ?>

</body>

</html>