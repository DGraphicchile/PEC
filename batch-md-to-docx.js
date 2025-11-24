
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputDir = process.argv[2];
if (!inputDir) {
  console.error('Usage: node batch-md-to-docx.js <directory_path>');
  process.exit(1);
}

const absoluteInputDir = path.resolve(inputDir);

// Create a single timestamp for the output directory name
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputDirName = `docx_${timestamp}`;
const absoluteOutputDir = path.join(absoluteInputDir, outputDirName);

try {
  fs.mkdirSync(absoluteOutputDir, { recursive: true });
  console.log(`Created output directory: ${absoluteOutputDir}`);
} catch (e) {
  console.error(`Failed to create output directory: ${e.message}`);
  process.exit(1);
}

const allFiles = fs.readdirSync(absoluteInputDir);
const mdFiles = allFiles.filter(file => path.extname(file).toLowerCase() === '.md');

if (mdFiles.length === 0) {
  console.log(`No Markdown files found in ${absoluteInputDir}`);
  process.exit(0);
}

console.log(`Found ${mdFiles.length} Markdown file(s) to convert.`);

const referenceDocPath = path.resolve(__dirname, 'plantilla_documentos.docx');
const metadataPath = path.resolve(__dirname, 'metadata.yaml');
const mermaidFilterPath = path.resolve(__dirname, '../node_modules/.bin/mermaid-filter');
const generationTimestamp = new Date().toLocaleString('sv-SE');

mdFiles.forEach(mdFile => {
  const inputFile = path.join(absoluteInputDir, mdFile);
  const outputFileName = `${path.basename(mdFile, '.md')}.docx`;
  const outputFile = path.join(absoluteOutputDir, outputFileName);

  const command = [
    'pandoc',
    `"${inputFile}"`, // Corrected: escaped quotes within template literal
    '-F', `"${mermaidFilterPath}"`, // Corrected: escaped quotes within template literal
    '-o', `"${outputFile}"`, // Corrected: escaped quotes within template literal
    `--reference-doc="${referenceDocPath}"`, // Corrected: escaped quotes within template literal
    `--metadata-file="${metadataPath}"`, // Corrected: escaped quotes within template literal
    `--variable="date=Generado: ${generationTimestamp}"` // Corrected: escaped quotes within template literal
  ].join(' ');

  console.log(`
Converting ${mdFile}...
`); // Added newline for better spacing
  try {
    // Using execSync for simplicity in a batch script.
    // stdio: 'inherit' will show pandoc's output/errors directly.
    execSync(command, { stdio: 'inherit' });
    console.log(`Successfully converted ${mdFile} to ${outputFileName}`);
  } catch (error) {
    console.error(`Failed to convert ${mdFile}.`);
  }
});

console.log('\nBatch conversion complete.\n'); // Added newline for better spacing
