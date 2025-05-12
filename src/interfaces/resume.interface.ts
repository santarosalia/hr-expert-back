import { ResumeStatus } from '@prisma/client';

export interface CreateResumeDto {
    title: string;
}

export interface UpdateResumeDto extends Partial<CreateResumeDto> {
    status?: ResumeStatus;
}
