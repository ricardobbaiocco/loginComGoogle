window.onload = function() {
    // Carrega a API de autenticação do Google
    gapi.load('auth2', function() {
        gapi.auth2.init().then(function() {
            const botaoSair = document.getElementById('botaoSair');
            
            if (botaoSair) {
                botaoSair.addEventListener('click', function() {
                    console.log("Logout chamado"); 
                    logout(); 
                });
            } else {
                console.error("Botão de sair não encontrado.");
            }

            // Adiciona listener para o evento 'storage'
            window.addEventListener('storage', function(event) {
                if (event.key === 'logout') {
                    window.location.href = 'login.html';
                }
            });
        }).catch(function(error) {
            console.error("Erro ao inicializar a autenticação Google: ", error);
        });
    });
};

// Função para fazer o logout
function logout() {
    // limpa informações do usuário local
    localStorage.removeItem('userInfo');
    localStorage.setItem('logout', Date.now());

    // Logout da conta Google
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('Usuário deslogado da conta Google.');
        window.location.href = 'login.html';
    }).catch(function(error) {
        console.error("Erro ao deslogar da conta Google: ", error);
    });
}
