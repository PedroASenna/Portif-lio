# Portfolio System 🌟

Um sistema completo de portfólio profissional com formulário de cadastro de clientes, backend Node.js e interface web moderna.

## 📋 Funcionalidades

### Para Visitantes
- ✅ Portfólio moderno e responsivo
- ✅ Formulário de cadastro completo
- ✅ Validação de campos em tempo real
- ✅ Feedback visual de sucesso/erro
- ✅ Design profissional e atrativo

### Para Administradores
- ✅ API REST para gerenciamento
- ✅ Sistema de cadastro de clientes
- ✅ Armazenamento em banco de dados
- ✅ Logs de sistema
- ✅ Interface administrativa

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js
- **Banco de Dados**: SQLite (users.db)
- **Servidor**: Express.js
- **Ambiente**: Node.js Runtime

## 📁 Estrutura do Projeto

```
portfolio-system/
├── node_modules/             # Dependências do Node.js
├── public/                   # Arquivos estáticos
│   ├── index.html           # Página principal do portfólio
│   ├── script.js            # JavaScript do frontend
│   └── style.css            # Estilos principais
├── src/                     # Código fonte do backend
│   ├── db.js               # Configurações do banco de dados
│   └── routes.js           # Rotas da API
├── package.json            # Configurações e dependências
├── package-lock.json       # Lock das versões das dependências
├── server.js              # Servidor principal
└── users.db              # Banco de dados SQLite
```

## ⚡ Instalação e Configuração

### 1. Pré-requisitos

- Node.js 14 ou superior
- npm (geralmente vem com Node.js)

### 2. Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/portfolio-system.git
cd portfolio-system
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
# ou
node server.js
```

### 3. Desenvolvimento

Para desenvolvimento com auto-reload:
```bash
npm run dev
# ou se tiver nodemon configurado
npx nodemon server.js
```

## 🚀 Como Usar

### Desenvolvimento Local

1. Execute `npm install` para instalar dependências
2. Execute `node server.js` para iniciar o servidor
3. Acesse: `http://localhost:3000` (ou a porta configurada)
4. O banco SQLite será criado automaticamente

### Produção

1. Configure as variáveis de ambiente
2. Execute `npm install --production`
3. Inicie com `node server.js`
4. Configure proxy reverso (Nginx) se necessário

## 🔧 Configuração do Banco de Dados

O sistema usa SQLite com o arquivo `users.db` que é criado automaticamente. 

### Estrutura da Tabela (exemplo):
```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT,
    data_nascimento DATE,
    profissao TEXT,
    empresa TEXT,
    mensagem TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 API Endpoints

### Cadastro de Usuários
```http
POST /api/users
Content-Type: application/json

{
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "(11) 99999-9999",
    "data_nascimento": "1990-01-01",
    "profissao": "Desenvolvedor",
    "empresa": "Tech Corp",
    "mensagem": "Interessado em seus serviços"
}
```

### Listar Usuários
```http
GET /api/users
```

### Buscar Usuário por ID
```http
GET /api/users/:id
```

## 📦 Scripts do Package.json

```json
{
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js",
        "test": "npm test"
    }
}
```

## 🛡️ Segurança

### Medidas Implementadas:
- Validação de entrada de dados
- Sanitização de parâmetros
- Headers de segurança CORS
- Rate limiting (se configurado)
- Validação de tipos de dados

### Para Produção:
- Configure HTTPS
- Use variáveis de ambiente para configurações sensíveis
- Implemente autenticação JWT
- Configure logs de produção
- Use PM2 para gerenciamento de processos

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
NODE_ENV=production
DB_PATH=./users.db
CORS_ORIGIN=https://seudominio.com
```

## 🚀 Deploy

### Heroku:
```bash
# Instalar Heroku CLI
npm install -g heroku

# Login e criar app
heroku login
heroku create seu-portfolio-app

# Deploy
git push heroku main
```

### Vercel:
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Digital Ocean / AWS:
```bash
# Usando PM2
npm install -g pm2
pm2 start server.js --name "portfolio-api"
pm2 startup
pm2 save
```

## 🔄 Backup do Banco

### Backup Manual:
```bash
# Copiar arquivo SQLite
cp users.db backup/users_backup_$(date +%Y%m%d_%H%M%S).db
```

### Backup Automático:
Configure um cron job para backup regular:
```bash
# Editar crontab
crontab -e

# Adicionar linha para backup diário às 2:00
0 2 * * * /path/to/your/backup_script.sh
```

## 🐛 Troubleshooting

### Problemas Comuns:

1. **Erro "Cannot find module"**:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Porta já em uso**:
```bash
# Encontrar processo na porta
lsof -i :3000
# Matar processo
kill -9 PID
```

3. **Erro de permissão no banco**:
```bash
chmod 664 users.db
```

4. **CORS Error**:
   - Configurar origins permitidos no backend
   - Verificar headers CORS

## 📊 Monitoramento

### Logs do Sistema:
```bash
# Ver logs em tempo real
tail -f logs/app.log

# Logs do PM2
pm2 logs portfolio-api
```

### Saúde da Aplicação:
```bash
# Status do PM2
pm2 status

# Monitorar recursos
pm2 monit
```

## 🧪 Testes

### Executar Testes:
```bash
npm test
```

### Testes de API:
```bash
# Usando curl
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@email.com"}'
```

## 📈 Próximas Melhorias

- [ ] Autenticação JWT
- [ ] Dashboard administrativo
- [ ] Sistema de emails
- [ ] Paginação da API
- [ ] Cache Redis
- [ ] Documentação Swagger
- [ ] Testes automatizados
- [ ] CI/CD Pipeline

## 🤝 Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

- **Email**: seuemail@dominio.com
- **LinkedIn**: [Seu LinkedIn]
- **GitHub**: [Seu GitHub]

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!

## 🎯 Comandos Úteis

### Node.js:
```bash
# Ver versão do Node
node --version

# Ver dependências outdated
npm outdated

# Atualizar dependências
npm update

# Audit de segurança
npm audit

# Fix vulnerabilidades
npm audit fix
```

### SQLite:
```bash
# Conectar ao banco
sqlite3 users.db

# Ver tabelas
.tables

# Ver schema
.schema users

# Backup
.backup backup.db

# Sair
.exit
```

### PM2 (Produção):
```bash
# Status de apps
pm2 status

# Logs
pm2 logs

# Restart
pm2 restart portfolio-api

# Stop
pm2 stop portfolio-api

# Delete
pm2 delete portfolio-api
```

---

**Desenvolvido com ❤️ usando Node.js e tecnologias modernas**
