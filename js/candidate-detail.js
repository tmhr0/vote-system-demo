import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const candidateId = urlParams.get('id');

    if (!candidateId) {
        alert('候補者IDが指定されていません。');
        window.location.href = '/candidate/index.html';
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

    const genderDisplay = candidate.gender == 0 ? '男性' : '女性';
    
    const detailContainer = document.getElementById('candidate-detail');
    detailContainer.innerHTML = `
        <div class="candidate-photo-container">
            <img src="/image/candidate/candidate_0${candidate.id}.jpg" alt="${candidate.name}" class="candidate-photo">
        </div>
        <div class="candidate-info">
            <div class="candidate-attribute__title">
                <h2>${candidate.name}</h2>
                <p class="candidate-attribute__subtitle">${candidate.age}歳(${genderDisplay})</p>
                <p>${candidate.career}</p>
            </div>
            <h3>Policies</h3>
            <p>${candidate.policies}</p>
            <h3>Vision</h3>
            <p>${candidate.vision}</p>
        </div>
    `;

    // 投票ボタンのリンクに候補者IDを付与
    const confirmVoteBtn = document.getElementById('confirm-vote-btn');
    const candidateUrl = `/vote/index.html?candidate=${candidate.id}`;
    confirmVoteBtn.href = candidateUrl;
    console.log("Vote URL set to:", candidateUrl); // デバッグメッセージ

    // confirmVoteBtnがnullでないことを確認
    if (!confirmVoteBtn) {
        console.error('confirm-vote-btnが見つかりません');
    }
});