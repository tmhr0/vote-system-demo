import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const voteResultLink = document.querySelector('a[href="/vote/result.html"]');
    const loginButton = document.querySelector('.btn-screen');

    // ログイン状態を確認
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        // 非ログイン状態の場合、ログインボタンを表示
        loginButton.classList.remove('hidden');
        return;
    }

    const { data: users, error: usersError } = await supabase
        .from('user')
        .select('id');

    if (usersError) {
        console.error('ユーザーの取得に失敗しました:', usersError);
        return;
    }

    // 各ユーザーの投票状況をチェック
    const { data: voteRecords, error: voteRecordsError } = await supabase
        .from('vote-record')
        .select('user_id');

    if (voteRecordsError) {
        console.error('投票記録の取得に失敗しました:', voteRecordsError);
        return;
    }

    // 全てのユーザーが投票したか確認
    const allUsersVoted = users.every(user => 
        voteRecords.some(voteRecord => voteRecord.user_id === user.id)
    );

    if (allUsersVoted) {
        // 全てのユーザーが投票している場合にボタンを活性化
        voteResultLink.classList.remove('disabled');
        voteResultLink.style.pointerEvents = 'auto'; // クリックを有効化
    }
});