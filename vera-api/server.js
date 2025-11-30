app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
  
    // 🔐 Identifiants admin (dev / soutenance)
    const ADMIN_EMAIL = "admin@vera.com";
    const ADMIN_PASS = "admin123";
  
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      return res.json({
        success: true,
        token: "VeraSuperAdminToken123"  // simule un vrai JWT pour ce projet
      });
    }
  
    return res.status(401).json({
      success: false,
      message: "Identifiants incorrects"
    });
  });
  