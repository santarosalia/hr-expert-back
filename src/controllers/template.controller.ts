import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import type {
    CreateTemplateDto,
    UpdateTemplateDto,
} from '../interfaces/template.interface';

const prisma = new PrismaClient();

// 템플릿 생성
export const createTemplate = async (req: Request, res: Response): Promise<void> => {
    try {
        const templateData: CreateTemplateDto = req.body;

        // 필수 필드 검증
        if (!templateData.name) {
            res.status(400).json({
                success: false,
                message: '템플릿 이름은 필수 입력 항목입니다.',
            });
            return;
        }

        const isEmpty = templateData.fieldGroups.find((fieldGroup) => {
            return fieldGroup.fields.find((field) => {
                return field.fieldId < 1;
            });
        });

        if (isEmpty) {
            res.status(400).json({
                success: false,
                message: '필드 ID는 1 이상이어야 합니다.',
            });
            return;
        }

        const template = await prisma.template.create({
            data: {
                name: templateData.name,
                description: templateData.description,
                fieldGroups: {
                    create: templateData.fieldGroups.map((fieldGroup) => ({
                        name: fieldGroup.name,
                        fields: {
                            create: fieldGroup.fields.map((field) => {
                                return {
                                    fieldId: field.fieldId,
                                    order: field.order,
                                    isRequired: field.isRequired,
                                };
                            }),
                        },
                    })),
                },
            },
            include: {
                fieldGroups: {
                    include: {
                        fields: {
                            include: {
                                field: true,
                            },
                        },
                    },
                },
            },
        });

        res.status(201).json({
            success: true,
            data: template,
        });
    } catch (error) {
        console.error('템플릿 생성 중 오류 발생:', error);
        res.status(500).json({
            success: false,
            message: '템플릿 생성 중 오류가 발생했습니다.',
        });
    }
};

// 모든 템플릿 조회
export const getAllTemplates = async (_req: Request, res: Response): Promise<void> => {
    try {
        const templates = await prisma.template.findMany({
            include: {
                fieldGroups: {
                    include: {
                        fields: {
                            include: {
                                field: true,
                            },
                        },
                    },
                },
            },
        });

        res.status(200).json({
            success: true,
            data: templates,
        });
    } catch (error) {
        console.error('템플릿 조회 중 오류 발생:', error);
        res.status(500).json({
            success: false,
            message: '템플릿 조회 중 오류가 발생했습니다.',
        });
    }
};

// 특정 템플릿 조회
export const getTemplateById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const template = await prisma.template.findUnique({
            where: { id: Number(id) },
            include: {
                fieldGroups: {
                    include: {
                        fields: {
                            include: {
                                field: true,
                            },
                        },
                    },
                },
            },
        });

        if (!template) {
            res.status(404).json({
                success: false,
                message: '템플릿을 찾을 수 없습니다.',
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: template,
        });
    } catch (error) {
        console.error('템플릿 조회 중 오류 발생:', error);
        res.status(500).json({
            success: false,
            message: '템플릿 조회 중 오류가 발생했습니다.',
        });
    }
};
// 템플릿 수정
export const updateTemplate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const templateData: UpdateTemplateDto = req.body;

        // 템플릿 존재 여부 확인
        const existingTemplate = await prisma.template.findUnique({
            where: { id: Number(id) },
        });

        if (!existingTemplate) {
            res.status(404).json({
                success: false,
                message: '템플릿을 찾을 수 없습니다.',
            });
            return;
        }

        // 템플릿 업데이트
        const updatedTemplate = await prisma.template.update({
            where: { id: Number(id) },
            data: {
                name: templateData.name,
                description: templateData.description,
                // fieldGroups 업데이트는 복잡할 수 있으므로, 필요에 따라 추가 구현
            },
            include: {
                fieldGroups: {
                    include: {
                        fields: {
                            include: {
                                field: true,
                            },
                        },
                    },
                },
            },
        });

        res.status(200).json({
            success: true,
            data: updatedTemplate,
        });
    } catch (error) {
        console.error('템플릿 수정 중 오류 발생:', error);
        res.status(500).json({
            success: false,
            message: '템플릿 수정 중 오류가 발생했습니다.',
        });
    }
};

// 템플릿 삭제
export const deleteTemplate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // 템플릿 존재 여부 확인
        const existingTemplate = await prisma.template.findUnique({
            where: { id: Number(id) },
        });

        if (!existingTemplate) {
            res.status(404).json({
                success: false,
                message: '템플릿을 찾을 수 없습니다.',
            });
            return;
        }

        await prisma.template.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({
            success: true,
            message: '템플릿이 성공적으로 삭제되었습니다.',
        });
    } catch (error) {
        console.error('템플릿 삭제 중 오류 발생:', error);
        res.status(500).json({
            success: false,
            message: '템플릿 삭제 중 오류가 발생했습니다.',
        });
    }
};
