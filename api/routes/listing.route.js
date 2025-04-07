import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing); //route for create listing 
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id',getListing);//listing page ko lagi 
router.get('/get', getListings);//search ko lagi

export default router;