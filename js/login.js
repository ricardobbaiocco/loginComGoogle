
// Função que lida com a resposta do Google Credential
function handleCredentialResponse(response) {
    console.log("Resposta recebida:", response);

    const userInfo = parseJwt(response.credential);

    if (!userInfo) {
        console.error("Erro ao processar as credenciais do Google.");
        return;
    }

    // sessão fica ativa por 10 minutos
    const expirationTime = Date.now() + 10 * 60 * 1000; 
    userInfo.expiration = expirationTime;

    // Armazena as informações do usuário no localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    window.location.href = 'index.html';
}

// Função que decodifica o JWT token de autenticação
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Erro ao decodificar o JWT:", e);
        return null;
    }
}

// Inicializa a API Google Identity
window.onload = function () {
    google.accounts.id.initialize({
        client_id: '84397561321-sk952a6ggvuf0js72hmjneiccl43dv59.apps.googleusercontent.com', 
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById('google-login-button'),
        { theme: 'outline', size: 'large' }
    );

    google.accounts.id.prompt(); 
};
