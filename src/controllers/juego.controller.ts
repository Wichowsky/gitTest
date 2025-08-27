import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Juego} from '../models';
import {JuegoRepository} from '../repositories';

export class JuegoController {
  constructor(
    @repository(JuegoRepository)
    public juegoRepository : JuegoRepository,
  ) {}

  @post('/juegos')
  @response(200, {
    description: 'Juego model instance',
    content: {'application/json': {schema: getModelSchemaRef(Juego)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juego, {
            title: 'NewJuego',
            exclude: ['id'],
          }),
        },
      },
    })
    juego: Omit<Juego, 'id'>,
  ): Promise<Juego> {
    return this.juegoRepository.create(juego);
  }

  @get('/juegos/count')
  @response(200, {
    description: 'Juego model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Juego) where?: Where<Juego>,
  ): Promise<Count> {
    return this.juegoRepository.count(where);
  }

  @get('/juegos')
  @response(200, {
    description: 'Array of Juego model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Juego, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Juego) filter?: Filter<Juego>,
  ): Promise<Juego[]> {
    return this.juegoRepository.find(filter);
  }

  @patch('/juegos')
  @response(200, {
    description: 'Juego PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juego, {partial: true}),
        },
      },
    })
    juego: Juego,
    @param.where(Juego) where?: Where<Juego>,
  ): Promise<Count> {
    return this.juegoRepository.updateAll(juego, where);
  }

  @get('/juegos/{id}')
  @response(200, {
    description: 'Juego model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Juego, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Juego, {exclude: 'where'}) filter?: FilterExcludingWhere<Juego>
  ): Promise<Juego> {
    return this.juegoRepository.findById(id, filter);
  }

  @patch('/juegos/{id}')
  @response(204, {
    description: 'Juego PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Juego, {partial: true}),
        },
      },
    })
    juego: Juego,
  ): Promise<void> {
    await this.juegoRepository.updateById(id, juego);
  }

  @put('/juegos/{id}')
  @response(204, {
    description: 'Juego PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() juego: Juego,
  ): Promise<void> {
    await this.juegoRepository.replaceById(id, juego);
  }

  @del('/juegos/{id}')
  @response(204, {
    description: 'Juego DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juegoRepository.deleteById(id);
  }
}
