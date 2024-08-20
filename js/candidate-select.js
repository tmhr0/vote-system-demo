// cardsGeneratedイベントが発生した時に処理を実行
document.addEventListener('cardsGenerated', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const candidateId = urlParams.get('candidate');
    console.log("Candidate ID from URL:", candidateId); // デバッグメッセージ

    if (candidateId) {
        const radioButton = document.getElementById(`candidate-${candidateId}`);
        if (radioButton) {
            radioButton.checked = true;
            const candidateCard = radioButton.closest('.candidate-card');
            if (candidateCard) {
                candidateCard.classList.add('selected');
                console.log("Candidate card selected:", candidateCard); // デバッグメッセージ
            }
        } else {
            console.error("Radio button for candidate not found");
        }
    } else {
        console.error("Candidate ID not found in URL");
    }

    const candidateCards = document.querySelectorAll('.candidate-card');
    candidateCards.forEach(card => {
        card.addEventListener('click', function() {
            candidateCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});