import { setupServer } from './setup';

setupServer().then(() => {
  console.log('Server setup completed');
}).catch((error) => {
  console.error('Error during server setup:', error);
});