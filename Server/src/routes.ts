import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import PoinstController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import { celebrate, Joi } from 'celebrate';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PoinstController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points', 
	upload.single('image'), 
	celebrate({
		body: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			whatsapp: Joi.number().required(),
			latitude: Joi.number().required(),
			longitude: Joi.number().required(),
			city: Joi.string().required(),
			uf: Joi.string().required().max(2),
			item: Joi.string().required(),
		})
	}, {
		abortEarly: false
	}),
	pointsController.create
	);


export default routes;

// Service Pattern
// Repositóry Pattern


/*{
	"name": "Mais Seu Luis",
	"email": "email@imperatriz.com.br", 
	"whatsapp": "47998899999", 
	"latitude": -27.608397, 
	"longitude": -48.635481 ,
	"city": "São José", 
	"uf": "SC", 
	"items": [
		1,
		3
	]
}*/