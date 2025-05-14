// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    // 먼저 Field들을 생성
    const workField = await prisma.field.create({
        data: {
            key: 'work',
            label: '경력',
            fieldItems: {
                create: [
                    { key: 'title', label: '이름', order: 1 },
                    { key: 'department', label: '부서', order: 2 },
                    { key: 'begin', label: '시작일', order: 3 },
                    { key: 'end', label: '종료일', order: 4 },
                    { key: 'rest_text', label: '??', order: 5 },
                    { key: 'title', label: '이름', order: 6 },
                    { key: 'company', label: '회사 명', order: 7 },
                    { key: 'date', label: '날짜', order: 8 },
                    { key: 'description', label: '내용', order: 9 },
                ],
            },
        },
    });

    const educationField = await prisma.field.create({
        data: {
            key: 'education',
            label: '학력',
            fieldItems: {
                create: [
                    { key: 'school', label: '학교', order: 1 },
                    { key: 'majorName', label: '전공', order: 2 },
                    { key: 'degreeType', label: '학위', order: 3 },
                    { key: 'begin', label: '시작일', order: 4 },
                    { key: 'end', label: '종료일', order: 5 },
                    { key: 'advisor', label: '추천인', order: 6 },
                    { key: 'thesis', label: '논문', order: 7 },
                ],
            },
        },
    });

    const languagesField = await prisma.field.create({
        data: {
            key: 'languages',
            label: '언어',
            fieldItems: {
                create: [{ key: 'language', label: '언어', order: 1 }],
            },
        },
    });

    const languagesTestField = await prisma.field.create({
        data: {
            key: 'languages_test',
            label: '어학',
            fieldItems: {
                create: [
                    { key: 'language', label: '언어', order: 1 },
                    { key: 'score', label: '점수', order: 2 },
                    { key: 'date', label: '날짜', order: 3 },
                    { key: 'test', label: '시험', order: 4 },
                ],
            },
        },
    });

    // 템플릿 생성
    await prisma.template.create({
        data: {
            name: '기본 템플릿',
            description: '기본 템플릿',
            sections: {
                create: [
                    {
                        key: 'work',
                        label: '경력섹션',
                        order: 1,
                        size: 12,
                        sectionFields: {
                            create: [
                                {
                                    fieldId: workField.id,
                                    order: 1,
                                },
                            ],
                        },
                    },
                    {
                        key: 'education',
                        label: '학력 섹션',
                        order: 2,
                        size: 12,
                        sectionFields: {
                            create: [
                                {
                                    fieldId: educationField.id,
                                    order: 1,
                                },
                            ],
                        },
                    },
                    {
                        key: 'languages',
                        label: '언어 섹션',
                        order: 3,
                        size: 12,
                        sectionFields: {
                            create: [
                                {
                                    fieldId: languagesField.id,
                                    order: 1,
                                },
                            ],
                        },
                    },
                    {
                        key: 'languages_test',
                        label: '어학 섹션',
                        order: 4,
                        size: 12,
                        sectionFields: {
                            create: [
                                {
                                    fieldId: languagesTestField.id,
                                    order: 1,
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
