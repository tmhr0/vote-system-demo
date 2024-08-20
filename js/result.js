import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const resultListElement = document.getElementById('result-list');

    const { data: candidates, error: candidatesError } = await supabase
        .from('candidate')
        .select('id, name');

    if (candidatesError) {
        console.error('候補者の取得に失敗しました:', candidatesError);
        return;
    }

    const { data: voteRecords, error: voteRecordsError } = await supabase
        .from('vote-record')
        .select('candidate_id');

    if (voteRecordsError) {
        console.error('投票結果の取得に失敗しました:', voteRecordsError);
        return;
    }

    const voteCounts = {};
    voteRecords.forEach(record => {
        const candidateId = record.candidate_id;
        if (voteCounts[candidateId]) {
            voteCounts[candidateId]++;
        } else {
            voteCounts[candidateId] = 1;
        }
    });

    // 投票結果をソート（降順）
    const sortedCandidates = candidates
        .map(candidate => ({
            ...candidate,
            votes: voteCounts[candidate.id] || 0
        }))
        .sort((a, b) => b.votes - a.votes);

    // 投票結果を表示
    sortedCandidates.forEach((candidate, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('result-item');

        const maxVotes = sortedCandidates[0].votes;

        // Winnerを設定する条件
        const isWinner = candidate.votes === maxVotes && maxVotes > 0;

        // WinnerかCandidateを表示
        listItem.innerHTML = `
            <span class="result-candidate-name">${isWinner ? '当選:' : '落選:'} ${candidate.name}</span>
            <span class="result-candidate-votes">${candidate.votes}</span>
        `;
        resultListElement.appendChild(listItem);
    });
});