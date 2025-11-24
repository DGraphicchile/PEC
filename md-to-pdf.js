#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const MarkdownIt = require('markdown-it');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Inicializa el parser de Markdown
const md = new MarkdownIt();

// Función para procesar diagramas Mermaid en el HTML
function processMermaidDiagrams(html) {
  // Buscar bloques de código con clase 'mermaid' o language 'mermaid'
  return html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, 
    '<div class="mermaid">$1</div>');
}

/**
 * Función principal que orquesta la conversión de Markdown a PDF.
 * @param {string} inputPath - La ruta al archivo Markdown de entrada.
 * @param {string} outputPath - La ruta donde se guardará el archivo PDF de salida.
 */
async function convertMarkdownToPdf(inputPath, outputPath) {
  console.log('Iniciando conversión...');

  try {
    // Verificar que el archivo de entrada existe
    await fs.access(inputPath);
    
    // Verificar que el directorio de salida es accesible
    const outputDir = path.dirname(outputPath);
    await fs.access(outputDir, fs.constants.W_OK);
    
    // 1. Leer el archivo Markdown
    console.log(`Leyendo archivo: ${inputPath}`);
    const markdownContent = await fs.readFile(inputPath, 'utf8');

    // 2. Convertir Markdown a HTML
    console.log('Convirtiendo Markdown a HTML...');
    let htmlContent = md.render(markdownContent);
    
    // 2.1. Procesar diagramas Mermaid
    console.log('Procesando diagramas Mermaid...');
    htmlContent = processMermaidDiagrams(htmlContent);
    
    // Obtener información del archivo para el footer
    const fileName = path.basename(inputPath);
    const generationTime = new Date().toLocaleString();

    // 3. (Opcional pero recomendado) Añadir estilos CSS básicos para un mejor aspecto
    // Este CSS está inspirado en el estilo de GitHub. Puedes personalizarlo o cargarlo desde un archivo.
    const styledHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-size: 11pt; line-height: 1.4; color: #24292e; padding: 45px; }
            h1, h2, h3 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
            code { font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace; background-color: rgba(27,31,35,0.05); padding: 0.2em 0.4em; margin: 0; font-size: 85%; border-radius: 3px; }
            pre { padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: #f6f8fa; border-radius: 3px; }
            pre code { background-color: transparent; border: 0; }
            blockquote { color: #6a737d; border-left: 0.25em solid #dfe2e5; padding: 0 1em; }
            table { border-collapse: collapse; width: 100%; table-layout: fixed; word-wrap: break-word; }
            th, td { border: 1px solid #dfe2e5; padding: 4px 8px; font-size: 0.9em; overflow-wrap: break-word; hyphens: auto; }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    // 4. Usar Puppeteer para generar el PDF
    console.log('Lanzando navegador headless...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Establecemos el contenido de la página
    await page.setContent(styledHtml, { waitUntil: 'networkidle0' });
    
    // Inicializar Mermaid para renderizar diagramas
    await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js' });
    
    // Configurar e inicializar Mermaid
    await page.evaluate(async () => {
      mermaid.initialize({ 
        startOnLoad: false,
        theme: 'default',
        fontFamily: 'arial',
        fontSize: '12px',
        securityLevel: 'loose'
      });
      
      // Renderizar todos los diagramas mermaid
      const mermaidElements = document.querySelectorAll('.mermaid');
      for (let i = 0; i < mermaidElements.length; i++) {
        const element = mermaidElements[i];
        const graphDefinition = element.textContent;
        const { svg } = await mermaid.render(`mermaid-${i}`, graphDefinition);
        element.innerHTML = svg;
      }
    });
    
    // Esperar un poco más para asegurar renderizado completo
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log(`Generando PDF en: ${outputPath}`);
    await page.pdf({
      path: outputPath,
      format: 'Legal', // Formato de la hoja (Oficio)
      printBackground: true, // Imprime los fondos (importante para el CSS)
      margin: { // Márgenes del documento
        top: '1cm',
        right: '0.5cm',
        bottom: '1.5cm',
        left: '0.5cm',
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>', // Header vacío
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 1cm; margin: 0;">
          <span>${fileName} - Generated: ${generationTime}</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
    });

    // 5. Cerrar el navegador
    await browser.close();

    console.log('✅ ¡Conversión completada exitosamente!');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('❌ Error: El archivo de entrada no existe:', inputPath);
    } else if (error.code === 'EACCES') {
      console.error('❌ Error: Sin permisos para escribir en:', path.dirname(outputPath));
    } else {
      console.error('❌ Error durante la conversión:', error.message);
    }
    process.exit(1); // Salir con código de error
  }
}

// Configuración de Yargs para la interfaz de línea de comandos (CLI)
yargs(hideBin(process.argv))
  .command(
    '$0 <input> [output]', // Comando por defecto
    'Convierte un archivo Markdown a PDF',
    (yargs) => {
      // Positional argument para el archivo de entrada
      yargs.positional('input', {
        describe: 'Ruta al archivo Markdown de entrada',
        type: 'string',
      });
      // Positional argument opcional para el archivo de salida
      yargs.positional('output', {
        describe: 'Ruta para el archivo PDF de salida. Si no se especifica, se usa el nombre del input con extensión .pdf',
        type: 'string',
        default: null,
      });
    },
    (argv) => {
      // Lógica que se ejecuta cuando el comando es llamado
      const inputPath = path.resolve(argv.input);
      
      let outputPath;
      if (argv.output) {
        outputPath = path.resolve(argv.output);
      } else {
        // Si no se proporciona salida, crea un nombre de archivo basado en la entrada
        const inputParsed = path.parse(inputPath);
        outputPath = path.join(inputParsed.dir, `${inputParsed.name}.pdf`);
      }
      
      // Asegurarse de que la salida tenga la extensión .pdf
      if (path.extname(outputPath).toLowerCase() !== '.pdf') {
          outputPath += '.pdf';
      }

      convertMarkdownToPdf(inputPath, outputPath);
    }
  )
  .alias('h', 'help')
  .parse();