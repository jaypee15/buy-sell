import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from '../../users/schemas/user.schema';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const email = emails[0].value;

    let user = await this.userModel.findOne({
      $or: [{ googleId: profile.id }, { email }],
    });

    if (!user) {
      // Create new user if they don't exist
      user = await this.userModel.create({
        email,
        googleId: profile.id,
        firstName: name.givenName,
        lastName: name.familyName,
        emailVerified: emails[0].verified,
        role: UserRole.BUYER, // Default role for new users
      });
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = profile.id;
      await user.save();
    }

    done(null, user);
  }
}
