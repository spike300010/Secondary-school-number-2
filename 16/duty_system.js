// ========== PWA УСТАНОВКА ==========
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    setTimeout(() => {
        if (!localStorage.getItem('installDismissed')) {
            installPrompt.style.display = 'block';
        }
    }, 5000);
});

function installApp() {
    if (!deferredPrompt) {
        showInstallInstructions();
        return;
    }
    
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('App installed');
        }
        deferredPrompt = null;
        installPrompt.style.display = 'none';
    });
}

function dismissInstall() {
    installPrompt.style.display = 'none';
    localStorage.setItem('installDismissed', 'true');
}

function showInstallInstructions() {
    document.getElementById('installInstructionsModal').style.display = 'flex';
}

function closeInstallInstructions() {
    document.getElementById('installInstructionsModal').style.display = 'none';
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swCode = `
            self.addEventListener('install', (e) => {
                console.log('Service Worker installed');
            });
            
            self.addEventListener('fetch', (e) => {
                e.respondWith(fetch(e.request));
            });
        `;
        
        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        
        navigator.serviceWorker.register(swUrl)
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW error:', err));
    });
}

// ========== ПЕРЕВОДЫ ==========
const translations = {
    ru: {
        appTitle: 'Система Дежурства',
        login: 'Вход',
        register: 'Регистрация',
        name: 'Имя',
        surname: 'Фамилия',
        loginBtn: 'Войти',
        registerBtn: 'Зарегистрироваться',
        roleTeacher: 'Учитель',
        roleDuty: 'Дежурный',
        roleAdmin: 'Администрация',
        accessCode: 'Код доступа',
        teacherDutyCode: 'Учитель/Дежурный:',
        adminCode: 'Администрация:',
        systemActive: 'Система активна',
        checksToday: 'проверок сегодня',
        tabHome: 'Главная',
        tabStudents: 'Ученики',
        tabCheck: 'Проверка',
        tabViolations: 'Нарушения',
        tabAnalytics: 'Аналитика',
        tabTasks: 'Задания',
        tabMessages: 'Сообщения',
        totalStudents: 'Всего учеников',
        checked: 'Проверено',
        averageScore: 'Средний балл',
        violations: 'Нарушения',
        periodStats: 'Статистика по периодам',
        topClasses: 'Топ-5 классов',
        studentManagement: 'Управление учениками',
        totalStudentsLabel: 'Всего учеников:',
        addStudent: 'Добавить ученика',
        allClasses: 'Все классы',
        searchByNumber: 'Поиск по номеру...',
        student: 'Ученик',
        autoNumbering: 'Номер ученика будет присвоен автоматически',
        fullName: 'ФИО',
        class: 'Класс',
        attendance: 'Посещаемость',
        actions: 'Действия',
        classCheck: 'Проверка классов',
        period: 'Период',
        beforeLunch: 'До обеда',
        afterLunch: 'После обеда',
        date: 'Дата',
        violationsLog: 'Журнал нарушений',
        totalViolationsLabel: 'Всего нарушений:',
        exportViolations: 'Экспорт',
        analyticsReports: 'Аналитика и отчёты',
        exportStats: 'Экспорт',
        avgAttendance: 'Средняя посещаемость',
        classesInOrder: 'Классов в порядке',
        qualityIndex: 'Индекс качества',
        statusDistribution: 'Распределение статусов',
        trendByDays: 'Динамика по дням',
        detailedStats: 'Детальная статистика',
        students: 'Учеников',
        order: 'Порядок',
        rating: 'Рейтинг',
        tasks: 'Задания',
        newTask: 'Новое задание',
        messages: 'Сообщения',
        newMessage: 'Новое сообщение',
        add: 'Добавить',
        selectStatus: 'Выберите статус',
        violation: 'Нарушение',
        absent: 'Отсутствует',
        note: 'Примечание',
        describeViolation: 'Опишите нарушение...',
        violationPhoto: 'Фото нарушения',
        takePhoto: 'Сделать фото',
        orSelectFromGallery: 'Или выберите из галереи',
        deletePhoto: 'Удалить фото',
        absentReason: 'Причина отсутствия',
        saveCheck: 'Сохранить проверку',
        allTeachers: 'Все учителя',
        allDuty: 'Все дежурные',
        everyone: 'Всем',
        title: 'Заголовок',
        description: 'Описание...',
        create: 'Создать',
        subject: 'Тема',
        message: 'Сообщение...',
        send: 'Отправить',
        notChecked: 'Не проверен',
        checkedBy: 'Проверил:',
        installApp: 'Установить как приложение',
        exportClassCol: 'Класс',
        exportStudentsCol: 'Учеников',
        exportAttendanceCol: 'Посещаемость',
        exportOrderCol: 'Порядок',
        exportViolationsCol: 'Нарушения',
        exportRatingCol: 'Рейтинг',
        exportDateCol: 'Дата',
        exportPeriodCol: 'Период',
        exportCheckedByCol: 'Проверил',
        exportNoteCol: 'Примечание',
        exportTimeCol: 'Время',
        exportHasPhotoCol: 'Есть фото'
    },
    kk: {
        appTitle: 'Кезекшілік Жүйесі',
        login: 'Кіру',
        register: 'Тіркелу',
        name: 'Аты',
        surname: 'Тегі',
        loginBtn: 'Кіру',
        registerBtn: 'Тіркелу',
        roleTeacher: 'Мұғалім',
        roleDuty: 'Кезекші',
        roleAdmin: 'Әкімшілік',
        accessCode: 'Қол жеткізу коды',
        teacherDutyCode: 'Мұғалім/Кезекші:',
        adminCode: 'Әкімшілік:',
        systemActive: 'Жүйе белсенді',
        checksToday: 'бүгінгі тексерулер',
        tabHome: 'Басты бет',
        tabStudents: 'Оқушылар',
        tabCheck: 'Тексеру',
        tabViolations: 'Бұзушылықтар',
        tabAnalytics: 'Аналитика',
        tabTasks: 'Тапсырмалар',
        tabMessages: 'Хабарламалар',
        totalStudents: 'Барлық оқушылар',
        checked: 'Тексерілген',
        averageScore: 'Орташа балл',
        violations: 'Бұзушылықтар',
        periodStats: 'Кезеңдер бойынша статистика',
        topClasses: 'Топ-5 сыныптар',
        studentManagement: 'Оқушыларды басқару',
        totalStudentsLabel: 'Барлық оқушылар:',
        addStudent: 'Оқушы қосу',
        allClasses: 'Барлық сыныптар',
        searchByNumber: 'Нөмірі бойынша іздеу...',
        student: 'Оқушы',
        autoNumbering: 'Оқушының нөмірі автоматты түрде берілетін болады',
        fullName: 'Аты-жөні',
        class: 'Сынып',
        attendance: 'Қатысу',
        actions: 'Әрекеттер',
        classCheck: 'Сыныптарды тексеру',
        period: 'Кезең',
        beforeLunch: 'Түскі асқа дейін',
        afterLunch: 'Түскі астан кейін',
        date: 'Күні',
        violationsLog: 'Бұзушылықтар журналы',
        totalViolationsLabel: 'Барлық бұзушылықтар:',
        exportViolations: 'Экспорттау',
        analyticsReports: 'Аналитика және есептер',
        exportStats: 'Экспорттау',
        avgAttendance: 'Орташа қатысу',
        classesInOrder: 'Реттегі сыныптар',
        qualityIndex: 'Сапа индексі',
        statusDistribution: 'Статустардың бөлінуі',
        trendByDays: 'Күндер бойынша динамика',
        detailedStats: 'Толық статистика',
        students: 'Оқушылар',
        order: 'Тәртіп',
        rating: 'Рейтинг',
        tasks: 'Тапсырмалар',
        newTask: 'Жаңа тапсырма',
        messages: 'Хабарламалар',
        newMessage: 'Жаңа хабарлама',
        add: 'Қосу',
        selectStatus: 'Статусты таңдаңыз',
        violation: 'Бұзушылық',
        absent: 'Жоқ',
        note: 'Ескерту',
        describeViolation: 'Бұзушылықты сипаттаңыз...',
        violationPhoto: 'Бұзушылық фотосы',
        takePhoto: 'Фото түсіру',
        orSelectFromGallery: 'Немесе галереядан таңдаңыз',
        deletePhoto: 'Фотоны жою',
        absentReason: 'Жоқтығының себебі',
        saveCheck: 'Тексеруді сақтау',
        allTeachers: 'Барлық мұғалімдер',
        allDuty: 'Барлық кезекшілер',
        everyone: 'Барлығына',
        title: 'Тақырып',
        description: 'Сипаттама...',
        create: 'Жасау',
        subject: 'Тақырып',
        message: 'Хабарлама...',
        send: 'Жіберу',
        notChecked: 'Тексерілмеген',
        checkedBy: 'Тексерген:',
        installApp: 'Қолданба ретінде орнату',
        exportClassCol: 'Сынып',
        exportStudentsCol: 'Оқушылар',
        exportAttendanceCol: 'Қатысу',
        exportOrderCol: 'Тәртіп',
        exportViolationsCol: 'Бұзушылықтар',
        exportRatingCol: 'Рейтинг',
        exportDateCol: 'Күні',
        exportPeriodCol: 'Кезең',
        exportCheckedByCol: 'Тексерген',
        exportNoteCol: 'Ескерту',
        exportTimeCol: 'Уақыт',
        exportHasPhotoCol: 'Фото бар'
    },
    en: {
        appTitle: 'Duty System',
        login: 'Login',
        register: 'Register',
        name: 'Name',
        surname: 'Surname',
        loginBtn: 'Login',
        registerBtn: 'Register',
        roleTeacher: 'Teacher',
        roleDuty: 'Duty Officer',
        roleAdmin: 'Administration',
        accessCode: 'Access Code',
        teacherDutyCode: 'Teacher/Duty:',
        adminCode: 'Administration:',
        systemActive: 'System Active',
        checksToday: 'checks today',
        tabHome: 'Home',
        tabStudents: 'Students',
        tabCheck: 'Check',
        tabViolations: 'Violations',
        tabAnalytics: 'Analytics',
        tabTasks: 'Tasks',
        tabMessages: 'Messages',
        totalStudents: 'Total Students',
        checked: 'Checked',
        averageScore: 'Average Score',
        violations: 'Violations',
        periodStats: 'Period Statistics',
        topClasses: 'Top-5 Classes',
        studentManagement: 'Student Management',
        totalStudentsLabel: 'Total students:',
        addStudent: 'Add Student',
        allClasses: 'All Classes',
        searchByNumber: 'Search by number...',
        student: 'Student',
        autoNumbering: 'Student number will be assigned automatically',
        fullName: 'Full Name',
        class: 'Class',
        attendance: 'Attendance',
        actions: 'Actions',
        classCheck: 'Class Check',
        period: 'Period',
        beforeLunch: 'Before Lunch',
        afterLunch: 'After Lunch',
        date: 'Date',
        violationsLog: 'Violations Log',
        totalViolationsLabel: 'Total violations:',
        exportViolations: 'Export',
        analyticsReports: 'Analytics and Reports',
        exportStats: 'Export',
        avgAttendance: 'Average Attendance',
        classesInOrder: 'Classes in Order',
        qualityIndex: 'Quality Index',
        statusDistribution: 'Status Distribution',
        trendByDays: 'Trend by Days',
        detailedStats: 'Detailed Statistics',
        students: 'Students',
        order: 'Order',
        rating: 'Rating',
        tasks: 'Tasks',
        newTask: 'New Task',
        messages: 'Messages',
        newMessage: 'New Message',
        add: 'Add',
        selectStatus: 'Select Status',
        violation: 'Violation',
        absent: 'Absent',
        note: 'Note',
        describeViolation: 'Describe violation...',
        violationPhoto: 'Violation Photo',
        takePhoto: 'Take Photo',
        orSelectFromGallery: 'Or select from gallery',
        deletePhoto: 'Delete Photo',
        absentReason: 'Reason for Absence',
        saveCheck: 'Save Check',
        allTeachers: 'All Teachers',
        allDuty: 'All Duty Officers',
        everyone: 'Everyone',
        title: 'Title',
        description: 'Description...',
        create: 'Create',
        subject: 'Subject',
        message: 'Message...',
        send: 'Send',
        notChecked: 'Not Checked',
        checkedBy: 'Checked by:',
        installApp: 'Install as App',
        exportClassCol: 'Class',
        exportStudentsCol: 'Students',
        exportAttendanceCol: 'Attendance',
        exportOrderCol: 'Order',
        exportViolationsCol: 'Violations',
        exportRatingCol: 'Rating',
        exportDateCol: 'Date',
        exportPeriodCol: 'Period',
        exportCheckedByCol: 'Checked by',
        exportNoteCol: 'Note',
        exportTimeCol: 'Time',
        exportHasPhotoCol: 'Has photo'
    }
};

let currentLang = 'ru';

function changeLang(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    ['ru', 'kk', 'en'].forEach(l => {
        ['lang-' + l, 'lang-main-' + l].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) btn.classList.toggle('active', l === lang);
        });
    });
    
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang]?.[key]) el.textContent = translations[lang][key];
    });
    
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (translations[lang]?.[key]) el.placeholder = translations[lang][key];
    });
    
    updateSelectOptions();
}

function updateSelectOptions() {
    const lang = currentLang;
    const t = translations[lang];
    
    const regRole = document.getElementById('regRole');
    if (regRole) {
        regRole.innerHTML = `
            <option value="teacher">👨‍🏫 ${t.roleTeacher}</option>
            <option value="duty">👮 ${t.roleDuty}</option>
            <option value="admin">👔 ${t.roleAdmin}</option>
        `;
    }
    
    const checkPeriod = document.getElementById('checkPeriod');
    if (checkPeriod) {
        const val = checkPeriod.value;
        checkPeriod.innerHTML = `
            <option value="before">🌅 ${t.beforeLunch}</option>
            <option value="after">🌆 ${t.afterLunch}</option>
        `;
        checkPeriod.value = val;
    }
    
    [document.getElementById('filterClass'), document.getElementById('filterViolClass')].forEach(sel => {
        if (sel) {
            const val = sel.value;
            sel.innerHTML = `<option value="">${t.allClasses}</option>` + 
                CLASSES.map(c => `<option value="${c}">${c}</option>`).join('');
            sel.value = val;
        }
    });
    
    const studentClass = document.getElementById('studentClass');
    if (studentClass) {
        studentClass.innerHTML = `<option value="">${t.class}</option>` + 
            CLASSES.map(c => `<option value="${c}">${c}</option>`).join('');
    }
    
    ['taskTo', 'msgTo'].forEach(id => {
        const sel = document.getElementById(id);
        if (sel) {
            const val = sel.value;
            sel.innerHTML = `
                <option value="all_teachers">👨‍🏫 ${t.allTeachers}</option>
                <option value="all_duty">👮 ${t.allDuty}</option>
                <option value="all">👥 ${t.everyone}</option>
            `;
            sel.value = val;
        }
    });
}

// ========== ДАННЫЕ ==========
const CLASSES = ['1А','1Ә','1Б','1В','2А','2Ә','2Б','2В','3А','3Ә','3Б','3В','4А','4Ә','4Б','4В','5А','5Ә','5Б','5В','6А','6Ә','6Б','6В','7А','7Ә','7Б','7В','8А','8Ә','8Б','8В','9А','9Ә','9Б','9В','10А','10Ә','10Б','11А','11Ә'];

let user = null;
let selectedClass = null;
let selectedStatus = null;
let currentPhoto = null;

function init() {
    ['users', 'students', 'checks', 'tasks', 'messages'].forEach(key => {
        if (!localStorage.getItem(key)) localStorage.setItem(key, '[]');
    });
    
    const students = get('students');
    if (students.length === 0) {
        generateStudents();
    }
    
    const savedLang = localStorage.getItem('language') || 'ru';
    changeLang(savedLang);
}

function generateStudents() {
    const students = [];
    let globalId = 1;
    
    CLASSES.forEach(className => {
        const studentsPerClass = 7;
        for (let i = 1; i <= studentsPerClass && globalId <= 289; i++) {
            students.push({
                id: globalId.toString(),
                number: i,
                class: className,
                created: new Date().toISOString()
            });
            globalId++;
        }
    });
    
    save('students', students);
    console.log(`✅ Создано ${students.length} учеников`);
}

function get(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }
function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

// ========== ФОТО ==========
function previewPhoto() {
    const file = document.getElementById('photoInput').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentPhoto = e.target.result;
            document.getElementById('previewImage').src = currentPhoto;
            document.getElementById('photoPreview').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function removePhoto() {
    currentPhoto = null;
    document.getElementById('photoInput').value = '';
    document.getElementById('photoPreview').classList.add('hidden');
}

function viewPhoto(photoData) {
    document.getElementById('fullPhoto').src = photoData;
    document.getElementById('photoModal').style.display = 'flex';
}

function closePhotoModal() {
    document.getElementById('photoModal').style.display = 'none';
}

// ========== МАТЕМАТИКА ==========
function average(arr) {
    return arr.length ? Math.round(arr.reduce((a,b) => a + b) / arr.length) : 0;
}

function calculateAttendance(className) {
    const checks = get('checks').filter(c => c.class === className);
    if (!checks.length) return 0;
    const good = checks.filter(c => c.status === 'good').length;
    return Math.round((good / checks.length) * 100);
}

function calculateRating(className) {
    const checks = get('checks').filter(c => c.class === className);
    if (!checks.length) return 0;
    const good = checks.filter(c => c.status === 'good').length;
    const bad = checks.filter(c => c.status === 'bad').length;
    const absent = checks.filter(c => c.status === 'absent').length;
    return Math.round((good * 100 + absent * 50) / checks.length);
}

function calculateQualityIndex() {
    const checks = get('checks');
    if (!checks.length) return 0;
    const good = checks.filter(c => c.status === 'good').length;
    return Math.round((good / checks.length) * 100);
}

// ========== АВТОРИЗАЦИЯ ==========
function switchAuth(mode) {
    document.getElementById('loginForm').style.display = mode === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = mode === 'register' ? 'block' : 'none';
    document.getElementById('btnLogin').classList.toggle('bg-white', mode === 'login');
    document.getElementById('btnLogin').classList.toggle('shadow-lg', mode === 'login');
    document.getElementById('btnRegister').classList.toggle('bg-white', mode === 'register');
    document.getElementById('btnRegister').classList.toggle('shadow-lg', mode === 'register');
}

function login() {
    const name = document.getElementById('loginName').value.trim();
    const surname = document.getElementById('loginSurname').value.trim();
    if (!name || !surname) return alert('Заполните поля!');
    
    const found = get('users').find(u => u.name === name && u.surname === surname);
    if (!found) return alert('Пользователь не найден!');
    
    user = found;
    localStorage.setItem('currentUser', JSON.stringify(user));
    showApp();
}

function register() {
    const name = document.getElementById('regName').value.trim();
    const surname = document.getElementById('regSurname').value.trim();
    const role = document.getElementById('regRole').value;
    const code = document.getElementById('regCode').value.trim();
    
    if (!name || !surname || !code) return alert('Заполните все поля!');
    
    const validCode = role === 'admin' ? 'ADMIN2025' : 'TEACHER2025';
    if (code !== validCode) return alert('Неверный код!');
    
    const users = get('users');
    if (users.find(u => u.name === name && u.surname === surname)) {
        return alert('Пользователь уже существует!');
    }
    
    users.push({ id: Date.now().toString(), name, surname, role, created: new Date().toISOString() });
    save('users', users);
    alert('Регистрация успешна!');
    switchAuth('login');
}

function logout() {
    if (confirm('Выйти?')) {
        localStorage.removeItem('currentUser');
        location.reload();
    }
}

function checkAuth() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
        user = JSON.parse(saved);
        showApp();
    } else {
        document.getElementById('authScreen').style.display = 'flex';
    }
}

function showApp() {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('mainScreen').style.display = 'block';
    
    const t = translations[currentLang];
    document.getElementById('userName').textContent = user.name + ' ' + user.surname;
    document.getElementById('userRole').textContent = t[`role${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`] || user.role;
    
    if (user.role === 'admin') {
        document.getElementById('newTaskBtn').style.display = 'block';
        document.getElementById('newMsgBtn').style.display = 'block';
    }
    
    document.getElementById('checkDate').valueAsDate = new Date();
    
    [document.getElementById('filterClass'), document.getElementById('studentClass'), document.getElementById('filterViolClass')].forEach(sel => {
        if (sel) sel.innerHTML = `<option value="">${t.class}</option>` + CLASSES.map(c => `<option value="${c}">${c}</option>`).join('');
    });
    
    updateHome();
    loadStudents();
    refreshClasses();
    loadViolations();
    updateAnalytics();
    updateTasks();
    updateMessages();
    
    setInterval(() => {
        const locale = currentLang === 'kk' ? 'kk-KZ' : currentLang === 'en' ? 'en-US' : 'ru-RU';
        document.getElementById('currentTime').textContent = new Date().toLocaleString(locale);
    }, 1000);
}

// ========== НАВИГАЦИЯ ==========
function showTab(tab) {
    ['home', 'students', 'check', 'violations', 'analytics', 'tasks', 'messages'].forEach(t => {
        const page = document.getElementById('page-' + t);
        const btn = document.getElementById('tab-' + t);
        if (page) page.style.display = t === tab ? 'block' : 'none';
        if (btn) btn.classList.toggle('tab-active', t === tab);
    });
    
    const funcs = {home: updateHome, students: loadStudents, check: refreshClasses, violations: loadViolations, analytics: updateAnalytics, tasks: updateTasks, messages: updateMessages};
    if (funcs[tab]) funcs[tab]();
}

// ========== ГЛАВНАЯ ==========
function updateHome() {
    const students = get('students');
    const checks = get('checks');
    const today = new Date().toISOString().split('T')[0];
    const todayChecks = checks.filter(c => c.date === today);
    const violations = checks.filter(c => c.status === 'bad');
    
    document.getElementById('todayCount').textContent = todayChecks.length;
    document.getElementById('statStudents').textContent = students.length;
    document.getElementById('statChecked').textContent = todayChecks.length;
    document.getElementById('statViolations').textContent = violations.length;
    
    // Обновляем прогресс-бары с анимацией
    const checkedPercent = students.length > 0 ? (todayChecks.length / students.length) * 100 : 0;
    document.getElementById('checkedProgress').style.width = checkedPercent + '%';
    
    const rates = CLASSES.map(c => calculateRating(c)).filter(r => r > 0);
    const avgRate = average(rates);
    document.getElementById('statAverage').textContent = avgRate + '%';
    document.getElementById('averageProgress').style.width = avgRate + '%';
    
    const violPercent = students.length > 0 ? (violations.length / students.length) * 100 : 0;
    document.getElementById('violationsProgress').style.width = violPercent + '%';
    
    const badge = document.getElementById('violBadge');
    if (violations.length > 0) {
        badge.textContent = violations.length;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
    
    updatePeriodChart();
    updateTopClasses();
}

function updatePeriodChart() {
    const checks = get('checks');
    const ctx = document.getElementById('periodChart');
    if (!ctx) return;
    
    const existing = Chart.getChart(ctx);
    if (existing) existing.destroy();
    
    const days = [], good = [], bad = [];
    const locale = currentLang === 'kk' ? 'kk-KZ' : currentLang === 'en' ? 'en-US' : 'ru-RU';
    
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        days.push(d.toLocaleDateString(locale, {day: 'numeric', month: 'short'}));
        
        const dayChecks = checks.filter(c => c.date === dateStr);
        good.push(dayChecks.filter(c => c.status === 'good').length);
        bad.push(dayChecks.filter(c => c.status === 'bad').length);
    }
    
    const t = translations[currentLang];
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [
                {
                    label: t.order,
                    data: good,
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: '#10b981',
                    borderWidth: 2,
                    borderRadius: 8
                },
                {
                    label: t.violations,
                    data: bad,
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderColor: '#ef4444',
                    borderWidth: 2,
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 13,
                            weight: 'bold'
                        },
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updateTopClasses() {
    const ratings = CLASSES.map(c => ({class: c, rating: calculateRating(c)}))
        .filter(r => r.rating > 0)
        .sort((a,b) => b.rating - a.rating)
        .slice(0, 5);
    
    const div = document.getElementById('topClasses');
    if (!div) return;
    
    if (!ratings.length) {
        div.innerHTML = '<p class="text-center text-gray-500 py-8">Нет данных</p>';
        return;
    }
    
    const medals = ['🥇','🥈','🥉','🏅','⭐'];
    div.innerHTML = ratings.map((r, i) => `
        <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl mb-3 transition-all hover:shadow-md hover:scale-102">
            <span class="text-3xl">${medals[i]}</span>
            <div class="flex-1">
                <p class="font-bold text-lg mb-2">${r.class}</p>
                <div class="flex items-center gap-3">
                    <div class="flex-1 progress-bar">
                        <div class="progress-fill" style="width:${r.rating}%"></div>
                    </div>
                    <span class="text-sm font-bold text-indigo-600">${r.rating}%</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== УЧЕНИКИ ==========
function loadStudents() {
    document.getElementById('totalStudents').textContent = get('students').length;
    filterStudents();
}

function filterStudents() {
    const students = get('students');
    const classFilter = document.getElementById('filterClass').value;
    const search = document.getElementById('searchStudent').value.toLowerCase();
    
    const filtered = students.filter(s => {
        const matchClass = !classFilter || s.class === classFilter;
        const studentLabel = `${currentLang === 'kk' ? 'Оқушы' : currentLang === 'en' ? 'Student' : 'Ученик'} ${s.number}`;
        const matchSearch = !search || studentLabel.toLowerCase().includes(search) || s.class.toLowerCase().includes(search);
        return matchClass && matchSearch;
    });
    
    const tbody = document.getElementById('studentsTable');
    if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-gray-500">Нет учеников</td></tr>';
        return;
    }
    
    tbody.innerHTML = filtered.map((s, i) => {
        const attendance = calculateAttendance(s.class);
        const studentLabel = currentLang === 'kk' ? 'Оқушы' : currentLang === 'en' ? 'Student' : 'Ученик';
        return `
            <tr>
                <td class="font-semibold text-gray-600">${i + 1}</td>
                <td>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                            ${s.number}
                        </div>
                        <span class="font-semibold">${studentLabel} ${s.number}</span>
                    </div>
                </td>
                <td><span class="badge badge-primary px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">${s.class}</span></td>
                <td>
                    <div class="flex items-center gap-3">
                        <div class="flex-1 progress-bar">
                            <div class="progress-fill" style="width:${attendance}%"></div>
                        </div>
                        <span class="text-sm font-bold">${attendance}%</span>
                    </div>
                </td>
                <td>
                    <button onclick="deleteStudent('${s.id}')" class="text-red-600 hover:text-red-800 transition-colors p-2 rounded-lg hover:bg-red-50">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function openAddStudent() {
    document.getElementById('studentModal').style.display = 'flex';
}

function closeStudentModal() {
    document.getElementById('studentModal').style.display = 'none';
}

function addStudent() {
    const className = document.getElementById('studentClass').value;
    
    if (!className) return alert('Выберите класс!');
    
    const students = get('students');
    const classStudents = students.filter(s => s.class === className);
    const nextNumber = classStudents.length + 1;
    
    students.push({
        id: Date.now().toString(),
        number: nextNumber,
        class: className,
        created: new Date().toISOString()
    });
    
    save('students', students);
    alert('✅ Ученик добавлен!');
    closeStudentModal();
    loadStudents();
    updateHome();
}

function deleteStudent(id) {
    if (confirm('Удалить ученика?')) {
        save('students', get('students').filter(s => s.id !== id));
        loadStudents();
        updateHome();
    }
}

// ========== ПРОВЕРКА ==========
function refreshClasses() {
    const checks = get('checks');
    const period = document.getElementById('checkPeriod').value;
    const date = document.getElementById('checkDate').value || new Date().toISOString().split('T')[0];
    const t = translations[currentLang];
    
    document.getElementById('classGrid').innerHTML = CLASSES.map(cls => {
        const check = checks.find(c => c.class === cls && c.date === date && c.period === period);
        
        let borderClass = 'border-gray-300', bgClass = '', icon = '', statusText = t.notChecked;
        
        if (check) {
            if (check.status === 'good') {
                borderClass = 'border-green-500';
                bgClass = 'bg-gradient-to-br from-green-50 to-green-100';
                icon = '<i class="fas fa-check-circle text-green-600 text-5xl"></i>';
                statusText = t.order;
            } else if (check.status === 'bad') {
                borderClass = 'border-red-500';
                bgClass = 'bg-gradient-to-br from-red-50 to-red-100';
                icon = '<i class="fas fa-times-circle text-red-600 text-5xl"></i>';
                statusText = t.violation;
            } else {
                borderClass = 'border-yellow-500';
                bgClass = 'bg-gradient-to-br from-yellow-50 to-yellow-100';
                icon = '<i class="fas fa-user-slash text-yellow-600 text-5xl"></i>';
                statusText = t.absent;
            }
        }
        
        return `
            <div class="card border-3 ${borderClass} ${bgClass} cursor-pointer transition-all duration-300 hover:scale-105" onclick="openCheckModal('${cls}')">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-4xl font-bold mb-2">${cls}</h3>
                        <p class="text-sm text-gray-700 font-semibold">${statusText}</p>
                    </div>
                    ${icon}
                </div>
                ${check ? `<p class="text-xs text-gray-600 mt-3"><i class="fas fa-user-check mr-1"></i>${t.checkedBy} ${check.by}</p>` : ''}
            </div>
        `;
    }).join('');
}

function openCheckModal(cls) {
    selectedClass = cls;
    selectedStatus = null;
    currentPhoto = null;
    
    const t = translations[currentLang];
    const locale = currentLang === 'kk' ? 'kk-KZ' : currentLang === 'en' ? 'en-US' : 'ru-RU';
    
    document.getElementById('checkModal').style.display = 'flex';
    document.getElementById('modalTitle').textContent = t.classCheck + ' ' + cls;
    
    const period = document.getElementById('checkPeriod').value;
    document.getElementById('modalPeriod').textContent = period === 'before' ? t.beforeLunch : t.afterLunch;
    document.getElementById('modalDate').textContent = new Date(document.getElementById('checkDate').value).toLocaleDateString(locale);
    
    ['violationSection', 'noteSection', 'photoPreview'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById('photoInput').value = '';
    
    document.querySelectorAll('.status-btn').forEach(b => {
        b.classList.remove('border-green-500','border-red-500','border-yellow-500','bg-green-50','bg-red-50','bg-yellow-50');
    });
}

function closeCheckModal() {
    document.getElementById('checkModal').style.display = 'none';
}

function selectStatus(status) {
    selectedStatus = status;
    
    document.querySelectorAll('.status-btn').forEach(b => {
        b.classList.remove('border-green-500','border-red-500','border-yellow-500','bg-green-50','bg-red-50','bg-yellow-50', 'scale-110');
        b.style.borderWidth = '2px';
    });
    
    const btns = document.querySelectorAll('.status-btn');
    if (status === 'good') {
        btns[0].classList.add('border-green-500','bg-green-50', 'scale-110');
        btns[0].style.borderWidth = '4px';
        document.getElementById('violationSection').classList.add('hidden');
        document.getElementById('noteSection').classList.add('hidden');
    } else if (status === 'bad') {
        btns[1].classList.add('border-red-500','bg-red-50', 'scale-110');
        btns[1].style.borderWidth = '4px';
        document.getElementById('violationSection').classList.remove('hidden');
        document.getElementById('noteSection').classList.add('hidden');
    } else {
        btns[2].classList.add('border-yellow-500','bg-yellow-50', 'scale-110');
        btns[2].style.borderWidth = '4px';
        document.getElementById('violationSection').classList.add('hidden');
        document.getElementById('noteSection').classList.remove('hidden');
    }
}

function saveCheck() {
    if (!selectedStatus) return alert('Выберите статус!');
    
    const checks = get('checks');
    const date = document.getElementById('checkDate').value || new Date().toISOString().split('T')[0];
    const period = document.getElementById('checkPeriod').value;
    
    const filtered = checks.filter(c => !(c.class === selectedClass && c.date === date && c.period === period));
    
    const check = {
        id: Date.now().toString(),
        class: selectedClass,
        date, period,
        status: selectedStatus,
        by: user.name + ' ' + user.surname,
        userId: user.id,
        time: new Date().toISOString()
    };
    
    if (selectedStatus === 'bad') {
        check.note = document.getElementById('checkNote').value;
        check.photo = currentPhoto;
    } else if (selectedStatus === 'absent') {
        check.note = document.getElementById('absentNote').value;
    }
    
    filtered.push(check);
    save('checks', filtered);
    alert('✅ Проверка сохранена!');
    closeCheckModal();
    refreshClasses();
    updateHome();
    loadViolations();
}

// ========== НАРУШЕНИЯ ==========
function loadViolations() {
    document.getElementById('totalViolations').textContent = get('checks').filter(c => c.status === 'bad').length;
    filterViolations();
}

function filterViolations() {
    let violations = get('checks').filter(c => c.status === 'bad');
    
    const classFilter = document.getElementById('filterViolClass').value;
    const dateFilter = document.getElementById('filterViolDate').value;
    
    if (classFilter) violations = violations.filter(v => v.class === classFilter);
    if (dateFilter) violations = violations.filter(v => v.date === dateFilter);
    
    violations.sort((a,b) => new Date(b.time) - new Date(a.time));
    
    const list = document.getElementById('violationsList');
    const t = translations[currentLang];
    const locale = currentLang === 'kk' ? 'kk-KZ' : currentLang === 'en' ? 'en-US' : 'ru-RU';
    
    if (!violations.length) {
        list.innerHTML = '<p class="text-center text-gray-500 py-8">Нет нарушений</p>';
        return;
    }
    
    list.innerHTML = violations.map(v => `
        <div class="card border-3 border-red-500 bg-gradient-to-br from-red-50 to-red-100">
            <div class="flex justify-between items-start mb-4 flex-wrap gap-3">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-3 flex-wrap">
                        <h4 class="text-3xl font-bold text-red-800">${v.class}</h4>
                        <span class="badge badge-red px-4 py-2">${t.violation.toUpperCase()}</span>
                    </div>
                    <div class="space-y-2 text-sm">
                        <p class="text-gray-700"><i class="fas fa-calendar text-red-600 mr-2"></i><strong>${t.date}:</strong> ${new Date(v.date).toLocaleDateString(locale)}, ${v.period === 'before' ? t.beforeLunch : t.afterLunch}</p>
                        <p class="text-gray-700"><i class="fas fa-user-check text-red-600 mr-2"></i><strong>${t.checkedBy}</strong> ${v.by}</p>
                        ${v.note ? `<p class="text-gray-700"><i class="fas fa-sticky-note text-red-600 mr-2"></i><strong>${t.note}:</strong> ${v.note}</p>` : ''}
                        <p class="text-xs text-gray-500"><i class="fas fa-clock mr-1"></i>${new Date(v.time).toLocaleString(locale)}</p>
                    </div>
                </div>
                ${v.photo ? `<div class="ml-4"><img src="${v.photo}" class="photo-thumb" onclick="viewPhoto('${v.photo}')" title="Нажмите для увеличения"></div>` : ''}
            </div>
        </div>
    `).join('');
}

function exportViolations() {
    const violations = get('checks').filter(c => c.status === 'bad');
    if (!violations.length) return alert('Нет нарушений!');
    
    const t = translations[currentLang];
    const locale = currentLang === 'kk' ? 'kk-KZ' : currentLang === 'en' ? 'en-US' : 'ru-RU';
    
    let csv = '\uFEFF';
    csv += `${t.exportClassCol},${t.exportDateCol},${t.exportPeriodCol},${t.exportCheckedByCol},${t.exportNoteCol},${t.exportTimeCol},${t.exportHasPhotoCol}\n`;
    
    violations.forEach(v => {
        const period = v.period === 'before' ? t.beforeLunch : t.afterLunch;
        const date = new Date(v.date).toLocaleDateString(locale);
        const time = new Date(v.time).toLocaleString(locale);
        const note = (v.note || '').replace(/"/g, '""').replace(/\n/g, ' ');
        const hasPhoto = v.photo ? (currentLang === 'kk' ? 'Иә' : currentLang === 'en' ? 'Yes' : 'Да') : (currentLang === 'kk' ? 'Жоқ' : currentLang === 'en' ? 'No' : 'Нет');
        
        csv += `"${v.class}","${date}","${period}","${v.by}","${note}","${time}","${hasPhoto}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Violations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    alert('✅ ' + (currentLang === 'kk' ? 'Файл жүктелді!' : currentLang === 'en' ? 'File downloaded!' : 'Файл скачан!'));
}

// ========== АНАЛИТИКА ==========
function updateAnalytics() {
    const checks = get('checks');
    
    const attendances = CLASSES.map(c => calculateAttendance(c)).filter(a => a > 0);
    document.getElementById('avgAttendance').textContent = average(attendances) + '%';
    document.getElementById('goodClasses').textContent = checks.filter(c => c.status === 'good').length;
    document.getElementById('qualityIndex').textContent = calculateQualityIndex();
    
    updateStatusChart();
    updateTrendChart();
    updateAnalyticsTable();
}

function updateStatusChart() {
    const checks = get('checks');
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;
    
    const existing = Chart.getChart(ctx);
    if (existing) existing.destroy();
    
    const good = checks.filter(c => c.status === 'good').length;
    const bad = checks.filter(c => c.status === 'bad').length;
    const absent = checks.filter(c => c.status === 'absent').length;
    
    const t = translations[currentLang];
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [t.order, t.violations, t.absent],
            datasets: [{
                data: [good, bad, absent],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderColor: ['#10b981', '#ef4444', '#f59e0b'],
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 13,
                            weight: 'bold'
                        },
                        padding: 15
                    }
                }
            }
        }
    });
}

function updateTrendChart() {
    const checks = get('checks');
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    const existing = Chart.getChart(ctx);
    if (existing) existing.destroy();
    
    const days = [], good = [], bad = [];
    const locale = currentLang === 'kk' ? 'kk-KZ' : currentLang === 'en' ? 'en-US' : 'ru-RU';
    
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        days.push(d.toLocaleDateString(locale, {day: 'numeric', month: 'short'}));
        
        const dayChecks = checks.filter(c => c.date === dateStr);
        good.push(dayChecks.filter(c => c.status === 'good').length);
        bad.push(dayChecks.filter(c => c.status === 'bad').length);
    }
    
    const t = translations[currentLang];
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [
                {
                    label: t.order,
                    data: good,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16,185,129,0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#10b981'
                },
                {
                    label: t.violations,
                    data: bad,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239,68,68,0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#ef4444'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 13,
                            weight: 'bold'
                        },
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updateAnalyticsTable() {
    const students = get('students');
    const checks = get('checks');
    
    const data = CLASSES.map(c => {
        const classStudents = students.filter(s => s.class === c).length;
        const classChecks = checks.filter(ch => ch.class === c);
        const good = classChecks.filter(ch => ch.status === 'good').length;
        const bad = classChecks.filter(ch => ch.status === 'bad').length;
        return {class: c, students: classStudents, attendance: calculateAttendance(c), good, bad, rating: calculateRating(c)};
    }).sort((a,b) => b.rating - a.rating);
    
    document.getElementById('analyticsTable').innerHTML = data.map(d => `
        <tr>
            <td><span class="font-bold text-lg">${d.class}</span></td>
            <td><span class="text-gray-700">${d.students}</span></td>
            <td><span class="badge badge-blue px-3 py-1">${d.attendance}%</span></td>
            <td><span class="badge badge-green px-3 py-1">${d.good}</span></td>
            <td><span class="badge badge-red px-3 py-1">${d.bad}</span></td>
            <td>
                <div class="flex items-center gap-3">
                    <div class="flex-1 progress-bar">
                        <div class="progress-fill" style="width:${d.rating}%"></div>
                    </div>
                    <span class="font-bold text-lg">${d.rating}</span>
                </div>
            </td>
        </tr>
    `).join('');
}

function exportToExcel() {
    const students = get('students');
    const checks = get('checks');
    const t = translations[currentLang];
    
    let csv = '\uFEFF';
    csv += `${t.exportClassCol},${t.exportStudentsCol},${t.exportAttendanceCol},${t.exportOrderCol},${t.exportViolationsCol},${t.exportRatingCol}\n`;
    
    CLASSES.forEach(c => {
        const classStudents = students.filter(s => s.class === c).length;
        const attendance = calculateAttendance(c);
        const classChecks = checks.filter(ch => ch.class === c);
        const good = classChecks.filter(ch => ch.status === 'good').length;
        const bad = classChecks.filter(ch => ch.status === 'bad').length;
        const rating = calculateRating(c);
        csv += `${c},${classStudents},${attendance}%,${good},${bad},${rating}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Statistics_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    alert('✅ ' + (currentLang === 'kk' ? 'Файл жүктелді!' : currentLang === 'en' ? 'File downloaded!' : 'Файл скачан!'));
}

// ========== ЗАДАНИЯ ==========
function updateTasks() {
    const tasks = get('tasks');
    const myTasks = tasks.filter(t => {
        if (user.role === 'admin') return true;
        return t.to === 'all' || (t.to === 'all_teachers' && user.role === 'teacher') || (t.to === 'all_duty' && user.role === 'duty');
    });
    
    const badge = document.getElementById('taskBadge');
    const pending = myTasks.filter(t => !t.completed).length;
    
    if (pending > 0) {
        badge.textContent = pending;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
    
    const list = document.getElementById('tasksList');
    const locale = currentLang === 'kk' ? 'kk-KZ' : currentLang === 'en' ? 'en-US' : 'ru-RU';
    const t = translations[currentLang];
    
    if (!myTasks.length) {
        list.innerHTML = `<p class="text-center text-gray-500 py-8">${currentLang === 'kk' ? 'Тапсырмалар жоқ' : currentLang === 'en' ? 'No tasks' : 'Нет заданий'}</p>`;
        return;
    }
    
    list.innerHTML = myTasks.map(tk => `
        <div class="p-5 border-3 ${tk.completed ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100' : 'border-gray-300 bg-white'} rounded-2xl mb-4 transition-all hover:shadow-lg">
            <div class="flex justify-between items-start flex-wrap gap-3">
                <div class="flex-1">
                    <h4 class="font-bold text-xl mb-2">${tk.title}</h4>
                    <p class="text-sm text-gray-700 mb-3">${tk.description}</p>
                    <p class="text-xs text-gray-500 flex items-center gap-2">
                        <i class="fas fa-calendar"></i>${currentLang === 'kk' ? 'Мерзім:' : currentLang === 'en' ? 'Deadline:' : 'Дедлайн:'} ${new Date(tk.deadline).toLocaleDateString(locale)}
                        ${tk.completed ? `<span class="ml-3 text-green-600 font-semibold"><i class="fas fa-check-circle mr-1"></i>${currentLang === 'kk' ? 'Орындалды' : currentLang === 'en' ? 'Completed' : 'Выполнено'}</span>` : ''}
                    </p>
                </div>
                ${!tk.completed && user.role !== 'admin' ? `<button onclick="completeTask('${tk.id}')" class="btn btn-green">${currentLang === 'kk' ? 'Орындалды' : currentLang === 'en' ? 'Done' : 'Готово'}</button>` : ''}
            </div>
        </div>
    `).join('');
}

function openNewTask() {
    document.getElementById('taskModal').style.display = 'flex';
    document.getElementById('taskDeadline').valueAsDate = new Date(Date.now() + 7*24*60*60*1000);
}

function closeTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
}

function createTask() {
    const to = document.getElementById('taskTo').value;
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDesc').value.trim();
    const deadline = document.getElementById('taskDeadline').value;
    
    if (!title || !description || !deadline) return alert(currentLang === 'kk' ? 'Барлық өрістерді толтырыңыз!' : currentLang === 'en' ? 'Fill all fields!' : 'Заполните все поля!');
    
    const tasks = get('tasks');
    tasks.push({
        id: Date.now().toString(),
        to, title, description, deadline,
        from: user.name + ' ' + user.surname,
        created: new Date().toISOString(),
        completed: false
    });
    
    save('tasks', tasks);
    alert('✅ ' + (currentLang === 'kk' ? 'Тапсырма жасалды!' : currentLang === 'en' ? 'Task created!' : 'Задание создано!'));
    closeTaskModal();
    updateTasks();
    
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDesc').value = '';
}

function completeTask(id) {
    const tasks = get('tasks');
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = true;
        task.completedBy = user.name + ' ' + user.surname;
        task.completedAt = new Date().toISOString();
        save('tasks', tasks);
        alert('✅ ' + (currentLang === 'kk' ? 'Тапсырма орындалды!' : currentLang === 'en' ? 'Task completed!' : 'Задание выполнено!'));
        updateTasks();
    }
}

// ========== СООБЩЕНИЯ ==========
function updateMessages() {
    const messages = get('messages');
    const myMessages = messages.filter(m => {
        if (user.role === 'admin') return true;
        return m.to === 'all' || (m.to === 'all_teachers' && user.role === 'teacher') || (m.to === 'all_duty' && user.role === 'duty');
    });
    
    const badge = document.getElementById('msgBadge');
    const unread = myMessages.filter(m => !m.read).length;
    
    if (unread > 0) {
        badge.textContent = unread;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
    
    const list = document.getElementById('messagesList');
    const locale = currentLang === 'kk' ? 'kk-KZ' : currentLang === 'en' ? 'en-US' : 'ru-RU';
    
    if (!myMessages.length) {
        list.innerHTML = `<p class="text-center text-gray-500 py-8">${currentLang === 'kk' ? 'Хабарламалар жоқ' : currentLang === 'en' ? 'No messages' : 'Нет сообщений'}</p>`;
        return;
    }
    
    list.innerHTML = myMessages.map(m => `
        <div class="p-5 border-3 ${m.read ? 'border-gray-300 bg-white' : 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50'} rounded-2xl mb-4 transition-all hover:shadow-lg">
            <div class="flex justify-between items-start mb-3 flex-wrap gap-2">
                <h4 class="font-bold text-lg">${m.subject}</h4>
                ${!m.read && user.role !== 'admin' ? `<button onclick="markRead('${m.id}')" class="text-xs text-indigo-600 hover:underline font-semibold">${currentLang === 'kk' ? 'Оқылды' : currentLang === 'en' ? 'Read' : 'Прочитано'}</button>` : ''}
            </div>
            <p class="text-sm text-gray-700 mb-3">${m.text}</p>
            <p class="text-xs text-gray-500 flex items-center gap-2">
                <i class="fas fa-user"></i>${currentLang === 'kk' ? 'Кімнен:' : currentLang === 'en' ? 'From:' : 'От:'} ${m.from}
                <i class="fas fa-calendar ml-3"></i>${new Date(m.created).toLocaleDateString(locale)}
            </p>
        </div>
    `).join('');
}

function openNewMessage() {
    document.getElementById('messageModal').style.display = 'flex';
}

function closeMessageModal() {
    document.getElementById('messageModal').style.display = 'none';
}

function sendMessage() {
    const to = document.getElementById('msgTo').value;
    const subject = document.getElementById('msgSubject').value.trim();
    const text = document.getElementById('msgText').value.trim();
    
    if (!subject || !text) return alert(currentLang === 'kk' ? 'Барлық өрістерді толтырыңыз!' : currentLang === 'en' ? 'Fill all fields!' : 'Заполните все поля!');
    
    const messages = get('messages');
    messages.push({
        id: Date.now().toString(),
        to, subject, text,
        from: user.name + ' ' + user.surname,
        created: new Date().toISOString(),
        read: false
    });
    
    save('messages', messages);
    alert('✅ ' + (currentLang === 'kk' ? 'Хабарлама жіберілді!' : currentLang === 'en' ? 'Message sent!' : 'Сообщение отправлено!'));
    closeMessageModal();
    updateMessages();
    
    document.getElementById('msgSubject').value = '';
    document.getElementById('msgText').value = '';
}

function markRead(id) {
    const messages = get('messages');
    const msg = messages.find(m => m.id === id);
    if (msg) {
        msg.read = true;
        save('messages', messages);
        updateMessages();
    }
}

// ========== СТАРТ ==========
window.addEventListener('DOMContentLoaded', () => {
    init();
    checkAuth();
});