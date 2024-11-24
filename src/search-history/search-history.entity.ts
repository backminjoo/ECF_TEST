import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyword_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  searched_at: Date;
}
