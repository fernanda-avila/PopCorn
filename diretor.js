async function insereDado(e) {
    e.preventDefault();

    const nome = document.querySelector("#diretorNome").value;
    const data_nascimento = document.querySelector("#dataNascimento").value;

    if (!nome || !data_nascimento) {
        console.error('Nome e data de nascimento são obrigatórios.');
        return;
    }

    const diretorData = { nome, data_nascimento };

    try {
        const response = await fetch('http://localhost:3000/Diretor', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(diretorData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        console.log('Diretor criado com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir diretor: ', error);
    }
}

async function carregaDiretores() {
    try {
        const response = await fetch('http://localhost:3000/Diretor');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const diretores = await response.json();
        const geradorDeDiretores = document.getElementById('diretorid');

        if (!geradorDeDiretores) {
            console.error('Elemento com ID "diretorid" não encontrado.');
            return;
        }

        // Preencher o conteúdo da div com a tabela dos diretores
        geradorDeDiretores.innerHTML = `
        <table border="1" cellspacing="0" cellpadding="5">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                </tr>
            </thead>
            <tbody>
                ${diretores.map(item => `
                    <tr>
                        <td>${item.diretorId}</td>
                        <td>${item.diretorNome}</td>
                        <td>${item.nascimentoDiretor}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        `;
    } catch (error) {
        console.error('Erro ao buscar diretores: ', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#adicionarDiretor')?.addEventListener('click', insereDado);
    document.getElementById('loadDiretores')?.addEventListener('click', carregaDiretores);
});
