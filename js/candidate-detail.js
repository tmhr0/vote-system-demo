import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const candidateId = urlParams.get('id');

    if (!candidateId) {
        alert('候補者IDが指定されていません。');
        window.location.href = '/vote-system-demo/candidate/index.html';
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
            <img src="/vote-system-demo/image/candidate/candidate_0${candidate.id}.jpg" alt="${candidate.name}" class="candidate-photo">
        </div>
        <div class="candidate-info">
            <div class="candidate-attribute__title">
                <h2>${candidate.name}</h2>
                <p class="candidate-attribute__subtitle">${candidate.age}歳(${genderDisplay})</p>
                <p>${candidate.career}</p>
            </div>
            <div class="social-links">
                <div class="social-link">
                    <a href="#"><img src="/vote-system-demo/image/candidate-detail/twitter-icon.svg" alt="Twitter"></a>
                    <p>Twitter</p>
                </div>
                <div class="social-link">
                    <a href="#"><img src="/vote-system-demo/image/candidate-detail/facebook-icon.svg" alt="Facebook"></a>
                    <p>Facebook</p>
                </div>
                <div class="social-link">
                    <a href="#"><img src="/vote-system-demo/image/candidate-detail/instagram-icon.svg" alt="Instagram"></a>
                    <p>Instagram</p>
                </div>
            </div>
            <h3>Policies</h3>
            <p>${candidate.policies}</p>
            <h3>Vision</h3>
            <p>${candidate.vision}</p>
            <h3>Video</h3>
　　           <div class="video-container"></div>
        </div>
    `;

    // 動画を正しく設定するコード例
    const videoContainer = document.querySelector('.video-container');
    if (candidate.video_url) {
        const iframeElement = document.createElement('iframe');
        iframeElement.width = '400';
        iframeElement.height = '300';
        iframeElement.src = candidate.video_url.trim();
        iframeElement.frameBorder = '0';
        iframeElement.allowFullscreen = true;

        const videoWrapper = document.createElement('div');
        videoWrapper.classList.add('video-wrapper');
        videoWrapper.appendChild(iframeElement);

        videoContainer.appendChild(videoWrapper);
    } else {
        videoContainer.textContent = 'ビデオがありません';
    }
    
    // 投票ボタンのリンクに候補者IDを付与
    const confirmVoteBtn = document.getElementById('confirm-vote-btn');
    const candidateUrl = `/vote-system-demo/vote/index.html?candidate=${candidate.id}`;
    confirmVoteBtn.href = candidateUrl;
    console.log("Vote URL set to:", candidateUrl); // デバッグメッセージ

    // confirmVoteBtnがnullでないことを確認
    if (!confirmVoteBtn) {
        console.error('confirm-vote-btnが見つかりません');
    }
});