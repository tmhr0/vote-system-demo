import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const confirmVoteBtn = document.getElementById('confirm-vote-btn');

    // ログインユーザーのセッションを取得
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
        console.error('ユーザーがログインしていません:', error);
        return;
    }

    const userEmail = session.user.email;

    // ユーザーIDを取得
    const { data: userData, error: userError } = await supabase
        .from('user')
        .select('id')
        .eq('email', userEmail)
        .single();

    if (userError || !userData) {
        console.error('該当するユーザーが見つかりません:', userError);
        return;
    }

    const userId = userData.id;

    // ユーザーの投票記録を確認
    const { data: voteData, error: voteError } = await supabase
        .from('vote-record')
        .select('id')
        .eq('user_id', userId);

    if (voteError) {
        console.error('投票記録の取得に失敗しました:', voteError);
        return;
    }

    // 投票が完了している場合、ボタンを無効化
    if (voteData.length > 0) {
        confirmVoteBtn.disabled = true;
        confirmVoteBtn.textContent = '投票済み';
        confirmVoteBtn.style.backgroundColor = '#cccccc';
        confirmVoteBtn.style.cursor = 'default';

        // ボタンのクリックイベントを無効化
        confirmVoteBtn.addEventListener('click', function(event) {
            event.preventDefault();
            return false;
        });
    }
});