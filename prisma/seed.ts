// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    const fields1 = await Promise.all([
        prisma.field.create({
            data: {
                name: '경력 유형',
                description: '지원자의 경력 유형',
            },
        }),
        prisma.field.create({
            data: {
                name: '1지망 포지션',
                description: '지원자의 1지망 포지션',
            },
        }),
        prisma.field.create({
            data: {
                name: '2지망 포지션',
                description: '지원자의 2지망 포지션',
            },
        }),
        prisma.field.create({
            data: {
                name: '경력 기간',
                description: '지원자의 경력 기간',
            },
        }),
        prisma.field.create({
            data: {
                name: '희망 연봉',
                description: '지원자의 희망 연봉',
            },
        }),
        prisma.field.create({
            data: {
                name: '1지망 근무 지역',
                description: '지원자의 1지망 근무 지역',
            },
        }),
        prisma.field.create({
            data: {
                name: '2지망 근무 지역',
                description: '지원자의 2지망 근무 지역',
            },
        }),
    ]);
    const fields2 = await Promise.all([
        prisma.field.create({
            data: {
                name: '성명',
                description: '지원자의 성명',
            },
        }),
        prisma.field.create({
            data: {
                name: '생년월일',
                description: '지원자의 생년월일',
            },
        }),
        prisma.field.create({
            data: {
                name: '주소',
                description: '지원자의 주소',
            },
        }),
        prisma.field.create({
            data: {
                name: '병역',
                description: '지원자의 병역 상태',
            },
        }),
        prisma.field.create({
            data: {
                name: '장애',
                description: '지원자의 장애 여부',
            },
        }),
        prisma.field.create({
            data: {
                name: '보훈',
                description: '지원자의 보훈 여부',
            },
        }),
        prisma.field.create({
            data: {
                name: '휴대폰',
                description: '지원자의 휴대폰 번호',
            },
        }),
        prisma.field.create({
            data: {
                name: '이메일',
                description: '지원자의 이메일',
            },
        }),
    ]);

    const fields3 = await Promise.all([
        prisma.field.create({
            data: {
                name: '자격증',
                description: '지원자의 자격증',
            },
        }),
    ]);
    const fields4 = await Promise.all([
        prisma.field.create({
            data: {
                name: '어학',
                description: '지원자의 어학 정보',
            },
        }),
    ]);
    const fields5 = await Promise.all([
        prisma.field.create({
            data: {
                name: '학력',
                description: '지원자의 학력',
            },
        }),
    ]);
    const fields6 = await Promise.all([
        prisma.field.create({
            data: {
                name: '경력',
                description: '지원자의 경력',
            },
        }),
    ]);

    const fields7 = await Promise.all([
        prisma.field.create({
            data: {
                name: '프로젝트 사항',
                description: '지원자의 프로젝트 사항',
            },
        }),
    ]);

    const fields8 = await Promise.all([
        prisma.field.create({
            data: {
                name: '자기소개',
                description: '지원자의 자기소개',
            },
        }),
    ]);

    // 기본 템플릿 생성
    const template = await prisma.template.create({
        data: {
            name: '기본 이력서 템플릿',
            description: '기본적인 이력서 작성에 필요한 필드들을 포함한 템플릿',
        },
    });

    const fieldGroup1 = await prisma.fieldGroup.create({
        data: {
            name: '기본 정보1',
            templateId: template.id,
        },
    });

    const fieldGroup2 = await prisma.fieldGroup.create({
        data: {
            name: '기본 정보2',
            templateId: template.id,
        },
    });

    const fieldGroup3 = await prisma.fieldGroup.create({
        data: {
            name: '자격증',
            templateId: template.id,
        },
    });

    const fieldGroup4 = await prisma.fieldGroup.create({
        data: {
            name: '어학',
            templateId: template.id,
        },
    });

    const fieldGroup5 = await prisma.fieldGroup.create({
        data: {
            name: '학력',
            templateId: template.id,
        },
    });

    const fieldGroup6 = await prisma.fieldGroup.create({
        data: {
            name: '경력',
            templateId: template.id,
        },
    });

    const fieldGroup7 = await prisma.fieldGroup.create({
        data: {
            name: '프로젝트 사항',
            templateId: template.id,
        },
    });

    const fieldGroup8 = await prisma.fieldGroup.create({
        data: {
            name: '자기소개',
            templateId: template.id,
        },
    });
    // 템플릿에 필드 연결
    await Promise.all([
        ...fields1.map((field, index) =>
            prisma.fieldGroupField.create({
                data: {
                    fieldGroupId: fieldGroup1.id,
                    fieldId: field.id,
                    order: index + 1,
                    isRequired: true,
                },
            })
        ),
        ...fields2.map((field, index) =>
            prisma.fieldGroupField.create({
                data: {
                    fieldGroupId: fieldGroup2.id,
                    fieldId: field.id,
                    order: index + 1,
                    isRequired: true,
                },
            })
        ),
        ...fields3.map((field, index) =>
            prisma.fieldGroupField.create({
                data: {
                    fieldGroupId: fieldGroup3.id,
                    fieldId: field.id,
                    order: index + 1,
                    isRequired: true,
                },
            })
        ),
        ...fields4.map((field, index) =>
            prisma.fieldGroupField.create({
                data: {
                    fieldGroupId: fieldGroup4.id,
                    fieldId: field.id,
                    order: index + 1,
                    isRequired: true,
                },
            })
        ),
        ...fields5.map((field, index) =>
            prisma.fieldGroupField.create({
                data: {
                    fieldGroupId: fieldGroup5.id,
                    fieldId: field.id,
                    order: index + 1,
                    isRequired: true,
                },
            })
        ),
        ...fields6.map((field, index) =>
            prisma.fieldGroupField.create({
                data: {
                    fieldGroupId: fieldGroup6.id,
                    fieldId: field.id,
                    order: index + 1,
                    isRequired: true,
                },
            })
        ),
        ...fields7.map((field, index) =>
            prisma.fieldGroupField.create({
                data: {
                    fieldGroupId: fieldGroup7.id,
                    fieldId: field.id,
                    order: index + 1,
                    isRequired: true,
                },
            })
        ),
        ...fields8.map((field, index) =>
            prisma.fieldGroupField.create({
                data: {
                    fieldGroupId: fieldGroup8.id,
                    fieldId: field.id,
                    order: index + 1,
                    isRequired: true,
                },
            })
        ),
    ]);
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
