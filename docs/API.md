# Instruções de uso da API da plataforma

URL base - https://www.oglobo.globo.com

### Login `/login/loginMovel.do`
**parametros:**
```
{
  email : string,
  pwd : string
}
```
**retorno:**
```
{ key : string // chave secreta a ser usada em outras chamadas para indicar o usuario que fez o login }
```

### Registro de novo perfil `/login/registroMovel.do`
**parametros:** 
```
{
  nome : string,
  email : string,
  telefone : string,
  password1 : string,
  password2 : string, // confircacao de senha
  termos : boolean // usuario aceitou os termos
}
```
**retorno:**
```
{ key : string // chave secreta a ser usada em outras chamadas para indicar o usuario que fez o login }
```

