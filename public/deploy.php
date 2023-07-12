<?php
if (($_GET['v'] ?? '') != '034cdc7d-3808-4bc3-8b6a-8cc24cea3604') {
    header("HTTP/1.1 404 Not Found");
    die();
}

$directory = $_GET['d'] ?? 'ims-app';
$branch = $_GET['b'] ?? 'main';
$repo = 'git@gitlab.com:imscomply/ims-app/app.git';

$path = '../../git/' . $directory . '';
$client = ' ../../www/ims-app/';
$backup = $client . '_backup/' . date('YmdHi');
chdir($path);

$commands = [
    //'sudo -u imscompl git clone ' . $repo . ' ' . $path
    'sudo -u imscompl git reset --hard origin/' . $branch . '  2>&1',
    'sudo -u imscompl git pull origin ' . $branch . '  2>&1',
    'sudo -u imscompl /usr/local/bin/npm i --force  2>&1',
    'sudo -u imscompl /usr/local/bin/npm i --force -D @esbuild/linux-x64  2>&1',
    'sudo -u imscompl /usr/local/bin/npm run build  2>&1',
    'sudo -u imscompl /usr/local/bin/node create-indexphp.js  2>&1',
    'sudo -u imscompl mkdir ' . $backup,
    'sudo -u imscompl mv ' . $client . '* ' . $backup,
    'sudo -u imscompl mv ' . $client . '.htaccess ' . $backup,
    'sudo -u imscompl mv build/* ' . $client,
    'sudo -u imscompl mv build/.htaccess ' . $client,
];

foreach ($commands as $command) {
    $output = shell_exec($command);
    echo print_r($output, 1) . "\r\n";
}
