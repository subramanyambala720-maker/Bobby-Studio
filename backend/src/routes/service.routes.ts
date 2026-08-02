import { Router } from 'express';
import Service from '../models/Service.js';
import { protect, authorize, type AuthRequest } from '../middleware/auth.js';
import type { Request, Response } from 'express';

const router = Router();

// @route   GET /api/services
// @desc    Get all active services
// @access  Public
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    res.json({ services, count: services.length });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/services/featured
// @desc    Get featured services
// @access  Public
router.get('/featured', async (_req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find({ isActive: true, isFeatured: true })
      .sort({ order: 1 })
      .limit(6);
    res.json({ services });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @route   GET /api/services/:slug
// @desc    Get single service by slug
// @access  Public
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json({ service });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/services
// @desc    Create service
// @access  Admin/Manager
router.post('/', protect, authorize('admin', 'manager'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ service, message: 'Service created successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @route   PUT /api/services/:id
// @desc    Update service
// @access  Admin/Manager
router.put('/:id', protect, authorize('admin', 'manager'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json({ service, message: 'Service updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete service (soft delete)
// @access  Admin
router.delete('/:id', protect, authorize('admin'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
