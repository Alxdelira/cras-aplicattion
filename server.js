import app from './src/app.js';
import * as dotenv from 'dotenv';



dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});