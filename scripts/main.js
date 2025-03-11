// Função para salvar o idioma selecionado e redirecionar
function setLanguage(lang) {
    console.log(`Idioma selecionado: ${lang}`); // Depuração
    localStorage.setItem('selectedLanguage', lang); // Salva o idioma no localStorage
    redirectToLanguagePage(lang); // Redireciona para a versão correta da página atual
}

// Função para redirecionar para a versão correta da página
function redirectToLanguagePage(lang) {
    const currentPage = window.location.pathname.split('/').pop(); // Obtém o nome da página atual
    console.log(`Página atual: ${currentPage}`); // Depuração

    // Mapeamento das páginas em português e inglês
    const pageMappings = {
        'pt': {
            'index-en.html': 'index.html',
            'about.html': 'sobre.html',
            'publications.html': 'publicacoes.html',
            'patient-area.html': 'area-paciente.html',
            'contact.html': 'contato.html'
        },
        'en': {
            'index.html': 'index-en.html',
            'sobre.html': 'about.html',
            'publicacoes.html': 'publications.html',
            'area-paciente.html': 'patient-area.html',
            'contato.html': 'contact.html'
        }
    };

    // Verifica se a página atual precisa ser redirecionada
    if (pageMappings[lang] && pageMappings[lang][currentPage]) {
        const newPage = pageMappings[lang][currentPage]; // Obtém a nova página
        console.log(`Redirecionando para: ${newPage}`); // Depuração
        window.location.href = newPage; // Redireciona para a nova página
    } else {
        console.log(`Nenhum redirecionamento necessário para: ${currentPage}`); // Depuração
    }
}

// Função para aplicar o idioma salvo ao carregar a página
function applyLanguage() {
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'pt'; // Obtém o idioma salvo ou usa 'pt' como padrão
    console.log(`Aplicando idioma: ${selectedLanguage}`); // Depuração
    redirectToLanguagePage(selectedLanguage); // Redireciona para a versão correta da página
}

// Função para atualizar o texto do botão de idioma
function updateLanguageButton() {
    const languageLabel = document.getElementById('language-label');
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'pt'; // Obtém o idioma salvo ou usa 'pt' como padrão
    languageLabel.textContent = selectedLanguage === 'en' ? 'Idioma' : 'Language'; // Atualiza o texto do botão
    console.log(`Botão de idioma atualizado para: ${languageLabel.textContent}`); // Depuração
}

// Função para exibir/ocultar o dropdown
function toggleDropdown() {
    const dropdown = document.querySelector('.language-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    console.log('Dropdown alternado'); // Depuração
}

// Adiciona eventos aos links do dropdown de idioma
function setupLanguageDropdown() {
    const languageLinks = document.querySelectorAll('.language-dropdown a');
    languageLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Evita o comportamento padrão do link
            const selectedLanguage = this.getAttribute('data-lang'); // Obtém o idioma selecionado
            console.log(`Clicou no idioma: ${selectedLanguage}`); // Depuração
            setLanguage(selectedLanguage); // Salva e aplica o idioma
        });
    });
}

// Fecha o dropdown ao clicar fora dele
document.addEventListener('click', function (event) {
    const languageSelector = document.querySelector('.language-selector');
    const dropdown = document.querySelector('.language-dropdown');
    if (!languageSelector.contains(event.target)) {
        dropdown.style.display = 'none'; // Fecha o dropdown
        console.log('Dropdown fechado'); // Depuração
    }
});

// Aplica o idioma e atualiza o botão ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    console.log('Página carregada'); // Depuração
    applyLanguage(); // Aplica o idioma salvo
    updateLanguageButton(); // Atualiza o texto do botão
    setupLanguageDropdown(); // Configura os eventos do dropdown de idioma
});

// Slides da Página de Publicações

let currentSlide = 0; // Índice do slide atual
let autoSlideInterval; // Variável para armazenar o intervalo do slide automático

// Função para mostrar o slide com base no índice
function showSlide(index) {
    const slides = document.querySelectorAll('.slider a');
    const totalSlides = slides.length;

    // Verifica se o índice está fora dos limites
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Calcula o deslocamento com base no slide atual
    const offset = -currentSlide * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Inicializa o slide
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
});

// Função para iniciar o slide automático
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide(); // Avança para o próximo slide
    }, 5000); // Intervalo de 5 segundos (5000 milissegundos)
}

// Função para parar o slide automático
function stopAutoSlide() {
    clearInterval(autoSlideInterval); // Limpa o intervalo
}

// Função para reiniciar o slide automático após 5 segundos
function restartAutoSlide() {
    stopAutoSlide(); // Para o slide automático atual
    startAutoSlide(); // Reinicia o slide automático
}

// Inicializa o slide e o slide automático quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide); // Mostra o primeiro slide
    startAutoSlide(); // Inicia o slide automático
});

document.addEventListener('DOMContentLoaded', function () {
    // Inicializa o EmailJS com a Public Key
    emailjs.init('yfd2dXCxN8p1I_B5o'); // Use sua Public Key aqui

    const contactForm = document.getElementById('contactForm');
    const feedbackMessage = document.getElementById('feedbackMessage');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('message').value;

        // Validação simples
        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!email.includes('@')) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        const templateParams = {
            from_name: nome,
            from_email: email,
            message: mensagem
        };

        // Envia o e-mail
        emailjs.send('service_zy1sbxp', 'template_fgfvkyr', templateParams)
            .then(function (response) {
                feedbackMessage.textContent = 'Mensagem enviada com sucesso!';
                feedbackMessage.style.backgroundColor = '#d4edda';
                feedbackMessage.style.color = '#155724';
                feedbackMessage.style.display = 'block';
                contactForm.reset();
            }, function (error) {
                feedbackMessage.textContent = 'Erro ao enviar a mensagem. Tente novamente.';
                feedbackMessage.style.backgroundColor = '#f8d7da';
                feedbackMessage.style.color = '#721c24';
                feedbackMessage.style.display = 'block';
                console.error('Erro:', error);
            });
    });
});

const auth0ClientId = 'YOUR_CLIENT_ID';
const auth0Domain = 'YOUR_AUTH0_DOMAIN';
let auth0 = null;

// Inicializa o Auth0
window.onload = async () => {
    auth0 = await createAuth0Client({
        domain: auth0Domain,
        client_id: auth0ClientId,
        redirect_uri: window.location.href
    });

    // Verifica se o usuário já está autenticado
    const isAuthenticated = await auth0.isAuthenticated();
    if (isAuthenticated) {
        const user = await auth0.getUser();
        // Exibe informações do usuário ou redireciona para a página protegida
        console.log(user);
    } else {
        console.log('Usuário não autenticado');
    }
};

// Função para login
async function login(event) {
    event.preventDefault();

    try {
        await auth0.loginWithRedirect({
            redirect_uri: window.location.href
        });
    } catch (error) {
        console.error("Erro no login:", error);
        alert("Erro ao tentar fazer login.");
    }
}

// Função de logout
async function logout() {
    await auth0.logout({
        returnTo: window.location.href
    });
}

window.onload = async () => {
    auth0 = await createAuth0Client({
        domain: auth0Domain,
        client_id: auth0ClientId
    });
};
