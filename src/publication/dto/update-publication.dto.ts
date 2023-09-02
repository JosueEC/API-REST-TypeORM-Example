import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';

// Esta es otra forma de crear una clase parcial como el partial de typescript
// de esta forma creas una copia de la clase, pero indicando que todas las
// propiedades van a ser opcionales.
export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {}
