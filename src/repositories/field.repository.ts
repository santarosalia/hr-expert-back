import { PrismaClient, Field, FieldItem } from '@prisma/client';
import { CreateFieldDto } from '../interfaces/field.interface';

export class FieldRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(data: CreateFieldDto): Promise<Field> {
        return this.prisma.field.create({
            data: {
                label: data.label,
                key: data.key,
                description: data.description,
                fieldItems: {
                    create: data.fieldItems,
                },
            },
        });
    }

    async findAll(): Promise<(Field & { fieldItems: FieldItem[] })[]> {
        return this.prisma.field.findMany({
            orderBy: {
                id: 'asc',
            },
            include: {
                fieldItems: true,
            },
        });
    }
}
