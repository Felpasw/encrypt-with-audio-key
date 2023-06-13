# encrypt-with-audio-key
## Sobre o projeto 
Esse código foi feito para a disciplina Criptografia e Segurança de Sistemas Computacionais, em que o objetivo é a criação de uma técnica criptográfica.
## Tecnologias🚀
- <a href="https://www.typescriptlang.org"> Typescript </a>
- <a href= "https://www.npmjs.com/package/crypto-ts"> Cripto-ts </a > 
- <a href="https://nodejs.org/en"> Node.js </a>
## Importante ⚠️ 
O path para leitura dos arquivos devem estar adaptados para o sua máquina para que o `fs` consiga ler corretamente, verifique bem antes todos os path's antes de executar o código. Verifique também o arquivo para criptografia, ele deve ter o tamanho de 44.516 bytes.
## Explicação do algoritmo
Você pode encontrar a explcação do algoritmo em um relatório aqui.
## Instalação 📥

Faça um clone desse repositório e acesse o diretório.
```bash
https://github.com/Felpasw/encrypt-with-audio-key.git && cd encrypt-with-audio-key
```
Instalando as dependências.
```bash
npm i 
```
Compilando o código para Javascript.
```bash
tsc 
```
Executando a criptografia
```bash
node ./build/encrypt.js
```
