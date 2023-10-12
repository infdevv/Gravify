<?php
// Check if the key parameter is set in the URL
if (isset($_GET['key']) && isset($_GET['content'])) {
    // Sanitize the key to prevent directory traversal attacks

    // Specify the file path
    $txtFilePath = $key . '.txt';

    // Get the content from the URL parameter
    $content = $_GET['content'];

    // Append content to the text file on a new line
    file_put_contents($txtFilePath, $content . PHP_EOL, FILE_APPEND);

    echo 'Content appended successfully!';
} else {
    echo 'Please provide both key and content parameters in the URL.';
}
?>
