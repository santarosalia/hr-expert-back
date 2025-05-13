import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';
import fieldRoutes from './routes/field.route';
import resumeRoutes from './routes/resume.route';
import templateRoutes from './routes/template.route';
import recruitmentRoutes from './routes/recruitment.route';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 기본 라우트
app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'HR Expert API is running' });
});
app.use('/api/fields', fieldRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/recruitments', recruitmentRoutes);
// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
