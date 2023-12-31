import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'publications' })
export class Publication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'varchar', length: 200 })
  title: string;

  @Column({ name: 'content', type: 'varchar', length: 500 })
  content: string;

  // El id es para poder usarlo al momento de guardar y tener la
  // relacion con el dato
  @Column({ name: 'authorId', type: 'uuid' })
  authorId: string;

  // La propiedad es para poder recuperar los datos de la referencia

  // Esta es la forma en la que establecemos una relacion 1:n
  // aqui indicamos que muchos Posts estan relacionados a un
  // usuario guardado en la propiedad author.
  // Esta es una parte, en la entidad User tambien se establece
  // la relacion pero usando el decorador @OneToMany() y estableciendo
  // la columna que conecta, que este caso seria esta columna de
  // author
  @ManyToOne(() => User)
  author: User;
}
