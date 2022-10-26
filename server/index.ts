import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from './routes/rootRouter';

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: `${process.env.BASE_URL}`,
		credentials: true,
	})
);
app.use(morgan('dev'));
app.use(cookieParser());

// routes
app.use('/api', routes);

// Database
import './config/database';

// server listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
