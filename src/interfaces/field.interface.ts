export interface CreateFieldDto {
    id?: number;
    label: string;
    description: string;
    key: string;
    fieldItems: FieldItemDto[];
}

export interface FieldResponse {
    id: number;
    label: string;
    description: string;
}

export interface FieldItemDto {
    label: string;
    description: string;
    key: string;
    order: number;
}
