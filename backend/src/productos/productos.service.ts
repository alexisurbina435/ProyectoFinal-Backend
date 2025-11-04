import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import  {Producto} from './entities/producto.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoDto } from './dto/producto.dto';

@Injectable()
export class ProductosService {

    constructor(
     @InjectRepository(Producto)
          private ProductoRepository: Repository<Producto>
    ){}

  async create(createProductoDto: CreateProductoDto) {
  const producto: CreateProductoDto = await this.ProductoRepository.save(createProductoDto)
    return `Producto creado agregado${producto} `;
  }

   async findAllProductos(): Promise <CreateProductoDto[]> {
    try{
    const producto: CreateProductoDto[]= await this.ProductoRepository.find()
    return producto;
    
    }catch(ex){
    throw new InternalServerErrorException(ex.message)
    }

  }

  async findOne(id: number):Promise <Producto | null> {
   return  await this.ProductoRepository.findOne({
      where: {id_producto: id}
    });
    
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise <ProductoDto | null> {
    const producto =  this.ProductoRepository.create(updateProductoDto)
    const result = await this.ProductoRepository.update({id_producto:id},producto)
    if(!result.affected){
      return null
    }
    return await this.findOne(id)
  }

  async remove(id: number):Promise <boolean> {
    const borrarProducto = await this.ProductoRepository.delete({id_producto:id})
    if(!borrarProducto){
      throw new NotFoundException(`Producto con el ${id} no se pudo eliminar`)
    }
    return (borrarProducto.affected ?? 0) > 0;
  }
}
