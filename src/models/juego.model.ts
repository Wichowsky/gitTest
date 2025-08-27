import {Entity, model, property} from '@loopback/repository';

@model()
export class Juego extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
  })
  juego?: string;

  @property({
    type: 'string',
  })
  jugadores?: string;


  constructor(data?: Partial<Juego>) {
    super(data);
  }
}

export interface JuegoRelations {
  // describe navigational properties here
}

export type JuegoWithRelations = Juego & JuegoRelations;
