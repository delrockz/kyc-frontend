[KYC Application](https://kycapplication.vercel.app)

Tech Stack:
[React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Redux](https://redux.js.org/), [Redux-Persist](https://www.npmjs.com/package/redux-persist), [Tailwind CSS](https://tailwindcss.com/), [Ant Design](https://ant.design/), [Vercel (Frotend Hosting)](https://vercel.com/), [TypeScript](https://www.typescriptlang.org/)

Run development server:

```
npm run dev
```

Deployment steps:

1. `npm run build`
2. Upload the contents of `dist/*` to a S3 bucket with Static Website Hosting enabled
   OR link Github repository to Vercel project and deploy with Vite

# Some Pointers:

- Use https://kycapplication.vercel.app/signup/admin for admin signup
- Use https://kycapplication.vercel.app/signup/user for user signup
- Login link is the same for both i.e https://kycapplication.vercel.app/login
- Environment variable VITE_KYC_BACKEND_API_ENDPOINT is the backend server/localhost/lambda URL
