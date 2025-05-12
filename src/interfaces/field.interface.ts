import { FieldType } from '@prisma/client';

export interface CreateFieldDto {
    name: string;
    description: string;
    type: FieldType;
}

export interface FieldResponse {
    id: number;
    name: string;
    description: string;
}
