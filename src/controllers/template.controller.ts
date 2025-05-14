import { Request, Response } from 'express';
import { TemplateService } from '../services/template.service';
import { CreateTemplateDto, UpdateTemplateDto } from '../interfaces/template.interface';

export class TemplateController {
    private templateService: TemplateService;

    constructor() {
        this.templateService = new TemplateService();
    }

    // 템플릿 생성
    async createTemplate(req: Request, res: Response): Promise<void> {
        try {
            const templateData: CreateTemplateDto = req.body;
            const template = await this.templateService.createTemplate(templateData);

            res.status(201).json({
                success: true,
                data: template,
            });
        } catch (error) {
            console.error('템플릿 생성 중 오류 발생:', error);
            res.status(
                error.message === '템플릿 이름은 필수 입력 항목입니다.' ? 400 : 500
            ).json({
                success: false,
                message: error.message || '템플릿 생성 중 오류가 발생했습니다.',
            });
        }
    }

    // 모든 템플릿 조회
    async getAllTemplates(_req: Request, res: Response): Promise<void> {
        try {
            const templates = await this.templateService.getAllTemplates();

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
    }

    // 특정 템플릿 조회
    async getTemplateById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const template = await this.templateService.getTemplateById(Number(id));

            res.status(200).json({
                success: true,
                data: template,
            });
        } catch (error) {
            console.error('템플릿 조회 중 오류 발생:', error);
            res.status(error.message === '템플릿을 찾을 수 없습니다.' ? 404 : 500).json({
                success: false,
                message: error.message || '템플릿 조회 중 오류가 발생했습니다.',
            });
        }
    }

    // 템플릿 수정
    async updateTemplate(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const templateData: UpdateTemplateDto = req.body;
            const updatedTemplate = await this.templateService.updateTemplate(
                Number(id),
                templateData
            );

            res.status(200).json({
                success: true,
                data: updatedTemplate,
            });
        } catch (error) {
            console.error('템플릿 수정 중 오류 발생:', error);
            res.status(error.message === '템플릿을 찾을 수 없습니다.' ? 404 : 500).json({
                success: false,
                message: error.message || '템플릿 수정 중 오류가 발생했습니다.',
            });
        }
    }

    // 템플릿 삭제
    async deleteTemplate(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const result = await this.templateService.deleteTemplate(Number(id));

            res.status(200).json(result);
        } catch (error) {
            console.error('템플릿 삭제 중 오류 발생:', error);
            res.status(error.message === '템플릿을 찾을 수 없습니다.' ? 404 : 500).json({
                success: false,
                message: error.message || '템플릿 삭제 중 오류가 발생했습니다.',
            });
        }
    }
}

// 싱글톤 인스턴스 생성
export const templateController = new TemplateController();
