import mongoose, { Schema, type Document } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  clientPhoto: string;
  rating: number;
  review: string;
  service: mongoose.Types.ObjectId;
  serviceName: string;
  role: string;
  isFeatured: boolean;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    clientPhoto: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, 'Review text is required'],
      maxlength: 1000,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
    serviceName: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'Client',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

testimonialSchema.index({ isFeatured: 1, isApproved: 1 });
testimonialSchema.index({ rating: -1 });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
export default Testimonial;
