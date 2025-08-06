module.exports = {
  auth: {
    input: {
      target: 'http://localhost:8089/swagger/doc.json',
    },
    output: {
      mode: 'tags',
      target: './src/api/auth.ts',
      schemas: './src/api/auth.schemas.ts',
      client: 'react-query',
      mock: false,
    },
    hooks: {
      afterAllFilesWrite: 'eslint --fix',
    },
  },
};
