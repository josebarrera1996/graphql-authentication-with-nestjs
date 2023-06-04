/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategu extends PassportStrategy(Strategy) {
    // Inyección de dependencias
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hide-me', // process.env.SECRET_KEY
            logging: true
        });
    }

    // Implementando el siguiente método para realizar una validación mediante JWT
    // Al decodificarlo
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}