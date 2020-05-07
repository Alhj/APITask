import { compare } from 'bcrypt'

export const comparePassword = async (candidatePassword: string, userPassword:string) => {
  const comparePassword = await compare(candidatePassword, userPassword);
  return comparePassword;
}