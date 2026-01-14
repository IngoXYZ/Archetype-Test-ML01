# ⚡ MailerLite Quick Start - 5 Minuten Setup

## ✅ Code bereits fertig!

Die Integration ist implementiert. Nach dem Deployment werden automatisch diese Daten übertragen:

### 🎯 Personalisierte Felder:
- **Name** - `{$name}` 
- **Haupt-Archetyp** - `{$archetyp}`
- **Prozent** - `{$archetyp_prozent}`
- **Top 3 Archetypen** - `{$archetyp_1}`, `{$archetyp_2}`, `{$archetyp_3}`
- **Top 3 Prozente** - `{$archetyp_1_prozent}`, `{$archetyp_2_prozent}`, `{$archetyp_3_prozent}`
- **Test-Datum** - `{$test_datum}`

## 🚀 Setup in 5 Minuten

### Schritt 1: Code deployen (1 Min)
```bash
cd /home/ubuntu/archetypen_static
git add .
git commit -m "MailerLite Integration mit voller Personalisierung"
git push
```

### Schritt 2: Welcome Automation erstellen (3 Min)

1. **MailerLite Dashboard** → **Automations** → **Create workflow**
2. **Trigger:** "Subscriber joins a group" → Select "archetypen-test"
3. **Add delay:** 0 minutes
4. **Add email:**

**E-Mail Template (Copy & Paste):**
```
Betreff: 🎯 Willkommen! Ihr {$archetyp}-Ergebnis

Hallo {$name},

vielen Dank für Ihre Teilnahme!

Ihr dominanter Archetyp: {$archetyp} ({$archetyp_prozent}%)

Ihre Top 3:
👑 {$archetyp_1} - {$archetyp_1_prozent}%
🥈 {$archetyp_2} - {$archetyp_2_prozent}%
🥉 {$archetyp_3} - {$archetyp_3_prozent}%

In den nächsten Tagen erhalten Sie weitere Tipps.

Beste Grüße
```

5. **Save & Activate**

### Schritt 3: Testen (1 Min)

1. Archetypen-Test mit Ihrer E-Mail durchlaufen
2. Prüfen Sie Ihr Postfach
3. Prüfen Sie MailerLite → Subscribers → Custom Fields

## 📝 E-Mail-Variablen

### In jedem MailerLite Template verwenden:

| Variable | Beispiel-Wert | Verwendung |
|----------|---------------|------------|
| `{$name}` | "Max Mustermann" | Personalisierte Anrede |
| `{$archetyp}` | "Der Weise" | Haupt-Archetyp |
| `{$archetyp_prozent}` | "42" | Prozent-Wert |
| `{$archetyp_1}` | "Der Weise" | 1. Archetyp |
| `{$archetyp_1_prozent}` | "42" | 1. Prozent |
| `{$archetyp_2}` | "Der Entdecker" | 2. Archetyp |
| `{$archetyp_2_prozent}` | "28" | 2. Prozent |
| `{$archetyp_3}` | "Der Held" | 3. Archetyp |
| `{$archetyp_3_prozent}` | "18" | 3. Prozent |
| `{$test_datum}` | "18.09.2024" | Test-Datum |

## 📧 Copy & Paste Templates

### Template 1: Einfach
```
Hallo {$name},

Ihr Archetyp: {$archetyp} ({$archetyp_prozent}%)

Beste Grüße
```

### Template 2: Mit Top 3
```
Hallo {$name},

Ihre Archetypen-Analyse:

👑 {$archetyp_1} - {$archetyp_1_prozent}%
🥈 {$archetyp_2} - {$archetyp_2_prozent}%
🥉 {$archetyp_3} - {$archetyp_3_prozent}%

Test-Datum: {$test_datum}

Beste Grüße
```

### Template 3: Detailliert
```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial; padding: 20px;">
  <h1 style="color: #667eea;">🎯 Ihre Archetypen-Auswertung</h1>
  
  <p>Hallo {$name},</p>
  
  <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #667eea;">
    <h2>{$archetyp}</h2>
    <p style="font-size: 24px; color: #764ba2;">{$archetyp_prozent}%</p>
  </div>
  
  <h3>Ihre Top 3:</h3>
  <p>👑 {$archetyp_1} - {$archetyp_1_prozent}%</p>
  <p>🥈 {$archetyp_2} - {$archetyp_2_prozent}%</p>
  <p>🥉 {$archetyp_3} - {$archetyp_3_prozent}%</p>
  
  <p><small>Test durchgeführt am {$test_datum}</small></p>
</body>
</html>
```

## 🔥 Pro-Tipp: Archetyp-spezifische E-Mails

### In MailerLite conditional blocks verwenden:

1. **Email Editor** → **Dynamic content block**
2. **Condition:** Custom field "archetyp" equals "Der Weise"
3. **Content für "Der Weise":**
```
📚 Als Weiser sind Ihre Stärken:
- Analytisches Denken
- Mentoring & Wissenstransfer
- Strategische Planung
```

4. **Weitere Conditions für andere Archetypen hinzufügen**

## ✅ Checklist

- [ ] Code deployed (git push)
- [ ] Test-Durchlauf mit eigener E-Mail
- [ ] Welcome-Automation erstellt und aktiviert
- [ ] E-Mail-Template mit Personalisierung
- [ ] Custom Fields in MailerLite sichtbar
- [ ] First Welcome-E-Mail erhalten

## 🎉 Fertig!

Ihre personalisierte E-Mail-Integration mit MailerLite ist einsatzbereit!

**Nächste Schritte:**
- Erweiterte E-Mail-Serie aufbauen (Tag 3, Tag 7, etc.)
- A/B Testing verschiedener Betreffzeilen
- Archetyp-spezifische Inhalte erstellen
- Performance tracking einrichten
