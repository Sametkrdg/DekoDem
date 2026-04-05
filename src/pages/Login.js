import React, { useState, useEffect, useCallback } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import {
  Container, Box, Typography, TextField,
  Button, Alert, Paper, LinearProgress,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

// ── Brute-force constants ────────────────────────────────────────────────────
const MAX_ATTEMPTS    = 5;
const LOCKOUT_MINUTES = 15;
const LOCKOUT_MS      = LOCKOUT_MINUTES * 60 * 1000;
const LS_ATTEMPTS     = "admin_login_attempts";
const LS_LOCKOUT_AT   = "admin_login_locked_at";

const getAttempts  = ()  => parseInt(localStorage.getItem(LS_ATTEMPTS)  ?? "0", 10);
const getLockoutAt = ()  => parseInt(localStorage.getItem(LS_LOCKOUT_AT) ?? "0", 10);
const bumpAttempts = ()  => localStorage.setItem(LS_ATTEMPTS, String(getAttempts() + 1));
const setLockoutAt = (t) => localStorage.setItem(LS_LOCKOUT_AT, String(t));
const clearLockout = ()  => {
  localStorage.removeItem(LS_ATTEMPTS);
  localStorage.removeItem(LS_LOCKOUT_AT);
};

const remainingMs = () => {
  const lockedAt = getLockoutAt();
  if (!lockedAt) return 0;
  const rem = LOCKOUT_MS - (Date.now() - lockedAt);
  return rem > 0 ? rem : 0;
};

const fmt = (ms) => {
  const s = Math.ceil(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

// ── Component ────────────────────────────────────────────────────────────────
const Login = () => {
  const [email,     setEmail]    = useState("");
  const [password,  setPassword] = useState("");
  const [error,     setError]    = useState("");
  const [loading,   setLoading]  = useState(false);
  const [countdown, setCountdown]= useState(() => remainingMs());
  const [attempts,  setAttempts] = useState(() => getAttempts());

  const navigate = useNavigate();

  // Tick countdown while locked
  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => {
      const r = remainingMs();
      if (r <= 0) { clearLockout(); setCountdown(0); setAttempts(0); setError(""); }
      else setCountdown(r);
    }, 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const isLocked = countdown > 0;

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    if (isLocked || loading) return;

    // Re-check in case another tab updated localStorage
    const rem = remainingMs();
    if (rem > 0) { setCountdown(rem); return; }

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      clearLockout();
      navigate("/admin");
    } catch {
      bumpAttempts();
      const next = getAttempts();
      setAttempts(next);

      if (next >= MAX_ATTEMPTS) {
        setLockoutAt(Date.now());
        setCountdown(LOCKOUT_MS);
        setError(`${MAX_ATTEMPTS} başarısız deneme. Hesap ${LOCKOUT_MINUTES} dakika kilitlendi.`);
      } else {
        setError(`Giriş başarısız. ${MAX_ATTEMPTS - next} deneme hakkınız kaldı.`);
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, isLocked, loading, navigate]);

  const progressPct = Math.min((attempts / MAX_ATTEMPTS) * 100, 100);

  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Paper elevation={4} sx={{ p: 5, width: "100%", borderRadius: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Lock icon */}
          <Box sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "primary.main", display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
            <LockOutlined sx={{ color: "#fff", fontSize: 28 }} />
          </Box>

          <Typography component="h1" variant="h5" fontWeight={700} sx={{ mb: 3 }}>
            Admin Girişi
          </Typography>

          {/* Lockout banner */}
          {isLocked && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              Çok fazla başarısız deneme. <strong>{fmt(countdown)}</strong> sonra tekrar deneyin.
            </Alert>
          )}

          {/* Attempt warning + progress */}
          {!isLocked && attempts > 0 && (
            <Box sx={{ width: "100%", mb: 2 }}>
              <Alert severity={attempts >= MAX_ATTEMPTS - 1 ? "error" : "warning"} sx={{ mb: 1 }}>
                {error}
              </Alert>
              <LinearProgress
                variant="determinate"
                value={progressPct}
                color={attempts >= MAX_ATTEMPTS - 1 ? "error" : "warning"}
                sx={{ borderRadius: 4, height: 5 }}
              />
            </Box>
          )}

          {/* First failure simple error */}
          {!isLocked && error && attempts === 1 && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>{error}</Alert>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ width: "100%", mt: 1 }} noValidate>
            <TextField
              margin="normal" required fullWidth
              label="E-posta Adresi" type="email"
              autoComplete="username" autoFocus={!isLocked}
              disabled={isLocked || loading}
              value={email} onChange={(e) => setEmail(e.target.value)}
              inputProps={{ maxLength: 254 }}
            />
            <TextField
              margin="normal" required fullWidth
              label="Şifre" type="password"
              autoComplete="current-password"
              disabled={isLocked || loading}
              value={password} onChange={(e) => setPassword(e.target.value)}
              inputProps={{ maxLength: 128 }}
            />
            <Button
              type="submit" fullWidth variant="contained"
              disabled={loading || isLocked}
              sx={{ mt: 3, mb: 2, py: 1.5, fontSize: "1rem", borderRadius: 2 }}
            >
              {loading ? "Giriş Yapılıyor…" : isLocked ? `Kilitli — ${fmt(countdown)}` : "Giriş Yap"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
