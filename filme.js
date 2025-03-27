let url = 'http://localhost:3000/Filme'

async function insereFilme(e) {
    const nome = document.querySelector("#filmeNome").value;
    const descricao = document.querySelector("#filmeDescricao").value;
    const diretor = document.querySelector("#diretorNome").value;
    const ano = document.querySelector("#anoLancamento").value;
    const genero = document.querySelector("#genero").value;
    const duracao = document.querySelector("#duracao").value;

    e.preventDefault();

    const filmeData = {
        filmeNome: nome,
        filmeDescricao: descricao,
        diretorNome: diretor,
        anoLancamento: ano,
        genero: genero,
        duracao: duracao
    };

    try {
        const acao = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filmeData)
        });
        console.log(acao);
    } catch (error) {
        console.error('Erro ao adicionar filme: ', error);
    }
}

async function carregaFilmes(e) {
    e.preventDefault();

    try {
        const response = await fetch(url);
        const data = await response.json();

        const filmes = data;

        const geradorDeFilmes = document.getElementById('filmeid');

        geradorDeFilmes.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Diretor</th>
                    <th>Ano</th>
                    <th>Gênero</th>
                    <th>Duração</th>
                </tr>
            </thead>
            <tbody>
                ${filmes.map((item) => {
                    return `
                    <tr>
                        <td>${item.filmeId}</td>
                        <td>${item.filmeNome}</td>
                        <td>${item.filmeDescricao}</td>
                        <td>${item.diretorNome}</td>
                        <td>${item.anoLancamento}</td>
                        <td>${item.genero}</td>
                        <td>${item.duracao}</td>
                    </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
        `;
    } catch (error) {
        console.error('Erro ao buscar filmes: ', error);
    }
}

document.querySelector('#adicionarFilme').addEventListener('click', insereFilme);
document.getElementById('loadFilmes').addEventListener('click', carregaFilmes);
