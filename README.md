# ce.frontend

## Descrição do Projeto
O ce.frontend é a parte frontend da aplicação que consome um sistema de vitrine de carros.

## Vídeo do Projeto em Funcionamento
Assista ao vídeo [aqui]([[link_para_o_vídeo](https://1drv.ms/v/s!Am1Zv2Sr8JVMgUVUbVi1tQ34kjul?e=QnnDVN)]).

## Instalação
Certifique-se de ter o Node.js e o Yarn instalados. Para configurar o projeto localmente, siga os passos abaixo:

1. Clone este repositório:
```bash
git clone https://github.com/marciojuniors2/ce-frontend
```

2. Navegue para o diretório do projeto.

## Configuração
Os services estão com as ligações com o backend mocadas com:
```javascript
export const base = axios.create({
  baseURL: 'https://localhost:44302/api/',
})
```
Será necessário, ao subir o backend, configurá-lo para a porta indicada.

## Uso
Para instalar as dependencias de desenvolvimento, utilize o seguinte comando:
```bash
yarn
```

Para iniciar o servidor de desenvolvimento, utilize o seguinte comando:
```bash
yarn dev
```
Isso iniciará o servidor de desenvolvimento e abrirá o projeto no navegador padrão.

## Principais Tecnologias Utilizadas
- React
- Typescript
- Zod (validação)
- react-hook-forms
- axios
- ContextApi
- Yarn
- Material-UI (ou MUI)
