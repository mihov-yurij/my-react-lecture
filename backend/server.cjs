const http = require('node:http');
const querystring = require('node:querystring');
const { generateHTML, sanitize, readFileAsync, writeFileAsync } = require('./utils.cjs');

const PORT = process.env.PORT || 3000;
const MAX_BODY_SIZE = 1024 * 1024; 

// Временная база данных в оперативной памяти сервера (заглушка)
let candidates = [
    { id: 'c1', fullName: 'Иван Иванов', role: 'Frontend Developer', skills: ['React', 'TypeScript', 'JavaScript'], expectedSalary: 120000, workType: 'remote', bio: 'Люблю чистый код.' },
    { id: 'c2', fullName: 'Мария Петрова', role: 'Frontend Developer', skills: ['React', 'Redux', 'Next.js'], expectedSalary: 180000, workType: 'hybrid', bio: 'Пишу тесты.' }
];
let vacancies = [
    { id: 'v1', companyName: 'ТехноСтарт', title: 'Junior/Middle Frontend Engineer', requiredSkills: ['React', 'TypeScript'], minExperienceRequired: 1, budgetMax: 140000, workType: 'remote', description: 'Ищем разработчика в команду.' }
];

const server = http.createServer(async (req, res) => { 
    const { method, url } = req;

    // --- ВАЖНО: Настройка CORS заголовков для связи с React ---
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Обработка предзапроса OPTIONS (браузер всегда шлет его перед POST-запросом)
    if (method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
    }

    try {
        // ==================== НОВЫЕ JSON API ЭНДПОИНТЫ ДЛЯ REACT ====================
        
        // 1. Получить список всех соискателей
        if (method === 'GET' && url === '/api/candidates') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            return res.end(JSON.stringify(candidates));
        }

        // 2. Получить список всех вакансий
        if (method === 'GET' && url === '/api/vacancies') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            return res.end(JSON.stringify(vacancies));
        }

        // 3. Создать (зарегистрировать) нового соискателя
        if (method === 'POST' && url === '/api/candidates') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                const data = JSON.parse(body);
                const newCandidate = { id: '_' + Math.random().toString(36).substr(2, 9), ...data };
                candidates.push(newCandidate); // Сохраняем в массив
                
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, data: newCandidate }));
            });
            return;
        }

        // 4. Создать (опубликовать) новую вакансию
        if (method === 'POST' && url === '/api/vacancies') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
                const data = JSON.parse(body);
                const newVacancy = { id: '_' + Math.random().toString(36).substr(2, 9), ...data };
                vacancies.push(newVacancy); // Сохраняем в массив

                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, data: newVacancy }));
            });
            return;
        }


        // ==================== ВАШИ СТАРЫЕ HTML МАРШРУТЫ (ИЗ ДЗ) ====================
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.setHeader('X-Content-Type-Options', 'nosniff');

        if (method === 'GET') {
            if (url === '/') return send(res, 200, generateHTML('Головна', 'Вітаємо на головній сторінці нашого сервера!'));
            if (url === '/about') return send(res, 200, generateHTML('Про нас', 'Цей проект створений для демонстрації навичок роботи з Node.js.'));
            if (url === '/contact') return send(res, 200, generateHTML('Контакти', 'Зв’яжіться з нами через форму на сторінці /form або за імейлом.'));

            if (url === '/form') {
                try {
                    const { readFile } = require('node:fs/promises');
                    const path = require('node:path');
                    const formHtml = await readFile(path.join(__dirname, 'index.html'), 'utf8');
                    res.statusCode = 200;
                    return res.end(formHtml);
                } catch (err) {
                    return send(res, 500, generateHTML('Помилка', 'Не вдалося завантажити файл форми.'));
                }
            }
            return send(res, 404, generateHTML('404 - Не знайдено', 'На жаль, такої сторінки не існує.'));
        }

        if (method === 'POST' && url === '/submit') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
                if (body.length > MAX_BODY_SIZE) {
                    send(res, 413, '<h1>413 Payload Too Large</h1>');
                    req.destroy();
                }
            });
            req.on('end', () => {
                if (res.writableEnded) return;
                const data = querystring.parse(body);
                if (!data.name || !data.email || !data.name.trim() || !data.email.trim()) {
                    return send(res, 400, '<h1>400 Bad Request</h1><p>Invalid form data</p>');
                }
                const html = `<h1>Form Submitted</h1><p>Name: ${sanitize(data.name)}</p><p>Email: ${sanitize(data.email)}</p>`;
                send(res, 200, html);
            });
            return;
        }

        send(res, 404, 'Not Found');
    } catch (err) {
        send(res, 500, '<h1>500 Internal Server Error</h1>');
    }
});

function send(res, statusCode, html) {
    const buffer = Buffer.from(html);
    res.statusCode = statusCode;
    res.setHeader('Content-Length', buffer.length);
    res.end(buffer);
}

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`🚀 API Сервер запущен: http://localhost:${PORT}`);
    });
}

server.on('connection', (socket) => {
    socket.unref(); 
});

module.exports = server;

