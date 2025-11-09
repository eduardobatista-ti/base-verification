import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lca_students')
export class LceStudents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  cpf: string;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true, name: 'deleted_at' })
  deletedAt: Date;
}
