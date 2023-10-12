<?php
// Check if the key parameter is set in the URL
if (isset($_GET['key'])) {
    // Sanitize the key to prevent directory traversal attacks
    

    // Specify the file paths
    $htmlFilePath = $key . '.html';
    $txtFilePath = $key . '.txt';

    // Check if the HTML file exists and delete it
    if (file_exists($htmlFilePath)) {
        unlink($htmlFilePath);
        echo 'HTML file deleted successfully. ';
    }

    // Check if the TXT file exists and delete it
    if (file_exists($txtFilePath)) {
        unlink($txtFilePath);
        echo 'TXT file deleted successfully.';
    }

    // If neither file exists, notify the user
    if (!file_exists($htmlFilePath) && !file_exists($txtFilePath)) {
        echo 'No files found for the specified key.';
    }
} else {
    echo 'Please provide a key parameter in the URL.';
}
?>
