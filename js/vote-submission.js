import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const confirmVoteBtn = document.getElementById('submit-vote-btn');
    if (!confirmVoteBtn) {
        console.error('submit-vote-btn ボタンが見つかりません');
        return;
    }

    confirmVoteBtn.addEventListener('click', async () => {
        console.log('Confirm Vote button clicked');

        const url = window.location.pathname;
        console.log('Current URL:', url);

        const candidateIdMatch = url.match(/confirm-(\d+)\.html$/);
        const candidateId = candidateIdMatch ? candidateIdMatch[1] : null;
        console.log('Extracted Candidate ID:', candidateId);

        if (!candidateId) {
            alert('候補者が選択されていません');
            return;
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
            console.error('Error getting session or session not found:', error);
            alert('ログインが必要です');
            window.location.href = '/vote-system-demo/login';
            return;
        }

        const userEmail = session.user.email;

        const { data: userData, error: userError } = await supabase
            .from('user')
            .select('id')
            .eq('email', userEmail)
            .single();

        if (userError || !userData) {
            console.error('該当するユーザーが見つかりません:', userError);
            alert('該当するユーザーが見つかりません');
            return;
        }

        const userId = userData.id;
        console.log('User ID:', userId);

        const { data: voteData, error: voteError } = await supabase
            .from('vote-record')
            .insert([
                { user_id: userId, candidate_id: candidateId }
            ]);

        if (voteError) {
            console.error('投票の登録に失敗しました:', voteError);
            alert('投票の登録に失敗しました');
        } else {
            console.log('投票が登録されました:', voteData);
            window.location.href = 'vote-system-demo/vote/complete.html';
        }
    });
});