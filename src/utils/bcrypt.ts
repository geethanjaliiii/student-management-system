import bcrypt from "bcrypt";

export class BcryptPass {
  public async hashPassword(password: string): Promise<string> {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('hashed pas',hashedPassword);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
      throw error; // Rethrow the error after logging
    }
  
    
   
  }
  public async comparePassword(
    currentPassword: string,
    passwordInDb: string
  ): Promise<boolean> {
    return await bcrypt.compare(currentPassword, passwordInDb);
  }
}
