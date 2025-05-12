export interface Template {
    id?: number;
    name: string;
    description: string;
    fields?: TemplateField[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateTemplateDto {
    name: string;
    description: string;
    fieldGroups: CreateTemplateFieldGroupDto[];
}

export interface UpdateTemplateDto {
    name?: string;
    description?: string;
    fieldGroups?: CreateTemplateFieldGroupDto[];
}

export interface CreateTemplateFieldGroupDto {
    name: string;
    fields: CreateTemplateFieldDto[];
}

export interface CreateTemplateFieldDto {
    fieldId: number;
    order: number;
    isRequired: boolean;
}

export interface TemplateField {
    id: number;
    templateId: number;
    fieldId: number;
    order: number;
    isRequired: boolean;
}
