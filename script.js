document.addEventListener('DOMContentLoaded', function() {
    var email = 'corelio.mw@proton.me';
    function md5(string) {
        return CryptoJS.MD5(string).toString();
    }
    var emailHash = md5(email.trim().toLowerCase());
    var gravatarUrl = 'https://www.gravatar.com/avatar/' + emailHash + '?s=400';
    var avatarContainer = document.getElementById('avatar-container');
    var img = document.createElement('img');
    img.src = gravatarUrl;
    img.alt = 'Gravatar';
    img.className = 'avatar';
    avatarContainer.appendChild(img);
    
  
    const themeStyleLink = document.getElementById('theme-style');
    const lightBtn = document.getElementById('light-btn');
    const darkBtn = document.getElementById('dark-btn');
    const systemBtn = document.getElementById('system-btn');

    if (themeStyleLink && lightBtn && darkBtn && systemBtn) {
        // Funkcja do ustawiania motywu na podstawie zapisanych preferencji
        function setTheme(theme) {
            if (theme === 'light') {
                themeStyleLink.setAttribute('href', 'style-light.css');
                lightBtn.style.backgroundColor = '#f0f0f0'; // Kolor tła dla przycisku light
                darkBtn.style.backgroundColor = ''; // Usuń kolor tła dla przycisku dark
                systemBtn.style.backgroundColor = ''; // Usuń kolor tła dla przycisku system
            } else if (theme === 'dark') {
                themeStyleLink.setAttribute('href', 'style-dark.css');
                lightBtn.style.backgroundColor = ''; // Usuń kolor tła dla przycisku light
                darkBtn.style.backgroundColor = '#333'; // Kolor tła dla przycisku dark
                systemBtn.style.backgroundColor = ''; // Usuń kolor tła dla przycisku system
            } else if (theme === 'system') {
                const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
                const newTheme = prefersDarkScheme.matches ? 'dark' : 'light';
                setTheme(newTheme); // Ustaw motyw na podstawie preferencji systemowych
                if (newTheme === 'dark') {
                    systemBtn.style.backgroundColor = '#333';
                    darkBtn.style.backgroundColor = '';
                }
            }
        }

        // Pobierz zapisany motyw z cookies
        let savedTheme = getCookie('theme');

        // Jeśli nie ma zapisanego motywu w cookies, ustaw na podstawie preferencji systemowych
        if (!savedTheme) {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            savedTheme = prefersDarkScheme.matches ? 'dark' : 'light';
            setCookie('theme', savedTheme); // Zapisz domyślny motyw w cookies
        }
        setTheme(savedTheme);

        // Obsługa przycisków
        lightBtn.addEventListener('click', function() {
            setTheme('light');
            setCookie('theme', 'light');
        });

        darkBtn.addEventListener('click', function() {
            setTheme('dark');
            setCookie('theme', 'dark');
        });

        systemBtn.addEventListener('click', function() {
            setTheme('system');
            setCookie('theme', 'system');
        });

        // Funkcja do odczytu ciasteczek
        function getCookie(name) {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                const [cookieName, cookieValue] = cookie.split('=');
                if (cookieName.trim() === name) {
                    return cookieValue;
                }
            }
            return null;
        }

        // Funkcja do ustawiania ciasteczek
        function setCookie(name, value) {
            document.cookie = `${name}=${value}`;
        }
    } else {
        console.error('Nie można znaleźć wszystkich wymaganych elementów HTML.');
    }
});
