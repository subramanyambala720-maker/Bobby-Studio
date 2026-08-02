import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import type { Request, Response } from 'express';

const router = Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 5000 }),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const contact = await Contact.create(req.body);

      // TODO: Send email notification via Nodemailer

      res.status(201).json({
        contact,
        message: 'Thank you for reaching out! We\'ll get back to you within 24 hours.',
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
