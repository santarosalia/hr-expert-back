import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateResumeDto, UpdateResumeDto } from '../interfaces/resume.interface';

const prisma = new PrismaClient();

// 이력서 생성
export const createResume = async (req: Request, res: Response) => {
    try {
        const resumeData: CreateResumeDto = req.body;

        const resume = await prisma.resume.create({
            data: resumeData,
            include: {},
        });

        return res.status(201).json({
            success: true,
            data: resume,
        });
    } catch (error) {
        console.error('이력서 생성 중 오류 발생:', error);
        return res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};

// 이력서 조회
export const getResume = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resume = await prisma.resume.findUnique({
            where: { id: Number(id) },
            include: {},
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: '이력서를 찾을 수 없습니다.',
            });
        }

        return res.status(200).json({
            success: true,
            data: resume,
        });
    } catch (error) {
        console.error('이력서 조회 중 오류 발생:', error);
        return res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};

// 이력서 목록 조회
export const getResumes = async (_req: Request, res: Response) => {
    try {
        const resumes = await prisma.resume.findMany({
            include: {},
            orderBy: {
                createdAt: 'desc',
            },
        });

        return res.status(200).json({
            success: true,
            data: resumes,
        });
    } catch (error) {
        console.error('이력서 목록 조회 중 오류 발생:', error);
        return res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};

// 이력서 수정
export const updateResume = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData: UpdateResumeDto = req.body;

        const resume = await prisma.resume.update({
            where: { id: Number(id) },
            data: updateData,
            include: {},
        });

        return res.status(200).json({
            success: true,
            data: resume,
        });
    } catch (error) {
        console.error('이력서 수정 중 오류 발생:', error);
        return res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};

// 이력서 삭제
export const deleteResume = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.resume.delete({
            where: { id: Number(id) },
        });

        return res.status(200).json({
            success: true,
            message: '이력서가 삭제되었습니다.',
        });
    } catch (error) {
        console.error('이력서 삭제 중 오류 발생:', error);
        return res.status(500).json({
            success: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};
