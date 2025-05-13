import { Router } from 'express';
import * as recruitmentController from '../controllers/recruitment.controller';

const router = Router();

// 채용 공고 목록 조회
router.get('/', recruitmentController.findAllRecruitments);

// 채용 공고 상세 조회
router.get('/:id', recruitmentController.findOneRecruitment);

// 채용 공고 생성
router.post('/', recruitmentController.createRecruitment);

// 채용 공고 수정
router.put('/:id', recruitmentController.updateRecruitment);

// 채용 공고 삭제
router.delete('/:id', recruitmentController.deleteRecruitment);

export default router;
