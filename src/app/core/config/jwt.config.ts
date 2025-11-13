// JWT Configuration
export const JWT_CONFIG = {
  // Configuración para el frontend
  TOKEN_NAME: 'access_token',
  HEADER_PREFIX: 'Bearer',

  // Rutas que no requieren autenticación
  WHITE_LIST: [
    '/auth/login',
    '/auth/register',
    '/auth/get_user_phone',
    '/useraffiliateinfo/email_confirmation',
    '/useraffiliateinfo/sendEmailToChangePassword',
    '/useraffiliateinfo/getAffiliateByVerificationCode',
    '/useraffiliateinfo/resetPassword',
    '/useraffiliateinfo/contact_us',
  ],
};
