import { supabase } from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('reset-button');

    resetButton.addEventListener('click', async () => {

        const { error } = await supabase
            .from('vote-record')
            .delete()
            .not('id', 'is', null);

        if (error) {
            console.error('リセット中にエラーが発生しました:', error);
            alert('リセット中にエラーが発生しました。');
        } else {
            alert('全ての投票記録がリセットされました。');
        }
    });
});