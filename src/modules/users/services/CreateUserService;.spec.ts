import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Luizu',
      email: 'luizu@test.com',
      password: 'luizupass',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Luizu');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Luizu',
      email: 'luizu@test.com',
      password: 'luizupass',
    });

    expect(
      createUser.execute({
        name: 'Luizu',
        email: 'luizu@test.com',
        password: 'luizupass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
