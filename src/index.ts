import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import { AppDataSource } from './database/data-source';  // Importação do Data Source

// Porta do servidor
const PORT = process.env.PORT || 4000;
// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';

// App Express
const app = express();

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
app.use(cors({
    origin: ['http://localhost:3000']
}));

// Inicialize o Data Source antes de iniciar o servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source inicializado com sucesso!');

    // Endpoint raiz
    app.get('/', (req, res) => {
      res.send('Bem-vindo!');
    });

    // Rotas
    app.use('/api', userRouter);

    // Resposta padrão para quaisquer outras requisições
    app.use((req, res) => {
      res.status(404).send('Rota não encontrada.');
    });

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando com sucesso em ${HOSTNAME}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao inicializar o Data Source:', error);
  });