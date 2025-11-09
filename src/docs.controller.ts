import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class DocsController {
  @Get()
  @Render('index')
  getDocs() {
    return {
      title: 'API LCA Students - Documentação',
      routes: [
        {
          method: 'POST',
          path: '/lca-students/import',
          description: 'Importar estudantes a partir de arquivo XLSX',
          parameters: [
            {
              name: 'file',
              type: 'FormData',
              required: true,
              description: 'Arquivo XLSX com colunas E-mail e CPF',
            },
          ],
          example: {
            request: `curl -X POST http://localhost:3000/lca-students/import \\
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
          path: '/lca-students/import-base64',
          description: 'Importar estudantes a partir de arquivo XLSX em base64',
          parameters: [
            {
              name: 'fileBase64',
              type: 'string',
              required: true,
              description: 'Arquivo XLSX codificado em base64',
            },
            {
              name: 'fileName',
              type: 'string',
              required: false,
              description: 'Nome do arquivo (opcional)',
            },
          ],
          example: {
            request: `curl -X POST http://localhost:3000/lca-students/import-base64 \\
                     -H "Content-Type: application/json" \\
                     -d '{
                       "fileBase64": "UEsDBBQAAAAIA...",
                       "fileName": "estudantes.xlsx"
                     }'`,
            response: `{
  "message": "Importação concluída",
  "success": 15,
  "skipped": 3
}`,
          },
        },
        {
          method: 'GET',
          path: '/',
          description: 'Documentação da API (esta página)',
          parameters: [],
          example: {
            request: 'curl http://localhost:3000/',
            response: 'HTML desta página',
          },
        },
      ],
    };
  }
}
