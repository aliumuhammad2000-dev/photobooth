import { copyFile, mkdir, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const seedPath = resolve(projectRoot, 'mock/db.seed.json');
const databasePath = resolve(projectRoot, 'mock/db.json');

try {
  await stat(databasePath);
  console.log('Mock database already exists at mock/db.json; leaving it unchanged.');
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }

  await mkdir(dirname(databasePath), { recursive: true });
  await copyFile(seedPath, databasePath);
  console.log('Created mock/db.json from mock/db.seed.json.');
}
