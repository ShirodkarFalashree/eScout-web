import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Register the ts-node loader
register('ts-node/esm', pathToFileURL('./'));

// Import and run your TypeScript entry file
import('./src/index.ts');
