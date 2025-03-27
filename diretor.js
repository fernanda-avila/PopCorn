let urlDiretor = 'http://localhost:3000/Diretor';

async function insereDado(e) {
    e.preventDefault(); 

    const inputNome = document.querySelector("#nome").value;
    const inputNascimento = document.querySelector("#nascimento").value;
    const inputNacionalidade = document.querySelector("#nacionalidade").value;

    try {
        const acao = await fetch(urlDiretor, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: inputNome,
                nascimento: inputNascimento,
                nacionalidade: inputNacionalidade
            })
        });

        if (!acao.ok) {
            throw new Error("Erro ao inserir diretor");
        }

        const resultado = await acao.json();
        console.log("Diretor inserido com sucesso:", resultado);

      
        carregaDados();

    } catch (error) {
        console.error("Erro ao inserir diretor:", error);
    }
}

async function carregaDados(e) {
    if (e) e.preventDefault(); // Prevenir o comportamento padrão se houver evento

    try {
        const response = await fetch(urlDiretor);

        if (!response.ok) {
            throw new Error("Erro ao buscar diretores");
        }

        const data = await response.json();
        console.log("Diretores carregados:", data);

        const tabelaDiretores = document.getElementById('diretorid');
        
        // Criar cabeçalho da tabela
        tabelaDiretores.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Nascimento</th>
                        <th>Nacionalidade</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map((item) => `
                        <tr>
                            <td>${item.diretorId}</td>
                            <td>${item.diretorNome}</td>
                            <td>${new Date(item.nascimentoDiretor).toLocaleDateString()}</td>
                            <td>${item.nacionalidadeDiretor}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

    } catch (error) {
        console.error('Erro ao buscar dados: ', error);
    }
}

document.querySelector('#adicionarDiretor').addEventListener('click', insereDado);
document.getElementById('loadDiretores').addEventListener('click', carregaDados);
