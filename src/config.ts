import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    MONGO_URI: process.env.MONGO_URI,
  };
});
