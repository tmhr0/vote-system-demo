import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const candidateListElement = document.getElementById('candidate-list');

    // Supabaseから候補者情報を取得し、ID順に並べる
    const { data: candidates, error } = await supabase
        .from('candidate')
        .select('*')
        .order('id', { ascending: true });  // ID順に並べる

    if (error) {
        console.error('候補者情報の取得に失敗しました:', error);
        alert('候補者情報の取得に失敗しました。');
        return;
    }

    // 候補者のカードを生成してページに追加
    candidates.forEach(candidate => {
        const candidateCard = document.createElement('a');
        candidateCard.href = `/candidate/detail.html?id=${candidate.id}`;
        candidateCard.classList.add('candidate-card');
        candidateCard.innerHTML = `
            <img src="/image/candidate/candidate_0${candidate.id}.jpg" alt="${candidate.name}">
            <div class="candidate-info">
                <h2>${candidate.name}</h2>
                <p>${candidate.age}歳</p>
                <p>${candidate.catchphrase}</p>
            </div>
        `;
        candidateListElement.appendChild(candidateCard);
    });
});