var { exec } = require('child_process')

exec("ls /dev/input/by-path/ | grep -m 1 'kbd'", function(error, stdout, stderr) {
    console.log(stdout.split('\n')[0])
})