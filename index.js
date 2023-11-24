const xlsx = require('xlsx');
const { exec } = require('child_process');

const file = xlsx.readFile('FINAL-WEB.xlsx');
const sheetName = file.SheetNames[0];
const sheet = file.Sheets[sheetName];

const data = xlsx.utils.sheet_to_json(sheet);
const gitLinks = data.map(row => row.link);
const ids = data.map(row => row.id);

gitLinks.forEach((link, index) => {
  const id = ids[index];
  if (link.includes('github.com')) {
    const command = `git clone ${link} ${id}`;
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao clonar ${link}: ${stderr}`);
      } else {
        console.log(`Projeto clonado com sucesso: ${link}`);
      }
    });
  }
});
