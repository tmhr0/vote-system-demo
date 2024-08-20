import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const candidateId = urlParams.get('candidate');

    if (!candidateId) {
        alert('候補者IDが指定されていません。');
        window.location.href = '/vote-system-demo/vote/index.html';
        return;
    }

    // Supabaseから候補者情報を取得
    const { data: candidate, error } = await supabase
        .from('candidate')
        .select('*')
        .eq('id', candidateId)
        .single();

    if (error) {
        console.error('候補者情報の取得に失敗しました:', error);
        alert('候補者情報の取得に失敗しました。');
        return;
    }

    // 候補者情報をページに挿入
    const selectedCandidateContainer = document.getElementById('selected-candidate');
    selectedCandidateContainer.innerHTML = `
        <img src="/image/candidate/candidate_0${candidate.id}.jpg" alt="${candidate.name}" class="candidate-photo">
        <div class="candidate-details">
            <h3>${candidate.name}</h3>
            <p>${candidate.career}</p>
        </div>
    `;

    // 投票確定ボタンのイベント設定
    const submitVoteBtn = document.getElementById('submit-vote-btn');
    submitVoteBtn.addEventListener('click', async () => {
        // ログインユーザーのセッションを取得
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
            alert('ログインが必要です');
            window.location.href = '/vote-system-demo/login';
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
            alert('該当するユーザーが見つかりません');
            return;
        }

        const userId = userData.id;

        // 投票データの保存
        const { data: voteData, error: voteError } = await supabase
            .from('vote-record')
            .insert([
                { user_id: userId, candidate_id: candidate.id }
            ]);

        if (voteError) {
            console.error('投票の登録に失敗しました:', voteError);
            alert('投票の登録に失敗しました');
        } else {
            console.log('投票が登録されました:', voteData);
            window.location.href = 'complete.html';
        }
    });
});