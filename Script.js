// ================= CONFIGURACIÓN =================
const apiConfig = {
    baseUrl: 'https://tusitio.somee.com/api',
    loginEndpoint: '/login',
    gradesEndpoint: '/student/grades'
};

// ================= SISTEMA DE VERSIONES =================
// ⭐ IMPORTANTE: CAMBIA ESTE NÚMERO CADA VEZ QUE MODIFIQUES LAS NOTAS ⭐
const DATOS_VERSION = "1.3";  // Incrementa: "1.1", "1.2", "2.0", etc.

// ================= VALORES POR DEFECTO (AQUÍ MODIFICAS LAS NOTAS) =================
function getDefaultGrades() {
    return {
        "william.informatica5": {
            competencias: [
                // ========== MATERIA 1: Lengua Española ==========
                { 
                    nombre: "Lengua Española",
                    // p1 = Período 1: [Comunicativa, Lógico, Científica1, Científica2]
                    p1: [95, 96, 95, 95],
                    p2: [94, 95, 97, 95],
                    p3: [96, 98, 100, 99],
                    p4: [98, 98, 100, 99]
                },
                // ========== MATERIA 2: Inglés ==========
                { 
                    nombre: "Lenguas Extranjeras (Inglés)",
                    p1: [98, 98, 93, 96],
                    p2: [88, 92, 100, 94],
                    p3: [88, 93, 96, 96],
                    p4: [95, 94, 98, 97]
                },
                // ========== MATERIA 3: Matemática ==========
                { 
                    nombre: "Matemática",
                    p1: [95, 99, 90, 93],
                    p2: [94, 98, 98, 98],
                    p3: [100, 96, 99, 99],
                    p4: [95, 97, 95, 100]
                },
                // ========== MATERIA 4: Ciencias Sociales ==========
                { 
                    nombre: "Ciencias Sociales",
                    p1: [98, 98, 95, 94],
                    p2: [98, 96, 95, 95],
                    p3: [96, 95, 98, 99],
                    p4: [96, 98, 95, 95]
                },
                // ========== MATERIA 5: Ciencias Naturales ==========
                { 
                    nombre: "Ciencias de la Naturaleza-Química",
                    p1: [96, 96, 98, 90],
                    p2: [98, 93, 95, 97],
                    p3: [95, 96, 100, 97],
                    p4: [96, 99, 97, 99]
                },
                // ========== MATERIA 6: Educación Artística ==========
                { 
                    nombre: "Educación Artística",
                    p1: [95, 96, 95, 94],
                    p2: [95, 94, 95, 93],
                    p3: [100, 100, 100, 100],
                    p4: [100, 100, 100, 100]
                },
                // ========== MATERIA 7: Educación Física ==========
                { 
                    nombre: "Educación Física",
                    p1: [90, 95, 80, 85],
                    p2: [90, 92, 95, 90],
                    p3: [92, 94, 97, 92],
                    p4: [91, 94, 89, 91]
                },
                // ========== MATERIA 8: Formación Integral ==========
                { 
                    nombre: "Formación Integral Humana y Religiosa",
                    p1: [95, 95, 90, 98],
                    p2: [95, 98, 95, 96],
                    p3: [98, 96, 99, 93],
                    p4: [100, 100, 98, 98]
                }
            ],
            modulos: [
                { 
                    nombre: "MF_006_3: Formación y Orientación Laboral", 
                    ras: [15, 17, 15, 10, 10, 10, 13, 13, 13, 13], 
                    total: 100 
                },
                { 
                    nombre: "MF_054_3: Desarrollo de aplicaciones y sistemas de información", 
                    ras: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25], 
                    total: 100 
                },
                { 
                    nombre: "MF_057_3: Administración de base de datos", 
                    ras: [10, 10, 15, 15, 15, 15, 15, 20, 25, 25], 
                    total: 100 
                },
                { 
                    nombre: "MF_058_3: Análisis y diseño de reporte", 
                    ras: [30, 35, 35, 35, 35, 35, 40, 40, 40, 100], 
                    total: 100 
                }
            ],
            asistencia: {
                P1: { asistencia: 45, ausencia: 2 },
                P2: { asistencia: 43, ausencia: 4 },
                P3: { asistencia: 44, ausencia: 3 },
                P4: { asistencia: 46, ausencia: 1 }
            }
        }
    };
}

// ================= BASE DE DATOS DE USUARIOS =================
let usersDatabase = [];

function loadUsersFromStorage() {
    const savedUsers = localStorage.getItem('boletinUsers');
    if (savedUsers) {
        usersDatabase = JSON.parse(savedUsers);
    } else {
        usersDatabase = [
            { 
                username: "william.informatica5", 
                password: "1234", 
                student: {
                    name: "William Argenis Pepén González",
                    career: "Informatica",
                    grade: "5to",
                    section: "B"
                }
            }
        ];
        saveUsersToStorage();
    }
}

function saveUsersToStorage() {
    localStorage.setItem('boletinUsers', JSON.stringify(usersDatabase));
}

function registerUser(fullName, username, password, grade, section, career) {
    if (usersDatabase.find(u => u.username === username)) {
        return { success: false, error: "El usuario ya existe" };
    }
    
    const newUser = {
        username: username,
        password: password,
        student: {
            name: fullName,
            career: career,
            grade: grade,
            section: section
        }
    };
    
    usersDatabase.push(newUser);
    saveUsersToStorage();
    createDefaultGradesForUser(username);
    return { success: true };
}

function findUser(username, password) {
    return usersDatabase.find(u => u.username === username && u.password === password);
}

// ================= BASE DE DATOS DE CALIFICACIONES =================
let gradesDatabase = {};

function loadGradesFromStorage() {
    const savedVersion = localStorage.getItem('boletinGradesVersion');
    
    // Si la versión cambió, actualizar con los nuevos valores del código
    if (!savedVersion || savedVersion !== DATOS_VERSION) {
        gradesDatabase = getDefaultGrades();
        saveGradesToStorage();
        localStorage.setItem('boletinGradesVersion', DATOS_VERSION);
        console.log(`✅ Notas actualizadas a versión ${DATOS_VERSION}`);
    } else {
        const savedGrades = localStorage.getItem('boletinGrades');
        if (savedGrades) {
            gradesDatabase = JSON.parse(savedGrades);
        } else {
            gradesDatabase = getDefaultGrades();
            saveGradesToStorage();
        }
    }
}

function saveGradesToStorage() {
    localStorage.setItem('boletinGrades', JSON.stringify(gradesDatabase));
}

function createDefaultGradesForUser(username) {
    if (!gradesDatabase[username]) {
        const defaultGrades = getDefaultGrades();
        gradesDatabase[username] = JSON.parse(JSON.stringify(defaultGrades["william.informatica5"]));
        saveGradesToStorage();
    }
}

function getGradesForUser(username) {
    if (!gradesDatabase[username]) {
        createDefaultGradesForUser(username);
    }
    return gradesDatabase[username];
}

// ================= FUNCIONES DE RENDERIZADO =================
function calcularPromedio(arr) {
    if (!arr || arr.length === 0) return 0;
    const suma = arr.reduce((a, b) => a + b, 0);
    return (suma / arr.length).toFixed(1);
}

function calcularPromedioMateria(competencias) {
    if (!competencias || competencias.length === 0) return 0;
    const suma = competencias.reduce((a, b) => a + b, 0);
    return (suma / competencias.length).toFixed(1);
}

function renderCompetencias(competencias) {
    const tbody = document.getElementById('competenciasBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if (!competencias || competencias.length === 0) {
        tbody.innerHTML = '<tr><td colspan="22">No hay datos disponibles</td></tr>';
        return;
    }

    let sumPC1 = 0, sumPC2 = 0, sumPC3 = 0, sumPC4 = 0;
    let materiasValidas = 0;

    competencias.forEach(comp => {
        const comunicativa = [comp.p1[0], comp.p2[0], comp.p3[0], comp.p4[0]];
        const logico = [comp.p1[1], comp.p2[1], comp.p3[1], comp.p4[1]];
        const cientifica1 = [comp.p1[2], comp.p2[2], comp.p3[2], comp.p4[2]];
        const cientifica2 = [comp.p1[3], comp.p2[3], comp.p3[3], comp.p4[3]];
        
        const pc1 = parseFloat(calcularPromedio(comunicativa));
        const pc2 = parseFloat(calcularPromedio(logico));
        const pc3 = parseFloat(calcularPromedio(cientifica1));
        const pc4 = parseFloat(calcularPromedio(cientifica2));
        const calificacionFinal = parseFloat(calcularPromedioMateria([pc1, pc2, pc3, pc4]));
        
        sumPC1 += pc1;
        sumPC2 += pc2;
        sumPC3 += pc3;
        sumPC4 += pc4;
        materiasValidas++;
        
        const row = document.createElement('tr');
        
        const nombreCell = document.createElement('td');
        nombreCell.textContent = comp.nombre;
        row.appendChild(nombreCell);
        
        comunicativa.forEach(grade => {
            const cell = document.createElement('td');
            cell.textContent = grade;
            if (grade < 70) cell.style.color = '#b91c1c';
            row.appendChild(cell);
        });
        
        logico.forEach(grade => {
            const cell = document.createElement('td');
            cell.textContent = grade;
            if (grade < 70) cell.style.color = '#b91c1c';
            row.appendChild(cell);
        });
        
        cientifica1.forEach(grade => {
            const cell = document.createElement('td');
            cell.textContent = grade;
            if (grade < 70) cell.style.color = '#b91c1c';
            row.appendChild(cell);
        });
        
        cientifica2.forEach(grade => {
            const cell = document.createElement('td');
            cell.textContent = grade;
            if (grade < 70) cell.style.color = '#b91c1c';
            row.appendChild(cell);
        });
        
        const pc1Cell = document.createElement('td');
        pc1Cell.textContent = pc1;
        if (pc1 < 70) pc1Cell.style.color = '#b91c1c';
        row.appendChild(pc1Cell);
        
        const pc2Cell = document.createElement('td');
        pc2Cell.textContent = pc2;
        if (pc2 < 70) pc2Cell.style.color = '#b91c1c';
        row.appendChild(pc2Cell);
        
        const pc3Cell = document.createElement('td');
        pc3Cell.textContent = pc3;
        if (pc3 < 70) pc3Cell.style.color = '#b91c1c';
        row.appendChild(pc3Cell);
        
        const pc4Cell = document.createElement('td');
        pc4Cell.textContent = pc4;
        if (pc4 < 70) pc4Cell.style.color = '#b91c1c';
        row.appendChild(pc4Cell);
        
        const finalCell = document.createElement('td');
        finalCell.textContent = calificacionFinal;
        if (calificacionFinal < 70) finalCell.style.color = '#b91c1c';
        row.appendChild(finalCell);
        
        tbody.appendChild(row);
    });
    
    const avgPC1 = materiasValidas > 0 ? (sumPC1 / materiasValidas).toFixed(1) : '0.0';
    const avgPC2 = materiasValidas > 0 ? (sumPC2 / materiasValidas).toFixed(1) : '0.0';
    const avgPC3 = materiasValidas > 0 ? (sumPC3 / materiasValidas).toFixed(1) : '0.0';
    const avgPC4 = materiasValidas > 0 ? (sumPC4 / materiasValidas).toFixed(1) : '0.0';
    const avgFinal = materiasValidas > 0 ? ((parseFloat(avgPC1) + parseFloat(avgPC2) + parseFloat(avgPC3) + parseFloat(avgPC4)) / 4).toFixed(1) : '0.0';
    
    document.getElementById('promedioPC1').textContent = avgPC1;
    document.getElementById('promedioPC2').textContent = avgPC2;
    document.getElementById('promedioPC3').textContent = avgPC3;
    document.getElementById('promedioPC4').textContent = avgPC4;
    document.getElementById('promedioFinalGeneral').textContent = avgFinal;
}

function renderModulos(modulos) {
    const tbody = document.getElementById('modulosBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if (!modulos || modulos.length === 0) {
        tbody.innerHTML = ' hilab<td colspan="12">No hay módulos registrados</td></tr>';
        return;
    }

    modulos.forEach(mod => {
        const row = document.createElement('tr');
        
        const nombreCell = document.createElement('td');
        nombreCell.textContent = mod.nombre;
        nombreCell.style.textAlign = 'left';
        row.appendChild(nombreCell);

        for (let i = 0; i < 10; i++) {
            const ra = mod.ras && mod.ras[i] !== undefined ? mod.ras[i] : '-';
            const cell = document.createElement('td');
            cell.textContent = ra;
            row.appendChild(cell);
        }

        const totalCell = document.createElement('td');
        totalCell.textContent = mod.total !== undefined ? mod.total : '-';
        if (mod.total < 70) totalCell.style.color = '#b91c1c';
        row.appendChild(totalCell);

        tbody.appendChild(row);
    });
}

function renderAsistencia(asistencia) {
    const tbody = document.getElementById('asistenciaBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!asistencia) return;

    const periodos = ['P1', 'P2', 'P3', 'P4'];
    periodos.forEach(periodo => {
        const data = asistencia[periodo];
        if (data) {
            const row = document.createElement('tr');
            const perCell = document.createElement('td');
            perCell.textContent = periodo;
            const asisCell = document.createElement('td');
            asisCell.textContent = data.asistencia !== undefined ? data.asistencia : '-';
            const ausCell = document.createElement('td');
            ausCell.textContent = data.ausencia !== undefined ? data.ausencia : '-';
            row.appendChild(perCell);
            row.appendChild(asisCell);
            row.appendChild(ausCell);
            tbody.appendChild(row);
        }
    });
}

// ================= VARIABLES DE SESIÓN =================
let currentUser = null;

function login(username, password) {
    const user = findUser(username, password);
    if (user) {
        currentUser = user;
        return true;
    }
    return false;
}

function loadStudentInfo() {
    if (currentUser) {
        document.getElementById('studentName').textContent = currentUser.student.name;
        document.getElementById('studentDetails').innerHTML = `Grado: ${currentUser.student.grade} · Sección: ${currentUser.student.section} · ${currentUser.student.career}`;
    }
}

function loadDashboard() {
    if (!currentUser) return;
    const grades = getGradesForUser(currentUser.username);
    renderCompetencias(grades.competencias);
    renderModulos(grades.modulos);
    renderAsistencia(grades.asistencia);
}

// ================= MANEJO DE VISTAS =================
function showGradesView() {
    document.getElementById('loginView').style.display = 'none';
    document.getElementById('gradesView').style.display = 'block';
    loadStudentInfo();
    loadDashboard();
}

function showLoginView() {
    document.getElementById('loginView').style.display = 'block';
    document.getElementById('gradesView').style.display = 'none';
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('loginError');
    
    if (login(username, password)) {
        errorDiv.style.display = 'none';
        showGradesView();
    } else {
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Usuario o contraseña incorrectos';
    }
}

// ================= MODAL DE REGISTRO =================
const modal = document.getElementById('registerModal');
const showRegisterBtn = document.getElementById('showRegisterBtn');
const closeModalBtn = document.querySelector('.close-modal');

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
    document.getElementById('regFullName').value = '';
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('registerSuccess').style.display = 'none';
    document.getElementById('registerError').style.display = 'none';
}

if (showRegisterBtn) {
    showRegisterBtn.addEventListener('click', openModal);
}
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function handleRegister(event) {
    event.preventDefault();
    const fullName = document.getElementById('regFullName').value.trim();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const grade = document.getElementById('regGrade').value;
    const section = document.getElementById('regSection').value;
    const career = document.getElementById('regCareer').value;
    
    const successDiv = document.getElementById('registerSuccess');
    const errorDiv = document.getElementById('registerError');
    
    if (!fullName || !username || !password) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Complete todos los campos';
        successDiv.style.display = 'none';
        return;
    }
    
    const result = registerUser(fullName, username, password, grade, section, career);
    
    if (result.success) {
        successDiv.style.display = 'block';
        successDiv.textContent = 'Usuario registrado exitosamente. Ya puede iniciar sesión.';
        errorDiv.style.display = 'none';
        document.getElementById('regFullName').value = '';
        document.getElementById('regUsername').value = '';
        document.getElementById('regPassword').value = '';
        setTimeout(() => {
            closeModal();
        }, 2000);
    } else {
        errorDiv.style.display = 'block';
        errorDiv.textContent = result.error;
        successDiv.style.display = 'none';
    }
}

function logout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    showLoginView();
}

// ================= INICIALIZACIÓN =================
document.getElementById('loginForm').addEventListener('submit', handleLogin);
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
}
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}

// Cargar datos
loadUsersFromStorage();
loadGradesFromStorage();

// Verificar sesión guardada
const savedUser = sessionStorage.getItem('currentUser');
if (savedUser) {
    try {
        const parsed = JSON.parse(savedUser);
        const userExists = usersDatabase.find(u => u.username === parsed.username && u.password === parsed.password);
        if (userExists) {
            currentUser = userExists;
            showGradesView();
        } else {
            showLoginView();
        }
    } catch(e) {
        showLoginView();
    }
} else {
    showLoginView();
}

// Guardar sesión
window.addEventListener('beforeunload', () => {
    if (currentUser) {
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
        sessionStorage.removeItem('currentUser');
    }
});

// ================= FUNCIONES DE UTILIDAD PARA CONSOLA =================
window.editarNotas = {
    listarMaterias: function() {
        const grades = getGradesForUser(currentUser?.username || "william.informatica5");
        console.log("=== MATERIAS ===");
        grades.competencias.forEach((m, i) => {
            console.log(`${i}: ${m.nombre}`);
        });
        return grades.competencias;
    },
    
    cambiarNota: function(materiaIndex, periodo, competenciaIndex, nuevoValor) {
        const grades = getGradesForUser(currentUser?.username || "william.informatica5");
        const periodos = ['p1', 'p2', 'p3', 'p4'];
        if (grades.competencias[materiaIndex] && grades.competencias[materiaIndex][periodos[periodo-1]]) {
            grades.competencias[materiaIndex][periodos[periodo-1]][competenciaIndex] = nuevoValor;
            saveGradesToStorage();
            if (currentUser) loadDashboard();
            console.log(`✅ Nota actualizada: ${grades.competencias[materiaIndex].nombre} - P${periodo} - Competencia ${competenciaIndex+1} = ${nuevoValor}`);
        } else {
            console.log("❌ Error: índices inválidos");
        }
    },
    
    todoCien: function() {
        const user = currentUser?.username || "william.informatica5";
        const grades = getGradesForUser(user);
        grades.competencias.forEach(materia => {
            materia.p1 = [100, 100, 100, 100];
            materia.p2 = [100, 100, 100, 100];
            materia.p3 = [100, 100, 100, 100];
            materia.p4 = [100, 100, 100, 100];
        });
        grades.modulos.forEach(modulo => {
            modulo.ras = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
            modulo.total = 100;
        });
        saveGradesToStorage();
        if (currentUser && currentUser.username === user) loadDashboard();
        console.log(`✅ Todas las notas de ${user} fueron puestas en 100`);
    }
};

console.log("=== BOLETÍN ACADÉMICO CARGADO ===");
console.log("📌 Para editar notas en vivo desde consola:");
console.log("   editarNotas.listarMaterias() - Ver materias con índices");
console.log("   editarNotas.cambiarNota(0, 1, 0, 100) - Cambiar nota");
console.log("   editarNotas.todoCien() - Poner todo en 100");