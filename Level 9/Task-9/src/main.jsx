import { QueryClient, QueryClientProvider } from "react-query";
import App from './App'
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>;
