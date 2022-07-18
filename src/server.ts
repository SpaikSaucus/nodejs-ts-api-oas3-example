import http from 'http';
import express, {Express} from 'express';
import morgan from 'morgan';
import routes from './routes/operations';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger/api.json';

const router: Express = express();

if (router.get('env') === 'production') {
  router.use(
    morgan('common', {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    })
  );
} else {
  router.use(morgan('dev'));
}

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }
  return next();
});

router.use('/', routes);
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use((req, res) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);
const PORT: unknown = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
