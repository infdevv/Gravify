function createGrabber() {
    keys = "abcdefghijklmnopqrstuvwxyz123456789";
    amount = 15;
    key = "";
    for (i = 0; i < amount; i++) {
        key = (key + keys.charAt(Math.floor(Math.random() * keys.length)));
    }

    document.write(`
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="style.css">
            <title>Gravify</title>
        </head>
        <body>
            <center>
                <br>
                <h2>Your link is: ${key}</h2>
                <br>
                <br>
                <h3 id="link">Generating link...</h3>
            </center>

            <div class="spacebar"></div>

            <center>
                <div id="new"></div>
            </center>

            <script>
                var xhr = new XMLHttpRequest();
                xhr.open("GET", "maker.php?key=" + "${key}", true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            var responseData = xhr.responseText;
                            console.log(responseData);
                            current_url = window.location.hostname;
                            document.getElementById("link").innerHTML = "Your link is: " + current_url + "${key}";
                            document.getElementById("new").innerHTML = \`
                                <table id="table">
                                    <tr>
                                        <td>This is where your IPs will go. Do not exit out of this page, doing so will result in removal of your links validity and your logs being deleted.</td>
                                        <td>Note: This updates every 5 seconds</td>
                                    </tr>
                                </table>
                            \`;
                        } else {
                            console.error("Request failed with status:", xhr.status);
                        }
                    }
                };
                xhr.onerror = function () {
                    console.error("Network error occurred");
                };
                xhr.send();

                setInterval(function () {
                    var checkXhr = new XMLHttpRequest();
                    checkXhr.open("GET", "check.php?key=" + "${key}", true);
                    checkXhr.onreadystatechange = function () {
                        if (checkXhr.readyState == 4) {
                            if (checkXhr.status == 200) {
                                var content = checkXhr.responseText;
                                console.log("Content received:", content);
                                document.getElementById("table").innerHTML = "";
                                for (var i = 0; i < content.length; i++) {
                                    document.getElementById("table").innerHTML += "<tr><td>" + content[i] + "</td></tr>";
                                }
                            } else {
                                console.error("Request failed with status:", checkXhr.status);
                            }
                        }
                    };
                    checkXhr.onerror = function () {
                        console.error("Network error occurred");
                    };
                    checkXhr.send();
                }, 5000);
            </script>
        </body>
    `);

    window.addEventListener('beforeunload', function (event) {
        var cleanerXhr = new XMLHttpRequest();
        cleanerXhr.open("POST", "cleaner.php?key=" + key, true);
        cleanerXhr.onreadystatechange = function () {
            if (cleanerXhr.readyState == 4) {
                if (cleanerXhr.status == 200) {
                    console.log("Files cleaned up successfully.");
                } else {
                    console.error("Error cleaning files.");
                }
            }
        };
        cleanerXhr.onerror = function () {
            console.error("Network error occurred");
        };
        cleanerXhr.send();
    });
}
