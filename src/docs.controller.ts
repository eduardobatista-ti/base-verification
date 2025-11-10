import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class DocsController {
  @Get()
  @Render('index')
  getDocs() {
    return {
      title: 'API LCE Students - Documentação',
      routes: [
        {
          method: 'POST',
          path: '/lce-students/import',
          description:
            'Importar estudantes a partir de arquivo XLSX (Essa funcionalidade precisa estar habilitada no sistema)',
          parameters: [
            {
              name: 'secret',
              type: 'Header',
              required: true,
              description: 'Chave secreta para autenticação da requisição',
            },
            {
              name: 'file',
              type: 'FormData',
              required: true,
              description: 'Arquivo XLSX com colunas E-mail e CPF',
            },
          ],
          example: {
            request: `curl -X POST ${process.env.BASE_URL}/lce-students/import \\
                     -F "file=@estudantes.xlsx"`,
            response: `{
  "message": "Importação concluída",
  "success": 15,
  "skipped": 3
}`,
          },
        },
        {
          method: 'POST',
          path: '/general-students/import',
          description:
            'Importar estudantes a partir de arquivo XLSX (Essa funcionalidade precisa estar habilitada no sistema)',
          parameters: [
            {
              name: 'secret',
              type: 'Header',
              required: true,
              description: 'Chave secreta para autenticação da requisição',
            },
            {
              name: 'file',
              type: 'FormData',
              required: true,
              description: 'Arquivo XLSX com colunas Documento e Email',
            },
          ],
          example: {
            request: `curl -X POST ${process.env.BASE_URL}/general-students/import \\
                     -F "file=@estudantes.xlsx"`,
            response: `{
  "message": "Importação concluída",
  "success": 15,
  "skipped": 3
}`,
          },
        },
        {
          method: 'GET',
          path: '/lce-students/verify/:{document}',
          description:
            'Verificar se documento existe na base de estudantes lce',
          parameters: [
            {
              name: 'secret',
              type: 'Header',
              required: true,
              description: 'Chave secreta para autenticação da requisição',
            },
            {
              name: 'document',
              type: 'URL Parameter',
              required: true,
              description: 'CPF, email ou CNPJ',
            },
          ],
          example: {
            request:
              'curl ${process.env.BASE_URL}/lce-students/verify/ola@oi.com',
            response: '{ "exists": true, documenType: "email" }',
          },
        },
        {
          method: 'GET',
          path: '/general-students/verify/:{document}',
          description:
            'Verificar se documento existe na base de estudantes geral',
          parameters: [
            {
              name: 'secret',
              type: 'Header',
              required: true,
              description: 'Chave secreta para autenticação da requisição',
            },
            {
              name: 'document',
              type: 'URL Parameter',
              required: true,
              description: 'CPF, email ou CNPJ',
            },
          ],
          example: {
            request:
              'curl ${process.env.BASE_URL}/general-students/verify/12345678900',
            response: '{ "exists": true, documenType: "cpf" }',
          },
        },
        {
          method: 'GET',
          path: '/',
          description: 'Documentação da API (esta página)',
          parameters: [],
          example: {
            request: 'curl ${process.env.BASE_URL}/',
            response: 'HTML desta página',
          },
        },
      ],
    };
  }
}
