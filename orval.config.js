// module.exports = {
//   // auth-service 這個名稱可以自訂，它將作為輸出的目錄名稱
//   'auth-service': {
//     // Orval 產生程式碼的輸入來源。這裡你需要指向後端專案生成的 swagger.json 或 swagger.yaml 檔案
//     input: 'http://localhost:8089/swagger/doc.json',
//     output: {
//       // 輸出檔案的路徑和名稱
//       target: './src/api/auth/auth.ts',
//       // 定義產生的程式碼是否為 TypeScript，以及使用哪個框架
//       client: 'react-query', // 或 'axios', 'fetch'
//       // 匯入所有 API 函式到一個檔案
//       index: true,
//       // 匯入檔案的路徑
//       schemas: './src/api/auth/model.ts', // 產生型別定義的檔案路徑
//       // 啟用 ESLint 規則檢查
//       // prettier: true,
//     },
//     hooks: {
//         // ... (如果你需要 hooks)
//     }
//   },
//   'chat-service': {
//     input: '../backend/chat-service/docs/swagger.json',
//     output: {
//       target: './src/api/chat/chat.ts',
//       client: 'react-query',
//       index: true,
//       schemas: './src/api/chat/model.ts',
//     },
//   },
// };