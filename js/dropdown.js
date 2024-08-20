import { supabase } from './supabase.js';

document.getElementById('logout-btn').addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('ログアウトに失敗しました:', error.message);
    } else {
        window.location.href = '/vote-system-demo/login';
    }
});

document.getElementById('vote-reset-btn').addEventListener('click', () => {
    window.location.href = '/vote-system-demo/vote-reset';
});