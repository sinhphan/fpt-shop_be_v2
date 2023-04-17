import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  link: process.env.DATABASE_LINK,
}));
