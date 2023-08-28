import bcrypt from 'bcryptjs';
import loginn from '../models/auth';

// eslint-disable-next-line consistent-return
const initAdminUser = async (app, next) => {
  // const { adminEmail, adminPassword } = app.get('config');
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = app.get('config');

  // if (!adminEmail || !adminPassword) {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return next();
  }
  try {
    const adminExisting = await loginn.findOne({ email: ADMIN_EMAIL });
    if (!adminExisting) {
      const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);

      // eslint-disable-next-line new-cap
      const adminUser = new loginn({
        email: ADMIN_EMAIL,
        password: hashedPassword,
        roles: { admin: true },
      });
      await adminUser.save();
      console.log('Usuario administrador creado');
    }
  } catch (error) {
    console.log('Error al crear el usuario administrador:', error);
  }
};
export default initAdminUser;

/*
ADMIN_EMAIL => admin@localhost
ADMIN_PASSWORD => changeme
*/
