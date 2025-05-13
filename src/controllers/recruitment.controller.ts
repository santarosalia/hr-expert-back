import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 채용 공고 생성
export const createRecruitment = async (req: Request, res: Response) => {
    try {
        const recruitment = await prisma.recruitment.create({
            data: req.body,
        });
        return res.status(201).json({
            success: true,
            data: recruitment,
        });
    } catch (error) {
        return res.status(400).json({ message: '채용 공고 생성에 실패했습니다.', error });
    }
};

// 모든 채용 공고 조회
export const findAllRecruitments = async (_req: Request, res: Response) => {
    try {
        const recruitments = await prisma.recruitment.findMany({
            include: {
                template: true,
            },
        });
        return res.status(200).json({
            success: true,
            data: recruitments,
        });
    } catch (error) {
        return res.status(500).json({ message: '채용 공고 조회에 실패했습니다.', error });
    }
};

// 특정 채용 공고 조회
export const findOneRecruitment = async (req: Request, res: Response) => {
    try {
        const recruitment = await prisma.recruitment.findUnique({
            where: {
                id: Number(req.params.id),
            },
            include: {
                template: {
                    include: {
                        fieldGroups: {
                            include: {
                                fields: true,
                            },
                        },
                    },
                },
            },
        });
        if (!recruitment) {
            return res.status(404).json({
                success: false,
                message: '해당 채용 공고를 찾을 수 없습니다.',
            });
        }
        return res.status(200).json({
            success: true,
            data: recruitment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: '채용 공고 조회에 실패했습니다.',
            error,
        });
    }
};

// 채용 공고 수정
export const updateRecruitment = async (req: Request, res: Response) => {
    try {
        const recruitment = await prisma.recruitment.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        });
        if (!recruitment) {
            return res.status(404).json({
                success: false,
                message: '해당 채용 공고를 찾을 수 없습니다.',
            });
        }
        return res.status(200).json({
            success: true,
            data: recruitment,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: '채용 공고 수정에 실패했습니다.',
            error,
        });
    }
};

// 채용 공고 삭제
export const deleteRecruitment = async (req: Request, res: Response) => {
    try {
        const recruitment = await prisma.recruitment.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        if (!recruitment) {
            return res.status(404).json({
                success: false,
                message: '해당 채용 공고를 찾을 수 없습니다.',
            });
        }
        return res.status(200).json({
            success: true,
            message: '채용 공고가 성공적으로 삭제되었습니다.',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: '채용 공고 삭제에 실패했습니다.',
            error,
        });
    }
};
