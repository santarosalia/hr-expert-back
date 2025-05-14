import { Request, Response } from 'express';
import { CreateFieldDto } from '../interfaces/field.interface';
import { FieldService } from '../services/field.service';

export class FieldController {
    private fieldService: FieldService;

    constructor() {
        this.fieldService = new FieldService();
    }

    async createField(req: Request, res: Response): Promise<Response> {
        try {
            const fieldData: CreateFieldDto = req.body;

            const field = await this.fieldService.createField(fieldData);

            return res.status(201).json({
                success: true,
                data: field,
            });
        } catch (error) {
            console.error('필드 생성 중 오류 발생:', error);

            if (
                error instanceof Error &&
                (error.message === 'label is required' ||
                    error.message === 'key is required')
            ) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message: '서버 오류가 발생했습니다.',
            });
        }
    }

    async getFields(_req: Request, res: Response): Promise<Response> {
        try {
            const fields = await this.fieldService.getFields();

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
    }
}
