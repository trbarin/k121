# k121 - Back-end

Para configurar o backend localmente, é necessário instalar as dependência com o comando abaixo:

> npm install

É necessário alterar o valor das chaves `apiKey` e `domain` referentes ao serviço [Mailgun](https://www.mailgun.com) e as chaves `database`, `pass` e `user` referente ao serviço [mLab](http://mlab.com) . Elas estão dentro do arquivo `config.js`.

> const database = process.env.DATABASE_MLAB;

> const pass = process.env.PASSWORD_MLAB;

> const user = process.env.USER_MLAB;

> const apiKey = process.env.API_KEY_MAILGUN;

> const domain = process.env.DOMAIN_MAILGUN;

Para subir o servidor localmente, é necessário rodar o comando abaixo:

> npm start

Por padrão, o endereço do servidor é:

> http://localhost:3000/
