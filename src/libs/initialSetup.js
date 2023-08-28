import Role from '../models/role';

// eslint-disable-next-line import/prefer-default-export
export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    const values = await Promise.all([
      new Role({ name: 'admin' }).save(),
      new Role({ name: 'user' }).save(),
      new Role({ name: 'waiter' }).save(),
      new Role({ name: 'chef' }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
