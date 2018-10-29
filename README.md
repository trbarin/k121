# k121

Para configurar localmente back-end e/ou front-end, seguir as orientações de cada projeto:

## [Back-end](backend/README.md)

## [Front-end](backend/README.md)

# Observação

Para facilitar, publiquei no Heroku os projetos.

## Frontend

> https://k121-frontend.herokuapp.com/

## Backend

> https://k121-backend.herokuapp.com/

### Obter lista de registros
GET /secretSanta/ HTTP/1.1

Host: k121-backend.herokuapp.com

Content-Type: application/json

### Inserir novo registro
POST /secretSanta/ HTTP/1.1

Host: k121-backend.herokuapp.com

Content-Type: application/json

    {
        "name": "Beltrano",
        "email": "beltrano@provedor.com.br"
    }

### Atualizar registro
PUT /secretSanta/:id HTTP/1.1

Host: k121-backend.herokuapp.com

Content-Type: application/json

    {
        "_id": "5bd6050031beac000442ea28",
        "name": "Fulano",
        "email": "fulano@provedor.com.br"
    }

### Excluir registro
DELETE /secretSanta/:id HTTP/1.1

Host: k121-backend.herokuapp.com

Content-Type: application/json
