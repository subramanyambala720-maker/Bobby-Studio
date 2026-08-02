import mongoose, { Schema, type Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  heroImage: string;
  gallery: string[];
  category: string;
  highlights: string[];
  startingPrice: number;
  currency: string;
  packages: mongoose.Types.ObjectId[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: 200,
    },
    heroImage: {
      type: String,
      default: '',
    },
    gallery: [{
      type: String,
    }],
    category: {
      type: String,
      required: true,
      enum: [
        'wedding', 'portrait', 'fashion', 'commercial', 'product',
        'food', 'jewellery', 'architecture', 'interior', 'drone',
        'cinematography', 'live-streaming', 'destination', 'corporate',
        'baby', 'kids', 'birthday', 'maternity', 'engagement', 'pre-wedding',
      ],
    },
    highlights: [{
      type: String,
    }],
    startingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    packages: [{
      type: Schema.Types.ObjectId,
      ref: 'Package',
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    seoTitle: String,
    seoDescription: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-generate slug from name
serviceSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ isFeatured: 1 });

export const Service = mongoose.model<IService>('Service', serviceSchema);
export default Service;
