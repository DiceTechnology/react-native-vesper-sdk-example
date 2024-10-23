const fs = require('fs');

fs.writeFileSync('.env.local', `PUBLIC_USERNAME=
PUBLIC_PASSWORD=
PUBLIC_REALM=
PUBLIC_API_KEY=
PUBLIC_ENV=production
`, 'utf-8');
