# Production Deployment Guide

This guide covers deploying the AI Resume Builder to production with LinkedIn AutoFill integration.

## Pre-Deployment Checklist

### 1. LinkedIn AutoFill Setup
- [ ] Obtain LinkedIn Developer account
- [ ] Contact LinkedIn representative for domain allowlisting
- [ ] Ensure your production domain is added to LinkedIn's allowlist
- [ ] Test LinkedIn AutoFill functionality on staging environment

### 2. Domain Requirements
- [ ] HTTPS is required for LinkedIn AutoFill in production
- [ ] Valid SSL certificate configured
- [ ] Domain properly configured with DNS

### 3. Build Configuration
- [ ] Update any environment-specific configurations
- [ ] Verify all API endpoints point to production
- [ ] Test build process locally

## Deployment Steps

### 1. Build the Application
```bash
# Install dependencies
npm install

# Run build process
npm run build

# Optional: Preview the build locally
npm run preview
```

### 2. Deploy Built Files
The build process creates a `dist` directory containing all static files ready for deployment.

#### Option A: Static Hosting (Recommended)
- **Netlify**: Drag and drop the `dist` folder or connect your Git repository
- **Vercel**: Deploy via CLI or Git integration
- **GitHub Pages**: Upload dist contents to gh-pages branch
- **AWS S3 + CloudFront**: Upload dist contents to S3 bucket

#### Option B: Traditional Web Server
- Upload `dist` folder contents to your web server's public directory
- Ensure proper MIME types are configured for all file types
- Configure server to serve `index.html` for all routes (SPA routing)

### 3. Server Configuration

#### Nginx Example
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    root /path/to/dist;
    index index.html;
    
    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Optimize static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache Example
```apache
<VirtualHost *:443>
    ServerName yourdomain.com
    DocumentRoot /path/to/dist
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    # Handle SPA routing
    <Directory "/path/to/dist">
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
    
    # Optimize static assets
    <LocationMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </LocationMatch>
</VirtualHost>
```

### 4. Environment Variables (if needed)
If you need environment-specific configurations:

1. Create `.env.production` file:
```env
VITE_APP_ENV=production
VITE_API_URL=https://your-api-domain.com
```

2. Update Vite configuration if needed:
```javascript
// vite.config.js
export default defineConfig({
  // ... existing config
  define: {
    __APP_ENV__: JSON.stringify(process.env.VITE_APP_ENV)
  }
});
```

## Post-Deployment Verification

### 1. Functional Testing
- [ ] All form steps work correctly
- [ ] Form validation displays appropriate errors
- [ ] LinkedIn AutoFill button appears and functions
- [ ] Mobile responsiveness works across devices
- [ ] Skills management (add/remove) works properly

### 2. Performance Testing
- [ ] Page load times are acceptable
- [ ] Images and assets load properly
- [ ] No console errors in browser
- [ ] CSS animations are smooth

### 3. LinkedIn AutoFill Testing
- [ ] LinkedIn button appears in the Personal Info step
- [ ] Clicking LinkedIn button opens LinkedIn authentication
- [ ] Profile data properly populates form fields
- [ ] Error handling works for authentication failures

### 4. Cross-Browser Testing
Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Monitoring and Maintenance

### 1. Analytics (Optional)
Consider adding analytics to track:
- Form completion rates
- LinkedIn AutoFill usage
- User drop-off points
- Performance metrics

### 2. Error Monitoring
Set up error monitoring to catch:
- JavaScript errors
- LinkedIn AutoFill failures
- Form submission issues

### 3. Updates
- Regularly update dependencies for security
- Monitor LinkedIn AutoFill API for changes
- Test updates in staging before production

## Troubleshooting

### LinkedIn AutoFill Not Working
1. Verify domain is allowlisted with LinkedIn
2. Check browser console for errors
3. Ensure HTTPS is properly configured
4. Verify LinkedIn script loads without errors

### Form Validation Issues
1. Check browser console for JavaScript errors
2. Verify all required fields are properly marked
3. Test form submission with various data combinations

### Mobile Issues
1. Test on actual mobile devices, not just browser dev tools
2. Check touch interactions and scrolling
3. Verify form fields are accessible on small screens

## Security Considerations

1. **HTTPS Only**: Always use HTTPS in production
2. **Content Security Policy**: Consider implementing CSP headers
3. **Input Validation**: Ensure client-side validation is supplemented with server-side validation if you add a backend
4. **Privacy**: Review data handling practices for user information

## Support

For issues with:
- **LinkedIn AutoFill**: Contact LinkedIn Developer Support
- **Application Bugs**: Check GitHub issues or create new ones
- **Deployment**: Refer to your hosting provider's documentation
