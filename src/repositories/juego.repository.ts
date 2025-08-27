import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatajuegosDataSource} from '../datasources';
import {Juego, JuegoRelations} from '../models';

export class JuegoRepository extends DefaultCrudRepository<
  Juego,
  typeof Juego.prototype.id,
  JuegoRelations
> {
  constructor(
    @inject('datasources.datajuegos') dataSource: DatajuegosDataSource,
  ) {
    super(Juego, dataSource);
  }
}
