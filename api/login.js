module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405.json({ error: 'Método não permitido' }));
  }

  const { username, password } = req.body;

  // Credenciais do Gestor (em produção, utilize variáveis de ambiente ou hashes)
  const ADMIN_USER = process.env.ADMIN_USER || "gestor@limpaaki.co.mz";
  const ADMIN_PASS = process.env.ADMIN_PASS || "LimpaAki2026@";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.status(200).json({ 
      success: true, 
      token: "token_autenticado_limpaaki_secure_9988",
      message: "Login efetuado com sucesso!" 
    });
  } else {
    return res.status(401).json({ success: false, error: "Credenciais inválidas. Verifique o utilizador e a senha." });
  }
};