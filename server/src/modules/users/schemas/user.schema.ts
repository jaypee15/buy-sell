import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
  BUYER = 'buyer',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop()
  password?: string;

  @Prop()
  googleId?: string;

  @Prop()
  twitterId?: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.BUYER })
  role: UserRole;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  company?: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expires: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
