import { supabase } from './supabase.js';

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert('正しいメールアドレスとパスワードを入力してください: ' + error.message);
    } else {
        const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || '/vote-system-demo/vote';
        window.location.href = redirectUrl;
    }
});

// パスワード表示・非表示
const passwordToggle = document.querySelector('.password__toggle');
const passwordInput = document.getElementById('password');

passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    passwordToggle.classList.toggle('is-visible');
});