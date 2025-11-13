import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtHelperService {
  /**
   * Decodifica un token JWT sin validarlo
   * @param token Token JWT a decodificar
   * @returns Payload decodificado del token
   */
  decodeToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('JWT debe tener 3 partes');
      }

      const decoded = this.urlBase64Decode(parts[1]);
      if (!decoded) {
        throw new Error('No se pudo decodificar el token');
      }

      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  /**
   * Verifica si un token ha expirado
   * @param token Token JWT a verificar
   * @returns true si el token ha expirado, false en caso contrario
   */
  isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded?.exp) {
        return true;
      }

      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decoded.exp);

      return expirationDate < new Date();
    } catch (error) {
      console.error('Error verificando expiración del token:', error);
      return true;
    }
  }

  /**
   * Obtiene la fecha de expiración de un token
   * @param token Token JWT
   * @returns Fecha de expiración o null
   */
  getTokenExpirationDate(token: string): Date | null {
    try {
      const decoded = this.decodeToken(token);
      if (!decoded?.exp) {
        return null;
      }

      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    } catch (error) {
      console.error('Error obteniendo fecha de expiración:', error);
      return null;
    }
  }

  /**
   * Obtiene el ID de usuario del token
   * @param token Token JWT
   * @returns ID del usuario o null
   */
  getUserIdFromToken(token: string): string | null {
    try {
      const decoded = this.decodeToken(token);
      return decoded?.sub || decoded?.userId || decoded?.id || null;
    } catch (error) {
      console.error('Error obteniendo user ID del token:', error);
      return null;
    }
  }

  /**
   * Decodifica una cadena Base64 URL
   * @param str Cadena a decodificar
   * @returns Cadena decodificada
   */
  private urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('String Base64 inválida');
    }
    return decodeURIComponent(
      globalThis
        .atob(output)
        .split('')
        .map(c => '%' + ('00' + c.codePointAt(0).toString(16)).slice(-2))
        .join(''),
    );
  }
}
