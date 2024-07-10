import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("todo")
export class ToDo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  task: string;

  @Column({
    default: false,
  })
  completed: boolean;
}
