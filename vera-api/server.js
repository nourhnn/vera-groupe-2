app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
  
    console.log('[API] /api/admin/login body =', req.body);
  
    const ADMIN_EMAIL = 'admin';    // ton "username"
    const ADMIN_PASS = 'vera123';
  
    // Si un champ manque → 400
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis',
      });
    }
  
    // Mauvais identifiants → 401
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASS) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects',
      });
    }
  
    // OK
    return res.json({
      success: true,
      token: 'VeraSuperAdminToken123',
    });
  });
  