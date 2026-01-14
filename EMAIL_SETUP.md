
# 📧 EmailJS Setup-Anleitung

**Problem:** Die Demo-Credentials funktionieren nicht! Du musst deine eigenen EmailJS-Credentials einrichten.

## 🚀 Schritt-für-Schritt Setup (5 Minuten)

### 1. EmailJS-Account erstellen
1. Gehe zu [emailjs.com](https://www.emailjs.com/)
2. Klicke **"Sign Up"** 
3. Erstelle kostenlosen Account (1000 E-Mails/Monat gratis)
4. Bestätige deine E-Mail-Adresse

### 2. Email-Service hinzufügen
1. Gehe zu **"Email Services"** im Dashboard
2. Klicke **"Add New Service"**  
3. Wähle deinen E-Mail-Provider (Gmail, Outlook, Yahoo, etc.)
4. Folge den Anweisungen zur Verbindung
5. **Wichtig:** Notiere dir die **Service ID** (z.B. `service_xyz123`)

### 3. Email-Template erstellen  
1. Gehe zu **"Email Templates"**
2. Klicke **"Create New Template"**
3. Verwende diesen Template-Code:

```html
Subject: {{subject}}

<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center;">
        <h1>🎯 Ihre Archetypen-Auswertung</h1>
        <p>The Small Reset | Carl Jung Archetypen-Test</p>
    </div>
    
    <div style="padding: 30px;">
        <p>Hallo {{to_name}},</p>
        
        <p>vielen Dank für die Teilnahme an unserem Archetypen-Test!</p>
        
        <div style="background: linear-gradient(135deg, #f1f5f9, #e2e8f0); border: 2px solid #3b82f6; border-radius: 12px; padding: 25px; margin: 20px 0; text-align: center;">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">Ihr dominanter Archetyp:</div>
            <div style="color: #3b82f6; font-size: 24px; font-weight: bold;">{{dominant_archetype}}</div>
            <div style="color: #3b82f6; font-size: 32px; font-weight: bold; margin: 10px 0;">{{archetype_percentage}}%</div>
        </div>

        <h2>💡 Geschäftsmodell-Empfehlungen</h2>
        <div style="background: linear-gradient(135deg, #fef3c7, #fed7aa); border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px;">
            <pre style="white-space: pre-line; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; margin: 0;">{{recommendations}}</pre>
        </div>

        <h2>📊 Ihre vollständigen Ergebnisse</h2>
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px;">
            <pre style="white-space: pre-line; font-family: Arial;">{{all_scores}}</pre>
        </div>

        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 25px; text-align: center; margin: 25px 0; border-radius: 8px;">
            <h3>Bereit für den nächsten Schritt?</h3>
            <p>Entdecken Sie mehr über The Small Reset:</p>
            <a href="https://www.thesmallreset.org/about-us/" style="color: white; background-color: rgba(255,255,255,0.2); padding: 10px 20px; text-decoration: none; border-radius: 25px;">Website besuchen</a>
        </div>

        <p style="color: #64748b; font-size: 14px;">
            Diese Auswertung wurde am {{timestamp}} erstellt.
        </p>
    </div>
    
    <div style="background-color: #1e293b; color: white; padding: 20px; text-align: center;">
        <p>© 2025 The Small Reset | info@thesmallreset.org</p>
    </div>
</div>
```

4. **Wichtig:** Notiere dir die **Template ID** (z.B. `template_abc456`)
5. Teste das Template mit **"Test"**-Button

### 4. Konfiguration in der App
Öffne `js/app.js` und ändere diese 3 Zeilen:

```javascript
// Zeile 21: Dein Public Key (findest du unter "Account" > "API Keys")
emailjs.init("DEIN_PUBLIC_KEY");

// Zeile 48: Deine Owner-E-Mail für Benachrichtigungen
return 'deine-email@example.com';

// Zeile 374 & 523: Deine Service-ID und Template-ID (beide gleich)
await emailjs.send('DEINE_SERVICE_ID', 'DEINE_TEMPLATE_ID', templateParams);
```

### 5. Test
1. Speichere die Datei
2. Lade die Webseite neu
3. Führe einen Test durch
4. Überprüfe deine E-Mails!

## 🆘 Häufige Probleme

### "400 Bad Request"
- Überprüfe Service-ID und Template-ID
- Stelle sicher, dass das Template existiert

### "401 Unauthorized"  
- Überprüfe deinen Public Key
- Stelle sicher, dass der Account aktiviert ist

### "Emails kommen nicht an"
- Überprüfe Spam-Ordner
- Teste das Template im EmailJS-Dashboard
- Überprüfe E-Mail-Service-Verbindung

## 📝 Beispiel-Konfiguration

Wenn deine Werte so aussehen:
- Public Key: `abcd1234567890`
- Service ID: `service_gmail_123`  
- Template ID: `template_archetyp`
- Deine E-Mail: `meine@email.com`

Dann sieht `js/app.js` so aus:

```javascript
// Zeile 22:
emailjs.init("abcd1234567890");

// Zeile 301 & 339:
await emailjs.send('service_gmail_123', 'template_archetyp', params);

// Zeile 327:
to_email: 'meine@email.com',
```

## ✅ Fertig!

Nach der Konfiguration:
- ✅ Teilnehmer bekommen ihre Archetyp-E-Mail
- ✅ Du bekommst eine Kopie mit Teilnehmer-Details
- ✅ 1000 kostenlose E-Mails pro Monat

**Zeit:** ~5 Minuten Setup, dann funktioniert alles automatisch! 🎉
