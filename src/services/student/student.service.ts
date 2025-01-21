import { IUser } from "../../interfaces/User";
import { IStudentRepository } from "../../repositories/student/IStudentRepository";
import { BcryptPass } from "../../utils/bcrypt";
import { IStudentService } from "./IStudent.service";

export class StudentService implements IStudentService {
  private studentRepository: IStudentRepository;
  private bcryptPass: BcryptPass;
 
  constructor(studentRepository: IStudentRepository) {
    this.studentRepository = studentRepository;
    this.bcryptPass = new BcryptPass();
  }
  async createStudent(student: IUser): Promise<IUser | null> {
    const isEmailAlreadyExist = await this.studentRepository.findStudentByEmail(
      student.email
    );
    if (isEmailAlreadyExist) {
      throw new Error("Email already exist.");
    }

    const hashedPassword = await this.bcryptPass.hashPassword(student.password);
    const studentData = {
      ...student,
      password: hashedPassword,
    };
    return await this.studentRepository.createStudent(studentData);
  }

  async checkStudentExistance(email: string, password: string): Promise<IUser> {
    const isStudentWithEmailExist =
      await this.studentRepository.findStudentByEmail(email);
    if (!isStudentWithEmailExist) {
      throw new Error("Student doesn't exist.");
    }
    const isPasswordMatch = await this.bcryptPass.comparePassword(
      password,
      isStudentWithEmailExist.password
    );
    if (!isPasswordMatch) {
      throw new Error("Invalid Email or Password.");
    }
    return isStudentWithEmailExist;
  }

  async updateStudent(
    id: string,
    student: Partial<IUser>
  ): Promise<IUser | null> {
    const isStudentUpdated = student.password;
    if (isStudentUpdated) {
      const hashedPassword = await this.bcryptPass.hashPassword(
        isStudentUpdated
      );
      student.password = hashedPassword;
    }
    return await this.studentRepository.updateStudent(id, student);
  }
  async findStudentById(id: string): Promise<IUser | null> {
    const user = await this.studentRepository.findStudentById(id);
    if (user) throw new Error("Student not found.");
    return user;
  }
}
