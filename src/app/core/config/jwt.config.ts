// JWT Configuration
export const JWT_CONFIG = {
  // Secret key (solo necesaria en el backend, aquí solo como referencia)
  // JWT_SECRET en backend: 4023258bdbf443faea46ace10d35dd2c25fe8e24c3e02d79018d626e225df5776fd9ac75619ce370d7cdd6d98814700975be3b1c27f1e6feb4060cdee6541421

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
