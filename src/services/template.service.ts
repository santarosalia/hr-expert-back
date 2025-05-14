import { CreateTemplateDto, UpdateTemplateDto } from '../interfaces/template.interface';
import { TemplateRepository } from '../repositories/template.repository';

export class TemplateService {
    private templateRepository: TemplateRepository;

    constructor() {
        this.templateRepository = new TemplateRepository();
    }

    async createTemplate(templateData: CreateTemplateDto) {
        if (!templateData.name) {
            throw new Error('템플릿 이름은 필수 입력 항목입니다.');
        }

        return await this.templateRepository.create(templateData);
    }

    async getAllTemplates() {
        return await this.templateRepository.findAll();
    }

    async getTemplateById(id: number) {
        const template = await this.templateRepository.findById(id);

        if (!template) {
            throw new Error('템플릿을 찾을 수 없습니다.');
        }

        return template;
    }

    async updateTemplate(id: number, templateData: UpdateTemplateDto) {
        const existingTemplate = await this.templateRepository.findById(id);

        if (!existingTemplate) {
            throw new Error('템플릿을 찾을 수 없습니다.');
        }

        return await this.templateRepository.update(id, templateData);
    }

    async deleteTemplate(id: number) {
        const existingTemplate = await this.templateRepository.findById(id);

        if (!existingTemplate) {
            throw new Error('템플릿을 찾을 수 없습니다.');
        }

        await this.templateRepository.delete(id);
        return { success: true, message: '템플릿이 성공적으로 삭제되었습니다.' };
    }
}
