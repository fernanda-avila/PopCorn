let url = 'http://localhost:3000/Filme';

async function insereFilme(e) {
    e.preventDefault(); 
    
    const nome = document.querySelector("#filmeNome")?.value.trim() || '';
    const descricao = document.querySelector("#filmeDescricao")?.value.trim() || '';
    const diretor = document.querySelector("#diretorNome")?.value.trim() || '';
    const ano = document.querySelector("#anoLancamento")?.value.trim() || '';
    const genero = document.querySelector("#genero")?.value.trim() || '';
    const duracao = document.querySelector("#duracao")?.value.trim() || '';
    const filmeImgUrl = document.querySelector("#filmeImgUrl")?.value.trim() || '';

    const filmeData = {
        filmeNome: nome,
        filmeDescricao: descricao,
        diretorNome: diretor,
        anoLancamento: ano,
        genero: genero,
        duracao: duracao,
        filmeImgUrl: filmeImgUrl
    };

    console.log("Enviando os dados:", filmeData);

    try {
        const acao = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filmeData)
        });

        const respostaTexto = await acao.text();
        
        if (!acao.ok) {
            console.error('Erro do servidor:', respostaTexto);
            throw new Error(`Erro na requisição: ${acao.statusText}`);
        }

        console.log('Filme inserido com sucesso!', respostaTexto);
    } catch (error) {
        console.error('Erro ao adicionar filme: ', error);
    }
}

async function carregaFilmes(e) {
    e.preventDefault();

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const filmes = await response.json();
        const geradorDeFilmes = document.getElementById('filmeid');

        if (!geradorDeFilmes) {
            console.error('Elemento com ID "filmeid" não encontrado.');
            return;
        }

        geradorDeFilmes.innerHTML = `
        <table border="1" cellspacing="0" cellpadding="5">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Diretor</th>
                    <th>Ano</th>
                    <th>Gênero</th>
                    <th>Duração</th>
                    <th>Link da Imagem</th>
                </tr>
            </thead>
            <tbody>
                ${filmes.map(item => `
                    <tr>
                        <td>${item.filmeId}</td>
                        <td>${item.filmeNome}</td>
                        <td>${item.filmeDescricao}</td>
                        <td>${item.diretorNome}</td>
                        <td>${item.anoLancamento}</td>
                        <td>${item.genero}</td>
                        <td>${item.duracao}</td>
                        <td><a href="${item.filmeImgUrl}" target="_blank">Ver Imagem</a></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        `;
    } catch (error) {
        console.error('Erro ao buscar filmes: ', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#adicionarFilme')?.addEventListener('click', insereFilme);
    document.getElementById('loadFilmes')?.addEventListener('click', carregaFilmes);
});
