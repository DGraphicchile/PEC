
const { exec } = require('child_process');
const path = require('path');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error('Usage: node md-to-docx.js <input.md> <output.docx>');
  process.exit(1);
}

const absoluteInputPath = path.resolve(inputFile);
const absoluteOutputPath = path.resolve(outputFile);

const now = new Date();
const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

const mermaidFilterPath = path.resolve(__dirname, '../node_modules/.bin/mermaid-filter');
const referenceDocPath = path.resolve(__dirname, 'plantilla_documentos.docx');
const metadataPath = path.resolve(__dirname, 'metadata.yaml');
const command = `pandoc --verbose "${absoluteInputPath}" -F "${mermaidFilterPath}" -o "${absoluteOutputPath}" --reference-doc="${referenceDocPath}" --metadata-file="${metadataPath}" --variable "date=Generado: ${timestamp}"`;

console.log('--- DEBUG INFO ---');
console.log(`Input File: ${absoluteInputPath}`);
console.log(`Output File: ${absoluteOutputPath}`);
console.log(`Reference Doc: ${referenceDocPath}`);
console.log(`Full Command: ${command}`);
console.log('------------------');

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing pandoc: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`pandoc stderr: ${stderr}`);
    return;
  }
  console.log(`Successfully converted ${inputFile} to ${outputFile}`);
});
