import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateFieldDto } from '../interfaces/field.interface';

const prisma = new PrismaClient();

export const createField = async (req: Request, res: Response) => {
    try {
        const { name, description, type }: CreateFieldDto = req.body;

        // 필수 필드 검증
        if (!name) {
            return res.status(400).json({
                success: false,
                message: '이름은 필수 입력 항목입니다.',
            });
        }

        // 필드 생성
        const field = await prisma.field.create({
            data: {
                name,
                type,
                description,
            },
        });

        return res.status(201).json({
            success: true,
            data: field,
        });
    } catch (error) {
        console.error('필드 생성 중 오류 발생:', error);
        return res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};

export const getFields = async (_req: Request, res: Response) => {
    try {
        const fields = await prisma.field.findMany({
            orderBy: {
                id: 'asc',
            },
        });

        return res.status(200).json({
            success: true,
            data: fields,
        });
    } catch (error) {
        console.error('필드 조회 중 오류 발생:', error);
        return res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};
