import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Table({ tableName: 'members' })
export class Member extends Model<Member> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  lastName: string;

  @Column({
    type: DataType.ENUM(...Object.values(Gender)),
    allowNull: false,
  })
  gender: Gender;

  @Column({ type: DataType.STRING, allowNull: false })
  dateOfBirth: string;

  @Column({ type: DataType.DATE, allowNull: false })
  subscriptionDate: Date;

  @Column({ type: DataType.STRING(255), allowNull: true })
  phone?: string;

  @Column({ type: DataType.UUID, allowNull: true })
  @ForeignKey(() => Member)
  centralMemberId?: string;

  @BelongsTo(() => Member)
  centralMember?: Member;
}
