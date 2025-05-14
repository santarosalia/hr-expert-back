import { PrismaClient } from '@prisma/client';
import { CreateTemplateDto, UpdateTemplateDto } from '../interfaces/template.interface';

const prisma = new PrismaClient();

export class TemplateRepository {
    async create(templateData: CreateTemplateDto) {
        return await prisma.template.create({
            data: {
                name: templateData.name,
                description: templateData.description,
                sections: {
                    create: templateData.sections.map((section) => ({
                        key: section.key,
                        label: section.label,
                        order: section.order,
                        size: section.size,
                        sectionFields: {
                            create: section.sectionFields.map((field) => ({
                                fieldId: field.fieldId,
                                order: field.order,
                            })),
                        },
                    })),
                },
            },
            include: {
                sections: {
                    include: {
                        sectionFields: {
                            include: {
                                field: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findAll() {
        return await prisma.template.findMany({
            include: {
                sections: {
                    include: {
                        sectionFields: {
                            include: {
                                field: {
                                    include: {
                                        fieldItems: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    async findById(id: number) {
        return await prisma.template.findUnique({
            where: { id },
            include: {
                sections: {
                    include: {
                        sectionFields: {
                            include: {
                                field: {
                                    include: {
                                        fieldItems: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    async update(id: number, templateData: UpdateTemplateDto) {
        return await prisma.template.update({
            where: { id },
            data: {
                name: templateData.name,
                description: templateData.description,
            },
            include: {
                sections: {
                    include: {
                        sectionFields: {
                            include: {
                                field: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async delete(id: number) {
        return await prisma.template.delete({
            where: { id },
        });
    }
}
