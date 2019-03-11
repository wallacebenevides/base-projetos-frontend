// variaveis globais geradas pelo webpack
const PWD = "projeto-name/";

export const API = SERVICE_URL + PWD;

export const environment = {
    isDev: ENV === 'dev',
    isProd: ENV === 'prod'
};

export const APP_INFO = 'Infografico'

export const UsuarioEndpoint = {
    PERFIL_USUARIO: "/usuario/perfil", //GET POST PUT
    REMOVE_USUARIO: '/usuario/removerUsuario',
    ENDERECO_USUARIO: "/usuario/endereco", //GET POST PUT
    CERTIFICADO_USUARIO: "/usuario/formacao", //GET POST PUT DELETE
    PROFISSIONAL_USUARIO: "/usuario/experienciaProfissional", //GET POST PUT DELETE
    ALTERA_IMAGEM: "/usuario/uploadImagemBase64"
};
