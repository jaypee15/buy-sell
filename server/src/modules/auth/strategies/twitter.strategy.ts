import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from '../../users/schemas/user.schema';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super({
      consumerKey: configService.get<string>('TWITTER_CONSUMER_KEY'),
      consumerSecret: configService.get<string>('TWITTER_CONSUMER_SECRET'),
      callbackURL: configService.get<string>('TWITTER_CALLBACK_URL'),
      includeEmail: true, // Request email from Twitter
    });
  }

  async validate(
    token: string,
    tokenSecret: string,
    profile: any,
    done: (error: any, user?: any) => void,
  ): Promise<any> {
    const email = profile.emails && profile.emails[0].value;
    const [firstName, ...lastNameParts] = profile.displayName.split(' ');
    const lastName = lastNameParts.join(' ');

    let user = await this.userModel.findOne({
      $or: [{ twitterId: profile.id }, { email }],
    });

    if (!user) {
      // Create new user if they don't exist
      user = await this.userModel.create({
        email,
        twitterId: profile.id,
        firstName,
        lastName,
        emailVerified: false, // Twitter doesn't guarantee email verification
        role: UserRole.BUYER, // Default role for new users
      });
    } else if (!user.twitterId) {
      // Link Twitter account to existing user
      user.twitterId = profile.id;
      await user.save();
    }

    done(null, user);
  }
}
