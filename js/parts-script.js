document.addEventListener('DOMContentLoaded', () => {
    const partsListContainer = document.getElementById('parts-list-container');
    const themeToggle = document.getElementById('theme-toggle-parts');

    let surahsMetaData = [];

    // نفس staticSurahsInfo المستخدمة في script.js و surah-script.js
    const staticSurahsInfo = [
        { "number": 1, "name": "الفاتحة", "englishName": "Al-Fatiha", "revelationType": "Meccan", "numberOfAyahs": 7 },
        { "number": 2, "name": "البقرة", "englishName": "Al-Baqara", "revelationType": "Medinan", "numberOfAyahs": 286 },
        { "number": 3, "name": "آل عمران", "englishName": "Al-Imran", "revelationType": "Medinan", "numberOfAyahs": 200 },
        { "number": 4, "name": "النساء", "englishName": "An-Nisa", "revelationType": "Medinan", "numberOfAyahs": 176 },
        { "number": 5, "name": "المائدة", "englishName": "Al-Ma'idah", "revelationType": "Medinan", "numberOfAyahs": 120 },
        { "number": 6, "name": "الأنعام", "englishName": "Al-An'am", "revelationType": "Meccan", "numberOfAyahs": 165 },
        { "number": 7, "name": "الأعراف", "englishName": "Al-A'raf", "revelationType": "Meccan", "numberOfAyahs": 206 },
        { "number": 8, "name": "الأنفال", "englishName": "Al-Anfal", "revelationType": "Medinan", "numberOfAyahs": 75 },
        { "number": 9, "name": "التوبة", "englishName": "At-Tawbah", "revelationType": "Medinan", "numberOfAyahs": 129 },
        { "number": 10, "name": "يونس", "englishName": "Yunus", "revelationType": "Meccan", "numberOfAyahs": 109 },
        { "number": 11, "name": "هود", "englishName": "Hud", "revelationType": "Meccan", "numberOfAyahs": 123 },
        { "number": 12, "name": "يوسف", "englishName": "Yusuf", "revelationType": "Meccan", "numberOfAyahs": 111 },
        { "number": 13, "name": "الرعد", "englishName": "Ar-Ra'd", "revelationType": "Medinan", "numberOfAyahs": 43 },
        { "number": 14, "name": "إبراهيم", "englishName": "Ibrahim", "revelationType": "Meccan", "numberOfAyahs": 52 },
        { "number": 15, "name": "الحجر", "englishName": "Al-Hijr", "revelationType": "Meccan", "numberOfAyahs": 99 },
        { "number": 16, "name": "النحل", "englishName": "An-Nahl", "revelationType": "Meccan", "numberOfAyahs": 128 },
        { "number": 17, "name": "الإسراء", "englishName": "Al-Isra", "revelationType": "Meccan", "numberOfAyahs": 111 },
        { "number": 18, "name": "الكهف", "englishName": "Al-Kahf", "revelationType": "Meccan", "numberOfAyahs": 110 },
        { "number": 19, "name": "مريم", "englishName": "Maryam", "revelationType": "Meccan", "numberOfAyahs": 98 },
        { "number": 20, "name": "طه", "englishName": "Taha", "revelationType": "Meccan", "numberOfAyahs": 135 },
        { "number": 21, "name": "الأنبياء", "englishName": "Al-Anbiya", "revelationType": "Meccan", "numberOfAyahs": 112 },
        { "number": 22, "name": "الحج", "englishName": "Al-Hajj", "revelationType": "Medinan", "numberOfAyahs": 78 },
        { "number": 23, "name": "المؤمنون", "englishName": "Al-Mu'minun", "revelationType": "Meccan", "numberOfAyahs": 118 },
        { "number": 24, "name": "النور", "englishName": "An-Nur", "revelationType": "Medinan", "numberOfAyahs": 64 },
        { "number": 25, "name": "الفرقان", "englishName": "Al-Furqan", "revelationType": "Meccan", "numberOfAyahs": 77 },
        { "number": 26, "name": "الشعراء", "englishName": "Ash-Shu'ara", "revelationType": "Meccan", "numberOfAyahs": 227 },
        { "number": 27, "name": "النمل", "englishName": "An-Naml", "revelationType": "Meccan", "numberOfAyahs": 93 },
        { "number": 28, "name": "القصص", "englishName": "Al-Qasas", "revelationType": "Meccan", "numberOfAyahs": 88 },
        { "number": 29, "name": "العنكبوت", "englishName": "Al-Ankabut", "revelationType": "Meccan", "numberOfAyahs": 69 },
        { "number": 30, "name": "الروم", "englishName": "Ar-Rum", "revelationType": "Meccan", "numberOfAyahs": 60 },
        { "number": 31, "name": "لقمان", "englishName": "Luqman", "revelationType": "Meccan", "numberOfAyahs": 34 },
        { "number": 32, "name": "السجدة", "englishName": "As-Sajdah", "revelationType": "Meccan", "numberOfAyahs": 30 },
        { "number": 33, "name": "الأحزاب", "englishName": "Al-Ahzab", "revelationType": "Medinan", "numberOfAyahs": 73 },
        { "number": 34, "name": "سبأ", "englishName": "Saba", "revelationType": "Meccan", "numberOfAyahs": 54 },
        { "number": 35, "name": "فاطر", "englishName": "Fatir", "revelationType": "Meccan", "numberOfAyahs": 45 },
        { "number": 36, "name": "يس", "englishName": "Ya-Sin", "revelationType": "Meccan", "numberOfAyahs": 83 },
        { "number": 37, "name": "الصافات", "englishName": "As-Saffat", "revelationType": "Meccan", "numberOfAyahs": 182 },
        { "number": 38, "name": "ص", "englishName": "Sad", "revelationType": "Meccan", "numberOfAyahs": 88 },
        { "number": 39, "name": "الزمر", "englishName": "Az-Zumar", "revelationType": "Meccan", "numberOfAyahs": 75 },
        { "number": 40, "name": "غافر", "englishName": "Ghafir", "revelationType": "Meccan", "numberOfAyahs": 85 },
        { "number": 41, "name": "فصلت", "englishName": "Fussilat", "revelationType": "Meccan", "numberOfAyahs": 54 },
        { "number": 42, "name": "الشورى", "englishName": "Ash-Shura", "revelationType": "Meccan", "numberOfAyahs": 53 },
        { "number": 43, "name": "الزخرف", "englishName": "Az-Zukhruf", "revelationType": "Meccan", "numberOfAyahs": 89 },
        { "number": 44, "name": "الدخان", "englishName": "Ad-Dukhan", "revelationType": "Meccan", "numberOfAyahs": 59 },
        { "number": 45, "name": "الجاثية", "englishName": "Al-Jathiyah", "revelationType": "Meccan", "numberOfAyahs": 37 },
        { "number": 46, "name": "الأحقاف", "englishName": "Al-Ahqaf", "revelationType": "Meccan", "numberOfAyahs": 35 },
        { "number": 47, "name": "محمد", "englishName": "Muhammad", "revelationType": "Medinan", "numberOfAyahs": 38 },
        { "number": 48, "name": "الفتح", "englishName": "Al-Fath", "revelationType": "Medinan", "numberOfAyahs": 29 },
        { "number": 49, "name": "الحجرات", "englishName": "Al-Hujurat", "revelationType": "Medinan", "numberOfAyahs": 18 },
        { "number": 50, "name": "ق", "englishName": "Qaf", "revelationType": "Meccan", "numberOfAyahs": 45 },
        { "number": 51, "name": "الذاريات", "englishName": "Adh-Dhariyat", "revelationType": "Meccan", "numberOfAyahs": 60 },
        { "number": 52, "name": "الطور", "englishName": "At-Tur", "revelationType": "Meccan", "numberOfAyahs": 49 },
        { "number": 53, "name": "النجم", "englishName": "An-Najm", "revelationType": "Meccan", "numberOfAyahs": 62 },
        { "number": 54, "name": "القمر", "englishName": "Al-Qamar", "revelationType": "Meccan", "numberOfAyahs": 55 },
        { "number": 55, "name": "الرحمن", "englishName": "Ar-Rahman", "revelationType": "Medinan", "numberOfAyahs": 78 },
        { "number": 56, "name": "الواقعة", "englishName": "Al-Waqi'ah", "revelationType": "Meccan", "numberOfAyahs": 96 },
        { "number": 57, "name": "الحديد", "englishName": "Al-Hadid", "revelationType": "Medinan", "numberOfAyahs": 29 },
        { "number": 58, "name": "المجادلة", "englishName": "Al-Mujadila", "revelationType": "Medinan", "numberOfAyahs": 22 },
        { "number": 59, "name": "الحشر", "englishName": "Al-Hashr", "revelationType": "Medinan", "numberOfAyahs": 24 },
        { "number": 60, "name": "الممتحنة", "englishName": "Al-Mumtahanah", "revelationType": "Medinan", "numberOfAyahs": 13 },
        { "number": 61, "name": "الصف", "englishName": "As-Saff", "revelationType": "Medinan", "numberOfAyahs": 14 },
        { "number": 62, "name": "الجمعة", "englishName": "Al-Jumu'ah", "revelationType": "Medinan", "numberOfAyahs": 11 },
        { "number": 63, "name": "المنافقون", "englishName": "Al-Munafiqun", "revelationType": "Medinan", "numberOfAyahs": 11 },
        { "number": 64, "name": "التغابن", "englishName": "At-Taghabun", "revelationType": "Medinan", "numberOfAyahs": 18 },
        { "number": 65, "name": "الطلاق", "englishName": "At-Talaq", "revelationType": "Medinan", "numberOfAyahs": 12 },
        { "number": 66, "name": "التحريم", "englishName": "At-Tahrim", "revelationType": "Medinan", "numberOfAyahs": 12 },
        { "number": 67, "name": "الملك", "englishName": "Al-Mulk", "revelationType": "Meccan", "numberOfAyahs": 30 },
        { "number": 68, "name": "القلم", "englishName": "Al-Qalam", "revelationType": "Meccan", "numberOfAyahs": 52 },
        { "number": 69, "name": "الحاقة", "englishName": "Al-Haqqah", "revelationType": "Meccan", "numberOfAyahs": 52 },
        { "number": 70, "name": "المعارج", "englishName": "Al-Ma'arij", "revelationType": "Meccan", "numberOfAyahs": 44 },
        { "number": 71, "name": "نوح", "englishName": "Nuh", "revelationType": "Meccan", "numberOfAyahs": 28 },
        { "number": 72, "name": "الجن", "englishName": "Al-Jinn", "revelationType": "Meccan", "numberOfAyahs": 28 },
        { "number": 73, "name": "المزمل", "englishName": "Al-Muzzammil", "revelationType": "Meccan", "numberOfAyahs": 20 },
        { "number": 74, "name": "المدثر", "englishName": "Al-Muddathir", "revelationType": "Meccan", "numberOfAyahs": 56 },
        { "number": 75, "name": "القيامة", "englishName": "Al-Qiyamah", "revelationType": "Meccan", "numberOfAyahs": 40 },
        { "number": 76, "name": "الإنسان", "englishName": "Al-Insan", "revelationType": "Medinan", "numberOfAyahs": 31 },
        { "number": 77, "name": "المرسلات", "englishName": "Al-Mursalat", "revelationType": "Meccan", "numberOfAyahs": 50 },
        { "number": 78, "name": "النبأ", "englishName": "An-Naba", "revelationType": "Meccan", "numberOfAyahs": 40 },
        { "number": 79, "name": "النازعات", "englishName": "An-Nazi'at", "revelationType": "Meccan", "numberOfAyahs": 46 },
        { "number": 80, "name": "عبس", "englishName": "Abasa", "revelationType": "Meccan", "numberOfAyahs": 42 },
        { "number": 81, "name": "التكوير", "englishName": "At-Takwir", "revelationType": "Meccan", "numberOfAyahs": 29 },
        { "number": 82, "name": "الإنفطار", "englishName": "Al-Infitar", "revelationType": "Meccan", "numberOfAyahs": 19 },
        { "number": 83, "name": "المطففين", "englishName": "Al-Mutaffifin", "revelationType": "Meccan", "numberOfAyahs": 36 },
        { "number": 84, "name": "الإنشقاق", "englishName": "Al-Inshiqaq", "revelationType": "Meccan", "numberOfAyahs": 25 },
        { "number": 85, "name": "البروج", "englishName": "Al-Buruj", "revelationType": "Meccan", "numberOfAyahs": 22 },
        { "number": 86, "name": "الطارق", "englishName": "At-Tariq", "revelationType": "Meccan", "numberOfAyahs": 17 },
        { "number": 87, "name": "الأعلى", "englishName": "Al-A'la", "revelationType": "Meccan", "numberOfAyahs": 19 },
        { "number": 88, "name": "الغاشية", "englishName": "Al-Ghashiyah", "revelationType": "Meccan", "numberOfAyahs": 26 },
        { "number": 89, "name": "الفجر", "englishName": "Al-Fajr", "revelationType": "Meccan", "numberOfAyahs": 30 },
        { "number": 90, "name": "البلد", "englishName": "Al-Balad", "revelationType": "Meccan", "numberOfAyahs": 20 },
        { "number": 91, "name": "الشمس", "englishName": "Ash-Shams", "revelationType": "Meccan", "numberOfAyahs": 15 },
        { "number": 92, "name": "الليل", "englishName": "Al-Layl", "revelationType": "Meccan", "numberOfAyahs": 21 },
        { "number": 93, "name": "الضحى", "englishName": "Ad-Duhaa", "revelationType": "Meccan", "numberOfAyahs": 11 },
        { "number": 94, "name": "الشرح", "englishName": "Ash-Sharh", "revelationType": "Meccan", "numberOfAyahs": 8 },
        { "number": 95, "name": "التين", "englishName": "At-Tin", "revelationType": "Meccan", "numberOfAyahs": 8 },
        { "number": 96, "name": "العلق", "englishName": "Al-Alaq", "revelationType": "Meccan", "numberOfAyahs": 19 },
        { "number": 97, "name": "القدر", "englishName": "Al-Qadr", "revelationType": "Meccan", "numberOfAyahs": 5 },
        { "number": 98, "name": "البينة", "englishName": "Al-Bayyinah", "revelationType": "Medinan", "numberOfAyahs": 8 },
        { "number": 99, "name": "الزلزلة", "englishName": "Az-Zalzalah", "revelationType": "Medinan", "numberOfAyahs": 8 },
        { "number": 100, "name": "العاديات", "englishName": "Al-Adiyat", "revelationType": "Meccan", "numberOfAyahs": 11 },
        { "number": 101, "name": "القارعة", "englishName": "Al-Qari'ah", "revelationType": "Meccan", "numberOfAyahs": 11 },
        { "number": 102, "name": "التكاثر", "englishName": "At-Takathur", "revelationType": "Meccan", "numberOfAyahs": 8 },
        { "number": 103, "name": "العصر", "englishName": "Al-Asr", "revelationType": "Meccan", "numberOfAyahs": 3 },
        { "number": 104, "name": "الهمزة", "englishName": "Al-Humazah", "revelationType": "Meccan", "numberOfAyahs": 9 },
        { "number": 105, "name": "الفيل", "englishName": "Al-Fil", "revelationType": "Meccan", "numberOfAyahs": 5 },
        { "number": 106, "name": "قريش", "englishName": "Quraysh", "revelationType": "Meccan", "numberOfAyahs": 4 },
        { "number": 107, "name": "الماعون", "englishName": "Al-Ma'un", "revelationType": "Meccan", "numberOfAyahs": 7 },
        { "number": 108, "name": "الكوثر", "englishName": "Al-Kawthar", "revelationType": "Meccan", "numberOfAyahs": 3 },
        { "number": 109, "name": "الكافرون", "englishName": "Al-Kafirun", "revelationType": "Meccan", "numberOfAyahs": 6 },
        { "number": 110, "name": "النصر", "englishName": "An-Nasr", "revelationType": "Medinan", "numberOfAyahs": 3 },
        { "number": 111, "name": "المسد", "englishName": "Al-Masad", "revelationType": "Meccan", "numberOfAyahs": 5 },
        { "number": 112, "name": "الإخلاص", "englishName": "Al-Ikhlas", "revelationType": "Meccan", "numberOfAyahs": 4 },
        { "number": 113, "name": "الفلق", "englishName": "Al-Falaq", "revelationType": "Meccan", "numberOfAyahs": 5 },
        { "number": 114, "name": "الناس", "englishName": "An-Nas", "revelationType": "Meccan", "numberOfAyahs": 6 }
    ];

    // بيانات الأجزاء (الجزء، السورة التي يبدأ منها، رقم الآية التي يبدأ منها)
    const partsData = [
        { "part": 1, "startSurah": 1, "startAyah": 1 },
        { "part": 2, "startSurah": 2, "startAyah": 142 },
        { "part": 3, "startSurah": 2, "startAyah": 253 },
        { "part": 4, "startSurah": 3, "startAyah": 93 },
        { "part": 5, "startSurah": 4, "startAyah": 24 },
        { "part": 6, "startSurah": 4, "startAyah": 148 },
        { "part": 7, "startSurah": 5, "startAyah": 83 },
        { "part": 8, "startSurah": 6, "startAyah": 111 },
        { "part": 9, "startSurah": 7, "startAyah": 88 },
        { "part": 10, "startSurah": 8, "startAyah": 41 },
        { "part": 11, "startSurah": 9, "startAyah": 93 },
        { "part": 12, "startSurah": 11, "startAyah": 6 },
        { "part": 13, "startSurah": 12, "startAyah": 53 },
        { "part": 14, "startSurah": 15, "startAyah": 1 },
        { "part": 15, "startSurah": 17, "startAyah": 1 },
        { "part": 16, "startSurah": 18, "startAyah": 75 },
        { "part": 17, "startSurah": 21, "startAyah": 1 },
        { "part": 18, "startSurah": 23, "startAyah": 1 },
        { "part": 19, "startSurah": 25, "startAyah": 21 },
        { "part": 20, "startSurah": 27, "startAyah": 56 },
        { "part": 21, "startSurah": 29, "startAyah": 46 },
        { "part": 22, "startSurah": 33, "startAyah": 31 },
        { "part": 23, "startSurah": 36, "startAyah": 22 },
        { "part": 24, "startSurah": 39, "startAyah": 32 },
        { "part": 25, "startSurah": 41, "startAyah": 47 },
        { "part": 26, "startSurah": 46, "startAyah": 1 },
        { "part": 27, "startSurah": 51, "startAyah": 31 },
        { "part": 28, "startSurah": 58, "startAyah": 1 },
        { "part": 29, "startSurah": 67, "startAyah": 1 },
        { "part": 30, "startSurah": 78, "startAyah": 1 }
    ];

    // دالة جلب بيانات السور (مطلوبة للعثور على اسم السورة من رقمها)
    async function fetchSurahMetaData() {
        try {
            surahsMetaData = staticSurahsInfo; // استخدام البيانات الثابتة مباشرة
            displayPartsList(); // اعرض قائمة الأجزاء بعد جلب بيانات السور
        } catch (error) {
            console.error('Error fetching surah metadata:', error);
            partsListContainer.innerHTML = `<p>عذراً، لم نتمكن من تحميل بيانات الأجزاء. الرجاء المحاولة لاحقاً.</p>`;
        }
    }

    // دالة لعرض قائمة الأجزاء
    function displayPartsList() {
        if (!partsListContainer) return;

        partsListContainer.innerHTML = '';
        partsData.forEach(part => {
            const startSurahInfo = surahsMetaData.find(s => s.number === part.startSurah);
            const surahName = startSurahInfo ? startSurahInfo.name : 'غير معروفة';

            const partItem = document.createElement('div');
            partItem.classList.add('part-item');
            partItem.innerHTML = `
                <a href="surah.html?id=${part.startSurah}&ayah=${part.startAyah}">
                    <h3>الجزء ${part.part}</h3>
                    <p>يبدأ من: سورة ${surahName}، آية رقم ${part.startAyah}</p>
                </a>
            `;
            partsListContainer.appendChild(partItem);
        });
    }

    // وظيفة تبديل الوضع الليلي/النهاري لصفحة الأجزاء
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // تحميل تفضيل الوضع الليلي عند تحميل الصفحة
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.checked = true;
        }
    }

    // استدعاء جلب البيانات عند تحميل الصفحة
    fetchSurahMetaData();
});