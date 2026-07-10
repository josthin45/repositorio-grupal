const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Iniciando proceso de construcción (Build) para QuestiaSpace...');

const run = (command, cwd) => {
  console.log(`\nEjecutando: ${command} en ${cwd}...`);
  execSync(command, { cwd: path.resolve(__dirname, cwd), stdio: 'inherit' });
};

try {
  // 1. Instalar dependencias
  run('npm install', '.');
  run('npm install', 'container');
  run('npm install', 'angular-quiz');
  run('npm install', 'react-matching');
  run('npm install', 'vue-cards');

  // 2. Compilar módulos
  run('npm run build', 'angular-quiz');
  run('npm run build', 'react-matching');
  run('npm run build', 'vue-cards');
  run('npm run build', 'container');

  // 3. Mover los dists de los módulos dentro del dist de la contenedora
  const destPath = path.resolve(__dirname, 'container', 'dist');
  
  // Asegurar que exista el destino (Vite lo crea por defecto, pero por seguridad)
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }

  const angularSrc = path.resolve(__dirname, 'angular-quiz', 'dist', 'angular-quiz');
  const reactSrc = path.resolve(__dirname, 'react-matching', 'dist');
  const vueSrc = path.resolve(__dirname, 'vue-cards', 'dist');

  // Mover (usamos fs.cpSync para copiar y luego se puede borrar el source o simplemente dejarlo)
  console.log('\nIntegrando módulos en el directorio de salida...');
  
  fs.cpSync(angularSrc, path.join(destPath, 'angular'), { recursive: true });
  console.log('✔ Angular Quiz integrado.');

  fs.cpSync(reactSrc, path.join(destPath, 'react'), { recursive: true });
  console.log('✔ React Matching integrado.');

  fs.cpSync(vueSrc, path.join(destPath, 'vue'), { recursive: true });
  console.log('✔ Vue Cards integrado.');

  console.log('\n¡Construcción finalizada con éxito! El proyecto está listo en container/dist');
} catch (error) {
  console.error('Error durante el proceso de build:', error);
  process.exit(1);
}
