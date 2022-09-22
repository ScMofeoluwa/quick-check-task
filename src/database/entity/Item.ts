import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { NewsType } from "../../types";

@Entity("items")
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  hackerId?: number;

  @Column()
  title!: string;

  @Column({ type: "boolean", default: true })
  byHackerNews?: boolean;

  @Column()
  text?: string;

  @Column()
  url?: string;

  @Column({
    type: "enum",
    enum: ["job", "story", "comment", "poll", "pollopt"],
  })
  type!: NewsType;
}
