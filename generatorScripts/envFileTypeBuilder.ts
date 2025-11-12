import * as fs from 'fs';

const envs = fs.readFileSync('./.env.development', 'utf-8').split('\n');

const envKeys = envs.map(env => `${env.split('=')[0].trim()}: string;`);

const content = `namespace NodeJS {
    interface ProcessEnv {
      ${envKeys.join('\n')}
    }
 }
`;

fs.writeFile(`types/EnvFileTypes.d.ts`, content, err => {
  if (err) throw err;
});
