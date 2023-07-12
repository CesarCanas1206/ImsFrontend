const fs = require('fs')

const file = fs.readFileSync('./build/index.html', {
  encoding: 'utf8',
  flag: 'r',
})

const prepend = `<?php
  $explode = explode('/', $_SERVER['REQUEST_URI']);
  $client = $explode[1];
?>`

const newFile = [
  prepend,
  file.replace('href="./"', 'href="/<?php echo $client ?>/"'),
].join('\n')

fs.writeFileSync('./build/index.php', newFile)
fs.unlink('./build/index.html', (err) => {
  if (err) throw err
  console.log('path/file.txt was deleted')
})
