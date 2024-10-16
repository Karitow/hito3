import express, { json } from 'express';
import cors from 'cors';
import { serverLog } from '../middlewares/index.middleware.js';
import { cartRouter, orderRouter, productRouter, router, userRouter} from "../routes/indexRoutes.js";
import errorHandler from '../middlewares/error.middleware.js';

const app = express();
const PORT = process.env.PORT ?? 3000

app.use(cors());
app.use(json());

app.use(serverLog);

app.use('/restobuApi/cart',cartRouter);
app.use('/restobuApi/orders', orderRouter);
app.use('/restobuApi/products',productRouter);
app.use('/restobuApi/users',userRouter);
app.use(errorHandler);

app.all('*', (req,res) => res.status(404).json({status: false, code: 404, message: 'Page not found'}));

app.listen(PORT, () => console.log(`Server UP in ${PORT}`));

export default app;