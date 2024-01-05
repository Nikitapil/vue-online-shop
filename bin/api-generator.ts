import { generateApi } from 'swagger-typescript-api';
import * as path from 'node:path';

generateApi({
  name: 'Api',
  // set to `false` to prevent the tool from writing to disk
  output: path.resolve(process.cwd(), './src/api/swagger'),
  templates: path.resolve(process.cwd(), './bin/templates'),
  url: 'http://localhost:5000/api/docs-yaml',
  httpClientType: 'axios',
  extractEnums: false,
  extractRequestParams: true,
  unwrapResponseData: true,
  cleanOutput: true,
  modular: true
});
