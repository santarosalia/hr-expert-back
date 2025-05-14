import { Field, FieldItem } from '@prisma/client';
import { CreateFieldDto } from '../interfaces/field.interface';
import { FieldRepository } from '../repositories/field.repository';

export class FieldService {
    private fieldRepository: FieldRepository;

    constructor() {
        this.fieldRepository = new FieldRepository();
    }

    async createField(data: CreateFieldDto): Promise<Field> {
        if (!data.label) {
            throw new Error('label is required');
        }

        if (!data.key) {
            throw new Error('key is required');
        }

        return this.fieldRepository.create(data);
    }

    async getFields(): Promise<(Field & { fieldItems: FieldItem[] })[]> {
        return this.fieldRepository.findAll();
    }
}
