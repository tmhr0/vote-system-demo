import { generateCandidateCards } from './candidate-card.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 候補者カードを生成
    await generateCandidateCards('candidate-list');

    // 投票ボタンのクリックイベントを設定
    const confirmVoteBtn = document.getElementById('confirm-vote-btn');
    confirmVoteBtn.addEventListener('click', function(event) {
        event.preventDefault();

        const selectedCandidateId = document.querySelector('input[name="candidate"]:checked');
        if (selectedCandidateId) {
            window.location.href = `/vote/confirm.html?candidate=${selectedCandidateId.value}`;
        } else {
            alert('候補者を選択してください。');
        }
    });
});