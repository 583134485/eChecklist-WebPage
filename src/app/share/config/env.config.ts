import { environment } from '../../../environments/environment';
export const config: EnvConfig = environment;

class EnvConfig {
  env: string;
  production: boolean;
}
