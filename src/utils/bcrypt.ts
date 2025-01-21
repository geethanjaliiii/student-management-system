import bcrypt from 'bcrypt';
export class BcryptPass {
    public async hashPassword(password: string):Promise<string>{
        const hashedPassword = await bcrypt.hash(password,10);
        return hashedPassword;
    }
    public async comparePassword(
        currentPassword: string,
        passwordInDb: string
    ): Promise<boolean>{
        return await bcrypt.compare(currentPassword,passwordInDb);
    }
}