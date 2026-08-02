import { Router } from 'express';
import Testimonial from '../models/Testimonial.js';
import { protect, authorize, type AuthRequest } from '../middleware/auth.js';
import type { Request, Response } from 'express';

const router = Router();

// @route   GET /api/testimonials
// @desc    Get approved testimonials
// @access  Public
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { featured, limit = 10 } = req.query;
    const query: any = { isApproved: true };
    if (featured === 'true') query.isFeatured = true;

    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({ testimonials, count: testimonials.length });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/testimonials
// @desc    Submit a testimonial
// @access  Public (requires review)
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.create({
      ...req.body,
      isApproved: false,
    });
    res.status(201).json({ testimonial, message: 'Thank you! Your testimonial is pending review.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PATCH /api/testimonials/:id/approve
// @desc    Approve a testimonial
// @access  Admin/Manager
router.patch('/:id/approve', protect, authorize('admin', 'manager'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!testimonial) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    res.json({ testimonial, message: 'Testimonial approved' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Admin
router.delete('/:id', protect, authorize('admin'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
