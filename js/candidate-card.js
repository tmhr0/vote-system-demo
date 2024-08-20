import { supabase } from './supabase.js';

export async function generateCandidateCards(candidateListElementId) {
    const candidateListElement = document.getElementById(candidateListElementId);

    if (!candidateListElement) {
        console.error('候補者リストの要素が見つかりません:', candidateListElementId);
        return;
    }

    // 候補者データをSupabaseから取得、ID順に並び替え
    const { data: candidates, error: candidatesError } = await supabase
        .from('candidate')
        .select('*')
        .order('id', { ascending: true });

    if (candidatesError) {
        console.error('候補者の取得に失敗しました:', candidatesError);
        return;
    }

    // 候補者リストを動的に生成
    candidates.forEach(candidate => {
        const candidateCard = document.createElement('label');
        candidateCard.classList.add('candidate-card');
        candidateCard.innerHTML = `
            <input type="radio" name="candidate" value="${candidate.id}" id="candidate-${candidate.id}">
            <div class="candidate-content">
              <div class="radio-custom"></div>
              <img src="/image/candidate/candidate_0${candidate.id}.jpg" alt="${candidate.name}" class="candidate-photo">
              <div class="candidate-info">
                <h3>${candidate.name}</h3>
                <p>${candidate.career}</p>
              </div>
            </div>
        `;
        candidateListElement.appendChild(candidateCard);
    });
}