document.addEventListener('DOMContentLoaded', () => {
    // العناصر الخاصة بصفحة فهرس السور والبحث
    const surahListContainer = document.getElementById('surah-list-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResultsDiv = document.getElementById('search-results');

    // أزرار تبديل الثيم لكلتا الصفحتين
    const themeToggleHomePage = document.getElementById('theme-toggle'); // لـ index.html
    const themeToggleSurahsIndexPage = document.getElementById('theme-toggle-surahs-index'); // لـ surahs-index.html

    let quranAyahsData = {};
    let surahsMetaData = [];

    // بيانات السور الثابتة (لا تتغير)
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

    // دالة لجلب البيانات من ملف quran.json
    async function fetchQuranData() {
        try {
            const response = await fetch('data/quran.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            quranAyahsData = await response.json();

            // بناء مصفوفة surahsMetaData كاملة
            surahsMetaData = staticSurahsInfo.map(info => {
                return {
                    ...info,
                    ayahs: quranAyahsData[info.number] || []
                };
            });

            // فقط إذا كنا في صفحة فهرس السور، اعرض القائمة
            if (surahListContainer) {
                displaySurahList();
            }

        } catch (error) {
            console.error('Error fetching Quran data:', error);
            if (surahListContainer) {
                surahListContainer.innerHTML = `<p>عذراً، لم نتمكن من تحميل بيانات القرآن. الرجاء المحاولة لاحقاً.</p>`;
            }
        }
    }

    // دالة لتوليد وعرض قائمة السور (تستخدم فقط في surahs-index.html)
    function displaySurahList() {
        if (!surahListContainer) return;

        surahListContainer.innerHTML = '';
        if (surahsMetaData.length > 0) {
            surahsMetaData.forEach(surah => {
                const surahItem = document.createElement('div');
                surahItem.classList.add('surah-item');
                surahItem.innerHTML = `
                    <a href="surah.html?id=${surah.number}">
                        <h3>${surah.number}. ${surah.name}</h3>
                        <p>${surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} - ${surah.numberOfAyahs} آية</p>
                    </a>
                `;
                surahListContainer.appendChild(surahItem);
            });
        } else {
            surahListContainer.innerHTML = `<p>لا توجد بيانات للسور للعرض. تأكد من إعداد staticSurahsInfo.</p>`;
        }
    }

    // وظيفة تبديل الوضع الليلي/النهاري لزر index.html
    if (themeToggleHomePage) {
        themeToggleHomePage.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // وظيفة تبديل الوضع الليلي/النهاري لزر surahs-index.html
    if (themeToggleSurahsIndexPage) {
        themeToggleSurahsIndexPage.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // تحميل تفضيل الوضع الليلي عند تحميل أي من الصفحتين
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggleHomePage) {
            themeToggleHomePage.checked = true;
        }
        if (themeToggleSurahsIndexPage) {
            themeToggleSurahsIndexPage.checked = true;
        }
    }

    // وظيفة البحث (تستخدم فقط في surahs-index.html)
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            searchResultsDiv.innerHTML = '';
            if (query && surahsMetaData.length > 0) {
                const results = [];
                const normalizedQuery = query.replace(/[ّـًٌٍَُِّْ]/g, '');

                surahsMetaData.forEach(surah => {
                    if (surah.ayahs) {
                        surah.ayahs.forEach(ayah => {
                            const normalizedAyahText = ayah.text.replace(/[ّـًٌٌٍَُِّْ]/g, '');
                            const regex = new RegExp(normalizedQuery, 'gi');

                            if (normalizedAyahText.match(regex)) {
                                // ****** هذا هو السطر الذي تم تعديله ******
                                const highlightedText = ayah.text.replace(new RegExp(query, 'gi'), `<span style="background-color: var(--color-highlight-light);">${query}</span>`);
                                results.push(`
                                    <p class="result-item">
                                        <strong>سورة ${surah.name} - آية ${ayah.verse}:</strong>
                                        ${highlightedText}
                                    </p>
                                `);
                            }
                        });
                    }
                });

                if (results.length > 0) {
                    searchResultsDiv.innerHTML = results.join('');
                } else {
                    searchResultsDiv.innerHTML = `<p>لا توجد نتائج للبحث عن "${query}".</p>`;
                }
            } else if (!query) {
                searchResultsDiv.innerHTML = `<p>الرجاء إدخال كلمة للبحث.</p>`;
            }
        });
    }

    // استدعاء دالة جلب البيانات إذا كانت الصفحة تحتوي على حاوية السور أو البحث
    if (surahListContainer || searchInput) {
        fetchQuranData();
    }
});