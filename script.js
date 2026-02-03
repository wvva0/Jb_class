document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Initial Data Structure ---
    const DEFAULT_SCHEDULE = [
        {
            id: 1,
            day: 1, // Mon
            dayName: "วันจันทร์",
            shortDay: "MON",
            classType: "mon-header",
            subjects: [
                {
                    code: "141223103",
                    section: "S.11, L.11",
                    name: "ดิจิทัลเพื่อการบริหาร",
                    prof: "ผู้ช่วยศาสตราจารย์ ดร.ชัยนาถ ปินสันเทียะ",
                    time: "13:00–17:00",
                    room: "22-LS-202",
                    exams: [
                        { type: "สอบปลายภาค", date: "20 มี.ค. 2569 (13:00–16:00)" }
                    ]
                }
            ]
        },
        {
            id: 2,
            day: 2, // Tue
            dayName: "วันอังคาร",
            shortDay: "TUE",
            classType: "tue-header",
            subjects: [
                {
                    code: "141313106",
                    section: "S.8",
                    name: "การตลาดดิจิทัล",
                    prof: "อ.ดร.พิริยา พีรพงศ์พิพัฒน์",
                    time: "13:00–16:00",
                    room: "22-LS-202",
                    exams: [
                        { type: "สอบกลางภาค", date: "19 ม.ค. 2569 (09:00–11:00)" },
                        { type: "สอบปลายภาค", date: "23 มี.ค. 2569 (13:00–16:00)" }
                    ]
                }
            ]
        },
        {
            id: 3,
            day: 3, // Wed
            dayName: "วันพุธ",
            shortDay: "WED",
            classType: "wed-header",
            subjects: [
                {
                    code: "141213213",
                    section: "S.1",
                    name: "การเขียนโปรแกรมเชิงวัตถุ",
                    prof: "อ.ดร.ศักดิ์ชัย พิชจิพระ",
                    time: "08:00–12:00",
                    room: "22-LS-202",
                    exams: [
                        { type: "สอบกลางภาค", date: "23 ม.ค. 2569 (09:00–11:00)" },
                        { type: "สอบปลายภาค", date: "24 มี.ค. 2569 (09:00–12:00)" }
                    ]
                }
            ]
        },
        {
            id: 4,
            day: 4, // Thu
            dayName: "วันพฤหัสบดี",
            shortDay: "THU",
            classType: "thu-header",
            subjects: [
                {
                    code: "141213205",
                    section: "S.1, L.1",
                    name: "เครือข่ายคอมพิวเตอร์",
                    prof: "ผู้ช่วยศาสตราจารย์ ดร.ชัยนาถ ปินสันเทียะ",
                    time: "08:00–12:00",
                    room: "22-LS-202",
                    exams: [
                        { type: "สอบกลางภาค", date: "21 ม.ค. 2569 (09:00–11:00)" },
                        { type: "สอบปลายภาค", date: "18 มี.ค. 2569 (13:00–16:00)" }
                    ]
                }
            ]
        },
        {
            id: 5,
            day: 5, // Fri
            dayName: "วันศุกร์",
            shortDay: "FRI",
            classType: "fri-header",
            subjects: [
                {
                    code: "140103020",
                    section: "S.12",
                    name: "ภาษาอังกฤษเพื่อการจัดการฯ",
                    prof: "MISS Stephanie Christie Cabrera-Abella",
                    time: "09:00–12:00",
                    room: "52-CB 501",
                    exams: [
                        { type: "สอบกลางภาค", date: "20 ม.ค. 2569 (13:00–15:00)" },
                        { type: "สอบปลายภาค", date: "17 มี.ค. 2569 (13:00–16:00)" }
                    ]
                }
            ]
        }
    ];

    let scheduleData = JSON.parse(localStorage.getItem('scheduleData')) || DEFAULT_SCHEDULE;

    // --- 1. Rendering Engine ---
    const container = document.getElementById('schedule-container');

    function renderSchedule() {
        if (!container) return;
        container.innerHTML = '';

        scheduleData.forEach((dayData, index) => {
            const card = document.createElement('div');
            card.className = `class-card`;
            card.setAttribute('data-day', dayData.day);
            card.style.animationDelay = `${(index + 1) * 0.1}s`;

            let subjectsHTML = '';
            dayData.subjects.forEach(sub => {
                let examsHTML = sub.exams.map(ex => `
                    <div class="exam-item">
                        <strong>${ex.type}:</strong> <span>${ex.date}</span>
                    </div>
                `).join('');

                subjectsHTML += `
                    <div class="card-body">
                        <div class="course-info">
                            <h3 class="course-name">${sub.name}</h3>
                            <p class="course-code" data-tooltip="รหัสวิชา">${sub.code}</p>
                            <p class="course-section" data-tooltip="ตอนเรียน">Sec: ${sub.section}</p>
                        </div>
                        <div class="time-loc-info">
                            <p class="time"><i class="fas fa-clock"></i> ${sub.time}</p>
                            <p class="room"><i class="fas fa-map-marker-alt"></i> ${sub.room}</p>
                        </div>
                        <div class="prof-info">
                            <i class="fas fa-user-tie"></i> ${sub.prof}
                        </div>
                        <button class="exam-toggle-btn">ดูวันสอบ <i class="fas fa-chevron-down"></i></button>
                        <div class="exam-details hidden">
                            ${examsHTML || '<p>ยังไม่มีกำหนดสอบน้าาา</p>'}
                        </div>
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="card-header ${dayData.classType}">
                    <span class="day-badge">${dayData.shortDay}</span>
                    <h2>${dayData.dayName}</h2>
                </div>
                ${subjectsHTML}
            `;
            container.appendChild(card);
        });

        // Re-attach event listeners for newly created buttons
        attachCardListeners();
        updateBanner();
        highlightToday();
    }

    function attachCardListeners() {
        const examBtns = document.querySelectorAll('.exam-toggle-btn');
        examBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                const details = this.nextElementSibling;
                details.classList.toggle('hidden');
                const icon = this.querySelector('i');
                if (details.classList.contains('hidden')) {
                    icon.style.transform = 'rotate(0deg)';
                    this.innerHTML = `ดูวันสอบ <i class="fas fa-chevron-down"></i>`;
                } else {
                    icon.style.transform = 'rotate(180deg)';
                    this.innerHTML = `ซ่อนวันสอบ <i class="fas fa-chevron-up"></i>`;
                }
            });
        });
    }

    function highlightToday() {
        const today = new Date().getDay();
        const cards = document.querySelectorAll('.class-card');
        cards.forEach(card => {
            if (parseInt(card.getAttribute('data-day')) === today) {
                card.classList.add('active-day');
            } else {
                card.classList.remove('active-day');
            }
        });
    }

    // --- 2. Configuration & Utilities ---
    const CONFIG = {
        typingSpeed: 100,
        messages: [
            "ตั้งใจเรียนนะคะคนเก่ง! เค้าเป็นกำลังใจให้ ✌️",
            "วันนี้ก็สู้ๆ นะครับ! คนเก่งของเค้า 💖",
            "อย่าลืมกินข้าวให้เย้อะๆนะ! เป็นห่วงจัง 🍱",
            "เค้ารักหนูนะคะ จุ๊บๆ! พยายามเข้านะ 😘",
            "เรียนเสร็จแล้ว อย่าลืมหาไรกิงอร่อยๆน้า! 🍦"
        ]
    };

    // Dark Mode Toggle Logic
    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        const currentTheme = localStorage.getItem('theme') || 'light';

        // Apply saved theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme, themeIcon);

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
        });
    }

    function updateThemeIcon(theme, icon) {
        if (!icon) return;
        if (theme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    function typeWriter() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;
        let msgIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function run() {
            const currentMsg = CONFIG.messages[msgIndex];
            if (isDeleting) {
                typingElement.textContent = currentMsg.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentMsg.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = CONFIG.typingSpeed;
            if (!isDeleting && charIndex === currentMsg.length) {
                typeSpeed = 3000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                msgIndex = (msgIndex + 1) % CONFIG.messages.length;
                typeSpeed = 500;
            }
            setTimeout(run, typeSpeed);
        }
        run();
    }

    function updateClock() {
        const clockElement = document.getElementById('greeting-clock');
        if (!clockElement) return;
        const now = new Date();
        const hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        let greeting = "สวัสดีครับแฟน";
        if (hours >= 5 && hours < 9) greeting = "มอนิ่งน้า ตื่นยังเอ่ย? 🌅";
        else if (hours >= 9 && hours < 12) greeting = "สายแล้ววว ตั้งใจเรียนนะ! ☀️";
        else if (hours >= 12 && hours < 13) greeting = "เที่ยงแล้ว! พักกินข้าวก่อนนะ 🍱";
        else if (hours >= 13 && hours < 17) greeting = "ช่วงบ่ายสู้ๆ อย่าเพิ่งง่วงนะ! 🌤️";
        else if (hours >= 17 && hours < 21) greeting = "เลิกเรียนยังคะ? เค้าคิดถึงนะ 🌙";
        else if (hours >= 21 || hours < 5) greeting = "ดึกแล้ว พักผ่อนได้แล้วนะคะ 💤";

        clockElement.innerHTML = `<span>${greeting} | ${hours}:${minutes}:${seconds}</span>`;
    }

    function updateBanner() {
        const now = new Date();
        const day = now.getDay();
        const banner = document.getElementById('countdown-banner');
        const textSpan = document.getElementById('countdown-text');
        if (!banner || !textSpan) return;

        banner.classList.remove('hidden');

        if (day === 0 || day === 6) {
            textSpan.innerHTML = `<div style="font-weight: 600;">🏖️ วันหยุดแล้ว! พักผ่อนให้เต็มที่ อย่าลืมกินของอร่อยๆ นะคะ เค้ารักหนูน้าาา 💖</div>`;
            banner.style.borderLeft = "5px solid var(--accent-color)";
            banner.style.alignItems = "center";
        } else {
            const todayData = scheduleData.find(d => d.day === day);
            if (todayData && todayData.subjects.length > 0) {
                const sub = todayData.subjects[0];

                const mid = sub.exams.find(ex => ex.type.includes('กลางภาค'));
                const final = sub.exams.find(ex => ex.type.includes('ปลายภาค'));

                let midHtml = mid ? `
                    <div class="exam-item-box">
                        <div class="exam-type-name">${mid.type}</div>
                        <div class="exam-date-time">(${mid.date})${final ? ',' : ''}</div>
                    </div>
                ` : '';

                let finalHtml = final ? `
                    <div class="exam-item-box">
                        <div class="exam-type-name">${final.type}</div>
                        <div class="exam-date-time">(${final.date})</div>
                    </div>
                ` : '';

                textSpan.innerHTML = `
                    <div class="banner-grid">
                        <div class="banner-title">⌛ วันนี้เรียน ${sub.name}:</div>
                        <div class="exam-status-label">มีสอบน้าาา:</div>
                        <div class="exam-grid-row">
                            ${midHtml}
                            ${finalHtml}
                        </div>
                    </div>
                `;
                banner.style.borderLeft = `5px solid var(--accent-color)`;
                banner.style.alignItems = "flex-start";
            } else {
                textSpan.textContent = "วันนี้ดูเหมือนจะไม่มีเรียนนะคะ พักผ่อนนะ! ✨";
                banner.style.alignItems = "center";
            }
        }
    }

    // --- 3. Admin System ---
    function setupAdmin() {
        const headerTitle = document.getElementById('header-title');
        const adminBtn = document.getElementById('admin-btn');
        const loginModal = document.getElementById('login-modal');
        const passwordInput = document.getElementById('login-password-input');
        const submitBtn = document.getElementById('login-submit-btn');
        const cancelBtn = document.getElementById('login-cancel-btn');
        const errorMsg = document.getElementById('login-error-msg');
        let clickCount = 0;

        const openLogin = () => {
            passwordInput.value = '';
            errorMsg.classList.add('hidden');
            loginModal.classList.remove('hidden');
            setTimeout(() => passwordInput.focus(), 300);
        };

        const closeLogin = () => {
            loginModal.classList.add('hidden');
        };

        const handleLogin = () => {
            if (passwordInput.value === "210106") {
                closeLogin();
                openAdminPanel();
            } else {
                errorMsg.classList.remove('hidden');
                passwordInput.value = '';
                passwordInput.focus();
            }
        };

        // Event Listeners
        if (adminBtn) adminBtn.addEventListener('click', openLogin);
        if (cancelBtn) cancelBtn.addEventListener('click', closeLogin);
        if (submitBtn) submitBtn.addEventListener('click', handleLogin);

        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });

        // Hide on click outside
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) closeLogin();
        });

        // Old secret way
        headerTitle.addEventListener('click', () => {
            clickCount++;
            if (clickCount >= 5) {
                openLogin();
                clickCount = 0;
            }

            // Still show easter egg alert on single click
            if (clickCount === 1) {
                setTimeout(() => {
                    if (clickCount === 1) {
                        alert("💖 ตั้งใจเรียนนะ เค้าเป็นกำลังใจให้เสมอ\n\n- รักนะจุ๊บๆ 🍞");
                        clickCount = 0;
                    }
                }, 300);
            }
        });
    }

    function openAdminPanel() {
        const modal = document.getElementById('admin-modal');
        const modalBody = modal.querySelector('.modal-body');
        renderAdminUI(modalBody);
        modal.classList.remove('hidden');
    }

    function renderAdminUI(container) {
        container.innerHTML = `
            <div class="admin-controls">
                <button onclick="copyCurrentJSON()" class="secondary-btn">📋 คัดลอก JSON สำรอง</button>
                <p>เลือกวันที่ต้องการแก้ไขข้อมูลครับ:</p>
            </div>
            <div id="admin-days-list" class="admin-days-grid">
                ${scheduleData.map(day => `
                    <div class="admin-day-item">
                        <div class="admin-day-header ${day.classType}">
                            <strong>${day.dayName}</strong>
                            <button onclick="editDayData(${day.id})" class="edit-day-btn">แก้ไข <i class="fas fa-edit"></i></button>
                        </div>
                        <div class="admin-day-summary">
                            ${day.subjects.map(s => `<span>${s.name} (${s.code})</span>`).join(', ') || 'ไม่มีเรียน'}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div id="admin-edit-form-container" class="hidden">
                <!-- Form will be rendered here -->
            </div>
        `;
    }

    window.editDayData = function (dayId) {
        const day = scheduleData.find(d => d.id === dayId);
        const list = document.getElementById('admin-days-list');
        const formContainer = document.getElementById('admin-edit-form-container');

        list.classList.add('hidden');
        formContainer.classList.remove('hidden');

        const sub = day.subjects[0]; // Assuming 1 subject for now
        const mid = sub.exams.find(ex => ex.type.includes('กลางภาค')) || { type: 'สอบกลางภาค', date: '' };
        const final = sub.exams.find(ex => ex.type.includes('ปลายภาค')) || { type: 'สอบปลายภาค', date: '' };

        formContainer.innerHTML = `
            <div class="admin-form">
                <h3>แก้ไขข้อมูล ${day.dayName}</h3>
                <div class="form-group">
                    <label>ชื่อวิชา:</label>
                    <input type="text" id="edit-name" value="${sub.name}">
                </div>
                <div class="form-group">
                    <label>รหัสวิชา:</label>
                    <input type="text" id="edit-code" value="${sub.code}">
                </div>
                <div class="form-group">
                    <label>เซคชั่น (Sec):</label>
                    <input type="text" id="edit-section" value="${sub.section}">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>เวลาเรียน:</label>
                        <input type="text" id="edit-time" value="${sub.time}">
                    </div>
                    <div class="form-group">
                        <label>ห้องเรียน:</label>
                        <input type="text" id="edit-room" value="${sub.room}">
                    </div>
                </div>
                <div class="form-group">
                    <label>ชื่ออาจารย์:</label>
                    <input type="text" id="edit-prof" value="${sub.prof}">
                </div>
                <hr>
                <div class="form-group">
                    <label>วันสอบกลางภาค:</label>
                    <input type="text" id="edit-mid" value="${mid.date}" placeholder="เช่น 19 ม.ค. 2569 (09:00–11:00)">
                </div>
                <div class="form-group">
                    <label>วันสอบปลายภาค:</label>
                    <input type="text" id="edit-final" value="${final.date}" placeholder="เช่น 23 ม.ค. 2569 (13:00–16:00)">
                </div>
                <div class="admin-form-actions">
                    <button onclick="cancelAdminEdit()" class="cancel-btn">ยกเลิก</button>
                    <button onclick="saveDayChanges(${dayId})" class="save-item-btn">บันทึกวิชานี้ ✨</button>
                </div>
            </div>
        `;
    };

    window.saveDayChanges = function (dayId) {
        const day = scheduleData.find(d => d.id === dayId);
        const sub = day.subjects[0];

        sub.name = document.getElementById('edit-name').value;
        sub.code = document.getElementById('edit-code').value;
        sub.section = document.getElementById('edit-section').value;
        sub.time = document.getElementById('edit-time').value;
        sub.room = document.getElementById('edit-room').value;
        sub.prof = document.getElementById('edit-prof').value;

        // Exams logic
        sub.exams = [];
        const midVal = document.getElementById('edit-mid').value;
        const finalVal = document.getElementById('edit-final').value;
        if (midVal) sub.exams.push({ type: 'สอบกลางภาค', date: midVal });
        if (finalVal) sub.exams.push({ type: 'สอบปลายภาค', date: finalVal });

        localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
        alert("บันทึกข้อมูลสำเร็จ! 🥰");
        renderSchedule();
        cancelAdminEdit();
    };

    window.cancelAdminEdit = function () {
        document.getElementById('admin-days-list').classList.remove('hidden');
        document.getElementById('admin-edit-form-container').classList.add('hidden');
    };

    window.copyCurrentJSON = function () {
        navigator.clipboard.writeText(JSON.stringify(scheduleData, null, 4));
        alert("คัดลอก JSON เก็บไว้ใน Clipboard แล้วครับ! 📋");
    };

    window.closeAdmin = function () {
        document.getElementById('admin-modal').classList.add('hidden');
    };

    // --- 4. Initialization ---
    renderSchedule();
    typeWriter();
    initTheme();
    setInterval(updateClock, 1000);
    updateClock();
    setupAdmin();

    // Background Icons
    const bgContainer = document.getElementById('bg-container');
    const icons = ['☁️', '✨', '🌸', '🍓', '🧸', '🎀', '🍭', '🌙', '⭐'];
    for (let i = 0; i < 20; i++) {
        const span = document.createElement('span');
        span.classList.add('bg-icon');
        span.textContent = icons[Math.floor(Math.random() * icons.length)];
        span.style.left = `${Math.random() * 100}vw`;
        span.style.top = `${Math.random() * 100}vh`;
        span.style.fontSize = `${Math.random() * 2 + 1}rem`;
        span.style.animationDelay = `${Math.random() * 5}s`;
        span.style.animationDuration = `${Math.random() * 10 + 10}s`;
        bgContainer.appendChild(span);
    }
});
